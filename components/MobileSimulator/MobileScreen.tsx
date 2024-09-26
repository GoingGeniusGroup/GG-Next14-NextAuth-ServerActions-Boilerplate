"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { BackgroundProps } from "./interface/Background.interface";

interface MobileScreenProps {
  screen: {
    id: number;
    title: string;
    content: React.ReactNode;
  };
  index: number;
  isSmallScreen: boolean;
  removeScreen: (id: number) => void;
  currentBackground: BackgroundProps; // Include Background
}

const MobileScreen: React.FC<MobileScreenProps> = ({
  screen,
  index,
  isSmallScreen,
  removeScreen,
  currentBackground, // Receive currentBackground
}) => {
  return (
    <motion.div
      key={screen.id}
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`relative ${currentBackground.class} rounded-xl overflow-hidden py-2 flex-shrink-0 z-20 backdrop-blur-md border-1 border-white`} // Apply currentBackground.class
      style={{
        width: isSmallScreen ? "100%" : "335px",
        height: isSmallScreen ? "100%" : "75vh",
        position: isSmallScreen ? "absolute" : "relative",
        right: isSmallScreen ? `${index * 100}%` : "auto",
      }}
    >
      <Button
        variant="ghost"
        size="mini"
        className="absolute top-2 right-2 text-black hover:text-red-500 z-40 bg-white rounded-full"
        onClick={() => removeScreen(screen.id)}
      >
        <X className="size-4" />
      </Button>

      {screen.content}
    </motion.div>
  );
};

export default MobileScreen;
