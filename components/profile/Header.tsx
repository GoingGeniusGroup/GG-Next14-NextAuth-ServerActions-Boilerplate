"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LayoutIcon, ChevronDownIcon } from "lucide-react";

type LayoutOption = {
  value: "full" | "headings" | "compact" | "gap";
  label: string;
  icon: React.ReactNode;
};

const layoutOptions: LayoutOption[] = [
  {
    value: "full",
    label: "Full Layout",
    icon: <LayoutIcon className="h-4 w-4" />,
  },
  {
    value: "headings",
    label: "Headings Layout",
    icon: <LayoutIcon className="h-4 w-4" />,
  },
  {
    value: "compact",
    label: "Compact Layout",
    icon: <LayoutIcon className="h-4 w-4" />,
  },
  {
    value: "gap",
    label: "Gap Layout",
    icon: <LayoutIcon className="h-4 w-4" />,
  },
];

type HeaderProps = {
  changeLayout: (layout: "full" | "headings" | "compact" | "gap") => void;
};

const Header: React.FC<HeaderProps> = ({ changeLayout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-4 right-4 z-20">
      <DropdownMenu onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-white text-gray-800 hover:bg-gray-100 transition-colors duration-200"
          >
            <LayoutIcon className="h-4 w-4 mr-2" />
            Layout
            <ChevronDownIcon
              className={`h-4 w-4 ml-1 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-56 bg-white rounded-md shadow-lg p-2 transition-all duration-200 origin-top-right"
          align="end"
          sideOffset={5}
        >
          {layoutOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => changeLayout(option.value)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors duration-150"
            >
              {option.icon}
              <span>{option.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
