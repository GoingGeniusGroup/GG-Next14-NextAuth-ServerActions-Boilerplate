import { getCurrentUser } from "@/actions/userAndGuild";
import AboutSectionProfile from "../console/AboutSectionProfile";
import BottomSection from "../console/BottomSection";
import { getUserByUsername } from "@/services/user";
import AvatarManagerClientProfile from "../AvatarManager/avatar-manager-client-profile";
import PublicAvatarManagerClientProfile from "../AvatarManager/public-avatar-manager-client-profile";

async function getUserWithUsername(username: string) {
  const user = await getUserByUsername(username);
  return user;
}

export default async function GeniusUserHome({
  username,
}: {
  username: string;
}) {
  const currentUser = await getCurrentUser();

  const LoggedUserProfile = currentUser?.username === username;

  const profileOwner = await getUserByUsername(username);

  const user = await getUserWithUsername(username);

  if (!profileOwner || !currentUser) {
    return <div>User with this username not found</div>;
  }

  return (
    <>
      <div className="relative flex w-full justify-between">
        <div className="w-[33%] px-4 z-10">
          <AboutSectionProfile
            userInfo={LoggedUserProfile ? currentUser : profileOwner}
            ifOwnProfile={LoggedUserProfile}
          />
        </div>
        <div className="absolute inset-0 w-full h-[510px] flex justify-center flex-col z-0">
          {LoggedUserProfile ? (
            <AvatarManagerClientProfile
              fov={40}
              cameraInitialDistance={5}
              cameraTarget={0}
            />
          ) : (
            <PublicAvatarManagerClientProfile
              fov={40}
              cameraInitialDistance={5}
              cameraTarget={0}
              user={user}
            />
          )}
        </div>
        <div className="w-[33%] px-4">
          {/* Projects Grid */}
          <BottomSection
            userInfo={LoggedUserProfile ? currentUser : profileOwner}
            ifOwnProfile={LoggedUserProfile}
          />
        </div>
      </div>
    </>
  );
}
