import { getCurrentUser } from "@/actions/userAndGuild";
import { getUserByUsername } from "@/services/user";
import {
  Icon360View,
  IconActivityHeartbeat,
  IconMedal,
} from "@tabler/icons-react";
import UpdateProfileDialog from "../Modal/profile/UpdateProfileDialog";

export default async function AboutSectionProfile({
  username,
}: {
  username: string;
}) {
  const currentUser = await getCurrentUser();

  const LoggedUserProfile = currentUser?.username === username;

  const profileOwner = await getUserByUsername(username);

  return (
    <div className="relative flex flex-col gap-4 border p-4 rounded-xl backdrop-blur-md border-black/10 dark:border-white/10 dark:hover:border-[#FCBB3F]/60 hover:border-sky-500/60 transition-all duration-200 ease-in-out">
      <div className="flex flex-col gap-4">
        {LoggedUserProfile && currentUser && (
          <div className="absolute top-2 right-2 z-40">
            <UpdateProfileDialog
              gg_id={currentUser.gg_id}
              currentFirstName={currentUser.first_name ?? ""}
              currentLastName={currentUser.last_name ?? ""}
              currentAddress={currentUser.address ?? ""}
              currentDescription={currentUser.description ?? ""}
            />
          </div>
        )}
        <div className="flex items-center gap-3 text-black dark:text-gray-300">
          <span className="uppercase font-bold">
            {LoggedUserProfile ? currentUser?.username : profileOwner?.username}
          </span>{" "}
          |{" "}
          <span>
            {LoggedUserProfile ? currentUser?.email : profileOwner?.email}
          </span>{" "}
          <span>|</span>
          {LoggedUserProfile ? (
            <span>{currentUser?.dob?.toString()}</span>
          ) : (
            <span>{profileOwner?.dob?.toString()}</span>
          )}
        </div>
        <div>
          {LoggedUserProfile ? (
            <p>
              {currentUser?.first_name} {currentUser?.last_name}
            </p>
          ) : (
            <p>
              {profileOwner?.first_name} {profileOwner?.last_name}
            </p>
          )}

          <div className="flex gap-2">
            <span className="text-black dark:text-gray-300">
              {LoggedUserProfile ? currentUser?.address : profileOwner?.address}
            </span>
          </div>
        </div>
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

        <div className="relative w-full rounded-md bg-black/10 dark:bg-white/10 px-2 py-1 dark:text-white text-black">
          <h1 className="text-[16px] font-bold">BIO</h1>
          <p className="h-[60px] w-full overflow-auto text-[12px] font-semibold">
            {LoggedUserProfile ? (
              <span>{currentUser?.description}</span>
            ) : (
              <span>{profileOwner?.description}</span>
            )}
          </p>
        </div>
        <p
          className={`text-black dark:text-gray-300 overflow-hidden text-ellipsis whitespace-normal line-clamp-2
        }`}
        >
          {LoggedUserProfile
            ? currentUser?.created_at?.toString()
            : profileOwner?.created_at?.toString()}
        </p>
      </div>
    </div>
  );
}
