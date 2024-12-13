import { getCurrentUser } from "@/app/actions/genius-profile/userAndGuild";
import { getUserByUsername } from "@/app/services/user";
import VideoHomeClient from "@/src/components/home/video-home-client";
import { Song } from "@/src/core/types/songs";
import React from "react";

const staticUsernames = [
  "haleatus",
  "satkar",
  "gglama",
  "ramu",
  "gg.yush",
  "rohit",
];

const songs: Song[] = [
  {
    id: "1",
    title: "Song Title 1",
    artist: "Artist Name",
    imageUrl: "/path/to/image.jpg",
    audioUrl: "/path/to/audio.mp3",
    duration: 240, // in seconds
  },
  {
    id: "2",
    title: "Song Title 1",
    artist: "Artist Name",
    imageUrl: "/path/to/image.jpg",
    audioUrl: "/path/to/audio.mp3",
    duration: 240, // in seconds
  },
  {
    id: "3",
    title: "Song Title 1",
    artist: "Artist Name",
    imageUrl: "/path/to/image.jpg",
    audioUrl: "/path/to/audio.mp3",
    duration: 240, // in seconds
  },
  {
    id: "4",
    title: "Song Title 1",
    artist: "Artist Name",
    imageUrl: "/path/to/image.jpg",
    audioUrl: "/path/to/audio.mp3",
    duration: 240, // in seconds
  },
  // More songs...
];

const VideoHomeServer = async () => {
  const user = await getCurrentUser();

  // Fetch all static users whose usernames are in the list
  const staticUsers = await Promise.all(
    staticUsernames.map(async (username) => {
      const user = await getUserByUsername(username);
      return {
        username: user?.username || "guest",
        firstName: user?.first_name || "Unknown",
        role: user?.role || "User",
        image: user?.image || "/default-avatar.png",
      };
    })
  );

  const profilePic = user?.image || "";
  return (
    <>
      <VideoHomeClient
        user={user}
        profilePic={profilePic}
        staticUsers={staticUsers}
        songs={songs}
      />
    </>
  );
};

export default VideoHomeServer;
