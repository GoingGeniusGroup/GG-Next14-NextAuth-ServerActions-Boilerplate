"use client";
import { ReactNode, use } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { PublicAvatarProvider } from "@/src/components/comp/AvatarManager/provider/AvatarManagerPublicContext";
import { Button } from "@/src/ui/button";

import CustomToolTip from "@/src/components/comp/CustomComponents/CustomToolTip";

interface GeniusProfileLayoutProps {
  children: ReactNode;
  params: Promise<{
    username: string;
  }>;
}

export default function GeniusProfileLayout(props: GeniusProfileLayoutProps) {
  const params = use(props.params);

  const {
    children
  } = props;

  const { username } = params;

  return (
    <PublicAvatarProvider username={username}>
      <div className="relative size-full rounded-lg">{children}</div>
    </PublicAvatarProvider>
  );
}
