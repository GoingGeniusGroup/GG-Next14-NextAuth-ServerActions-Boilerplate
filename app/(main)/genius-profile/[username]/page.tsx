"use cache";

import ProfilePageServer from "@/app/_components/genius-profile/profile-page-server";

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
    <>
      <ProfilePageServer username={username} />
    </>
  );
}
