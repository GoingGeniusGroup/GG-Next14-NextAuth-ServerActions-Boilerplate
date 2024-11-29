import GeniusUserHome from "@/components/comp/GeniusUserProfile/GeniusUserHome";

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
