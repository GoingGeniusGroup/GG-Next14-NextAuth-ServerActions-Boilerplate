// import VideoHome from "@/components/HomePage/VideoHome";
import { getCurrentUser } from "@/actions/userAndGuild";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { UserRound } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const user = await getCurrentUser();
  const profilePic = user?.image || undefined;
  return (
    <div className="flex justify-center items-center">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="w-[800px]">
          <h1 className="text-center text-2xl font-bold leading-10 text-black dark:text-white lg:text-6xl">
            One Genius ID for every
            <br />
            <p className="mt-4">Genius Tech</p>
          </h1>
          <p className="mt-10 text-center text-sm text-black dark:text-white lg:text-2xl">
            Keep all your Genius Services secured with 1 Genius ID <br />{" "}
            Developer Features Coming Soon
          </p>
          <div className="flex justify-center">
            <Link
              className="relative mt-8 rounded-full bg-black dark:bg-white px-6 py-2 text-sm font-medium text-white dark:text-black transition-transform duration-300 hover:scale-105 hover:bg-gray-200 "
              href="/shop-test"
              aria-label="get started button"
            >
              Get Started
              <div className="absolute right-0 top-0 size-3 animate-ping rounded-full bg-blue-300"></div>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-10 bg-gradient-to-b bg-white/70 to-gray-100/30 p-4 rounded-lg shadow-sm flex flex-col items-center max-w-xs w-full">
        <div className="text-xl  flex gap-2 font-semibold text-gray-800">
          <Avatar className="size-7 relative rounded-full border border-white/50 overflow-hidden">
            <AvatarImage src={profilePic} />
            <AvatarFallback>
              <UserRound className="size-6 text-black" />
            </AvatarFallback>
          </Avatar>
          Hello {user?.first_name} {user?.last_name}
        </div>
      </div>
    </div>
  );
}
