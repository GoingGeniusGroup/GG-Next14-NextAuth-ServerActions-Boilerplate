import { getCurrentUser } from "@/actions/userAndGuild";
import AvatarManagerClientProfile from "@/components/comp/AvatarManager/avatar-manager-client-profile";
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
        <div className="relative w-[650px] h-[500px] flex justify-center flex-col z-40">
          <AvatarManagerClientProfile
            fov={35}
            cameraInitialDistance={5}
            cameraTarget={0}
          />
        </div>
      </>
    );
  } else {
    return <GeniusUserAvatar profileOwner={profileOwner} />;
  }
}
