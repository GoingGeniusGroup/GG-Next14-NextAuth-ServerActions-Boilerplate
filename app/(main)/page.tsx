import { getCurrentUser } from "@/actions/userAndGuild";
import HomePage from "@/components/comp/HomePage/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const user = await getCurrentUser();
  const profilePic = user?.image || "";
  return <HomePage user={user} profilePic={profilePic} />;
}
