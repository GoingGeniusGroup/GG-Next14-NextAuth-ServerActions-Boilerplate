import GeniusUserHome from "@/src/components/GeniusUserProfile/GeniusUserHome";

interface GeniusUserInfoProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function GeniusUserInfo(props: GeniusUserInfoProps) {
  const params = await props.params;
  const { username } = params;
  return (
    <>
      <GeniusUserHome username={username} />
    </>
  );
}
