import React from "react";
import { Button } from "@/src/ui/button";

interface NavButtonProps {
  label: string;
  onClick?: () => void;
}

const DefaultButton: React.FC<NavButtonProps> = ({ label, onClick }) => {
  return (
    <Button
      onClick={onClick}
      aria-label={label}
      className="uppercase pt-[8px] pb-[10px] px-[16px] font-semibold rounded-full"
    >
      {label}
    </Button>
  );
};

export default DefaultButton;
