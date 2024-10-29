"use client";

import React, { useState, useCallback } from "react";
import { ProfileForm } from "@/components/form/profile-form";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";
import { ExtendedUser } from "@/types/next-auth"; // Import ExtendedUser type

export default function ProfileComponent() {
  const { data: session, update: updateSession } = useSession();
  const [user, setUser] = useState<ExtendedUser | undefined>(session?.user as ExtendedUser);

  const handleProfileUpdate = useCallback(
    async (updatedUser: ExtendedUser) => {
      setUser(updatedUser);
      await updateSession({ user: updatedUser });
    },
    [updateSession]
  );

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="size-full px-2 overflow-y-auto">
      <h1 className="sticky top-0 uppercase font-bold text-xl flex justify-center mb-7 p-2 z-20 bg-white/40 backdrop-blur-md rounded-md">
        Profile
      </h1>
      <ProfileForm user={user} onProfileUpdate={handleProfileUpdate} />
    </div>
  );
}