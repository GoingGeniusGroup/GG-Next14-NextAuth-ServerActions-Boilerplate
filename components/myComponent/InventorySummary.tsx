import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import type { IconType } from 'react-icons';

const summaryData = [
  {
    icon: IoPersonCircleOutline,
    value: 868,
    label: "Quantity in Hand",
    iconColor: "text-blue-500",
  },
  {
    icon: TbCategory,
    value: 200,
    label: "To be received",
    iconColor: "text-green-300",
  },
];

// Define props type for InventorySummaryItem
interface InventorySummaryItemProps {
  icon: IconType; // IconType from react-icons to handle the icon component
  value: number | string;
  label: string;
  iconColor: string; // Tailwind class as string
}

// InventorySummaryItem component with typed props
const InventorySummaryItem: React.FC<InventorySummaryItemProps> = ({ icon: Icon, value, label, iconColor }) => {
  return (
    <div className="flex flex-col text-center gap-y-2">
      <div className="flex justify-center">
        {/* Render icon with dynamic component */}
        <Icon className={`text-3xl ${iconColor}`} />
      </div>
      <div>
        <p>{value}</p>
        <h4>{label}</h4>
      </div>
    </div>
  );
};

const InventorySummary: React.FC = () => {
  return (
    <div className="bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-25 border border-gray-100 border-opacity-35 flex flex-col gap-y-4 p-5 w-5/12 text-white">
      <div>
        <h2 className="capitalize text-lg">Inventory Summary</h2>
      </div>
      <div className="flex justify-between w-auto">
        {summaryData.map((item, index) => (
          <InventorySummaryItem
            key={index}
            icon={item.icon}
            value={item.value}
            label={item.label}
            iconColor={item.iconColor}
          />
        ))}
      </div>
    </div>
  );
};

export default InventorySummary;
