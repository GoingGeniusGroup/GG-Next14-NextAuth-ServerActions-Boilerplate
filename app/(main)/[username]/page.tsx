import PublicProfile from "@/components/profile/PublicProfile";

interface ProfileViewProps {
  params: {
    username: string;
  };
}

export default function ProfileView({ params }: ProfileViewProps) {
  const username = params.username;
  return (
    <>
      <PublicProfile username={username} />
    </>
  );
}
