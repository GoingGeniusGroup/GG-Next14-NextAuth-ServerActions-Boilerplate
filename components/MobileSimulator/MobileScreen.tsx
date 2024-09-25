import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scrollarea";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface MobileScreenProps {
  screen: {
    id: number;
    title: string;
    content: React.ReactNode;
  };
  index: number;
  isSmallScreen: boolean;
  removeScreen: (id: number) => void;
  glassMorphicStyle: React.CSSProperties;
}

const MobileScreen: React.FC<MobileScreenProps> = ({
  screen,
  index,
  isSmallScreen,
  removeScreen,
  glassMorphicStyle,
}) => {
  return (
    <motion.div
      key={screen.id}
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative bg-transparent rounded-3xl overflow-hidden flex-shrink-0 z-20"
      style={{
        width: isSmallScreen ? "100%" : "320px",
        height: isSmallScreen ? "100%" : "568px",
        position: isSmallScreen ? "absolute" : "relative",
        right: isSmallScreen ? `${index * 100}%` : "auto",
        ...glassMorphicStyle,
      }}
    >
      {!isSmallScreen && (
        <>
          <div className="absolute top-0 left-0 right-0 h-6 bg-gray-900 bg-opacity-50 rounded-t-3xl"></div>
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gray-900 bg-opacity-50 rounded-b-3xl"></div>
        </>
      )}

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-8 left-4 z-10 text-white hover:text-blue-300"
        onClick={() => removeScreen(screen.id)}
      >
        <X className="h-4 w-4" />
      </Button>

      <ScrollArea className="relative size-full pt-16 pb-8 px-4">
        <h2 className="text-xl font-bold mb-4 text-blue-300">{screen.title}</h2>
        {screen.content}
      </ScrollArea>
    </motion.div>
  );
};

export default MobileScreen;
