import GeniusUserHome from "@/components/comp/GeniusUserProfile/GeniusUserHome";

interface ProfileViewProps {
  params: {
    username: string;
  };
}

export default async function DefaultGeniusUserInfo({
  params,
}: ProfileViewProps) {
  const username = params.username;
  return (
    <>
      <GeniusUserHome username={username} />
    </>
  );
}
