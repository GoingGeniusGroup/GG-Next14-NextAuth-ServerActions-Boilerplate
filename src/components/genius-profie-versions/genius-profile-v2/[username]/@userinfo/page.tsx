import GeniusUserHome from "@/src/components/GeniusUserProfile/GeniusUserHome";

interface GeniusUserInfoProps {
  params: {
    username: string;
  };
}

export default async function GeniusUserInfo({ params }: GeniusUserInfoProps) {
  const { username } = params;
  return (
    <>
      <GeniusUserHome username={username} />
    </>
  );
}
