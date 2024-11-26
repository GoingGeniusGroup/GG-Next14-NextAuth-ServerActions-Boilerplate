import GeniusUserHome from "@/components/comp/GeniusUserProfile/GeniusUserHome";

interface ProfileViewProps {
  params: {
    username: string;
  };
}

export default function GeniusProfilePage({ params }: ProfileViewProps) {
  const username = params.username;
  return (
    <div>
      <GeniusUserHome username={username} />
    </div>
  );
}
