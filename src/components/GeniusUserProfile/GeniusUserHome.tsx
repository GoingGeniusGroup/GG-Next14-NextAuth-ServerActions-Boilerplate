import { getCurrentUser } from "@/actions/genius-profile/userAndGuild";
import AboutSectionProfile from "../comp/console/AboutSectionProfile";
import BottomSection from "../comp/console/BottomSection";
import { getUserByUsername } from "@/services/user";
import AvatarManagerClientProfile from "../comp/AvatarManager/avatar-manager-client-profile";
import PublicAvatarManagerClientProfile from "../comp/AvatarManager/public-avatar-manager-client-profile";

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
        <div className="w-full lg:w-[415px] z-10 order-3 lg:order-1 relative">
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
            <>
              <div className="relative z-20 h-[300px] md:h-[400px] lg:h-[510px] lg:ml-10">
                <AvatarManagerClientProfile
                  fov={40}
                  cameraInitialDistance={5}
                  cameraTarget={0}
                />
              </div>
              <div className="absolute top-20 uppercase text-4xl font-bold z-0">
                {currentUser.username}
              </div>
            </>
          ) : (
            <>
              <PublicAvatarManagerClientProfile
                fov={40}
                cameraInitialDistance={5}
                cameraTarget={0}
                user={user}
              />
              <div className="absolute top-0">{profileOwner.username}</div>
            </>
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
