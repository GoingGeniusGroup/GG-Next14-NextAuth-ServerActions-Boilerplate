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
      <div className="relative size-full">
        <div
          className="px-4 pb-4 h-full relative overflow-hidden scroll-container"
          style={{ scrollBehavior: "smooth" }}
        >
          {children}
        </div>
      </div>
    </PublicAvatarProvider>
  );
}
