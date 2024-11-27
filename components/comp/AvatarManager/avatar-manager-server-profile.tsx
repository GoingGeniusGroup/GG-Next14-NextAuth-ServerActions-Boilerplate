import { getUserAvatars } from "@/actions/avatar";
import { currentUser } from "@/lib/auth";
import AvatarManagerClientProfile from "./avatar-manager-client-profile";

type AvatarType = {
  avatar_id: string;
  avatar_url: string;
};

export default async function AvatarManagerServerProfile() {
  const user = await currentUser();

  if (!user) {
    return <div>Please sign in to manage your avatars.</div>;
  }

  const avatarsResponse = await getUserAvatars(user.gg_id);
  const avatars: AvatarType[] =
    avatarsResponse.success && Array.isArray(avatarsResponse.data)
      ? avatarsResponse.data
      : [];
  return <AvatarManagerClientProfile initialAvatars={avatars} user={user} />;
}
