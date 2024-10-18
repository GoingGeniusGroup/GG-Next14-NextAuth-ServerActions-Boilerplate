import { db } from "@/lib/db";
import { registerSchema } from "@/schemas";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
      select: {
        gg_id: true,
        username: true,
        email: true,
        password: true,
        role: true,
        isTwoFactorEnabled: true,
        emailVerified: true,
      }
    });
    return user ? { ...user, isOAuth: false } : null;
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    return null;
  }
};

export const getUserById = async (gg_id: string) => {
  try {
    const user = await db.user.findUnique({ where: { gg_id } });

    return user;
  } catch {
    return null;
  }
};

export const createUser = async (payload: z.infer<typeof registerSchema>) => {
  try {
    return await db.user.create({
      data: payload,
    });
  } catch {
    return null;
  }
};

type UpdateUserType = Prisma.Args<typeof db.user, "update">["data"];
export const updateUserById = async (gg_id: string, payload: UpdateUserType) => {
  try {
    return await db.user.update({
      where: { gg_id },
      data: payload,
    });
  } catch {
    return null;
  }
};
