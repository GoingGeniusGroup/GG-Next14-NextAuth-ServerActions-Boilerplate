"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button/button";

// Sub-components
import Header from "./subComponents/Header";
import VideoBackground from "./subComponents/VideoBackground";
import SearchBar from "./subComponents/SearchBar";
import PostsGrid from "./subComponents/PostGrids";
import FloatingControls from "./subComponents/FloatingControls";
import BackgroundChanger from "./subComponents/BackgroundChanger";

//icons
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";

const videos = [
  "/livewallpapers/rainy.mp4",
  "/livewallpapers/forest.mp4",
  "/livewallpapers/cloudsAfternoon.mp4",
  "/livewallpapers/earth.mp4",
  "/livewallpapers/karma.mp4",
  "/livewallpapers/vajra.mp4",
  "/livewallpapers/buddha.mp4",
  "/livewallpapers/fire.mp4",
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
];

type Layout = "full" | "headings" | "compact" | "gap";

export default function PublicProfile({ username }: { username: string }) {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [layout, setLayout] = useState<Layout>("full");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  const postGridRef = useRef<HTMLDivElement>(null);
  const minimizeIconRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up GSAP defaults
    gsap.defaults({ ease: "power3.inOut" });
  }, []);

  const changeVideo = (index: number) => {
    setCurrentVideo(index);
  };

  const changeLayout = (newLayout: Layout) => {
    setLayout(newLayout);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMinimize = () => {
    if (isMinimized) {
      // Animate back to full size
      gsap.to(minimizeIconRef.current, {
        y: "100%",
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(minimizeIconRef.current, { display: "none" });
        },
      });

      gsap.to(postGridRef.current, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        delay: 0.1,
      });

      gsap.to(containerRef.current, {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        duration: 0.5,
      });

      // Allow scrolling again when maximized
      gsap.set(containerRef.current, { overflowY: "auto" });
    } else {
      // Animate to minimize
      gsap.to(postGridRef.current, {
        y: "50%",
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          gsap.set(minimizeIconRef.current, { display: "flex" });
          gsap.from(minimizeIconRef.current, {
            y: "100%",
            opacity: 0,
            duration: 0.3,
          });
        },
      });

      gsap.to(containerRef.current, {
        backgroundColor: "rgba(255, 255, 255, 0)",
        backdropFilter: "blur(0px)",
        duration: 0.5,
        delay: 0.3,
      });

      // Disable scrolling when minimized
      gsap.set(containerRef.current, { overflowY: "hidden" });
    }
    setIsMinimized(!isMinimized);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <VideoBackground src={videos[currentVideo]} isPlaying={isPlaying} />

      {/* Black Opacity */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30" />

      {/* Header with Layout Dropdown */}
      <Header changeLayout={changeLayout} />

      <main
        className={`relative z-10 container mx-auto w-[85%] px-4 py-8 ${
          layout === "gap" ? "mt-16" : ""
        }`}
      >
        <div className="h-12" />

        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {/* Minimize Button */}
        <div
          className={`flex justify-end mb-2 transition-all duration-300 ${
            isMinimized ? "mt-[-74px] rotate-100" : "-mt-12 rotate-0"
          }`}
        >
          <Button
            onClick={toggleMinimize}
            variant="outline"
            className="px-3 py-1"
            aria-label="Maximize Minimize"
          >
            {isMinimized ? (
              <FiMaximize2 size={18} />
            ) : (
              <FiMinimize2 size={18} />
            )}
          </Button>
        </div>

        {/* Posts Container */}

        <div
          ref={containerRef}
          className={`bg-white/20 rounded-xl overflow-auto backdrop-blur-md p-4 transition-all duration-500 relative h-[70vh] max-h-[70vh] min-h-[50vh]`}
        >
          {/* Posts Grid */}
          <div ref={postGridRef} className="transition-all duration-500">
            <PostsGrid posts={filteredPosts} layout={layout} />
          </div>
        </div>
      </main>

      {/* Floating Controls */}
      <FloatingControls
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
      />

      {/* Background Video Changer */}
      <BackgroundChanger videos={videos} changeVideo={changeVideo} />
    </div>
  );
}
