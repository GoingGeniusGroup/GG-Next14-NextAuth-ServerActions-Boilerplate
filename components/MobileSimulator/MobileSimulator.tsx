"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Smartphone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MobileScreen from "./MobileScreen";
import MobileAppGrid from "./MobileAppGrid";
import ProfileComponent from "../profile/ProfileMobileView/ProfileComponent";
import ShopSection from "../shop/ShopSection";

// Define the Section interface
interface Section {
  id: number;
  title: string;
  content: React.ReactNode;
}

// Define the sections array
const sections: Section[] = [
  { id: 1, title: "Home", content: "Home" },
  { id: 2, title: "Profile", content: <ProfileComponent /> },
  { id: 3, title: "Shop", content: <ShopSection isMobile={true} /> },
  { id: 4, title: "Notifications", content: "View your latest notifications." },
  { id: 5, title: "Messages", content: "Check your messages and chats." },
];

const MobileSimulator: React.FC = () => {
  const [showMobile, setShowMobile] = useState<boolean>(false);
  const [screens, setScreens] = useState<Section[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

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
  const toggleScreen = (section: Section) => {
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

  // Glassmorphic style object
  const glassMorphicStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-white p-4 relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/path/to/futuristic-bg.jpg')] bg-cover bg-center opacity-30 z-0"></div>

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
              isSmallScreen ? "" : "bg-black bg-opacity-75"
            } p-4 z-20`}
          >
            <div
              className={`bg-transparent rounded-3xl overflow-hidden max-w-full max-h-full flex ${
                isSmallScreen ? "w-full h-full" : ""
              }`}
              style={glassMorphicStyle}
            >
              {/* Render active screens */}
              <AnimatePresence initial={false} mode="popLayout">
                {screens.map((screen, index) => (
                  <MobileScreen
                    key={screen.id}
                    screen={screen}
                    index={index}
                    isSmallScreen={isSmallScreen}
                    removeScreen={removeScreen}
                    glassMorphicStyle={glassMorphicStyle}
                  />
                ))}
              </AnimatePresence>

              {/* Main mobile screen with app grid */}
              <motion.div
                className="relative bg-transparent rounded-3xl overflow-hidden flex-shrink-0 shadow-lg"
                style={{
                  width: isSmallScreen ? "100%" : "360px",
                  height: isSmallScreen ? "100%" : "640px",
                  ...glassMorphicStyle,
                }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-6 left-4 z-10 text-white hover:text-gray-300"
                  onClick={() => setShowMobile(false)}
                >
                  <X className="h-5 w-5" />
                </Button>

                <MobileAppGrid
                  sections={sections}
                  toggleScreen={toggleScreen}
                  closeAllScreens={closeAllScreens}
                  screens={screens}
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
