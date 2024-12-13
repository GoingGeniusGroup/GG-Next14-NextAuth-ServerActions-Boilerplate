'use cache'
import GeniusUserHome from "@/src/components/comp/GeniusUserProfile/GeniusUserHome";
import { getUserByUsername } from "@/services/user";

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
      <GeniusUserHome username={username} />
    </>
  );
}
