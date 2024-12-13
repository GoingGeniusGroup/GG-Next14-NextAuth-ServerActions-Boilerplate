import { getCurrentUser } from "@/actions/genius-profile/userAndGuild";
import AvatarManagerClientProfile from "@/src/components/comp/AvatarManager/avatar-manager-client-profile";
import PublicAvatarManagerClientProfile from "@/src/components/comp/AvatarManager/public-avatar-manager-client-profile";
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
    return (
      <>
        <div className="relative w-[620px] h-[510px] flex justify-center flex-col z-40">
          <PublicAvatarManagerClientProfile
            fov={35}
            cameraInitialDistance={5}
            cameraTarget={0}
            user={profileOwner}
          />
        </div>
      </>
    );
  }
}
