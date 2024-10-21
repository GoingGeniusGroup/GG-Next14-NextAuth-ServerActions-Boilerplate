"use client";

import { ProfileForm } from "@/components/form/profile-form";
import { ExtendedUser } from "@/types/next-auth";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const [user, setUser] = useState<ExtendedUser | null>(null);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user as ExtendedUser);
    }
  }, [session]);

  const handleProfileUpdate = async (updatedUser: ExtendedUser) => {
    setUser(updatedUser);
    await updateSession({ user: updatedUser });
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="border rounded-lg shadow-lg shadow-black/40 p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Profile Settings
        </h2>
        <ProfileForm user={user} onProfileUpdate={handleProfileUpdate} />
      </div>
    </div>
  );
}
