"use cache";
import GeniusUserHome from "@/src/components/GeniusUserProfile/GeniusUserHome";
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
      {/* <GeniusUserHome username={username} /> */}
      <ProfilePageServer username={username} />
    </>
  );
}
