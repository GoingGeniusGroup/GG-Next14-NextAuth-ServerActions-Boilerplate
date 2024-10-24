"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutIcon } from "lucide-react";

type LayoutOption = "full" | "headings" | "compact" | "gap";

type HeaderProps = {
  changeLayout: (layout: LayoutOption) => void;
};

const Header: React.FC<HeaderProps> = ({ changeLayout }) => {
  const [layouts, setLayouts] = useState({
    full: true,
    headings: false,
    compact: false,
    gap: false,
  });

  const handleLayoutChange = (layout: LayoutOption) => {
    setLayouts((prev) => {
      const newLayouts = Object.fromEntries(
        Object.keys(prev).map((key) => [key, key === layout])
      ) as typeof prev;
      changeLayout(layout);
      return newLayouts;
    });
  };

  return (
    <header className="fixed top-20 right-4 z-20">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-white text-gray-800 hover:bg-gray-100"
            aria-label="Layout Icon"
          >
            <LayoutIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-16 -mt-10">
          <DropdownMenuLabel>Layout Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={layouts.full}
            onCheckedChange={() => handleLayoutChange("full")}
          >
            Full Layout
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={layouts.headings}
            onCheckedChange={() => handleLayoutChange("headings")}
          >
            Headings Layout
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={layouts.compact}
            onCheckedChange={() => handleLayoutChange("compact")}
          >
            Compact Layout
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={layouts.gap}
            onCheckedChange={() => handleLayoutChange("gap")}
          >
            Gap Layout
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
