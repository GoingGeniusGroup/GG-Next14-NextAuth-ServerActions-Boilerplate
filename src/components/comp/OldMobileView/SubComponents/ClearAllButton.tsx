import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VscClearAll } from "react-icons/vsc";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/src/ui/tooltip";

interface ClearAllButtonProps {
  showClearAll: boolean;
  selectedTabsLength: number;
  closeAllTabs: () => void;
}

const ClearAllButton: React.FC<ClearAllButtonProps> = ({
  showClearAll,
  selectedTabsLength,
  closeAllTabs,
}) => (
  <AnimatePresence>
    {showClearAll && selectedTabsLength > 0 && (
      <Tooltip>
        <TooltipTrigger>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="group absolute -bottom-8 right-1 flex size-[26px] items-center justify-center rounded-full bg-white font-semibold text-black shadow-black drop-shadow-lg hover:bg-blue-100"
            onClick={closeAllTabs}
          >
            <VscClearAll size={17} />
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>Clear All</TooltipContent>
      </Tooltip>
    )}
  </AnimatePresence>
);

export default ClearAllButton;
