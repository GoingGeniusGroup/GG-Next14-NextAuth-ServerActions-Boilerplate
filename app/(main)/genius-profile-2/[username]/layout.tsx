"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { PublicAvatarProvider } from "@/components/comp/AvatarManager/provider/AvatarManagerPublicContext";
import { Button } from "@/components/ui/button";

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
  const [showOtherRoutes, setShowOtherRoutes] = useState(false);
  const pathname = usePathname();

  const isGalleryOrProjects =
    pathname.includes("/gallery") || pathname.includes("/projects");

  return (
    <PublicAvatarProvider username={username}>
      <div className="relative size-full">
        <div className="flex h-full gap-x-3 text-black dark:text-white">
          <div className="flex-1 border-2 rounded-lg w-full mx-[69px] overflow-hidden transition-transform duration-300 ease-in-out">
            <div
              key={pathname}
              className="px-4 pb-4 pt-8 h-full relative overflow-y-auto scroll-container"
              style={{ scrollBehavior: "smooth" }}
            >
              {userinfo}
              {!isGalleryOrProjects && (
                <div className="flex space-x-4 mb-4">
                  <Button asChild>
                    <Link href={`/genius-profile-2/${username}/gallery`}>
                      Gallery
                    </Link>
                  </Button>
                  <Button asChild>
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
        <AnimatePresence>
          {isGalleryOrProjects && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 bg-background z-40 overflow-y-auto"
            >
              <div className="px-4 py-8">
                <Button onClick={() => history.back()} className="mb-4">
                  Back
                </Button>
                {otherroutes}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PublicAvatarProvider>
  );
}
