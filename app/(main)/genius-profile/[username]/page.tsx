import GeniusUserHome from "@/components/layouts/GeniusUserProfile/GeniusUserHome";

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
