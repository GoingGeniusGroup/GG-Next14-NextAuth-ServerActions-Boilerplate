"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Play,
  SkipBack,
  SkipForward,
  Sun,
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
  return (
    <div
      className={`p-3 rounded-lg max-w-md mx-auto h-full overflow-y-auto ${currentBackground.class}`}
    >
      {/* Top bar */}
      <div className="sticky top-0 flex justify-between items-center mb-4 rounded-lg bg-white/20 p-2 backdrop-blur-lg">
        <div>
          <p className="text-xs">WED</p>
          <p className="text-xl font-bold">10:26 AM</p>
        </div>
        <div className="flex items-center cursor-pointer hover:scale-105 transition-transform">
          <p className="text-lg mr-2">21°C</p>
          <Sun size={17} />
        </div>
      </div>

      {/* Media controls */}
      <div className="sticky top-1 flex justify-center space-x-4 mb-4 z-20">
        <Button variant="ghost" size="mini">
          <SkipBack />
        </Button>
        <Button variant="ghost" size="mini" className="text-green-400">
          <Play />
        </Button>
        <Button variant="ghost" size="mini">
          <SkipForward />
        </Button>
      </div>

      {/* Change Schedule */}
      <div className="bg-white bg-opacity-20 rounded-lg p-2 shadow-md mb-4">
        <h3 className="font-bold text-sm mb-2 uppercase">Change Schedule</h3>
        <div className="grid grid-cols-7 gap-2">
          {scheduleData.map((day, index) => (
            <div key={index} className="text-center">
              <p className="text-[10px] font-semibold mb-1">{day.day}</p>
              <div className="flex flex-col gap-1">
                {day.schedule.map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    className={`h-2 w-full rounded ${
                      slot ? "bg-green-400" : "bg-black/70"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* "I want to be..." Section */}
        <div className="bg-white bg-opacity-20 rounded-lg p-2 shadow-md">
          <p className="text-sm mb-1">I want to be...</p>
          <p className="text-xl font-semibold">
            What will I be when I wake up?
          </p>
        </div>

        {/* Background Changer */}
        <div className="bg-white bg-opacity-20 rounded-lg p-2 shadow-md">
          <h3 className="font-bold text-sm text-center mb-2">CHANGE BG</h3>
          <div className="relative flex flex-wrap gap-1">
            {backgrounds.map((bg, index) => (
              <Button
                key={index}
                variant={currentBackground === bg ? "outline" : "ghost"}
                className={`group p-1 text-xs transition-transform duration-200 ease-in-out transform hover:scale-105 ${
                  bg.class
                } ${
                  currentBackground === bg
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                } rounded-full shadow-sm`}
                onClick={() => updateCurrentBackground(bg)} // Update the background when clicked
              ></Button>
            ))}
          </div>
        </div>
      </div>

      {/* My Location */}
      <div className="bg-white bg-opacity-20 rounded-lg p-2 shadow-md mb-16">
        <h3 className="font-bold mb-2 text-sm">MY LOCATION</h3>
        <div className="h-[150px] rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.73818016624!2d85.33933297611345!3d27.69448592605728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19c7d1a7a207%3A0x77e34747e9b911e7!2sGoing%20Genius%20Group%20of%20Company%20Pvt%20Ltd!5e0!3m2!1sen!2snp!4v1727263172982!5m2!1sen!2snp"
            width="310"
            height="150"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Bottom nav bar */}
      <div className="fixed right-0 left-0 bottom-6 z-30 flex h-[34px] mx-7 select-none justify-between space-x-[6px] rounded-full bg-white px-4 py-[4px] shadow-lg shadow-black/50">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant="ghost"
            size="small"
            className={`group transition-all bg-black text-white p-2 rounded-full ${
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
                  <GiRamProfile size={16} />
                ) : section.title === "Shop" ? (
                  <BsShop size={16} />
                ) : section.title === "Wallet" ? (
                  <BsWallet2 size={16} />
                ) : section.title === "Notifications" ? (
                  <BsBellFill size={16} />
                ) : section.title === "Message" ? (
                  <BsChat size={16} />
                ) : section.title === "Emergency" ? (
                  <MdOutlineEmergency size={16} />
                ) : (
                  <Edit size={16} />
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
