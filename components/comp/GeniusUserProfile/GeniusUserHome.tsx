import { getCurrentUser } from "@/actions/userAndGuild";
import AboutSectionProfile from "../console/AboutSectionProfile";
import BottomSection from "../console/BottomSection";
import { getUserByUsername } from "@/services/user";

export default async function GeniusUserHome({
  username,
}: {
  username: string;
}) {
  const currentUser = await getCurrentUser();

  const LoggedUserProfile = currentUser?.username === username;

  const profileOwner = await getUserByUsername(username);

  return (
    <>
      <div className="flex w-full justify-between">
        <div className="w-[33%] px-4">
          <AboutSectionProfile
            userInfo={LoggedUserProfile ? currentUser : profileOwner}
          />
        </div>
        <div className="w-[33%] px-4">
          {/* Projects Grid */}
          <BottomSection
            userInfo={LoggedUserProfile ? currentUser : profileOwner}
          />
        </div>
      </div>
    </>
  );
}
