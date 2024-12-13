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
import MusicPlayer from "../music-player/music-player-component";

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
  const paginationLabels: string[] = [
    "HOME",
    "AVATAR",
    "GENIUS",
    "GGONE",
    "DISCOVER",
  ];
  const swiperRefs = useRef<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showSongList, setShowSongList] = useState<boolean>(false);

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

  // Toggle song list visibility
  const toggleSongList = () => {
    setShowSongList(!showSongList);
  };

  return (
    <MusicPlayerProvider songs={songs}>
      <div className="flex justify-center items-center">
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
                user={user}
                profilePic={profilePic}
                staticUsers={staticUsers}
              />
            </SwiperSlide>

            {/* GG One */}
            <SwiperSlide className="bg-cover bg-center">
              <VideoHomeGGOneSlide />
            </SwiperSlide>
            {/* Discover */}
            <SwiperSlide className="bg-cover bg-center">
              <VideoHomeDiscoverSlide />
            </SwiperSlide>

            {/* Music Player */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 w-[50%]">
              <MusicPlayer />
            </div>

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
            <div className="absolute bottom-6 right-6 z-30">
              <IconButton
                onClick={togglePlayPause}
                icon={
                  isPlaying ? (
                    <PauseIcon className="size-[20px]" />
                  ) : (
                    <PlayIcon className="size-[20px]" />
                  )
                }
                label="Play/Pause"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleSongList}
                className="text-white bg-gray-700/50 rounded-full p-2"
              >
                🎵
              </motion.button>
            </div>
          </Swiper>
        </div>
        {/* Song List Modal */}
        {showSongList && (
          <div className="fixed bottom-6 left-6 z-50">
            <SongList songs={songs} />
          </div>
        )}
      </div>
    </MusicPlayerProvider>
  );
};

export default VideoHomeClient;
