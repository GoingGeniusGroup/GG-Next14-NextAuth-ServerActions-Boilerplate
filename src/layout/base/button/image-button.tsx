import Image from "next/image";
import React from "react";
import { Button } from "@/src/ui/button";

interface NavButtonProps {
  label: string;
  icon: string;
  iconName: string;
  onClick?: () => void;
}

const ImageButton: React.FC<NavButtonProps> = ({
  label,
  icon,
  iconName,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      className="uppercase pt-[8px] pb-[10px] pl-[14px] pr-[16px] font-semibold rounded-full flex items-center space-x-[6px]"
    >
      <Image
        src={icon}
        alt={`${iconName} icon`}
        height={14}
        width={14}
        className="pt-[2px]"
      />
      <span>{label}</span>
    </Button>
  );
};

export default ImageButton;
