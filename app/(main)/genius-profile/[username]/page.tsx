"use cache";

import ProfilePageServer from "@/app/_components/genius-profile/profile-page-server";
import { Suspense } from "react";
import ProfileSkeleton from "./loading";

interface GeniusUserInfoProps {
  params: {
    username: string;
  };
}

export default async function GeniusUserProfile({
  params,
}: GeniusUserInfoProps) {
  const { username } = params;
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfilePageServer username={username} />
    </Suspense>
  );
}
