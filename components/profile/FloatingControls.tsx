import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PauseIcon, PlayIcon } from "lucide-react";

type FloatingControlsProps = {
  isPlaying: boolean;
  togglePlayPause: () => void;
  username: string;
};

const FloatingControls: React.FC<FloatingControlsProps> = ({
  isPlaying,
  togglePlayPause,
  username,
}) => (
  <div className="fixed bottom-4 right-4 z-20 flex flex-col items-end space-y-2">
    <Button
      variant="secondary"
      size="icon"
      onClick={togglePlayPause}
      aria-label={isPlaying ? "Pause video" : "Play video"}
    >
      {isPlaying ? (
        <PauseIcon className="h-4 w-4" />
      ) : (
        <PlayIcon className="h-4 w-4" />
      )}
    </Button>
    <div className="flex items-center bg-white bg-opacity-80 backdrop-blur-sm rounded-full p-2">
      <Avatar className="w-10 h-10 mr-2">
        <AvatarImage src="/placeholder.svg" alt={username} />
        <AvatarFallback>{username.charAt(0)}</AvatarFallback>
      </Avatar>
      <span className="font-semibold">{username}</span>
    </div>
  </div>
);

export default FloatingControls;
