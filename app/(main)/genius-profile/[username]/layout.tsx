"use client";

import TopFloatingDock from "@/components/ui/dock/top-radial-dock";
import {
  IconExposure,
  IconHome,
  IconPhoto,
  IconTool,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface ProfileViewProps {
  params: {
    username: string;
  };
  children: React.ReactNode;
}

type Tab = {
  title: string;
  link: string;
  icon: React.ReactNode;
};
export default function ProfileLayout({ params, children }: ProfileViewProps) {
  const username = params.username;

  const tabs: Tab[] = [
    {
      title: "Home",
      icon: <IconHome size={14} />,
      link: `/genius-profile/${username}`,
    },
    {
      title: "Gallery",
      icon: <IconPhoto size={14} />,
      link: `/genius-profile/${username}/gallery`,
    },
    {
      title: "Projects",
      icon: <IconTool size={14} />,
      link: `/genius-profile/${username}/projects`,
    },
    {
      title: "Experience",
      icon: <IconExposure size={14} />,
      link: `/genius-profile/${username}/experience`,
    },
    {
      title: "Parallex",
      icon: <IconExposure size={14} />,
      link: `/genius-profile/${username}/parallex`,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative size-full">
      <div className="flex h-full gap-x-3 text-black dark:text-white">
        <TopFloatingDock items={tabs} handleIsOpen={handleIsOpen} />
        <div
          className={`flex-1 border transition-all duration-300 ease-in-out rounded-lg overflow-hidden ${
            isOpen ? "ml-16" : "ml-0"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="px-4 pb-4 pt-8 h-full relative overflow-y-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
