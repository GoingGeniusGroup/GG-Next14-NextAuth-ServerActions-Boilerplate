'use server';

import { signIn } from "@/auth";

export async function loginAction(userId: string) {
  try {
    const result = await signIn("credentials", {
      userId,
      redirect: false
    });

    return { success: true, result };
  } catch (error) {
    console.error("Server action login error", error);
    return { success: false, error };
  }
}