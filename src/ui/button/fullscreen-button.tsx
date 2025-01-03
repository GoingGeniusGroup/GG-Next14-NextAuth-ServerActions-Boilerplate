"use client";

import { Maximize, Minimize, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import IconButton from "@/src/layout/base/button/icon-button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/tooltip";

type ScreenOrientationType = "portrait" | "landscape";

interface ScreenOrientationAPI extends ScreenOrientation {
  lock(orientation: ScreenOrientationType): Promise<void>;
  unlock(): void;
}

export default function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  const checkMobile = useCallback(() => {
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }, []);

  const checkOrientation = useCallback(() => {
    setIsLandscape(window.orientation === 90 || window.orientation === -90);
  }, []);

  const toggleFullscreenOrRotate = useCallback(() => {
    if (isMobile) {
      if ("orientation" in screen && "lock" in screen.orientation) {
        (screen.orientation as ScreenOrientationAPI)
          .lock(isLandscape ? "portrait" : "landscape")
          .catch((error: Error) => {
            console.error(
              `Error attempting to lock orientation: ${error.message}`
            );
          });
      } else {
        console.warn("Screen Orientation API not supported");
      }
    } else {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((error: Error) => {
          console.error(
            `Error attempting to enable fullscreen: ${error.message}`
          );
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  }, [isMobile, isLandscape]);

  useEffect(() => {
    checkMobile();
    checkOrientation();

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleOrientationChange = () => {
      checkOrientation();
    };

    window.addEventListener("orientationchange", handleOrientationChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [checkMobile, checkOrientation]);

  const buttonText = isMobile
    ? isLandscape
      ? "Portrait"
      : "Landscape"
    : isFullscreen
    ? "Exit Fullscreen"
    : "Fullscreen";

  const ButtonIcon = isMobile ? RotateCcw : isFullscreen ? Minimize : Maximize;

  return (
    <Tooltip>
      <TooltipTrigger>
        <IconButton
          onClick={toggleFullscreenOrRotate}
          icon={<ButtonIcon className="h-4 w-4 dark:text-white text-black" />}
          label={buttonText}
        />
      </TooltipTrigger>
      <TooltipContent>
        <span>{buttonText}</span>
      </TooltipContent>
    </Tooltip>
  );
}
