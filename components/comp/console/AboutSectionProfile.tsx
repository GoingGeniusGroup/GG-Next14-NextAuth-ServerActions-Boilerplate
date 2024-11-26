import {
  Icon360View,
  IconActivityHeartbeat,
  IconMedal,
} from "@tabler/icons-react";
import UpdateProfileDialog from "../Modal/profile/UpdateProfileDialog";
import Image from "next/image";
import SmallPreviewCard from "../card/SmallPreviewCard";
import UpdateCoverPhotoDialog from "../Modal/profile/UpdateCoverPhotoDialog";

export default async function AboutSectionProfile({
  userInfo,
}: {
  userInfo: any;
}) {
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
      <div className="relative flex flex-col gap-4 border mt-4 p-4 rounded-xl backdrop-blur-md border-black/10 dark:border-white/10 dark:hover:border-[#FCBB3F]/60 hover:border-sky-500/60 transition-all duration-200 ease-in-out">
        <div className="gap-2 flex flex-wrap overflow-x-auto w-full">
          <div className="size-12 bg-black/20 dark:bg-white/20 rounded-full text-black dark:text-white">
            <IconMedal className="flex justify-center items-center size-full p-2 text-emerald-500" />
          </div>
          <div className="size-12 bg-black/20 dark:bg-white/20 rounded-full text-black dark:text-white">
            <Icon360View className="flex justify-center items-center size-full p-2 text-purple-600" />
          </div>
          <div className="size-12 bg-black/20 dark:bg-white/20 rounded-full text-black dark:text-white">
            <IconActivityHeartbeat className="flex justify-center items-center size-full p-2 text-red-600" />
          </div>
          <div className="size-12 bg-black/20 dark:bg-white/20 rounded-full text-black dark:text-white">
            <Icon360View className="flex justify-center items-center size-full p-2 text-purple-600" />
          </div>
          <div className="size-12 bg-black/20 dark:bg-white/20 rounded-full text-black dark:text-white">
            <IconActivityHeartbeat className="flex justify-center items-center size-full p-2 text-red-600" />
          </div>
          <div className="size-12 bg-black/20 dark:bg-white/20 rounded-full text-black dark:text-white">
            <Icon360View className="flex justify-center items-center size-full p-2 text-purple-600" />
          </div>
          <div className="size-12 bg-black/20 dark:bg-white/20 rounded-full text-black dark:text-white">
            <IconActivityHeartbeat className="flex justify-center items-center size-full p-2 text-red-600" />
          </div>
          <div className="size-12 bg-black/20 dark:bg-white/20 rounded-full text-black dark:text-white">
            <Icon360View className="flex justify-center items-center size-full p-2 text-purple-600" />
          </div>
          <div className="size-12 bg-black/20 dark:bg-white/20 rounded-full text-black dark:text-white">
            <IconActivityHeartbeat className="flex justify-center items-center size-full p-2 text-red-600" />
          </div>
          <div className="size-12 bg-black/20 dark:bg-white/20 rounded-full text-black dark:text-white">
            <Icon360View className="flex justify-center items-center size-full p-2 text-purple-600" />
          </div>
          <div className="size-12 bg-black/20 dark:bg-white/20 rounded-full text-black dark:text-white">
            <IconActivityHeartbeat className="flex justify-center items-center size-full p-2 text-red-600" />
          </div>
        </div>
      </div>
    </>
  );
}
