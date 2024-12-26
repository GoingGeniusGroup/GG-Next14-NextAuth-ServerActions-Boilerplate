import { getCurrentUser } from "@/actions/genius-profile/userAndGuild";
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
    <div className="container mx-auto px-4 overflow-y-auto overflow-x-hidden h-full">
      <div className="relative flex flex-col lg:flex-row w-full justify-between gap-8">
        {/* Left Section */}
        <div className="w-full lg:w-[415px] z-10 order-3 lg:order-1">
          <AboutSectionProfile
            userInfo={LoggedUserProfile ? currentUser : profileOwner}
            ifOwnProfile={LoggedUserProfile}
          />
        </div>

        {/* Center Section - Avatar */}
        <div
          className="w-full h-[300px] md:h-[400px] lg:h-[510px] 
                      lg:absolute lg:inset-0 flex justify-center items-center 
                      order-1 lg:order-2 z-0"
        >
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

        {/* Right Section */}
        <div className="w-full lg:w-[415px] z-10 order-2 lg:order-3">
          <BottomSection
            userInfo={LoggedUserProfile ? currentUser : profileOwner}
            ifOwnProfile={LoggedUserProfile}
          />
        </div>
      </div>
    </div>
  );
}
