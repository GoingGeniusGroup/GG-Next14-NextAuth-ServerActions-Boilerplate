"use client";

import { useState } from "react";
import { FloatingDockDemo } from "@/components/AceternityUI/FloatingDock";

export default function FloatingDock() {
  const [bgColor, setBgColor] = useState(
    "bg-gradient-to-br from-black to-white"
  );
  const handleBgColor = (color: string) => {
    setBgColor(color);
  };
  return (
    <div className={`relative h-screen p-8 ${bgColor}`}>
      <div className="absolute top-[8%] left-[5%]">
        <FloatingDockDemo handleBgColor={handleBgColor} />
      </div>
    </div>
  );
}
