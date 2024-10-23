import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const createAvatar = async (data: Prisma.avatarCreateInput) => {
  try {
    const avatar = await db.avatar.create({
      data,
    });
    return avatar;
  } catch (error) {
    console.error("Error in createAvatar:", error);
    return null;
  }
};

export const getAvatarsByUserId = async (gg_id: string) => {
  try {
    const avatars = await db.avatar.findMany({
      where: { gg_id },
    });
    return avatars;
  } catch (error) {
    console.error("Error in getAvatarsByUserId:", error);
    return [];
  }
};

export const getAvatarById = async (avatar_id: string) => {
  try {
    const avatar = await db.avatar.findUnique({
      where: { avatar_id },
    });
    return avatar;
  } catch (error) {
    console.error("Error in getAvatarById:", error);
    return null;
  }
};

export const updateAvatarById = async (avatar_id: string, data: Prisma.avatarUpdateInput) => {
  try {
    const avatar = await db.avatar.update({
      where: { avatar_id },
      data,
    });
    return avatar;
  } catch (error) {
    console.error("Error in updateAvatarById:", error);
    return null;
  }
};

export const deleteAvatarById = async (avatar_id: string) => {
  try {
    const avatar = await db.avatar.delete({
      where: { avatar_id },
    });
    return avatar;
  } catch (error) {
    console.error("Error in deleteAvatarById:", error);
    return null;
  }
};

export const getAllAvatars = async () => {
  try {
    const avatars = await db.avatar.findMany();
    return avatars;
  } catch (error) {
    console.error("Error in getAllAvatars:", error);
    return [];
  }
};
