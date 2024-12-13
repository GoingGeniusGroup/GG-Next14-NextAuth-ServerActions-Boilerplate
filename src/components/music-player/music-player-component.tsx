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

const MusicPlayer: React.FC = () => {
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
    <div className="fixed bottom-0 left-0 w-full bg-white/10 dark:bg-black/20 backdrop-blur-lg border-t border-white/10 p-2">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="w-full mb-4">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full 
                     [&::-webkit-slider-thumb]:appearance-none 
                     [&::-webkit-slider-thumb]:w-3 
                     [&::-webkit-slider-thumb]:h-3 
                     [&::-webkit-slider-thumb]:bg-blue-500 
                     [&::-webkit-slider-thumb]:rounded-full 
                     hover:[&::-webkit-slider-thumb]:bg-blue-600"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-400">
              {formatTime(currentTime)}
            </span>
            <span className="text-xs text-gray-400">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          {/* Song Info */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <Image
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="w-14 h-14 rounded-lg object-cover shadow-lg group-hover:shadow-xl transition-all duration-300"
                height={56}
                width={56}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-all duration-300" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white truncate max-w-[200px]">
                {currentSong.title}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                {currentSong.artist}
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={playPrevious}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <TrackPreviousIcon className="w-5 h-5" />
            </button>

            <button
              onClick={isPlaying ? pause : play}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isPlaying ? (
                <PauseIcon className="w-6 h-6" />
              ) : (
                <PlayIcon className="w-6 h-6" />
              )}
            </button>

            <button
              onClick={playNext}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <TrackNextIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Volume Control and Repeat */}
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={toggleRepeat}
              className={`transition-colors ${
                isRepeat
                  ? "text-blue-500 hover:text-blue-600"
                  : "text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              }`}
            >
              <LoopIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setVolume(volume > 0 ? 0 : 0.5)}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              {volume === 0 ? (
                <SpeakerQuietIcon className="w-5 h-5" />
              ) : (
                <SpeakerLoudIcon className="w-5 h-5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-gray-200 dark:bg-gray-700 rounded-full
                       [&::-webkit-slider-thumb]:appearance-none 
                       [&::-webkit-slider-thumb]:w-3 
                       [&::-webkit-slider-thumb]:h-3 
                       [&::-webkit-slider-thumb]:bg-blue-500 
                       [&::-webkit-slider-thumb]:rounded-full 
                       hover:[&::-webkit-slider-thumb]:bg-blue-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
