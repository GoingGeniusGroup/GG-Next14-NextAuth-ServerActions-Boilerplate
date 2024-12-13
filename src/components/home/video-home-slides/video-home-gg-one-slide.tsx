"use client";

import { Button } from "@/src/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function VideoHomeGGOneSlide({
  user,
  isUserLoggedIn,
  toggleModal,
}: {
  user: any;
  isUserLoggedIn: boolean;
  toggleModal: () => void;
}) {
  const router = useRouter();

  const handleGetStarted = () => {
    if (isUserLoggedIn && user) {
      router.push(`/genius-profile/${user.username}`);
    } else {
      toggleModal();
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-black">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover z-0"
        autoPlay
        loop
        muted
      >
        <source src="/livewallpapers/forest.mp4" type="video/mp4" />
      </video>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center text-white px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#FFE400] drop-shadow-md">
          GG ONE
        </h1>
        <div className="mt-6 text-base md:text-lg font-medium space-y-2">
          <p>One ID for Genius Services</p>
          <p>3D Body for Web 3 Family</p>
          <p>Genius Membership for Health, Knowledge, and Business</p>
          <p>Expertise with Experience</p>
          <p>Bring Powerful Skills to Light</p>
          <p>Slider Sub Tagline</p>
          <p>Open Source</p>
        </div>

        {/* Get Started Button */}
        <div className="mt-8">
          <Button
            className="relative rounded-full bg-white px-8 py-3 text-sm font-semibold text-black shadow-xl transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-gray-200"
            onClick={handleGetStarted}
          >
            <Image
              src="/homepage/GGONE.png"
              height={24}
              width={24}
              alt="Guild Symbol"
              className="opacity-80"
            />
            Get Yours Now
            <span className="absolute right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-blue-400"></span>
          </Button>
        </div>
      </div>
    </div>
  );
}
