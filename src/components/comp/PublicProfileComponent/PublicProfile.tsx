"use client";

import { useState } from "react";
import ExpressionBottomMidHud from "../Huds/ExpressionBottomMidHud";
import LeftSideViewComponent from "@/src/components/comp/PublicProfileComponent/LeftSideViewComponent";

const expressions = [
  {
    label: "neutral",
    icon: "/emojis/neutral.svg",
    bg: "#FFFFFF",
    animation: "/F_Talking_Variations_001.fbx",
  },
  {
    label: "sad",
    icon: "/emojis/sad.svg",
    bg: "#0C2E5C",
    animation: "/M_Standing_Expressions_011.fbx",
  },
  {
    label: "happy",
    icon: "/emojis/happy.svg",
    bg: "#007F13",
    animation: "/M_Standing_Expressions_012.fbx",
  },
  {
    label: "amazed",
    icon: "/emojis/amazed.svg",
    bg: "#F8BF43",
    animation: "/M_Standing_Expressions_013.fbx",
  },
  {
    label: "angry",
    icon: "/emojis/angry.svg",
    bg: "#A20325",
    animation: "/M_Standing_Expressions_016.fbx",
  },
];

interface SideViewProps {
  username: string;
}

export default function PublicProfile({ username }: SideViewProps) {
  const [currentEmote, setCurrentEmote] = useState<string>("/male-idle-3.fbx");

  const handleEmote = (emote: string) => {
    setCurrentEmote(emote);
  };

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <h2 className="text-2xl font-semibold mb-4">{username} Profile</h2>
      <LeftSideViewComponent emote={currentEmote} />
      <ExpressionBottomMidHud
        expressions={expressions}
        handleEmote={handleEmote}
      />
    </div>
  );
}
