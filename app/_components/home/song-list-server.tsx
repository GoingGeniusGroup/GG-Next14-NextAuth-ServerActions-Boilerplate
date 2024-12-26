import SongListToggleClient from "@/src/components/music-player/song-list-toggle-client";
import React from "react";
import { songs } from "@/data/songs";

const SongListServer = () => {
  return (
    <div>
      <SongListToggleClient songs={songs} />
    </div>
  );
};

export default SongListServer;
