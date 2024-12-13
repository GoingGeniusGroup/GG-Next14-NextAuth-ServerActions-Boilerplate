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
    title: "Six Days",
    artist: "Tokyo Drift",
    imageUrl: "/music/images/sixdays.svg",
    audioUrl: "/music/music/sixdays.mp3",
    duration: 232, // in seconds
  },
  {
    id: "2",
    title: "Thriller",
    artist: "Michael Jackson",
    imageUrl: "/music/images/sixdays.svg",
    audioUrl: "/music/music/Michael Jackson - Thriller (Lyrics).mp3",
    duration: 358, // in seconds
  },
  {
    id: "3",
    title: "GALZ XYPHER",
    artist: "COCONA, MAYA, HARVEY, JURIN",
    imageUrl: "/music/images/sixdays.svg",
    audioUrl:
      "/music/music/[XG TAPE @2] GALZ XYPHER (COCONA, MAYA, HARVEY, JURIN).mp3",
    duration: 330, // in seconds
  },
  {
    id: "4",
    title: "Mockingbird",
    artist: "Eminem",
    imageUrl: "/music/images/sixdays.svg",
    audioUrl: "/music/music/Eminem - Mockingbird [Official Music Video].mp3",
    duration: 257, // in seconds
  },
  {
    id: "5",
    title: "Nothin'",
    artist: "JURIN, COCONA",
    imageUrl: "/music/images/sixdays.svg",
    audioUrl: "/music/music/[XG TAPE @3-B] Nothin' (JURIN, COCONA).mp3",
    duration: 180, // in seconds
  },
  {
    id: "6",
    title: "Beautiful Things",
    artist: "Benson Boone",
    imageUrl: "/music/images/sixdays.svg",
    audioUrl:
      "/music/music/Benson Boone - Beautiful Things (Official Music Video).mp3",
    duration: 192, // in seconds
  },
  {
    id: "7",
    title: "BIRDS OF A FEATHER",
    artist: "Billie Eilish",
    imageUrl: "/music/images/sixdays.svg",
    audioUrl:
      "/music/music/Billie Eilish - BIRDS OF A FEATHER (Official Music Video).mp3",
    duration: 230, // in seconds
  },
  {
    id: "8",
    title: "SPICY",
    artist: "CL",
    imageUrl: "/music/images/sixdays.svg",
    audioUrl: "/music/music/CL - SPICY (Official Video).mp3",
    duration: 203, // in seconds
  },
  {
    id: "9",
    title: "Daylight",
    artist: "David Kushner",
    imageUrl: "/music/images/sixdays.svg",
    audioUrl:
      "/music/music/David Kushner - Daylight (Official Music Video).mp3",
    duration: 229, // in seconds
  },
  {
    id: "10",
    title: "When I'm Gone",
    artist: "Eminem",
    imageUrl: "/music/images/sixdays.svg",
    audioUrl: "/music/music/Eminem - When I'm Gone (Official Music Video).mp3",
    duration: 369, // in seconds
  },
  {
    id: "11",
    title: "Mount Everest",
    artist: "Labrinth",
    imageUrl: "/music/images/sixdays.svg",
    audioUrl: "/music/music/Labrinth - Mount Everest (Official Video).mp3",
    duration: 146, // in seconds
  },
  {
    id: "12",
    title: "Smack That",
    artist: "Akon ft. Eminem",
    imageUrl: "/music/images/sixdays.svg",
    audioUrl: "/music/music/SmackThat.mp3",
    duration: 251, // in seconds
  },
  {
    id: "13",
    title: "APT.",
    artist: "ROSÉ & Bruno Mars",
    imageUrl: "/music/images/sixdays.svg",
    audioUrl:
      "/music/music/ROSÉ & Bruno Mars - APT. (Official Music Video).mp3",
    duration: 173, // in seconds
  },
  {
    id: "14",
    title: "Espresso",
    artist: "Sabrina Carpenter",
    imageUrl: "/music/images/sixdays.svg",
    audioUrl: "/music/music/Sabrina Carpenter - Espresso (Official Video).mp3",
    duration: 200, // in seconds
  },
  {
    id: "15",
    title: "Running through the night",
    artist: "Seori",
    imageUrl: "/music/images/sixdays.svg",
    audioUrl:
      "/music/music/Seori - Running through the night [Music Video].mp3",
    duration: 275, // in seconds
  },
  {
    id: "16",
    title: "Lose Control",
    artist: "Teddy Swims",
    imageUrl: "/music/images/sixdays.svg",
    audioUrl: "/music/music/Teddy Swims - Lose Control (Lyric Video).mp3",
    duration: 210, // in seconds
  },
  {
    id: "17",
    title: "Where Is The Love_",
    artist: "The Black Eyed Peas",
    imageUrl: "/music/images/sixdays.svg",
    audioUrl:
      "/music/music/The Black Eyed Peas - Where Is The Love_ (Official Music Video).mp3",
    duration: 250, // in seconds
  },
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
