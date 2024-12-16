"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Type import for Swiper
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { motion } from "framer-motion";

import VideoHomeDiscoverSlide from "./video-home-slides/video-home-discover-slide.tsx";
import VideoHomeGGOneSlide from "./video-home-slides/video-home-gg-one-slide";
import VideoHomeAvatarSlide from "./video-home-slides/video-home-avatar-slide";
import VideoHomeSlide from "./video-home-slides/video-home-slide";

import VideoHomeGeniusProfilesSlide from "./video-home-slides/video-home-genius-profiles-slide";
import IconButton from "@/src/layout/base/button/icon-button";
import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { Song } from "@/src/core/types/songs.js";
import { MusicPlayerProvider } from "@/src/context/music-player-context";
import SongList from "../music-player/song-lists";
import MusicPlayerMinimized from "../music-player/music-player-component-minimized";
import { Music2Icon } from "lucide-react";

import { Orbitron, Poppins } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/src/ui/button/button";
import { LoginForm } from "../form/login-form";
import { RegisterForm } from "../form/register-form";

const orbitronFont = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "600"],
});

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "600"],
});

interface VideoHomeClientProps {
  user: any;
  profilePic: string;
  staticUsers: any[];
  songs: Song[];
}

const VideoHomeClient: React.FC<VideoHomeClientProps> = ({
  user,
  profilePic,
  staticUsers,
  songs,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paginationLabels: string[] = [
    "HOME",
    "AVATAR",
    "GENIUS",
    "DISCOVER",
    "GGONE",
  ];
  const swiperRefs = useRef<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const isUserLoggedIn = user ? true : false;

  useEffect(() => {
    // Only proceed if we have auth_redirect parameter
    if (searchParams.get("auth_redirect") === "true") {
      // Show the toast
      toast.error(`Please log in to access this page`, {
        position: "top-center",
        icon: "🔒",
        duration: 4000,
        style: {
          background: "#DC262690",
          backdropFilter: "blur(4px)",
          color: "#fff",
          padding: "8px",
          borderRadius: "8px",
        },
      });

      // Clean up URL parameters
      const newUrl = window.location.pathname;
      router.replace(newUrl);

      setTimeout(() => {
        setShowModal(true);
      }, 500);
    }
  }, [searchParams, router]);

  const toggleModal = () => setShowModal((prev) => !prev);

  // Handle the click on the HUD on the bottom of the screen
  const handleHudClick = (index: number) => {
    setCurrentSlide(index);
    swiperRefs.current?.slideTo(index, 0);
  };

  // Check if the screen is small
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1025);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle play/pause button click
  const togglePlayPause = () => {
    if (isPlaying) {
      swiperRefs.current?.autoplay.stop();
    } else {
      swiperRefs.current?.autoplay.start();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    // <MusicPlayerProvider songs={songs}>
    <div
      className={`flex justify-center items-center ${orbitronFont.className}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          allowTouchMove={false} // Disable drag/swipe functionality
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2"
          onSwiper={(swiper) => {
            swiperRefs.current = swiper;
          }}
          onSlideChange={(e) => {
            setCurrentSlide(e.activeIndex);
          }}
          pagination={{
            clickable: true,
          }}
        >
          {/* Home Slide */}
          <SwiperSlide className="bg-cover bg-center">
            <VideoHomeSlide />
          </SwiperSlide>
          {/* Avatar Slide */}
          <SwiperSlide className="bg-cover bg-center">
            <VideoHomeAvatarSlide />
          </SwiperSlide>

          {/* Genius Slide */}
          <SwiperSlide className="bg-cover bg-center">
            <VideoHomeGeniusProfilesSlide
              staticUsers={staticUsers}
              isUserLoggedIn={isUserLoggedIn}
              toggleModal={toggleModal}
            />
          </SwiperSlide>

          {/* Discover */}
          <SwiperSlide className="bg-cover bg-center">
            <VideoHomeDiscoverSlide
              isUserLoggedIn={isUserLoggedIn}
              toggleModal={toggleModal}
            />
          </SwiperSlide>
          {/* GG One */}
          <SwiperSlide className="bg-cover bg-center">
            <VideoHomeGGOneSlide
              user={user}
              isUserLoggedIn={isUserLoggedIn}
              toggleModal={toggleModal}
            />
          </SwiperSlide>

          {/* HUD at the bottom */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="z-20  text-white"
              onClick={() => swiperRefs.current?.slidePrev()}
              disabled={currentSlide === 0}
            >
              <MdOutlineNavigateBefore size={30} />
            </motion.button>

            <div className="flex gap-2 rounded-full px-2 py-1 shadow shadow-white">
              {paginationLabels.map((label, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`size-4 cursor-pointer rounded-full border-b border-white text-center text-xs font-semibold backdrop-blur-lg lg:size-fit lg:px-4 lg:py-2 ${
                    currentSlide === index
                      ? "bg-gradient-to-b from-sky-300/50 to-black/50 text-white"
                      : "text-white"
                  }`}
                  onClick={() => handleHudClick(index)}
                >
                  {isSmallScreen ? label.substring(0, 1) : label}
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="z-20 text-white"
              onClick={() => swiperRefs.current?.slideNext()}
              disabled={currentSlide === 4}
            >
              <MdOutlineNavigateNext size={30} />
            </motion.button>
          </div>

          {/* Play/Pause Button */}
          <div className="absolute bottom-[68px] right-6 z-30 flex flex-col gap-2 items-center">
            <IconButton
              onClick={togglePlayPause}
              icon={
                isPlaying ? (
                  <PauseIcon className="size-[20px] text-black dark:text-white " />
                ) : (
                  <PlayIcon className="size-[20px] text-black dark:text-white " />
                )
              }
              label="Play/Pause"
            />
          </div>
        </Swiper>
      </div>

      {showModal && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 ${poppinsFont.className}`}
          onClick={toggleModal}
        >
          <div
            className="bg-transprent backdrop-blur-md border-2 dark:border-white/20 border:white hover:border-yellow-600 transition-all duration-300 ease-in-out p-6 rounded-lg w-[90%] max-w-md shadow-lg text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {isLogin ? (
              <LoginForm isMobile={true} />
            ) : (
              <RegisterForm isMobile={true} />
            )}

            <div
              className="size-4 absolute top-3 right-3 cursor-pointer bg-red-600 rounded-full"
              onClick={toggleModal}
            ></div>

            <div className="mt-2 flex flex-col justify-center gap-2">
              <span className="w-full flex justify-center text-xs">
                {isLogin
                  ? "Not Yet a Genius User? Register Here"
                  : "Already a Genius User? Login Here"}
              </span>
              <Button
                variant="black"
                className="border hover:bg-black/60"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Go to Register" : "Go to Login"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
    // </MusicPlayerProvider>
  );
};

export default VideoHomeClient;
