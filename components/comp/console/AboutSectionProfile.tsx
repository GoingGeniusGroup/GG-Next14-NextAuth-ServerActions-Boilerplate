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
    <div className="flex flex-col gap-y-16">
      <div className="flex flex-col gap-4 mb-3">
        {currentUser && (
          <UpdateProfileDialog
            gg_id={currentUser.gg_id}
            currentEmail={currentUser.email ?? ""}
          />
        )}
        <div className="flex items-center gap-3 text-black dark:text-gray-300">
          <span className="uppercase">
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
      <p
        className={`text-black dark:text-gray-300 overflow-hidden text-ellipsis whitespace-normal line-clamp-2 mt-20
        }`}
      >
        {LoggedUserProfile
          ? currentUser?.created_at?.toString()
          : profileOwner?.created_at?.toString()}
      </p>
    </div>
  );
}
