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
      <h1>Profile Setting </h1>
      <div className="overflow-y-auto h-[90%]">
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
