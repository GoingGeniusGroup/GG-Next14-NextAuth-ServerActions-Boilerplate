"use server"

import { auth } from "@/auth";
import { getAvatarsByUserId } from "@/services/avatar";

export async function fetchUserAvatars() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return { error: "Not authenticated" };
  }

  try {
    const avatars = await getAvatarsByUserId(session.user.id);
    return { avatars };
  } catch (error) {
    console.error("Error fetching user avatars:", error);
    return { error: "Failed to fetch avatars" };
  }
}