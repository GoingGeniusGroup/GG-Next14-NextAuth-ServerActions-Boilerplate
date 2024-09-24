import React from "react";
import { Button } from "@/components/ui/button";

interface AnimatedGradientButtonProps {
  isPending: boolean;
  type: "submit" | "reset" | "button" | undefined;
  children: React.ReactNode;
}

const AnimatedGradientButton: React.FC<AnimatedGradientButtonProps> = ({
  isPending,
  type,
  children,
}) => {
  return (
    <Button
      type={type}
      disabled={isPending}
      className={`
        w-full mt-6 py-2 rounded-lg
        transition-all duration-500 ease-in-out
        ${isPending
          ? "bg-gradient-to-r from-gray-500 to-gray-700 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-500 to-black hover:from-black/60 hover:to-white bg-[length:200%_200%] animate-gradient"
        }
        ${!isPending && "hover:shadow-lg hover:duration-500"}
      `}
    >
      {children}
    </Button>
  );
};

export default AnimatedGradientButton;
