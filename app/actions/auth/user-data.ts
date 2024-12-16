import { SerializableUser } from "@/src/core/types/serializable-user";
import { cookies } from "next/headers";

export const getUserData = () => {
  const cookieStore = cookies();
  const userData = cookieStore.get("user_data");

  if (!userData?.value) {
    return null;
  }

  try {
    return JSON.parse(userData.value) as SerializableUser;
  } catch {
    return null;
  }
};
