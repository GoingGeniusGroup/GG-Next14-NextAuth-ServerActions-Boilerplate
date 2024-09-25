import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VscClearAll } from "react-icons/vsc";
import CustomToolTipLeftRight from "@/components/CustomComponents/CustomToolTipLeftRight";

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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className="group absolute -bottom-8 right-1 flex size-[26px] items-center justify-center rounded-full bg-white font-semibold text-black shadow-black drop-shadow-lg hover:bg-blue-100"
        onClick={closeAllTabs}
      >
        <VscClearAll size={17} />
        <CustomToolTipLeftRight
          content="Clear All"
          top="0"
          left={-35}
          translateY="0"
        />
      </motion.div>
    )}
  </AnimatePresence>
);

export default ClearAllButton;
