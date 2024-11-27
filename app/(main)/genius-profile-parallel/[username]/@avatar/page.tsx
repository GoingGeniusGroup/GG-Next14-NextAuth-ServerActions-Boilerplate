import { getUserAvatars } from "@/actions/avatar";
import { getCurrentUser } from "@/actions/userAndGuild";
import AvatarManagerClientProfile from "@/components/comp/AvatarManager/avatar-manager-client-profile";
import {
  AvatarType,
  PublicAvatarProvider,
} from "@/components/comp/AvatarManager/provider/AvatarManagerPublicContext";
import PublicAvatarManagerClientProfile from "@/components/comp/AvatarManager/public-avatar-manager-client-profile";
import GeniusUserAvatar from "@/components/comp/GeniusUserProfile/GeniusUserAvatar";
import { getUserByUsername } from "@/services/user";

interface AvatarSectionProps {
  params: {
    username: string;
  };
}

export default async function AvatarSection({ params }: AvatarSectionProps) {
  const { username } = params;

  const currentUser = await getCurrentUser();

  const LoggedUserProfile = currentUser?.username === username;

  const profileOwner = await getUserByUsername(username);

  if (LoggedUserProfile) {
    return (
      <>
        <div className="relative w-[620px] h-[510px] flex justify-center flex-col z-40">
          <AvatarManagerClientProfile
            fov={35}
            cameraInitialDistance={5}
            cameraTarget={0}
          />
        </div>
      </>
    );
  } else if (profileOwner) {
    const avatarsResponse = await getUserAvatars(profileOwner.gg_id);
    const avatars: AvatarType[] =
      avatarsResponse.success && Array.isArray(avatarsResponse.data)
        ? avatarsResponse.data
        : [];
    return (
      <>
        <PublicAvatarProvider initialAvatars={avatars}>
          <div className="relative w-[620px] h-[510px] flex justify-center flex-col z-40">
            <PublicAvatarManagerClientProfile
              fov={35}
              cameraInitialDistance={5}
              cameraTarget={0}
            />
          </div>
        </PublicAvatarProvider>
      </>
    );
  }
}
