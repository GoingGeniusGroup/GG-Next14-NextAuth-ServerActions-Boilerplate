"use client";

import React from "react";
import {
  PlayIcon,
  PauseIcon,
  TrackNextIcon,
  TrackPreviousIcon,
  SpeakerLoudIcon,
  SpeakerQuietIcon,
  LoopIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import { useMusicPlayer } from "@/src/context/music-player-context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/ui/tooltip/tooltip";
import { usePathname } from "next/navigation";

const MusicPlayerMinimized: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    volume,
    currentTime,
    duration,
    isRepeat,
    play,
    pause,
    setVolume,
    playNext,
    playPrevious,
    seekTo,
    toggleRepeat,
  } = useMusicPlayer();

  const pathname = usePathname();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    seekTo(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value) / 100;
    setVolume(newVolume);
  };

  if (!currentSong) return null;

  return (
    <div
      className={`w-full bg-white/10 rounded-lg dark:bg-black/20 backdrop-blur-lg border-t border-white/10 p-1 ${
        pathname == "/" ? "" : "hidden"
      }`}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-1">
        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-gradient-to-r from-sky-700 to-sky-400 rounded-full 
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:w-2 
                [&::-webkit-slider-thumb]:h-2 
                [&::-webkit-slider-thumb]:bg-blue-500 
                [&::-webkit-slider-thumb]:rounded-full 
                hover:[&::-webkit-slider-thumb]:bg-blue-600"
        />
        <div className="flex justify-between w-full text-[10px] text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Compact Controls */}
        <div className="flex items-center justify-between w-full px-2">
          {/* Song Info */}
          <div className="flex items-center space-x-1">
            <Image
              src={currentSong.imageUrl}
              alt={currentSong.title}
              className="w-8 h-8 rounded object-cover shadow"
              height={32}
              width={32}
            />
            <div className="flex flex-col">
              <h4 className="text-xs font-medium text-white truncate max-w-[80px]">
                {currentSong.title}
              </h4>
              <p className="text-[10px] text-gray-400 truncate max-w-[80px]">
                {currentSong.artist}
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center space-x-3">
            <Tooltip>
              <TooltipTrigger>
                <button
                  onClick={playPrevious}
                  className=" text-gray-300 hover:text-white"
                >
                  <TrackPreviousIcon className="w-3 h-3" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Back</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <button
                  onClick={isPlaying ? pause : play}
                  className="bg-sky-500 hover:bg-sky-600 text-white rounded-full p-1.5 transition-transform transform hover:scale-105"
                >
                  {isPlaying ? (
                    <PauseIcon className="w-4 h-4" />
                  ) : (
                    <PlayIcon className="w-4 h-4" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <button
                  onClick={playNext}
                  className=" text-gray-300 hover:text-white"
                >
                  <TrackNextIcon className="w-3 h-3" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Next</span>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Volume and Loop */}
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger>
                <button
                  onClick={toggleRepeat}
                  className={`transition-colors ${
                    isRepeat
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <LoopIcon className="w-3 h-3" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <span>{isRepeat ? "Repeat Off" : "Repeat On"}</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <button
                  onClick={() => setVolume(volume > 0 ? 0 : 0.5)}
                  className="text-gray-300 hover:text-white"
                >
                  {volume === 0 ? (
                    <SpeakerQuietIcon className="w-3 h-3" />
                  ) : (
                    <SpeakerLoudIcon className="w-3 h-3" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <span>{volume === 0 ? "Unmute" : "Mute"}</span>
              </TooltipContent>
            </Tooltip>

            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-gradient-to-r from-green-600 to-red-600 rounded-full
                   [&::-webkit-slider-thumb]:appearance-none 
                   [&::-webkit-slider-thumb]:w-2 
                   [&::-webkit-slider-thumb]:h-2 
                   [&::-webkit-slider-thumb]:bg-sky-600 
                   [&::-webkit-slider-thumb]:rounded-full 
                   hover:[&::-webkit-slider-thumb]:bg-sky-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayerMinimized;
