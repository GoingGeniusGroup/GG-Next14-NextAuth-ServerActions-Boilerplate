import React from "react";
import Button from "@/src/ui/base/button/button";

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, NavButtonProps>(
  ({ icon, label, onClick, className = "", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        onClick={onClick}
        className={`size-[40px] rounded-full flex bg-white justify-center items-center hover:border-sky-500 dark:hover:border-white transition-colors duration-300 dark:bg-black border border-white/35 ${className}`}
        aria-label={label}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
