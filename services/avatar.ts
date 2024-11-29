import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getAvatarsByUserId = async (gg_id: string) => {
  try {
    const avatars = await db.avatar.findMany({
      where: { gg_id },
    });
    return avatars;
  } catch (error) {
    console.error("Error in getAvatarsByUserId:", error);
    return null;
  }
};

export const createAvatar = async (avatarData: Prisma.avatarCreateInput) => {
  try {
    return await db.avatar.create({
      data: avatarData,
    });
  } catch (error) {
    console.error("Error in createAvatar:", error);
    return null;
  }
};

export const updateAvatarById = async (
  avatar_id: string,
  avatarData: Prisma.avatarUpdateInput
) => {
  try {
    return await db.avatar.update({
      where: { avatar_id },
      data: avatarData,
    });
  } catch (error) {
    console.error("Error in updateAvatarById:", error);
    return null;
  }
};

export const deleteAvatarById = async (avatar_id: string) => {
  try {
    return await db.avatar.delete({
      where: { avatar_id },
    });
  } catch (error) {
    console.error("Error in deleteAvatarById:", error);
    return null;
  }
};

export const changeAvatarStatusById = async (avatar_id: string) => {
  try {
    const session = await auth();
    if (!session) {
      return null;
    }
    const res = await db.avatar.findFirst({
      where: {
        gg_id: session.user.gg_id,
        isactive: true,
      },
    });
    if (res) {
      await db.avatar.update({
        where: {
          avatar_id: res.avatar_id,
        },
        data: {
          isactive: false,
        },
      });
    }

    return await db.avatar.update({
      where: {
        avatar_id: avatar_id,
      },
      data: {
        isactive: true,
      },
    });
  } catch (error) {
    console.error("Error in changeAvatarStatusById:", error);
    return null;
  }
};
