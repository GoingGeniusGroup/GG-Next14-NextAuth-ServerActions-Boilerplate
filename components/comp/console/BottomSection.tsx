"use client";

import { HoverEffect2 } from "@/components/ui/card/card-hover-effect2";
import SmallPreviewCard from "../card/SmallPreviewCard";
import UpdateCoverPhotoDialog from "../Modal/profile/UpdateCoverPhotoDialog";
import Image from "next/image";

export default function BottomSection({ userInfo }: { userInfo: any }) {
  const newsItems = [
    {
      title: "Project 1",
      image:
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/project_management_coursefees.jpg",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "#",
    },
    {
      title: "Project 2",
      image:
        "https://www.shutterstock.com/image-photo/project-manager-working-on-computer-600nw-2002388855.jpg",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "#",
    },
    {
      title: "Project 3",
      image:
        "https://www.michaelpage.com.au/sites/michaelpage.com.au/files/2022-06/IT%20Project%20Manager.jpg",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "#",
    },
    {
      title: "Project 4",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1qLr3cR3-yr-1UaLFYoIKDw3gl5FJbBjCxA&s",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "#",
    },
  ];

  return (
    <>
      <div className="w-full border relative flex gap-2 p-2 rounded-xl backdrop-blur-md border-black/10 dark:border-white/10 dark:hover:border-[#FCBB3F]/60 hover:border-sky-500/60 transition-all duration-200 ease-in-out overflow-hidden">
        <Image
          src={
            Array.isArray(userInfo?.cover_images) &&
            userInfo?.cover_images.length > 0
              ? userInfo.cover_images[0]
              : "/default-pictures/cover-image.png"
          }
          alt="Cover picture"
          fill
          className="object-cover"
          unoptimized
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30 size-full"></div>
        {userInfo && (
          <div className="absolute top-2 right-2 z-40">
            <UpdateCoverPhotoDialog
              gg_id={userInfo.gg_id}
              currentCoverImage={userInfo.cover_images ?? ""}
            />
          </div>
        )}
        {/* <div className="h-[116px] flex items-center justify-center w-full cursor-pointer">
          <SmallPreviewCard userData={userInfo} />
        </div> */}
      </div>

      <div className="w-full relative border p-2 mt-4 rounded-xl backdrop-blur-md border-black/10 dark:border-white/10 dark:hover:border-[#FCBB3F]/60 hover:border-sky-500/60 transition-all duration-200 ease-in-out">
        <HoverEffect2 items={newsItems} />
      </div>
    </>
  );
}
