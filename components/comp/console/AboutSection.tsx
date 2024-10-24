import { getCurrentUser } from "@/actions/userAndGuild";
import {
  Icon360View,
  IconActivityHeartbeat,
  IconMedal,
  IconMedal2,
  IconTrophy,
} from "@tabler/icons-react";

export default async function AboutSection({ username }: { username: string }) {
  const currentUser = await getCurrentUser();

  const owner = currentUser?.username === username;

  return (
    <div className="flex flex-col gap-y-16">
      <div className="flex flex-col gap-4 mb-3">
        <div className="flex items-center gap-3 text-black dark:text-gray-300">
          <span className="uppercase">
            {owner ? currentUser?.username : username}
          </span>{" "}
          |{" "}
          <span>
            {owner ? currentUser?.created_at?.toString() : "SOME DATE"}
          </span>{" "}
          <span>|</span>
          {owner ? (
            <span>{currentUser?.dob?.toString()}</span>
          ) : (
            <span>19</span>
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
        {owner ? currentUser?.email : "user email"}
      </p>
    </div>
  );
}
