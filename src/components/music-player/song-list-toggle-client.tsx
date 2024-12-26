"use client";

import React, { useState } from "react";
import SongList from "./song-lists";
import { Song } from "@/src/core/types/songs";
import IconButton from "@/src/layout/base/button/icon-button";
import { Music2Icon } from "lucide-react";

const SongListToggleClient = ({ songs }: { songs: Song[] }) => {
  const [showSongList, setShowSongList] = useState<boolean>(false);

  // Toggle song list visibility
  const toggleSongList = () => {
    setShowSongList(!showSongList);
  };
  return (
    <div>
      <IconButton
        onClick={toggleSongList}
        icon={<Music2Icon size={20} className="text-black dark:text-white " />}
        label="music toggle button"
      />
      {/* Song List Modal */}
      {showSongList && (
        <div className="fixed right-20 bottom-6 z-50">
          <SongList songs={songs} />
        </div>
      )}
    </div>
  );
};

export default SongListToggleClient;
