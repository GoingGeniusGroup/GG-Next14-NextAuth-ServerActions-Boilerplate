"use server";

import { getUserByUsername as getUserByUsernameService } from "@/app/services/user";
import { getAvatarsByUserId as getAvatarsByUserIdService } from "@/app/services/avatar";

export const getUserByUsernameAction = async (username: string) => {
  try {
    const user = await getUserByUsernameService(username);
    return user;
  } catch (error) {
    console.error("Error in getUserByUsernameAction:", error);
    return null;
  }
};

export const getAvatarsByUserIdAction = async (gg_id: string) => {
  try {
    const avatars = await getAvatarsByUserIdService(gg_id);
    return avatars;
  } catch (error) {
    console.error("Error in getAvatarsByUserIdAction:", error);
    return null;
  }
};
