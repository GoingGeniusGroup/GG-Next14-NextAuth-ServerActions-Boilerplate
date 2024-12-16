"use server";

import { signIn } from "@/auth";
import { isExpired, response, signJwt } from "@/lib/utils";
import { loginSchema } from "@/schemas";
import { sendTwoFactorEmail } from "@/services/mail";
import {
  deleteTwoFactorConfirmationById,
  getTwoFactorConfirmationByUserId,
} from "@/services/two-factor-confirmation";
import { generateTwoFactorToken } from "@/services/two-factor-token";
import {
  getUserByEmail,
  getUserByPhone,
  getUserByUsername,
} from "@/services/user";
import { SerializableUser } from "@/src/core/types/serializable-user";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { z } from "zod";

/// Helper to extract only serializable user data
const extractUserData = (user: any): SerializableUser => ({
  email: user.email,
  username: user.username,
  firstName: user.first_name,
  lastName: user.last_name,
  role: user.role,
  image: user.image,
  phone: user.phone_number,
  gg_id: user.gg_id,
});

// Helper to set secure cookies
const setSecureCookie = (
  cookieStore: ReturnType<typeof cookies>,
  name: string,
  value: string,
  maxAge: number = 7 * 24 * 60 * 60
) => {
  cookieStore.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge,
    path: "/",
  });
};

export const login = async (payload: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(payload);
  if (!validatedFields.success) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "Invalid fields.",
      },
    });
  }

  const { login, password } = validatedFields.data;

  const existingUser =
    (await getUserByEmail(login)) ||
    (await getUserByPhone(login)) ||
    (await getUserByUsername(login));

  if (
    !existingUser ||
    !("password" in existingUser) ||
    !existingUser.password
  ) {
    return response({
      success: false,
      error: {
        code: 401,
        message: "Invalid credentials.",
      },
    });
  }

  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordMatch) {
    return response({
      success: false,
      error: {
        code: 401,
        message: "Invalid credentials.",
      },
    });
  }

  // Check if user's 2FA are enabled
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    const existingTwoFactorConfirmation =
      await getTwoFactorConfirmationByUserId(existingUser.gg_id);
    const hasExpired = isExpired(existingTwoFactorConfirmation?.expires!);

    // If two factor confirmation exist and expired, then delete it.
    if (existingTwoFactorConfirmation && hasExpired) {
      await deleteTwoFactorConfirmationById(existingTwoFactorConfirmation.id);
    }

    // If two factor confirmation doesn't exist or if two factor confirmation has expired, then handle 2fa
    if (!existingTwoFactorConfirmation || hasExpired) {
      const cookieStore = cookies();
      const token = signJwt(validatedFields.data);
      cookieStore.set("credentials-session", token);

      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);

      return response({
        success: true,
        code: 200,
        message: "Please confirm your two-factor authentication code.",
      });
    }
  }

  // Store user data in cookies and proceed with sign in
  const cookieStore = cookies();
  const userData = extractUserData(existingUser);

  // Store user data in an encrypted cookie
  setSecureCookie(cookieStore, "user_data", JSON.stringify(userData));

  // Then try to sign in with next-auth credentials.
  return await signInCredentials(login, password);
};

// Sign in credentials from next-auth
export const signInCredentials = async (login: string, password: string) => {
  try {
    const result = await signIn("credentials", {
      login, // Change this from 'email' to 'login'
      password,
      redirect: false,
    });

    if (result?.error) {
      return response({
        success: false,
        error: {
          code: 401,
          message: "Invalid credentials.",
        },
      });
    }

    return response({
      success: true,
      code: 200,
      message: "Login successful.",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return response({
            success: false,
            error: {
              code: 401,
              message: "Invalid credentials.",
            },
          });
        // ... other cases ...
        default:
          console.error(error);
          return response({
            success: false,
            error: {
              code: 500,
              message: "An unexpected error occurred.",
            },
          });
      }
    }
    console.error(error);
    return response({
      success: false,
      error: {
        code: 500,
        message: "An unexpected error occurred.",
      },
    });
  }
};
