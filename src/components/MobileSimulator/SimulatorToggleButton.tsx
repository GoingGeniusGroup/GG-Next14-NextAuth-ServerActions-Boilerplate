import { motion } from "framer-motion";
import { Button } from "@/src/ui/button/button";
import { Smartphone } from "lucide-react";
import { RxCross2 } from "react-icons/rx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/ui/tooltip/tooltip";
import IconButton from "@/src/layout/base/button/icon-button";

interface SimulatorToggleButtonProps {
  showMobile: boolean;
  setShowMobile: (value: boolean) => void;
}

export default function SimulatorToggleButton({
  showMobile,
  setShowMobile,
}: SimulatorToggleButtonProps) {
  return (
    <motion.div
      layout
      className="fixed right-[5px] md:right-[20px] z-50 flex top-[47%] select-none flex-col items-center space-y-[6px] rounded-full dark:bg-black bg-white shadow-lg shadow-black/50 transition-all duration-500 ease-in-out"
    >
      {/* Toggle button for mobile view */}
      <Tooltip>
        <TooltipTrigger>
          <IconButton
            onClick={() => setShowMobile(!showMobile)}
            icon={<Smartphone className="size-4 text-black dark:text-white" />}
            label="music toggle button"
          />
        </TooltipTrigger>
        <TooltipContent>
          <span>Mobile SIM</span>
        </TooltipContent>
      </Tooltip>

      {showMobile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Button
            variant="animated_spin"
            size="mini"
            className="text-white font-bold hover:text-black z-40 bg-red-500 rounded-full"
            onClick={() => setShowMobile(false)}
          >
            <RxCross2 size={10} />
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
