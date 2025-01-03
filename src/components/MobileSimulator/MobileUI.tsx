"use client";

import { Battery, Signal, Wifi } from "lucide-react";
import { useMobileSimulator } from "./provider/MobileSimulatorContext";
import MusicPlayerMobile from "../music-player/music-player-mobile";
import { MobileInterfaceProps } from "./interface/MobileInterface.interface";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/ui/tooltip/tooltip";
import IconButton from "@/src/layout/base/button/icon-button";
import React from "react";

import { useSession } from "next-auth/react";

const scheduleData = [
  { day: "S", schedule: [1, 0, 1, 1, 0, 1, 0] },
  { day: "M", schedule: [1, 1, 1, 0, 0, 1, 1] },
  { day: "T", schedule: [0, 1, 1, 1, 1, 0, 0] },
  { day: "W", schedule: [1, 0, 0, 1, 1, 1, 0] },
  { day: "T", schedule: [0, 1, 1, 0, 1, 1, 1] },
  { day: "F", schedule: [1, 1, 0, 0, 1, 0, 1] },
  { day: "S", schedule: [0, 0, 1, 1, 0, 1, 1] },
];

const MobileUI: React.FC<MobileInterfaceProps> = ({
  sections,
  toggleScreen,
  closeAllScreens,
  backgrounds,
  screens,
  updateCurrentBackground,
}) => {
  const { ColorPickerAttrs } = useMobileSimulator();
  const { currentBackground, textColor } = ColorPickerAttrs;

  const { status } = useSession();
  // Directly compute isLoggedIn from session status
  const isLoggedIn = status === "authenticated";

  const backgroundStyle =
    currentBackground.name === "Custom Color"
      ? {
          backgroundColor: currentBackground.class
            .replace("bg-[", "")
            .replace("]", ""),
        }
      : {};

  return (
    <div
      className={`relative p-2 rounded-[1.5rem] w-full max-w-[375px] mx-auto h-full overflow-y-auto overflow-x-hidden ${
        currentBackground.name !== "Custom Color" ? currentBackground.class : ""
      } border-[4px] border-black relative`}
      style={{
        ...backgroundStyle,
        color: textColor,
      }}
    >
      {/* Status Bar */}
      <div className="flex justify-between items-center mb-2 px-5 py-2 text-xs font-medium ">
        <div>9:41</div>
        <div className="absolute left-1/2 top-2 transform -translate-x-1/2 w-[40%] h-[30px] bg-black rounded-full "></div>
        <div className="flex items-center space-x-1">
          <Signal size={12} />
          <Wifi size={12} />
          <Battery size={12} />
        </div>
      </div>

      {/* Weather Widget */}
      <div className="flex justify-between items-center mb-4 rounded-2xl bg-black/10 backdrop-blur-md p-3 mx-2">
        <div>
          <p className="text-xs font-semibold">San Francisco</p>
          <p className="text-2xl font-bold">21°C</p>
        </div>
        <div className="text-right">
          <p className="text-xs">Sunny</p>
          <p className="text-sm">H:24° L:18°</p>
        </div>
      </div>

      {/* App Icons */}
      <div
        className={`grid mb-4 px-2 sticky top-2 ${
          isLoggedIn ? "grid-cols-4 gap-4" : "grid-cols-5 gap-2"
        }`}
      >
        {sections.slice(0, 8).map((section) => (
          <div
            key={`${section.id}-${section.title}`}
            className="flex justify-center items-center"
          >
            <Tooltip>
              <TooltipTrigger>
                <IconButton
                  onClick={() => toggleScreen(section)}
                  icon={
                    <>
                      {React.cloneElement(section.icon as React.ReactElement, {
                        size: 16,
                      })}
                    </>
                  }
                  label="music toggle button"
                />
              </TooltipTrigger>
              <TooltipContent>
                <span>{section.title}</span>
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </div>

      {/* Change Schedule Widget */}
      <div className=" rounded-2xl p-2">
        <h3 className="font-semibold text-sm mb-2">Weekly Schedule</h3>
        <div className="grid grid-cols-7 gap-1 border rounded-lg p-1">
          {scheduleData.map((day, index) => (
            <div key={index} className="text-center">
              <p className="text-[10px] font-medium mb-1">{day.day}</p>
              <div className="flex flex-col gap-[2px]">
                {day.schedule.map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    className={`h-2 w-full rounded-sm ${
                      slot ? "bg-green-400" : "bg-pink-500/30"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="w-full p-2 mb-2">
        <h3 className="font-bold mb-2 text-sm">MY LOCATION</h3>
        <div className="h-[150px] rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.73818016624!2d85.33933297611345!3d27.69448592605728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19c7d1a7a207%3A0x77e34747e9b911e7!2sGoing%20Genius%20Group%20of%20Company%20Pvt%20Ltd!5e0!3m2!1sen!2snp!4v1727263172982!5m2!1sen!2snp"
            width="100%"
            height="150"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Music Player Widget */}
      <div className="p-2">
        <h3 className="font-semibold text-sm mb-2 ">Now Playing</h3>
        <div className="border rounded-lg p-1">
          <MusicPlayerMobile />
        </div>
      </div>

      {/* Home Indicator */}
      <div
        className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-red-500 rounded-full"
        onClick={closeAllScreens}
      ></div>
    </div>
  );
};

export default MobileUI;
