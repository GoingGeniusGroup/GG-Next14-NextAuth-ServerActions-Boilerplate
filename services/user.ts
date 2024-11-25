import { db } from "@/lib/db";
import { normalizePhoneNumber } from "@/schemas";
import { Prisma } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    return null;
  }
};

export const getUserByPhone = async (phone: string) => {
  const normalizedPhone = normalizePhoneNumber(phone);
  try {
    const user = await db.user.findUnique({
      where: { phone_number: normalizedPhone },
    });
    if (!user) {
      console.log(`User not found with phone number: ${phone}`);
    }
    return user;
  } catch (error) {
    console.error("Error in getUserByPhone:", error);
    return null;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: { username },
    });

    return user;
  } catch (error) {
    console.error("Error in getUserByUsername:", error);
    return null;
  }
};

export const getUserById = async (gg_id: string) => {
  try {
    const user = await db.user.findUnique({ where: { gg_id } });
    return user;
  } catch (error) {
    console.error("Error in getUserById:", error);
    return null;
  }
};

export const createUser = async (userData: Prisma.UserCreateInput) => {
  try {
    return await db.user.create({
      data: userData,
    });
  } catch (error) {
    console.error("Error in createUser:", error);
    return null;
  }
};

export const updateUserById = async (
  gg_id: string,
  userData: Prisma.UserUpdateInput
) => {
  try {
    return await db.user.update({
      where: { gg_id },
      data: userData,
    });
  } catch (error) {
    console.error("Error in updateUserById:", error);
    return null;
  }
};
