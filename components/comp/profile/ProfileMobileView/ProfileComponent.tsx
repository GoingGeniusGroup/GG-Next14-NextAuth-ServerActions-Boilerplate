"use client";

import React, { useState, useCallback } from "react";
import { ProfileForm } from "@/components/form/profile-form";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";
import { User as NextAuthUser } from "next-auth";

// Define a new type that extends the NextAuth User type
export type ExtendedUser = NextAuthUser & {
  gg_id: string;
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

export default function ProfileComponent() {
  const { data: session, update: updateSession } = useSession();

  // Ensure we cast the session user to ExtendedUser properly
  const [user, setUser] = useState<ExtendedUser | undefined>(
    session?.user as ExtendedUser
  );

  const handleProfileUpdate = useCallback(
    async (updatedUser: ExtendedUser) => {
      setUser(updatedUser);
      await updateSession({ user: updatedUser as NextAuthUser }); // Cast back to NextAuthUser for updateSession
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
