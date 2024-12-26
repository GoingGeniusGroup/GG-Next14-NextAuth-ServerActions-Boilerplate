"use client";

import React from "react";
import { ColorPicker } from "../comp/CustomComponents/ColorPicker";
import { useMobileSimulator } from "../comp/MobileSimulator/provider/MobileSimulatorContext";
import { ThemeType } from "@prisma/client";

const MobileSettingsClient = () => {
  const { ColorPickerAttrs } = useMobileSimulator();
  const {
    currentBackground,
    setCurrentBackground,
    textColor,
    handleTextColorChange,
  } = ColorPickerAttrs;

  const handleColorChange = (color: string) => {
    const formattedColor = color.startsWith("#") ? color : `#${color}`;
    const newBackground = {
      class: `bg-[${formattedColor}]`,
      name: "Custom Color",
    };
    setCurrentBackground(newBackground);
  };
  return (
    <div>
      {" "}
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
    </div>
  );
};

export default MobileSettingsClient;
