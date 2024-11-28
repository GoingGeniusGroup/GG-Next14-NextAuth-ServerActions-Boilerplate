"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { PublicAvatarProvider } from "@/components/comp/AvatarManager/provider/AvatarManagerPublicContext";
import { Button } from "@/components/ui/button";
import DragCloseDrawer from "@/components/comp/CustomComponents/DragCloseDrawer";

// Define the expected props for the component
interface GeniusProfileLayoutProps {
  userinfo: ReactNode;
  children: ReactNode;
  otherroutes: ReactNode;
  params: {
    username: string;
  };
}

export default function GeniusProfileLayout({
  userinfo,
  children,
  params,
  otherroutes,
}: GeniusProfileLayoutProps) {
  const { username } = params;
  const pathname = usePathname();

  const isGalleryOrProjects =
    pathname.includes("/gallery") || pathname.includes("/projects");

  const [open, setOpen] = useState(false);

  return (
    <PublicAvatarProvider username={username}>
      <div className="relative size-full">
        <div className="flex h-full gap-x-3 text-black dark:text-white">
          <div className="flex-1 border-2 rounded-lg w-full mx-[69px] overflow-hidden transition-transform duration-300 ease-in-out">
            <div
              key={pathname}
              className="px-4 pb-4 pt-8 h-full relative overflow-hidden scroll-container"
              style={{ scrollBehavior: "smooth" }}
            >
              {userinfo}

              <DragCloseDrawer open={open} setOpen={setOpen} isGoBack={true}>
                {isGalleryOrProjects && (
                  <div className="px-4 py-8">
                    <Button onClick={() => history.back()} className="mb-4">
                      Back
                    </Button>
                    {otherroutes}
                  </div>
                )}
              </DragCloseDrawer>
              {!isGalleryOrProjects && (
                <div className="absolute bottom-0 flex space-x-4 mb-4">
                  <Button asChild onClick={() => setOpen(true)}>
                    <Link href={`/genius-profile-2/${username}/gallery`}>
                      Gallery
                    </Link>
                  </Button>
                  <Button asChild onClick={() => setOpen(true)}>
                    <Link href={`/genius-profile-2/${username}/projects`}>
                      Projects
                    </Link>
                  </Button>
                </div>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
    </PublicAvatarProvider>
  );
}
