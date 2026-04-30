"use server";
import { revalidateTag } from "next/cache";

export async function revalidateUser() {
  console.log("Revalidating user cache");
  try {
    // @ts-expect-error - Next 16 revalidateTag currently expects 2 args
    revalidateTag("user");
    console.log("Revalidated successfully");
  } catch (error) {
    console.error("Revalidation error:", error);
  }
}
