"use server";

import { avatar_response, response } from "@/types/utils";
import {
  changeAvatarStatusById,
  createAvatar,
  deleteAvatarById,
  getAvatarsByUserId,
  updateAvatarById,
} from "@/services/avatar";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Response } from "@/types";

const avatarSchema = z.object({
  avatar_url: z.string().url(),
});

export const addAvatar = async (avatar_url: string) => {
  const session = await auth();
  if (!session?.user?.gg_id) {
    return avatar_response({
      success: false,
      error: {
        code: 401,
        message: "Unauthorized",
      },
    });
  }

  const validatedFields = avatarSchema.safeParse({ avatar_url });

  if (!validatedFields.success) {
    return avatar_response({
      success: false,
      error: {
        code: 422,
        message: "Invalid avatar URL.",
      },
    });
  }

  const newAvatar = await createAvatar({
    users: { connect: { gg_id: session.user.gg_id } },
    avatar_url: validatedFields.data.avatar_url,
  });

  if (!newAvatar) {
    return avatar_response({
      success: false,
      error: {
        code: 500,
        message: "Failed to create avatar.",
      },
    });
  }

  return avatar_response({
    success: true,
    code: 201,
    message: "Avatar created successfully.",
    data: newAvatar,
  });
};

export const updateAvatar = async (avatar_id: string, avatar_url: string) => {
  const validatedFields = avatarSchema.safeParse({ avatar_url });

  if (!validatedFields.success) {
    return avatar_response({
      success: false,
      error: {
        code: 422,
        message: "Invalid avatar URL.",
      },
    });
  }

  const updatedAvatar = await updateAvatarById(avatar_id, {
    avatar_url: validatedFields.data.avatar_url,
  });

  if (!updatedAvatar) {
    return avatar_response({
      success: false,
      error: {
        code: 500,
        message: "Failed to update avatar.",
      },
    });
  }

  return avatar_response({
    success: true,
    code: 200,
    message: "Avatar updated successfully.",
    data: updatedAvatar,
  });
};

export const deleteAvatar = async (avatar_id: string) => {
  const deletedAvatar = await deleteAvatarById(avatar_id);

  if (!deletedAvatar) {
    return avatar_response({
      success: false,
      error: {
        code: 500,
        message: "Failed to delete avatar.",
      },
    });
  }

  return response({
    success: true,
    code: 200,
    message: "Avatar deleted successfully.",
  });
};

export const getUserAvatars = async (gg_id: string) => {
  const avatars = await getAvatarsByUserId(gg_id);

  if (!avatars) {
    return response({
      success: false,
      error: {
        code: 500,
        message: "Failed to fetch user avatars.",
      },
    });
  }

  return response({
    success: true,
    code: 200,
    message: "User avatars fetched successfully.",
    data: avatars,
  });
};

export const setSelectedUserAvatar = async (avatar_id: string) => {
  const avatar = await changeAvatarStatusById(avatar_id);
  if (!avatar) {
    return response({
      success: false,
      error: {
        code: 500,
        message: "Failed to  update the status.",
      },
    });
  }
  return response({
    success: true,
    code: 200,
    message: "Successfully selected!",
  });
};


type responseAvatarType = Response & {

    data?: {avatar_id: string;
    gg_id: string;
    avatar_url: string | null;

    }
}
export const getSelectedUserAvatar = async (
  isU: boolean = true,
  userId?: string
): Promise<responseAvatarType | null> => {
  const session = await auth();
  const gg_id = isU ? session?.user.gg_id : userId;

  if (!gg_id) {
    return null;
  }
  try {
    const avatar = await db.avatar.findFirst({
      where: {
        gg_id: gg_id,
        isactive: true,
      },
      select: {
        avatar_id: true,
      },
    });

    if (!avatar) {
      return response({
        success: false,
        error: {
          code: 500,
          message: "Failed to  fetch the status.",
        },
      });
    }
    return {
      success: true,
      code: 200,
      message: "Successfully fetched!",
      data: avatar,
    };
  } catch (error) {
    return response({
      success: false,
      error: {
        code: 500,
        message: "Failed to  update the status.",
      },
    });
  }
};
