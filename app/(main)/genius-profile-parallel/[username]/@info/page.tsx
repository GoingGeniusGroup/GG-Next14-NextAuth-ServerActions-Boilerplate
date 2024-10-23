import GeniusUserHome from "@/components/layouts/GeniusUserProfile/GeniusUserHome";

interface ProfileViewProps {
  params: {
    username: string;
  };
}

export default function GeniusUserInfo({ params }: ProfileViewProps) {
  const username = params.username;
  return (
    <>
      <GeniusUserHome username={username} />
    </>
  );
}
