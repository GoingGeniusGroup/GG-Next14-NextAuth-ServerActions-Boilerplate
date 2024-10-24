import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getAvatarsByUserId = async (gg_id: string) => {
  try {
    const avatars = await db.avatar.findMany({
      where: { gg_id },
      orderBy: { avatar_id: "desc" },
    });
    return avatars;
  } catch (error) {
    console.error("Error in getAvatarsByUserId:", error);
    return [];
  }
};

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

export const updateAvatar = async (
  avatar_id: string,
  data: Prisma.avatarUpdateInput
) => {
  try {
    const avatar = await db.avatar.update({
      where: { avatar_id },
      data,
    });
    return avatar;
  } catch (error) {
    console.error("Error in updateAvatar:", error);
    return null;
  }
};

export const deleteAvatar = async (avatar_id: string) => {
  try {
    const avatar = await db.avatar.delete({
      where: { avatar_id },
    });
    return avatar;
  } catch (error) {
    console.error("Error in deleteAvatar:", error);
    return null;
  }
};
