"use client";

import CustomGalleryComponent from "@/components/layouts/gallery/CustomGalleryComponent";
import GeniusUserExperience from "@/components/layouts/GeniusUserProfile/GeniusUserExperience";
import GeniusUserHome from "@/components/layouts/GeniusUserProfile/GeniusUserHome";
import GeniusUserProjectsComponent from "@/components/layouts/GeniusUserProfile/GeniusUserProjectsComponent";
import { CollapsibleSidebarTabs } from "@/components/ui/tabs/custom-tabs";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconExposure,
  IconFileBroken,
  IconHome,
  IconPhoto,
  IconSignature,
  IconTableColumn,
  IconTool,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface ProfileViewProps {
  params: {
    username: string;
  };
  children: React.ReactNode;
}

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
  link: string;
  icon: React.ReactNode;
};
export default function ProfileLayout({ params, children }: ProfileViewProps) {
  const username = params.username;
  const pathname = usePathname();

  const tabs: Tab[] = [
    {
      title: "Home",
      value: "home",
      icon: <IconHome size={24} />,
      link: `/pro/${username}`,
    },
    {
      title: "Gallery",
      value: "gallery",
      icon: <IconPhoto size={24} />,
      link: `/pro/${username}/gallery`,
    },
    {
      title: "Projects",
      value: "projects",
      icon: <IconTool size={24} />,
      link: `/pro/${username}/projects`,
    },
    {
      title: "Experience",
      value: "experience",
      icon: <IconExposure size={24} />,
      link: `/pro/${username}/experience`,
    },
    {
      title: "Parallex",
      value: "pgs1",
      icon: <IconExposure size={24} />,
      link: `/pro/${username}/parallex`,
    },
  ];

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative size-full">
      <div className="flex h-full gap-x-3 text-black dark:text-white">
        <motion.div
          initial={false}
          animate={{ width: isCollapsed ? 60 : 240 }}
          className={"flex flex-col border rounded-lg"}
        >
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-4 hover:bg-gray-700 rounded-t-md transition-colors"
          >
            <Menu size={24} />
          </button>
          {tabs.map((tab, idx) => (
            <Link
              key={idx}
              href={tab.link}
              className={`flex items-center p-4 text-gray-500 hover:text-sky-600 transition-colors ${
                pathname === tab.link
                  ? "text-black dark:text-white font-semibold"
                  : ""
              }
              `}
            >
              <span className="mr-3">{tab.icon}</span>
              {!isCollapsed && <span>{tab.title}</span>}
            </Link>
          ))}
        </motion.div>
        <div className="flex-1 border rounded-lg overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="p-4 h-full relative overflow-y-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
