"use client";

import React from "react";
import { ProfileForm } from "@/components/form/profile-form";
import { useSession } from "next-auth/react";

export default function ProfileComponent() {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="size-full">
      <h1 className="sticky top-0 uppercase font-bold text-xl flex justify-center mb-7 p-2 z-20 bg-white/40 backdrop-blur-md rounded-md">
        Profile
      </h1>
      <ProfileForm user={user} />
    </div>
  );
}
