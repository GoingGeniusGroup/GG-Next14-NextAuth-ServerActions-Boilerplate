"use client";

import { useState } from "react";
import SongList from "./song-lists";
import { Song } from "@/src/core/types/songs";

const SongListMobileClient = ({ songs }: { songs: Song[] }) => {
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(true);

  const togglePlaylistVisibility = () => {
    setIsPlaylistVisible((prev) => !prev);
  };

  return (
    <div>
      <button
        onClick={togglePlaylistVisibility}
        className="pb-2 flex justify-end w-full text-xs text-white rounded uppercase"
      >
        {isPlaylistVisible ? "Hide Playlist" : "Show Playlist"}
      </button>
      {isPlaylistVisible && <SongList songs={songs} />}
    </div>
  );
};

export default SongListMobileClient;
