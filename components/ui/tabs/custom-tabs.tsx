"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
  icon: React.ReactNode;
};

export const CollapsibleSidebarTabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState(propTabs[0]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-full gap-x-3 text-black dark:text-white">
      <motion.div
        initial={false}
        animate={{ width: isCollapsed ? 60 : 240 }}
        className={cn("flex flex-col border rounded-lg", containerClassName)}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-4 hover:bg-gray-700 rounded-t-md transition-colors"
        >
          <Menu size={24} />
        </button>
        {propTabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActive(tab)}
            className={cn(
              "flex items-center p-4 text-gray-500 hover:text-sky-600 transition-colors",
              active.value === tab.value &&
                "text-black dark:text-white font-semibold",
              tabClassName,
              active.value === tab.value && activeTabClassName
            )}
          >
            <span className="mr-3">{tab.icon}</span>
            {!isCollapsed && <span>{tab.title}</span>}
          </button>
        ))}
      </motion.div>
      <div className="flex-1 border rounded-lg overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.value}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "p-4 h-full relative overflow-y-auto",
              contentClassName
            )}
          >
            {active.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
