import { getCurrentUser } from "@/actions/userAndGuild";
import { getUserByUsername } from "@/services/user";
import {
  Icon360View,
  IconActivityHeartbeat,
  IconMedal,
} from "@tabler/icons-react";
import UpdateProfileDialog from "../Modal/profile/UpdateProfileDialog";
import { calculateAge } from "@/utils/dateFormatter";
import { IconCake } from "@tabler/icons-react";

export default async function AboutSectionProfile({
  username,
}: {
  username: string;
}) {
  const currentUser = await getCurrentUser();

  const LoggedUserProfile = currentUser?.username === username;

  const profileOwner = await getUserByUsername(username);

  const userDob = LoggedUserProfile ? currentUser?.dob : profileOwner?.dob;

  const { age, formattedDob } = calculateAge(userDob ?? null);

  return (
    <>
      {/* Div with user information */}
      <div className="relative flex flex-col gap-4 border p-4 rounded-xl backdrop-blur-md border-black/10 dark:border-white/10 dark:hover:border-[#FCBB3F]/60 hover:border-sky-500/60 transition-all duration-200 ease-in-out">
        <div className="flex flex-col gap-4">
          {/* dialog to open the update profile form */}
          {LoggedUserProfile && currentUser && (
            <div className="absolute top-2 right-2 z-40">
              <UpdateProfileDialog
                gg_id={currentUser.gg_id}
                currentFirstName={currentUser.first_name ?? ""}
                currentLastName={currentUser.last_name ?? ""}
                currentAddress={currentUser.address ?? ""}
                currentDescription={currentUser.description ?? ""}
                currentDob={currentUser.dob ? new Date(currentUser.dob) : null}
              />
            </div>
          )}
          {/* username */}
          <div className="flex items-center text-black dark:text-gray-300">
            <span className="uppercase font-bold">
              {LoggedUserProfile
                ? currentUser?.username
                : profileOwner?.username}
            </span>
          </div>
          {/* top section */}
          <div className="relative w-full rounded-md bg-black/10 dark:bg-white/10 hover:dark:bg-white/20 hover:bg-black/20 transition-all duration-300 ease-in-out px-2 py-1 dark:text-white text-black">
            <div className="flex w-full items-center justify-between">
              <div className="text-[16px] font-bold flex gap-x-1 items-center">
                {LoggedUserProfile ? (
                  <p>
                    {currentUser?.first_name} {currentUser?.last_name}
                  </p>
                ) : (
                  <p>
                    {profileOwner?.first_name} {profileOwner?.last_name}
                  </p>
                )}

                {formattedDob && (
                  <>
                    <span className="text-sm font-semibold">•</span>
                    {age && (
                      <span className="text-sm font-semibold">{age}</span>
                    )}
                  </>
                )}
              </div>
              <div className="text-xs font-semibold flex items-center gap-1">
                {formattedDob && (
                  <>
                    <IconCake size={12} className="text-pink-500" />
                    {formattedDob}
                  </>
                )}
              </div>
            </div>
            <div className="h-[60px] w-full overflow-auto text-[12px] font-semibold">
              {LoggedUserProfile ? (
                <span>{currentUser?.description}</span>
              ) : (
                <span>{profileOwner?.description}</span>
              )}
            </div>
          </div>
          {/* bottom section */}
          <div className="relative w-full rounded-md bg-black/10 dark:bg-white/10 px-2 py-1 hover:dark:bg-white/20 hover:bg-black/20 dark:text-white text-black transition-all duration-300 ease-in-out">
            <p
              className={`text-black dark:text-gray-300 flex justify-between items-center overflow-hidden text-ellipsis whitespace-normal line-clamp-2 font-semibold transition-all duration-500 ease-in-out`}
            >
              <span className="hover-black text-sm dark:hover:text-white cursor-pointer">
                ADDRESS
              </span>
              <span className="text-xs hover-black dark:hover:text-white cursor-pointer">
                {LoggedUserProfile
                  ? currentUser?.address
                  : profileOwner?.address}
              </span>
            </p>

            <p
              className={`text-black dark:text-gray-300 flex justify-between items-center overflow-hidden text-ellipsis whitespace-normal line-clamp-2 font-semibold transition-all duration-300 ease-in-out`}
            >
              <span className="hover-black text-sm dark:hover:text-white cursor-pointer">
                JOINED
              </span>
              <span className="text-xs hover-black dark:hover:text-white cursor-pointer">
                {LoggedUserProfile
                  ? currentUser?.created_at
                    ? new Date(currentUser.created_at).toLocaleDateString()
                    : "N/A"
                  : profileOwner?.created_at
                  ? new Date(profileOwner.created_at).toLocaleDateString()
                  : "N/A"}
              </span>
            </p>
          </div>
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
