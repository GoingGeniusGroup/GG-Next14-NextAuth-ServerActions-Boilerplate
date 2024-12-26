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
      className="size-[40px] rounded-full flex bg-white justify-center items-center hover:border-sky-500  dark:hover:border-white transition-colors duration-300 dark:bg-black  border border-white/35"
      aria-label={label}
    >
      {icon}
    </Button>
  );
};

export default IconButton;
