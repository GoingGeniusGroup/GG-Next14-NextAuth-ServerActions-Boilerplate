import React from "react";
import { Button } from "@/components/ui/button";
// import { SkipForwardIcon, UploadIcon } from "lucide-react";
import { CiImageOn } from "react-icons/ci";
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
        <CiImageOn className="h-4 w-4" />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Choose Background</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-3 gap-4 w-full">
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
      </div>
      {/* Premium Feature */}
      {/* <div className="flex justify-center">
        <Button
          variant="ghost"
          className="bg-black text-white hover:text-black"
        >
          <UploadIcon className="h-6 w-6 mr-2" />
          Upload
        </Button>
      </div> */}
    </DialogContent>
  </Dialog>
);

export default BackgroundChanger;
