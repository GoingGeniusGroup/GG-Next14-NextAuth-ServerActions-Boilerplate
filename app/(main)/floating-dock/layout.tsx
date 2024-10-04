"use client";

import { FloatingDockDemo } from "@/components/AceternityUI/FloatingDock";
import { useState } from "react";

export default function FloatingDockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bgColor, setBgColor] = useState(
    "bg-gradient-to-br from-black to-white"
  );
  const handleBgColor = (color: string) => {
    setBgColor(color);
  };
  return (
    <div className={`flex flex-col h-screen overflow-hidden ${bgColor}`}>
      <div className="w-full pl-6 mt-10">
        <FloatingDockDemo handleBgColor={handleBgColor} />
      </div>
      <div className="relative flex-grow overflow-y-auto p-8">{children}</div>
    </div>
  );
}
