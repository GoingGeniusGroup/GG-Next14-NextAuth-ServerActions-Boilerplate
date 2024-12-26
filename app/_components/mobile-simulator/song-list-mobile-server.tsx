import React from "react";
import { songs } from "@/data/songs";
import SongListMobileClient from "@/src/components/music-player/song-list-mobile-client";

const SongListMobileServer = () => {
  return <SongListMobileClient songs={songs} />;
};

export default SongListMobileServer;
