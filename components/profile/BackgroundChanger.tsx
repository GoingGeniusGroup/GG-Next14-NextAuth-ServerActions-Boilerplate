import React from "react";
import { Button } from "@/components/ui/button";
import { SkipForwardIcon, UploadIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type BackgroundChangerProps = {
  videos: string[];
  changeVideo: (index: number) => void;
};

const BackgroundChanger: React.FC<BackgroundChangerProps> = ({
  videos,
  changeVideo,
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 left-4 z-20"
        aria-label="Change background"
      >
        <SkipForwardIcon className="h-4 w-4" />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Choose Background</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-3 gap-4">
        {videos.map((video, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => changeVideo(index)}
          >
            <video
              src={video}
              className="w-full h-24 object-cover rounded-lg"
            />
          </div>
        ))}
        <div className="flex items-center justify-center bg-gray-200 rounded">
          <Button variant="ghost">
            <UploadIcon className="h-6 w-6 mr-2" />
            Upload
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export default BackgroundChanger;
