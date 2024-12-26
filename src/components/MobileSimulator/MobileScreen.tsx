"use client";

import React, { forwardRef } from "react";
import { Button } from "@/src/ui/button/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useMobileSimulator } from "./provider/MobileSimulatorContext";

interface MobileScreenProps {
  screen: {
    id: number;
    title: string;
    content: React.ReactNode;
  };
  index: number;
  isSmallScreen: boolean;
  removeScreen: (id: number) => void;
}

const MobileScreen = forwardRef<HTMLDivElement, MobileScreenProps>(
  ({ screen, index, isSmallScreen, removeScreen }, ref) => {
    const { ColorPickerAttrs } = useMobileSimulator();
    const { currentBackground, textColor } = ColorPickerAttrs;
    // Check if the background is a custom color and apply it accordingly
    const backgroundStyle =
      currentBackground.name === "Custom Color"
        ? {
            backgroundColor: currentBackground.class
              .replace("bg-[", "")
              .replace("]", ""),
          }
        : {};

    return (
      <motion.div
        ref={ref}
        key={screen.id}
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`relative ${
          currentBackground.name !== "Custom Color"
            ? currentBackground.class
            : ""
        } rounded-[1.5rem] overflow-hidden py-2 flex-shrink-0 z-20 backdrop-blur-md border-1 border-white`}
        style={{
          ...backgroundStyle, // Apply background color here
          color: textColor, // Apply text color here
          width: isSmallScreen ? "100%" : "335px",
          height: isSmallScreen ? "100%" : "75vh",
          position: isSmallScreen ? "absolute" : "relative",
          right: isSmallScreen ? `${index * 100}%` : "auto",
        }}
      >
        <Button
          variant="ghost"
          size="mini2"
          className="absolute top-2 right-2 text-black hover:text-red-500 z-40 bg-red-500 rounded-full flex justify-center items-center transition-colors duration-200 hover:rotate-45"
          onClick={() => removeScreen(screen.id)}
        >
          <X size={16} />
        </Button>

        {screen.content}
      </motion.div>
    );
  }
);

MobileScreen.displayName = "MobileScreen";

export default MobileScreen;
