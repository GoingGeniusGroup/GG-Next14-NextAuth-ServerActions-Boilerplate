// import VideoHome from "@/components/HomePage/VideoHome";
import { currentUser } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { UserRound } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const user = await currentUser();
  const profilePic = user?.image || undefined;
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div
        className="size-full lg:ml-auto lg:w-[50%]"
        style={{
          backgroundImage: "url(/homepage/image.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="w-[800px]">
          <h1 className="text-center text-2xl font-bold leading-10 text-white lg:text-6xl">
            One Genius ID for every
            <br />
            <p className="mt-4">Genius Tech</p>
          </h1>
          <p className="mt-10 text-center text-sm text-white lg:text-2xl">
            Keep all your Genius Services secured with 1 Genius ID <br />{" "}
            Developer Features Coming Soon
          </p>
          <div className="flex justify-center">
            <Link
              className="relative mt-8 rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-transform duration-300 hover:scale-105 hover:bg-gray-200 "
              href="/shop-test"
              aria-label="get started button"
            >
              Get Started
              <div className="absolute right-0 top-0 size-3 animate-ping rounded-full bg-blue-300"></div>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 bg-gradient-to-b bg-white/70 to-gray-100/30 p-6 rounded-lg shadow-sm flex flex-col items-center max-w-sm w-full">
        <div className="text-xl  flex gap-2 font-semibold text-gray-800 mb-6">
          <Avatar className="size-7 relative rounded-full border border-white/50 overflow-hidden">
            <AvatarImage src={profilePic} />
            <AvatarFallback>
              <UserRound className="size-6 text-black" />
            </AvatarFallback>
          </Avatar>
          Hello {user?.name}
        </div>
        <nav className="flex flex-col w-full space-y-3">
          <Link
            href="/shop-test"
            className="text-white/60 hover:text-white transition-colors px-4 py-2 rounded-md text-center bg-black hover:bg-black/70"
          >
            Shop
          </Link>
          <Link
            href="/shop-2"
            className="text-white/60 hover:text-white transition-colors px-4 py-2 rounded-md text-center bg-black hover:bg-black/70"
          >
            Shop Virtual
          </Link>
          <Link
            href="/avatar"
            className="text-white/60 hover:text-white transition-colors px-4 py-2 rounded-md text-center bg-black hover:bg-black/70"
          >
            Avatar
          </Link>
          <Link
            href="/profile"
            className="text-white/60 hover:text-white transition-colors px-4 py-2 rounded-md text-center bg-black hover:bg-black/70"
          >
            Profile
          </Link>
          <Link
            href="/steam"
            className="text-white/60 hover:text-white transition-colors px-4 py-2 rounded-md text-center bg-black hover:bg-black/70"
          >
            Steam
          </Link>
          <Link
            href="/floating-dock"
            className="text-white/60 hover:text-white transition-colors px-4 py-2 rounded-md text-center bg-black hover:bg-black/70"
          >
            Floating Dock
          </Link>
          <Link
            href="/focus-cards"
            className="text-white/60 hover:text-white transition-colors px-4 py-2 rounded-md text-center bg-black hover:bg-black/70"
          >
            Focus Cards
          </Link>
          <Link
            href="/card-hover-effect"
            className="text-white/60 hover:text-white transition-colors px-4 py-2 rounded-md text-center bg-black hover:bg-black/70"
          >
            Card Hover Effect
          </Link>
          <Link
            href="/bento-grid"
            className="text-white/60 hover:text-white transition-colors px-4 py-2 rounded-md text-center bg-black hover:bg-black/70"
          >
            Bento Grid
          </Link>
        </nav>
      </div>
    </div>
  );
}
