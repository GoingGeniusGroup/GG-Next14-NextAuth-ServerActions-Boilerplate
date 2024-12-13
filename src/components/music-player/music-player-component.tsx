"use client";

import React from "react";
import {
  PlayIcon,
  PauseIcon,
  TrackNextIcon,
  TrackPreviousIcon,
  SpeakerLoudIcon,
  SpeakerQuietIcon,
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
    play,
    pause,
    setVolume,
    playNext,
    playPrevious,
    seekTo,
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
    <div className="fixed bottom-0 left-0 w-full bg-gray-100 dark:bg-gray-800 p-4 shadow-lg flex items-center">
      {/* Song Info */}
      <div className="flex items-center mr-6">
        <Image
          src={currentSong.imageUrl}
          alt={currentSong.title}
          width={60}
          height={60}
          className="rounded-md mr-4"
        />
        <div>
          <h4 className="font-medium text-gray-800 dark:text-white">
            {currentSong.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {currentSong.artist}
          </p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex-grow flex flex-col items-center">
        {/* Playback Controls */}
        <div className="flex items-center space-x-4 mb-2">
          <button
            onClick={playPrevious}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          >
            <TrackPreviousIcon className="w-6 h-6" />
          </button>

          {isPlaying ? (
            <button
              onClick={pause}
              className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600"
            >
              <PauseIcon className="w-8 h-8" />
            </button>
          ) : (
            <button
              onClick={play}
              className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600"
            >
              <PlayIcon className="w-8 h-8" />
            </button>
          )}

          <button
            onClick={playNext}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          >
            <TrackNextIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2 w-full max-w-md">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-grow appearance-none h-2 bg-gray-200 dark:bg-gray-700 rounded-full"
          />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setVolume(volume > 0 ? 0 : 0.5)}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
        >
          {volume === 0 ? (
            <SpeakerQuietIcon className="w-6 h-6" />
          ) : (
            <SpeakerLoudIcon className="w-6 h-6" />
          )}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={handleVolumeChange}
          className="w-24 appearance-none h-2 bg-gray-200 dark:bg-gray-700 rounded-full"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
