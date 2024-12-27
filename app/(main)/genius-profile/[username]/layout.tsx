"use client";
"use cache";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { PublicAvatarProvider } from "@/src/components/comp/AvatarManager/provider/AvatarManagerPublicContext";
import { Button } from "@/src/ui/button";

import CustomToolTip from "@/src/components/comp/CustomComponents/CustomToolTip";

interface GeniusProfileLayoutProps {
  children: ReactNode;
  params: {
    username: string;
  };
}

export default function GeniusProfileLayout({
  children,
  params,
}: GeniusProfileLayoutProps) {
  const { username } = params;

  return (
    <PublicAvatarProvider username={username}>
      <div className="relative size-full rounded-lg">{children}</div>
    </PublicAvatarProvider>
  );
}
