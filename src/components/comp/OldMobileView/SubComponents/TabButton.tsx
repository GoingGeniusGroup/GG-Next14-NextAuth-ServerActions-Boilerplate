import React from "react";
import {
  FaBell,
  FaBriefcase,
  FaStore,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import { Tab } from "../RightSideHud";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/src/ui/tooltip";

interface TabButtonProps {
  tab: Tab;
  isSelected: boolean;
  onClick: () => void;
}

const getIcon = (tab: Tab) => {
  switch (tab) {
    case "Profile":
      return <FaUserCircle className="text-black" size={17} />;
    case "Wallet":
      return <FaBriefcase className="text-black" size={17} />;
    case "Shop":
      return <FaStore className="text-black" size={17} />;
    case "Emergency":
      return <FaUsers className="text-black" size={17} />;
    case "Notifications":
      return <FaBell className="text-black" size={17} />;
  }
};

const TabButton: React.FC<TabButtonProps> = ({ tab, isSelected, onClick }) => (
  <Tooltip>
    <TooltipTrigger>
      <div
        onClick={onClick}
        className={`flex size-[26px] items-center justify-center rounded-full font-semibold shadow-black drop-shadow-lg hover:bg-blue-100 ${
          isSelected ? "bg-blue-400" : "bg-gray-300"
        }`}
      >
        {getIcon(tab)}
      </div>
    </TooltipTrigger>
    <TooltipContent>{tab}</TooltipContent>
  </Tooltip>
);

export default TabButton;
