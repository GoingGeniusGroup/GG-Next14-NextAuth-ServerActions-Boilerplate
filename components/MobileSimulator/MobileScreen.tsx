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
      className="relative bg-transparent rounded-xl overflow-hidden py-2 flex-shrink-0 z-20"
      style={{
        width: isSmallScreen ? "100%" : "335px",
        height: isSmallScreen ? "100%" : "75vh",
        position: isSmallScreen ? "absolute" : "relative",
        right: isSmallScreen ? `${index * 100}%` : "auto",
        ...glassMorphicStyle,
      }}
    >
      {/* {!isSmallScreen && (
        <>
          <div className="absolute top-0 left-0 right-0 h-6 bg-gray-900 bg-opacity-50 rounded-t-3xl"></div>
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gray-900 bg-opacity-50 rounded-b-3xl"></div>
        </>
      )} */}

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
