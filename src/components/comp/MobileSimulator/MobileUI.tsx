"use client";

import React from "react";
import { Button } from "@/src/ui/button";
import { Battery, Signal, Sun, Wifi } from "lucide-react";
import { ColorPicker } from "../CustomComponents/ColorPicker";
import { useMobileSimulator } from "./provider/MobileSimulatorContext";
import { ThemeType } from "@prisma/client";
import SongListMobileServer from "@/app/_components/mobile-simulator/song-list-mobile-server";
import MusicPlayerMobile from "../../music-player/music-player-mobile";
import { MobileInterfaceProps } from "./interface/MobileInterface.interface";

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
  const { currentBackground, textColor, handleTextColorChange } =
    ColorPickerAttrs;

  const handleColorChange = (color: string) => {
    const formattedColor = color.startsWith("#") ? color : `#${color}`;
    const newBackground = {
      class: `bg-[${formattedColor}]`,
      name: "Custom Color",
    };
    updateCurrentBackground(newBackground);
  };

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
      className={`p-2 rounded-[1.5rem] w-full max-w-[375px] mx-auto h-full overflow-y-auto ${
        currentBackground.name !== "Custom Color" ? currentBackground.class : ""
      } border-2 border-black relative`}
      style={{
        ...backgroundStyle,
        color: textColor,
      }}
    >
      {/* Status Bar */}
      <div className="flex justify-between items-center mb-2 px-3 py-1 bg-black/20 rounded-full text-white text-[10px]">
        <div>9:41</div>
        <div className="flex items-center space-x-1">
          <Signal size={10} />
          <Wifi size={10} />
          <Battery size={10} />
        </div>
      </div>

      {/* Weather Widget */}
      <div className="sticky top-0 flex justify-between items-center mb-3 rounded-lg bg-white/20 p-2 backdrop-blur-lg">
        <div>
          <p className="text-[10px]">WED</p>
          <p className="text-base font-bold">10:26 AM</p>
        </div>
        <div className="flex items-center">
          <p className="text-sm mr-1">21°C</p>
          <Sun size={14} />
        </div>
      </div>

      {/* Music Player Integration */}
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 mb-3">
        <h3 className="font-bold text-xs mb-1 uppercase">Now Playing</h3>
        <div className="flex flex-col gap-2">
          <div className="w-full">
            <MusicPlayerMobile />
          </div>
        </div>
      </div>

      {/* App Icons */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {sections.map((section) => (
          <Button
            key={`${section.id}-${section.title}`}
            variant="ghost"
            size="sm"
            className="aspect-square bg-white/20 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center p-1"
            onClick={() => toggleScreen(section)}
          >
            {React.cloneElement(section.icon as React.ReactElement, {
              size: 20,
            })}
            <span className="text-[8px] mt-1">{section.title}</span>
          </Button>
        ))}
      </div>

      {/* Background Changer */}
      <div className="bg-white bg-opacity-20 rounded-lg p-2 shadow-md mb-3">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <h1 className="text-[10px] font-bold mb-1">THEME</h1>
            <ColorPicker
              value={
                currentBackground.name === "Custom Color"
                  ? currentBackground.class.match(
                      /bg-\[(#[0-9A-Fa-f]{6})\]/
                    )?.[1] || ""
                  : ""
              }
              onChange={handleColorChange}
              typeColor={ThemeType.THEME}
            />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-[10px] font-bold mb-1">TEXT</h1>
            <ColorPicker
              value={textColor}
              onChange={handleTextColorChange}
              typeColor={ThemeType.TEXT}
            />
          </div>
        </div>
      </div>

      {/* Change Schedule */}
      <div className="bg-white bg-opacity-20 rounded-lg p-2 shadow-md mb-3">
        <h3 className="font-bold text-xs mb-1 uppercase">Change Schedule</h3>
        <div className="grid grid-cols-7 gap-1">
          {scheduleData.map((day, index) => (
            <div key={index} className="text-center">
              <p className="text-[8px] font-semibold mb-1">{day.day}</p>
              <div className="flex flex-col gap-[2px]">
                {day.schedule.map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    className={`h-1 w-full rounded-sm ${
                      slot ? "bg-green-400" : "bg-black/70"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Home Indicator */}
      <div
        className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-white rounded-full"
        onClick={closeAllScreens}
      ></div>
    </div>
  );
};

export default MobileUI;
