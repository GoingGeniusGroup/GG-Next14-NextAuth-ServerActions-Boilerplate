"use client";

import UpdateProfileDialog from "../Modal/profile/UpdateProfileDialog";
import Image from "next/image";
import SmallPreviewCard from "../card/SmallPreviewCard";
import UpdateCoverPhotoDialog from "../Modal/profile/UpdateCoverPhotoDialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel/carousel";
import { Card } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaSteam } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import SocialMediaDialog from "../GeniusUserProfile/Info/SocialMediaDialog";
import { RiShareLine } from "react-icons/ri";
import { LiaQrcodeSolid } from "react-icons/lia";
import { Button as MovingBorderButton } from "@/components/ui/border/moving-border";
import { socialType } from "@prisma/client";
import { useRef, useState } from "react";
import CustomToolTip from "../CustomComponents/CustomToolTip";

type socialvalueType = {
  name: socialType;
  icon: JSX.Element;
  link: string;
};

const socials: socialvalueType[] = [
  {
    name: socialType.GOOGLE,
    icon: <FcGoogle size={38} />,
    link: "https://google.com",
  },
  {
    name: socialType.GITHUB,
    icon: <FaGithub color="black" size={38} />,
    link: "https://github.com",
  },
  {
    name: socialType.STEAM,
    icon: <FaSteam size={38} color="#1b2838" />,
    link: "https://tiktok.com",
  },
  {
    name: socialType.INSTAGRAM,
    icon: <AiFillInstagram size={38} color="#E1306C" />,
    link: "https://instagram.com",
  },
  {
    name: socialType.FACEBOOK,
    icon: <SiFacebook color="#1877f2" size={38} />,
    link: "https://facebook.com",
  },
  {
    name: socialType.LINKDN,
    icon: <IoLogoLinkedin color="#0a66c2" size={38} />,
    link: "https://linkedin.com",
  },
];

export default function AboutSectionProfile({
  userInfo,
  ifOwnProfile,
}: {
  userInfo: any | null;
  ifOwnProfile: boolean;
}) {
  let ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  return (
    <>
      {/* Share and QR code buttons */}
      <div
        ref={ref}
        className="relative flex flex-col gap-4 border p-4 rounded-lg backdrop-blur-md border-black/10 dark:border-white/10 dark:hover:border-[#FCBB3F]/60 hover:border-sky-500/60 transition-all duration-200 ease-in-out"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="absolute top-2 right-2 z-40 flex gap-2">
          {ifOwnProfile && (
            <>
              {hovered && (
                <div className="flex gap-2 transition-all duration-300">
                  <UpdateCoverPhotoDialog
                    gg_id={userInfo.gg_id}
                    currentCoverImage={userInfo.cover_images?.[0] ?? ""}
                  />
                  <UpdateProfileDialog
                    gg_id={userInfo.gg_id}
                    currentFirstName={userInfo.first_name ?? ""}
                    currentLastName={userInfo.last_name ?? ""}
                    currentAddress={userInfo.address ?? ""}
                    currentDescription={userInfo.description ?? ""}
                    currentDob={userInfo.dob ? new Date(userInfo.dob) : null}
                    currentImage={userInfo.image ?? ""}
                  />
                </div>
              )}
            </>
          )}

          <div className="group">
            <MovingBorderButton
              borderRadius="1.75rem"
              className="bg-gray-200 size-10 dark:bg-black text-black dark:text-white hover:text-yellow-600 transition-colors duration-300 border-neutral-200 dark:border-slate-800"
            >
              <LiaQrcodeSolid size={22} />
            </MovingBorderButton>

            <CustomToolTip content="Share QR" />
          </div>

          <div className="group">
            <MovingBorderButton
              borderRadius="1.75rem"
              className="bg-gray-200 size-10 dark:bg-black text-black dark:text-white hover:text-yellow-600 transition-colors duration-300 border-neutral-200 dark:border-slate-800"
            >
              <RiShareLine size={22} />
            </MovingBorderButton>
            <CustomToolTip content="Share Profile" />
          </div>
        </div>
        {/* User profile content */}
        <div className="flex flex-col gap-4">
          <Image
            src={
              userInfo.cover_images && userInfo.cover_images.length > 0
                ? userInfo.cover_images[0]
                : "/default-pictures/cover-image.png"
            }
            alt="Cover picture"
            fill
            className="object-cover rounded-lg"
            unoptimized
            loading="lazy"
          />
          <div className="absolute inset-0 bg-white/30 dark:bg-black/30 rounded-lg"></div>

          {/* Username */}
          <div className="flex items-center gap-2 text-black dark:text-gray-300">
            <div className="relative size-8 rounded-full overflow-hidden border-2 hover:border-[#FCBB3F]/60">
              <Image
                src={userInfo.image || "/default-pictures/profile.png"}
                alt="Profile picture"
                fill
                className="object-cover z-0"
                unoptimized
                loading="lazy"
              />
            </div>
            <span className="uppercase font-bold z-10">
              {userInfo.username || "Username"}
            </span>
          </div>

          {/* Bio section */}
          <div className="relative w-full rounded-md bg-white/10 dark:bg-black/10 hover:dark:bg-black/20 hover:bg-white/20 transition-all duration-300 ease-in-out px-2 py-1 dark:text-white text-black">
            <div className="h-[60px] w-full overflow-auto text-[12px] font-semibold flex flex-col">
              <span>{userInfo.description || "No description available"}</span>
            </div>
          </div>
        </div>

        {/* Preview card */}
        <div className="h-[210px] flex items-center justify-center w-full cursor-pointer">
          <SmallPreviewCard userData={userInfo} />
        </div>
      </div>

      {/* Social media carousel */}
      <div className="relative flex border mt-4 p-4 rounded-xl overflow-auto backdrop-blur-md border-black/10 dark:border-white/10 dark:hover:border-[#FCBB3F]/60 hover:border-sky-500/60 transition-all duration-200 ease-in-out">
        <Carousel className="w-full max-w-sm">
          <CarouselContent className="-ml-1">
            {socials.map((social, index) => (
              <CarouselItem key={index} className="pl-1 basis-1/6">
                <Card>
                  <SocialMediaDialog
                    social={social}
                    ifOwnProfile={ifOwnProfile}
                    userId={userInfo.gg_id}
                  />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}
