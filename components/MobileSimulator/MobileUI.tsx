"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Play,
  SkipBack,
  SkipForward,
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  CheckCircle,
  Edit,
  X,
} from "lucide-react";
import { GiRamProfile } from "react-icons/gi";
import { BsBellFill, BsChat, BsShop, BsWallet2 } from "react-icons/bs";
import { MdOutlineEmergency } from "react-icons/md";
import CustomToolTip from "../CustomComponents/CustomToolTip";
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
  currentBackground,
  updateCurrentBackground,
}) => {
  const [currentWeather, setCurrentWeather] = useState({ icon: Sun, temp: 21 });

  const changeWeather = () => {
    const weathers = [
      { icon: Sun, temp: 28 },
      { icon: Cloud, temp: 21 },
      { icon: CloudRain, temp: 18 },
      { icon: Snowflake, temp: 2 },
    ];
    const newWeather = weathers[Math.floor(Math.random() * weathers.length)];
    setCurrentWeather(newWeather);
  };

  return (
    <div
      className={`text-white p-6 rounded-lg max-w-md mx-auto h-full overflow-y-auto ${currentBackground.class}`}
    >
      {/* Top bar */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-300">WED</p>
          <p className="text-2xl font-bold">10:26 AM</p>
        </div>
        <div
          className="flex items-center cursor-pointer hover:scale-105 transition-transform"
          onClick={changeWeather}
        >
          <p className="text-xl mr-2">{currentWeather.temp}°C</p>
          <currentWeather.icon size={24} />
        </div>
      </div>

      {/* Media controls */}
      <div className="flex justify-center space-x-6 mb-6">
        <Button variant="ghost" size="icon">
          <SkipBack />
        </Button>
        <Button variant="ghost" size="icon" className="text-green-400">
          <Play />
        </Button>
        <Button variant="ghost" size="icon">
          <SkipForward />
        </Button>
      </div>

      {/* Change Schedule */}
      <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
        <h3 className="text-red-400 font-semibold mb-3">Change Schedule</h3>
        <div className="grid grid-cols-7 gap-2">
          {scheduleData.map((day, index) => (
            <div key={index} className="text-center">
              <p className="text-xs font-bold">{day.day}</p>
              <div className="flex flex-col gap-1">
                {day.schedule.map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    className={`h-3 w-full rounded ${
                      slot ? "bg-green-500" : "bg-gray-600"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* "I want to be..." Section */}
      <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
        <p className="text-gray-300 text-sm">I want to be...</p>
        <p className="text-lg">What will I be when I wake up?</p>
      </div>

      {/* My Location */}
      <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
        <h3 className="font-semibold mb-2">My Location</h3>
        <div className="bg-blue-300 h-24 rounded-lg"></div>
      </div>

      {/* Background Changer */}
      <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-16">
        <h3 className="font-semibold mb-3">Change Background</h3>
        <div className="flex flex-wrap gap-2">
          {backgrounds.map((bg, index) => (
            <Button
              key={index}
              variant={currentBackground === bg ? "default" : "outline"}
              className="text-xs transition-transform hover:scale-105"
              onClick={() => updateCurrentBackground(bg)} // Update the background when clicked
            >
              {bg.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Bottom nav bar */}
      <div className="fixed right-0 left-0 bottom-6 z-30 flex h-[34px] mx-7 select-none justify-between space-x-[6px] rounded-full bg-white px-4 py-[4px] shadow-lg shadow-black/50">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant="ghost"
            size="small"
            className={`group transition-all bg-black p-2 rounded-full ${
              screens.some((screen) => screen.id === section.id)
                ? "bg-blue-500 bg-opacity-50 hover:bg-blue-600 hover:bg-opacity-70"
                : "hover:bg-black hover:bg-opacity-30"
            }`}
            onClick={() => toggleScreen(section)}
          >
            {screens.some((screen) => screen.id === section.id) ? (
              <CheckCircle className="text-black" size={16} />
            ) : (
              <>
                {section.title === "Profile" ? (
                  <GiRamProfile className="group text-gray-200" size={16} />
                ) : section.title === "Shop" ? (
                  <BsShop className="text-gray-200" size={16} />
                ) : section.title === "Wallet" ? (
                  <BsWallet2 className="text-gray-200" size={16} />
                ) : section.title === "Notifications" ? (
                  <BsBellFill className="text-gray-200" size={16} />
                ) : section.title === "Message" ? (
                  <BsChat className="text-gray-200" size={16} />
                ) : section.title === "Emergency" ? (
                  <MdOutlineEmergency className="text-gray-200" size={16} />
                ) : (
                  <Edit className="text-gray-200" size={16} />
                )}
              </>
            )}
            <CustomToolTip content="HUD" top="10" left="-9" translateY="30" />
          </Button>
        ))}
      </div>
      <Button
        variant="ghost"
        size="small"
        className="absolute bottom-16 right-2 text-white hover:text-black bg-red-500 hover:bg-red-600 rounded-full w-6 h-6"
        onClick={closeAllScreens}
      >
        <X size={17} />
      </Button>
    </div>
  );
};

export default MobileUI;
