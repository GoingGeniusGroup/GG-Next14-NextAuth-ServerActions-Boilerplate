import React from "react";
import { Button } from "@/src/ui/button";

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const IconButton: React.FC<NavButtonProps> = ({ icon, label, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="size-[40px] rounded-full dark:bg-black dark:text-white bg-white text-black"
      aria-label={label}
    >
      {icon}
    </Button>
  );
};

export default IconButton;
