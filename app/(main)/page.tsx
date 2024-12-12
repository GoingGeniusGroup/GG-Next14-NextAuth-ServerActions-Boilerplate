import { getCurrentUser } from "@/actions/genius-profile/userAndGuild";
import HomePage from "@/components/comp/HomePage/HomePage";
import { getUserByUsername } from "@/services/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

const staticUsernames = [
  "haleatus",
  "satkar",
  "gglama",
  "ramu",
  "gg.yush",
  "rohit",
];

export default async function Home() {
  const user = await getCurrentUser();

  // Fetch all static users whose usernames are in the list
  const staticUsers = await Promise.all(
    staticUsernames.map(async (username) => {
      const user = await getUserByUsername(username);
      return {
        username: user?.username || "guest",
        firstName: user?.first_name || "Unknown",
        role: user?.role || "User",
        image: user?.image || "/default-avatar.png",
      };
    })
  );

  const profilePic = user?.image || "";

  return (
    <HomePage user={user} profilePic={profilePic} staticUsers={staticUsers} />
  );
}
