import { Suspense } from "react";
import ProfilePageServer from "@/app/_components/genius-profile/profile-page-server";
import ProfileSkeleton from "./loading";
import { getUserByUsername } from "@/app/services/user";
import UserNotFound from "@/src/components/genius-profile-v2/user-not-found";

interface GeniusUserInfoProps {
  params: {
    username: string;
  };
}

export default async function GeniusUserProfile({
  params,
}: GeniusUserInfoProps) {
  const { username } = params;

  // Check if user exists before rendering the profile
  const userExists = await getUserByUsername(username);

  if (!userExists) {
    return <UserNotFound username={username} />;
  }

  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfilePageServer username={username} />
    </Suspense>
  );
}
