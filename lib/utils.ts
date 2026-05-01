import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as jose from "jose";
import bcrypt from "bcryptjs";
import {
  Response,
  ResponseSuccess,
  ResponseWithMessage,
} from "@/src/core/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, await bcrypt.genSalt());
}

/**
 * Function to check whether the given value is expired or not.
 * @param expires The date that want to check
 * @return true if the value is expired, false otherwise
 */
export function isExpired(expires: Date): boolean {
  return new Date(expires) < new Date();
}

/**
 * Function to set token expiration.
 * @param exp Duration of token expiration, default is 3600 milliseconds or 1 hour
 * @return Generates datetime for the token expiration
 */
export function setTokenExpiration(exp: number = 60 * 60) {
  return new Date(new Date().getTime() + 1000 * exp);
}

/**
 * Function to generate jwt.
 * @param payload The payload want to generate
 * @param options The sign options
 * @return The token generated
 */

export async function signJwt(
  payload: Record<string, unknown>,
  options?: any
) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "secret");
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(secret);
}

export const verifyJwtToken = async <T extends object>(token: string) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "secret");
    const { payload } = await jose.jwtVerify(token, secret);
    return {
      valid: true,
      decoded: payload as T,
    };
  } catch (error) {
    return {
      valid: false,
      decoded: null,
    };
  }
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Overload for response status in server action
export function response<T>(response: ResponseWithMessage): Response<T>;
export function response<T>(response: ResponseSuccess<T>): Response<T>;
export function response<T>(response: Response<T>): Response<T> {
  return response;
}

/**
 * Formats an Uploadcare URL to ensure it uses the correct CDN domain and has the required operations.
 */
export const getUploadcareUrl = (url: string | null | undefined): string => {
  if (!url) return "";

  // Handle case where it might be a relative path or already formatted
  if (url.startsWith("/") && !url.includes("ucarecd")) return url;

  // Use the working custom domain provided by the user
  let formattedUrl = url
    .replace("ucarecdn.com", "1mk1fumvci.ucarecd.net")
    .replace("demo.ucarecd.net", "1mk1fumvci.ucarecd.net");

  // Ensure the URL ends with /-/preview/ for correct CDN fetching
  if (
    formattedUrl.includes("ucarecd.net") &&
    !formattedUrl.includes("-/preview")
  ) {
    formattedUrl = formattedUrl.endsWith("/")
      ? `${formattedUrl}-/preview/`
      : `${formattedUrl}/-/preview/`;
  }

  return formattedUrl;
};
