import { Suspense } from "react";
import ProfilePageServer from "@/app/_components/genius-profile/profile-page-server";
import ProfileSkeleton from "./loading";
import { getUserByUsername } from "@/app/services/user";

interface GeniusUserInfoProps {
  params: {
    username: string;
  };
}

// Add this component for the "User not found" state
export const UserNotFound = ({ username }: { username: string }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-3xl font-bold mb-4 text-red-500">User Not Found</h1>
      <p className="text-xl mb-8">
        Sorry, we couldn&apos;t find a user with the username &quot;{username}
        &quot;
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-black rounded-lg hover:bg-black/40 transition-colors"
      >
        Return Home
      </a>
    </div>
  );
};

export default async function GeniusUserProfile({
  params,
}: GeniusUserInfoProps) {
  const { username } = params;

  // Check if user exists before rendering the profile
  const userExists = await getUserByUsername(username);

  if (!userExists) {
    return <UserNotFound username={username} />;
  }

  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfilePageServer username={username} />
    </Suspense>
  );
}
