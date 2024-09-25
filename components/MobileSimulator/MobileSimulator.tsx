"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Smartphone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MobileScreen from "./MobileScreen";
import MobileUI from "./MobileUI";
import ProfileComponent from "../profile/ProfileMobileView/ProfileComponent";
import ShopSection from "../shop/ShopSection";
import { SectionProps } from "./interface/Section.interface";
import { BackgroundProps } from "./interface/Background.interface";

// Define the sections array
const sections: SectionProps[] = [
  { id: 1, title: "Home", content: "Home" },
  { id: 2, title: "Profile", content: <ProfileComponent /> },
  { id: 3, title: "Shop", content: <ShopSection isMobile={true} /> },
  { id: 4, title: "Notifications", content: "View your latest notifications." },
  { id: 5, title: "Messages", content: "Check your messages and chats." },
];

// Define the backgrounds array
const backgrounds = [
  {
    name: "Cosmic Nebula",
    class:
      "bg-gradient-to-b from-indigo-600/90 to-purple-600/60 via-pink-500/40 text-white",
  },
  {
    name: "Sunset Haze",
    class:
      "bg-gradient-to-b from-orange-400/80 to-red-500/50 via-pink-400/30 text-white",
  },
  {
    name: "Cyberpunk City",
    class:
      "bg-gradient-to-b from-blue-900/80 to-purple-800/50 via-pink-700/30 text-white",
  },
  {
    name: "Emerald Dreams",
    class:
      "bg-gradient-to-b from-green-500/60 to-teal-400/40 via-cyan-300/20 text-white",
  },
  {
    name: "Ocean Depth",
    class:
      "bg-gradient-to-b from-blue-800/80 to-teal-700/50 via-cyan-600/30 text-white",
  },
  {
    name: "Neon Glitch",
    class:
      "bg-gradient-to-b from-green-500/70 to-blue-500/50 via-purple-500/30 text-white",
  },
  {
    name: "Mystic Forest",
    class:
      "bg-gradient-to-b from-green-600/60 to-teal-500/40 via-cyan-400/20 text-white",
  },
  {
    name: "Candy Dreams",
    class:
      "bg-gradient-to-b from-pink-500/70 to-purple-500/50 via-blue-500/30 text-white",
  },
  {
    name: "Sunrise Over Mountains",
    class:
      "bg-gradient-to-b from-yellow-400/70 to-orange-500/50 via-red-500/30 text-white",
  },
  {
    name: "Winter Twilight",
    class:
      "bg-gradient-to-b from-blue-600/80 to-purple-600/50 via-pink-500/30 text-white",
  },
  {
    name: "Lavender Fields",
    class:
      "bg-gradient-to-b from-purple-400/80 to-pink-300/50 via-lavender-200/30 text-white",
  },
  {
    name: "Desert Sunset",
    class:
      "bg-gradient-to-b from-orange-500/90 to-red-600/60 via-yellow-400/40 text-white",
  },
  {
    name: "Northern Lights",
    class:
      "bg-gradient-to-b from-green-500/80 to-blue-500/50 via-purple-500/30 text-white",
  },
  {
    name: "Retro Arcade",
    class:
      "bg-gradient-to-b from-pink-500/90 to-blue-500/60 via-purple-500/40 text-white",
  },
  {
    name: "Tropical Breeze",
    class:
      "bg-gradient-to-b from-green-400/80 to-yellow-300/50 via-orange-400/30 text-white",
  },
  {
    name: "Glimmering Stars",
    class:
      "bg-gradient-to-b from-blue-900/90 to-purple-800/60 via-pink-700/40 text-white",
  },
  {
    name: "Dark Matter",
    class: "bg-gradient-to-b from-gray-900/80 to-black/95 text-white",
  },
  {
    name: "Snowfall",
    class: "bg-gradient-to-b from-white/80 to-gray-100/60 text-black",
  },
];

const MobileSimulator: React.FC = () => {
  const [showMobile, setShowMobile] = useState<boolean>(false);
  const [screens, setScreens] = useState<SectionProps[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [currentBackground, setCurrentBackground] = useState<BackgroundProps>(
    backgrounds[0]
  );

  // Effect to check and update screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Function to toggle screen visibility
  const toggleScreen = (section: SectionProps) => {
    setScreens((prevScreens) => {
      const isOpen = prevScreens.some((screen) => screen.id === section.id);
      if (isOpen) {
        return prevScreens.filter((screen) => screen.id !== section.id);
      } else {
        return [section, ...prevScreens].slice(0, 3);
      }
    });
  };

  // Function to remove a specific screen
  const removeScreen = (id: number) => {
    setScreens((prevScreens) =>
      prevScreens.filter((screen) => screen.id !== id)
    );
  };

  // Function to close all screens
  const closeAllScreens = () => {
    setScreens([]);
  };

  // Function to update the current background
  const updateCurrentBackground = (newBackground: BackgroundProps) => {
    setCurrentBackground(newBackground);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-white p-4 relative overflow-hidden">
      {/* Toggle button for mobile view */}
      <Button
        onClick={() => setShowMobile(true)}
        className="fixed top-4 right-4 rounded-full w-12 h-12 p-0 bg-blue-500 hover:bg-blue-600 z-10"
        size="icon"
      >
        <Smartphone className="w-6 h-6 text-white" />
      </Button>

      {/* Mobile simulator container */}
      <AnimatePresence>
        {showMobile && (
          <motion.div
            initial={{ opacity: 0, scale: isSmallScreen ? 1 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: isSmallScreen ? 1 : 0.9 }}
            className={`fixed inset-0 flex items-center justify-end ${
              isSmallScreen ? "" : "bg-black/40"
            } p-4 z-20`}
          >
            <div
              className={`bg-none rounded-xl border-none overflow-hidden max-w-full max-h-full flex ${
                isSmallScreen ? "w-full h-full" : "gap-x-4"
              }`}
            >
              {/* Render active screens */}
              <AnimatePresence initial={false} mode="popLayout">
                {screens.map((screen, index) => (
                  <MobileScreen
                    key={screen.id}
                    screen={screen}
                    index={index}
                    // backgrounds={backgrounds}
                    isSmallScreen={isSmallScreen}
                    removeScreen={removeScreen}
                    currentBackground={currentBackground} // Pass currentBackground
                  />
                ))}
              </AnimatePresence>

              {/* Main mobile screen with app grid */}
              <motion.div
                className="relative mr-14 rounded-xl bg-white/20 backdrop-blur-md overflow-hidden flex-shrink-0 shadow-lg"
                style={{
                  width: isSmallScreen ? "100%" : "335px",
                  height: isSmallScreen ? "100%" : "75vh",
                }}
              >
                <Button
                  variant="ghost"
                  size="mini"
                  className="absolute top-2 right-2 text-white font-bold hover:text-black z-40 bg-red-500 rounded-full"
                  onClick={() => setShowMobile(false)}
                >
                  <X className="size-3" />
                </Button>

                <MobileUI
                  sections={sections}
                  toggleScreen={toggleScreen}
                  backgrounds={backgrounds}
                  closeAllScreens={closeAllScreens}
                  screens={screens}
                  currentBackground={currentBackground}
                  updateCurrentBackground={updateCurrentBackground}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileSimulator;
