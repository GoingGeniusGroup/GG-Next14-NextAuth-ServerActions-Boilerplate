import GeniusUserHome from "@/src/components/GeniusUserProfile/GeniusUserHome";

interface ProfileViewProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function DefaultGeniusUserInfo(props: ProfileViewProps) {
  const params = await props.params;
  const username = params.username;
  return (
    <>
      <GeniusUserHome username={username} />
    </>
  );
}
