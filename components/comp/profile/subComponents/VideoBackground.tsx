import React, { useRef, useEffect } from "react";

type VideoBackgroundProps = {
  src: string;
  isPlaying: boolean;
};

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src,
  isPlaying,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, src]);

  return (
    <video
      ref={videoRef}
      src={src}
      className="absolute top-0 left-0 w-full h-full object-cover"
      loop
      muted
    />
  );
};

export default VideoBackground;
