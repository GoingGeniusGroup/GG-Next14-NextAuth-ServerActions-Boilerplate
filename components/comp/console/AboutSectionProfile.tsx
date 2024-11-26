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
import { FaXTwitter } from "react-icons/fa6";
import { FaGgCircle } from "react-icons/fa6";

const socials = [
  {
    name: "Google",
    icon: <FcGoogle size={38} />,
    link: "https://google.com",
  },
  {
    name: "Github",
    icon: <FaGithub color="black" size={38} />,
    link: "https://github.com",
  },
  {
    name: "Steam",
    icon: <FaSteam size={38} color="#1b2838" />,
    link: "https://tiktok.com",
  },
  {
    name: "Instagram",
    icon: <AiFillInstagram size={38} color="#E1306C" />,
    link: "https://instagram.com",
  },
  {
    name: "Facebook",
    icon: <SiFacebook color="#1877f2" size={38} />,
    link: "https://facebook.com",
  },
  {
    name: "LinkedIn",
    icon: <IoLogoLinkedin color="#0a66c2" size={38} />,
    link: "https://linkedin.com",
  },
  {
    name: "Twitter",
    icon: <FaXTwitter color="black" size={38} />,
    link: "https://twitter.com",
  },
  {
    name: "Genius",
    icon: <FaGgCircle size={38} color="#c500c7" />,
    link: "https://genius.com",
  },
];

export default function AboutSectionProfile({ userInfo }: { userInfo: any }) {
  return (
    <>
      {/* Div with user information */}
      <div className="relative flex flex-col gap-4 border p-4 rounded-xl overflow-hidden backdrop-blur-md border-black/10 dark:border-white/10 dark:hover:border-[#FCBB3F]/60 hover:border-sky-500/60 transition-all duration-200 ease-in-out">
        <div className="flex flex-col gap-4">
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
          {/* dialog to open the update profile form */}
          {userInfo && (
            <div className="absolute top-2 right-2 z-40">
              <UpdateProfileDialog
                gg_id={userInfo.gg_id}
                currentFirstName={userInfo.first_name ?? ""}
                currentLastName={userInfo.last_name ?? ""}
                currentAddress={userInfo.address ?? ""}
                currentDescription={userInfo.description ?? ""}
                currentDob={userInfo.dob ? new Date(userInfo.dob) : null}
                currentImage={userInfo.image ?? ""}
                currentCoverImage={userInfo.cover_images ?? ""}
              />
            </div>
          )}
          {/* username */}
          <div className="flex items-center gap-2 text-black dark:text-gray-300">
            <div className="relative size-8 rounded-full overflow-hidden border-2 hover:border-[#FCBB3F]/60">
              <Image
                src={
                  userInfo
                    ? userInfo.image !== ""
                      ? userInfo.image
                      : "/default-pictures/profile.png"
                    : "/default-pictures/profile.png"
                }
                alt="Profile picture"
                fill
                className="object-cover z-0"
                unoptimized
                loading="lazy"
              />
            </div>
            <span className="uppercase font-bold z-10">
              {userInfo ? userInfo.username : "Username"}
            </span>
          </div>
          {/* top section */}
          <div className="relative w-full rounded-md bg-black/10 dark:bg-white/10 hover:dark:bg-white/20 hover:bg-black/20 transition-all duration-300 ease-in-out px-2 py-1 dark:text-white text-black">
            <div className="h-[60px] w-full overflow-auto text-[12px] font-semibold flex flex-col">
              <span>Bio</span>
              <span>{userInfo && userInfo.description}</span>
            </div>
          </div>
        </div>
        <div className="h-[210px] flex items-center justify-center w-full cursor-pointer">
          <SmallPreviewCard userData={userInfo} />
        </div>
      </div>

      {/* Div with achievements */}
      <div className="relative flex border mt-4 p-4 rounded-xl overflow-auto backdrop-blur-md border-black/10 dark:border-white/10 dark:hover:border-[#FCBB3F]/60 hover:border-sky-500/60 transition-all duration-200 ease-in-out">
        <Carousel className="w-full max-w-sm">
          <CarouselContent className="-ml-1">
            {socials.map((social, index) => (
              <CarouselItem key={index} className="pl-1 basis-1/6">
                <Card>
                  <div className="flex size-[52px] bg-gray-300 rounded-full items-center justify-center">
                    <div className="size-full flex justify-center items-center">
                      {social.icon}
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}
