"use client";

import React from "react";
import Image from "next/image";
import { useMusicPlayer } from "@/src/context/music-player-context";
import { Song } from "@/src/core/types/songs";

interface SongListProps {
  songs: Song[];
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

const SongListMobile: React.FC<SongListProps> = ({ songs }) => {
  const { currentSong, setSong } = useMusicPlayer();

  return (
    <div className="size-full p-2 ">
      <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">
        Playlist
      </h3>
      <div className="flex flex-col gap-1 h-[98%] overflow-y-auto">
        {songs.map((song) => (
          <div
            key={song.id}
            className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
              currentSong?.id === song.id
                ? "bg-blue-200/80 dark:bg-sky-700/80"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => setSong(song)}
          >
            <Image
              src={song.imageUrl}
              alt={song.title}
              width={50}
              height={50}
              className="rounded-md mr-4"
            />
            <div className="flex-grow">
              <h4 className="font-medium text-gray-800 dark:text-white">
                {song.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {song.artist}
              </p>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatTime(song.duration)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongListMobile;
