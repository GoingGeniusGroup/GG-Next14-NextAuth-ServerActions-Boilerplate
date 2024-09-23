"use client";

import React, { useState } from "react";

// Sub-components
import Header from "./subComponents/Header";
import VideoBackground from "./subComponents/VideoBackground";
import SearchBar from "./subComponents/SearchBar";
import PostsGrid from "./subComponents/PostGrids";
import FloatingControls from "./subComponents/FloatingControls";
import BackgroundChanger from "./subComponents/BackgroundChanger";

const videos = [
  "/livewallpapers/rainy.mp4",
  "/livewallpapers/forest.mp4",
  "/livewallpapers/cloudsAfternoon.mp4",
];

const posts = [
  {
    id: 1,
    title: "Fitness Goals",
    content: "Just finished a great workout! 💪 #FitnessGoals",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Summer Vibes",
    content: "Enjoying a relaxing day at the beach. 🏖️ #SummerVibes",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Vegan Recipes",
    content:
      "New recipe alert! Check out my latest vegan creation. 🥗 #PlantBased",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Tech News",
    content: "Exciting developments in AI! Read more about it here.",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    title: "Travel Diaries",
    content: "Exploring hidden gems in Europe. Next stop: Prague! ✈️",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    title: "Book Review",
    content: "Just finished an amazing sci-fi novel. Highly recommend!",
    image: "/placeholder.svg",
  },
  {
    id: 7,
    title: "BookaWE Review",
    content: "Justawsga finished an amazing sci-fi novel. Highly recommend!",
    image: "/placeholder.svg",
  },
  {
    id: 8,
    title: "Booksss Review",
    content:
      "Justasfasgqag finished an amazing sci-fi novel. Highly recommend!",
    image: "/placeholder.svg",
  },
];

type Layout = "full" | "headings" | "compact" | "gap";

export default function PublicProfile({ username }: { username: string }) {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [layout, setLayout] = useState<Layout>("full");
  const [searchQuery, setSearchQuery] = useState("");

  const changeVideo = (index: number) => {
    setCurrentVideo(index);
  };

  const changeLayout = (newLayout: Layout) => {
    setLayout(newLayout);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-100">
      {/* Video Background */}
      <VideoBackground src={videos[currentVideo]} isPlaying={isPlaying} />

      {/* Black Opacity */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30" />
      

      {/* Header with Layout Dropdown */}
      <Header changeLayout={changeLayout} />

      <main
        className={`relative z-10 container mx-auto px-4 py-8 ${
          layout === "gap" ? "mt-16" : ""
          }`}
      >
        <div className="h-20"/>
        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Posts Grid */}
        <PostsGrid posts={filteredPosts} layout={layout} />
      </main>

      {/* Floating Controls */}
      <FloatingControls
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        username={username}
      />

      {/* Background Video Changer */}
      <BackgroundChanger videos={videos} changeVideo={changeVideo} />
    </div>
  );
}
