"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MobileScreen from "./MobileScreen";
import MobileUI from "./MobileUI";
import ProfileComponent from "../profile/ProfileMobileView/ProfileComponent";
import ShopSection from "../shop/ShopSection";
import { SectionProps } from "./interface/Section.interface";
import { BackgroundProps } from "./interface/Background.interface";

//icons
import { MobileSimulatorContext } from "./Context/MobileSimulatorContext";
import SimulatorToggleButton from "./SimulatorToggleButton";
import MobileSimulatorContainer from "./MobileSimulatorContainer";

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
    <>
      <MobileSimulatorContext.Provider
        value={{
          showMobile,
          setShowMobile,
          isSmallScreen,
          screens,
          setScreens,
          currentBackground,
          setCurrentBackground,
          toggleScreen,
          removeScreen,
          closeAllScreens,
          updateCurrentBackground,
        }}
      >
        <SimulatorToggleButton
          showMobile={showMobile}
          setShowMobile={setShowMobile}
        />

        {/* Mobile simulator container */}
        <MobileSimulatorContainer
          showMobile={showMobile}
          isSmallScreen={isSmallScreen}
          backgrounds={backgrounds}
          currentBackground={currentBackground}
          sections={sections}
          toggleScreen={toggleScreen}
          screens={screens}
          removeScreen={removeScreen}
          closeAllScreens={closeAllScreens}
          updateCurrentBackground={updateCurrentBackground}
        />
      </MobileSimulatorContext.Provider>
    </>
  );
};

export default MobileSimulator;
