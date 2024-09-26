import React from "react";
import { Button } from "@/components/ui/button/button";
import { Shuffle, SortAsc, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ControlPanelProps = {
  onShuffle: () => void;
  onSort: () => void;
  onFilter: (filter: string) => void;
};

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onShuffle,
  onSort,
  onFilter,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={onShuffle}
        variant="outline"
        size="sm"
        className="flex items-center"
        aria-label="Randomize"
      >
        <Shuffle className="w-4 h-4 mr-2" />
        Randomize
      </Button>
      <Button
        onClick={onSort}
        variant="outline"
        size="sm"
        className="flex items-center"
        aria-label="Sort By Title"
      >
        <SortAsc className="w-4 h-4 mr-2" />
        Sort by Title
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            aria-label="Filter By Title"
          >
            Filter by Title
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {["A", "B", "C"].map((letter) => (
            <DropdownMenuItem key={letter} onClick={() => onFilter(letter)}>
              Starts with {letter}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem onClick={() => onFilter("")}>
            Clear Filter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
