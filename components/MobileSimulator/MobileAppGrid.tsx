import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scrollarea";

interface Section {
  id: number;
  title: string;
  content: React.ReactNode;
}

interface MobileAppGridProps {
  sections: Section[];
  toggleScreen: (section: Section) => void;
  closeAllScreens: () => void;
  screens: Section[];
}

const MobileAppGrid: React.FC<MobileAppGridProps> = ({
  sections,
  toggleScreen,
  closeAllScreens,
  screens,
}) => {
  return (
    <ScrollArea className="fixed bottom-0 left-0 w-full h-full bg-gray-900 bg-opacity-70 rounded-t-2xl shadow-md pt-6 pb-10 px-6 md:relative md:shadow-none">
      <h1 className="text-3xl font-semibold mb-6 text-blue-300 text-center">
        User&apos;s Mobile
      </h1>

      {/* App Icons */}
      <div className="grid grid-cols-3 gap-5 justify-center">
        {sections.map((section) => (
          <div key={section.id} className="relative group">
            {/* Red minus button for edit mode */}
            <button className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100">
              -
            </button>

            <Button
              variant="outline"
              className={`w-full h-20 bg-gradient-to-b from-transparent to-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg transition-all
                ${
                  screens.some((screen) => screen.id === section.id)
                    ? "bg-blue-500 bg-opacity-50 hover:bg-blue-600 hover:bg-opacity-70"
                    : "hover:bg-white hover:bg-opacity-10"
                }`}
              onClick={() => toggleScreen(section)}
            >
              {/* Icon or App title */}
              {section.title}
            </Button>
          </div>
        ))}
      </div>

      {/* Close All Button */}
      <Button
        variant="destructive"
        className="w-full mt-6 fixed bottom-5 rounded-xl"
        onClick={closeAllScreens}
      >
        Close All
      </Button>
    </ScrollArea>
  );
};

export default MobileAppGrid;
