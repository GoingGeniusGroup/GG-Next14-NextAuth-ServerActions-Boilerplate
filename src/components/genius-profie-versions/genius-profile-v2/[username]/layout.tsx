"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { PublicAvatarProvider } from "@/src/components/comp/AvatarManager/provider/AvatarManagerPublicContext";
import { Button } from "@/src/ui/button";
import DragCloseDrawer from "@/src/components/comp/CustomComponents/DragCloseDrawer";

import CustomToolTip from "@/src/components/comp/CustomComponents/CustomToolTip";
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

  const [open, setOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  const isGalleryOrProjects =
    pathname.includes("/gallery") || pathname.includes("/projects");

  useEffect(() => {
    if (isGalleryOrProjects && !hasAutoOpened) {
      const timer = setTimeout(() => {
        setOpen(true);
        setHasAutoOpened(true);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isGalleryOrProjects, hasAutoOpened]);

  return (
    <PublicAvatarProvider username={username}>
      <div className="relative size-full">
        <div className="flex h-full gap-x-3 text-black dark:text-white">
          <div className="flex-1 border-2 rounded-lg w-full md:mx-[69px] overflow-hidden transition-transform duration-300 ease-in-out">
            <div
              key={pathname}
              className="px-4 pb-4 pt-8 h-full relative overflow-hidden scroll-container"
              style={{ scrollBehavior: "smooth" }}
            >
              {userinfo}
              <div
                className={`absolute -bottom-2 z-40 left-1/2 -translate-x-1/2 flex space-x-4 mb-4 transition-all duration-300 ease-in-out`}
              >
                <ul className="relative mx-auto flex w-fit gap-1 rounded-full bg-black/20 dark:bg-white/20 p-1">
                  <Link
                    href={`/genius-profile/${username}/gallery`}
                    className="group"
                  >
                    <Button
                      className={`rounded-full size-[32px] flex justify-center items-center bg-gray-200 dark:bg-white text-black hover:bg-black hover:text-white transition-color duration-300 ease-in-out `}
                      onClick={() => setOpen(true)}
                    >
                      <span
                        className={`${
                          isGalleryOrProjects && pathname.includes("gallery")
                            ? "animate-pulse text-sky-500"
                            : ""
                        }`}
                      >
                        G
                      </span>
                    </Button>
                    <CustomToolTip content="Gallery" />
                  </Link>
                  <Link
                    href={`/genius-profile/${username}/projects`}
                    className="group"
                  >
                    <Button
                      className={`rounded-full size-[32px] flex justify-center items-center bg-gray-200 dark:bg-white text-black hover:bg-black hover:text-white transition-color duration-300 ease-in-out`}
                      onClick={() => setOpen(true)}
                    >
                      <span
                        className={`${
                          isGalleryOrProjects && pathname.includes("projects")
                            ? "animate-pulse text-sky-500"
                            : ""
                        }`}
                      >
                        P
                      </span>
                    </Button>
                    <CustomToolTip content="Projects" />
                  </Link>
                </ul>
              </div>

              <DragCloseDrawer open={open} setOpen={setOpen}>
                {isGalleryOrProjects && (
                  <div className="w-full">
                    <div
                      className={`sticky top-0 z-50 flex justify-center transition-all duration-300 ease-in-out`}
                    >
                      <ul className="relative mx-auto flex w-fit gap-1 rounded-full bg-white/20 p-1">
                        <Link
                          href={`/genius-profile/${username}/gallery`}
                          className="group"
                        >
                          <Button
                            className={`rounded-full size-[32px] flex justify-center items-center transition-color duration-300 ease-in-out ${
                              pathname.includes("gallery")
                                ? "bg-black text-white hover:bg-white hover:text-black "
                                : "bg-white text-black hover:bg-black hover:text-white"
                            }`}
                          >
                            G
                          </Button>
                          <CustomToolTip content="Gallery" />
                        </Link>
                        <Link
                          href={`/genius-profile/${username}/projects`}
                          className="group"
                        >
                          <Button
                            className={`rounded-full size-[32px] flex justify-center items-center transition-color duration-300 ease-in-out ${
                              pathname.includes("projects")
                                ? "bg-black text-white hover:bg-white hover:text-black "
                                : "bg-white text-black hover:bg-black hover:text-white"
                            }`}
                          >
                            P
                          </Button>
                          <CustomToolTip content="Projects" />
                        </Link>
                      </ul>
                    </div>
                    <div className="px-20">{otherroutes}</div>
                  </div>
                )}
              </DragCloseDrawer>

              {children}
            </div>
          </div>
        </div>
      </div>
    </PublicAvatarProvider>
  );
}
