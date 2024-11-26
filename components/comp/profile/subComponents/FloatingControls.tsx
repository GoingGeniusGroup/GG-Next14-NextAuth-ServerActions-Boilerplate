import React from "react";
import { Button } from "@/components/ui/button/button";
import { PauseIcon, PlayIcon } from "lucide-react";

type FloatingControlsProps = {
  isPlaying: boolean;
  togglePlayPause: () => void;
};

const FloatingControls: React.FC<FloatingControlsProps> = ({
  isPlaying,
  togglePlayPause,
}) => (
  <div className="fixed bottom-28 right-4 z-20 flex flex-col items-end space-y-2">
    <Button
      variant="secondary"
      size="icon"
      className="rounded-full"
      onClick={togglePlayPause}
      aria-label={isPlaying ? "Pause video" : "Play video"}
    >
      {isPlaying ? (
        <PauseIcon className="size-4" />
      ) : (
        <PlayIcon className="size-4" />
      )}
    </Button>
  </div>
);

export default FloatingControls;
