"use client";

import React from "react";
import { ColorPicker } from "../comp/CustomComponents/ColorPicker";
import { useMobileSimulator } from "../MobileSimulator/provider/MobileSimulatorContext";
import { ThemeType } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/ui/card";

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
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Appearance Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Theme Color</span>
            <div className="flex flex-col items-center">
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
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Text Color</span>
            <div className="flex flex-col items-center">
              <ColorPicker
                value={textColor}
                onChange={handleTextColorChange}
                typeColor={ThemeType.TEXT}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileSettingsClient;
