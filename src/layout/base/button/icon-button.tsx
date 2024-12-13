import React from "react";
import Button from "@/src/ui/base/button/button";

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const IconButton: React.FC<NavButtonProps> = ({ icon, label, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="size-[40px] rounded-full flex bg-white text-pink-500 justify-center items-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300 dark:bg-black dark:text-white  border border-white/35"
      aria-label={label}
    >
      {icon}
    </Button>
  );
};

export default IconButton;
