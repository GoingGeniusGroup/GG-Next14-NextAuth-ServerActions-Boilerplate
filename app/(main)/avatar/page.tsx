'use client'
import AvatarManager from '@/components/comp/AvatarManager/avatar-manager';
import { ExtendedUser } from "@/types/next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { data: session} = useSession();
  const [user, setUser] = useState<ExtendedUser | null>(null);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user as ExtendedUser);
    }
  }, [session]);

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <AvatarManager />
    </div>
  )
}