"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  IconExposure,
  IconHome,
  IconPhoto,
  IconTool,
} from "@tabler/icons-react";
import TopFloatingDock2 from "@/components/ui/dock/top-floating-dock2";

interface GeniusProfileLayoutProps {
  info: ReactNode;
  gallery: ReactNode;
  projects: ReactNode;
  experience: ReactNode;
  children: ReactNode;
}

type Tab = {
  title: string;
  link: string;
  icon: React.ReactNode;
};

export default function GeniusProfileLayout({
  info,
  gallery,
  projects,
  experience,
  children,
}: GeniusProfileLayoutProps) {
  const tabs: Tab[] = useMemo(
    () => [
      { title: "Home", icon: <IconHome size={14} />, link: "#info" },
      { title: "Gallery", icon: <IconPhoto size={14} />, link: "#gallery" },
      { title: "Projects", icon: <IconTool size={14} />, link: "#projects" },
      {
        title: "Experience",
        icon: <IconExposure size={14} />,
        link: "#experience",
      },
    ],
    []
  );

  const [isOpen, setIsOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("Home");

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle smooth scrolling
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top;
      const container = document.querySelector(".scroll-container");
      if (container) {
        container.scrollTo({
          top: container.scrollTop + offsetTop - 150, // Adjust this value to control the scroll position
          behavior: "smooth",
        });
      }
    }
  };

  // Function to observe sections and highlight the corresponding dock item
  useEffect(() => {
    const sections = tabs.map((tab) => document.querySelector(tab.link));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const activeTab = tabs.find(
              (tab) => tab.link === `#${entry.target.id}`
            );
            if (activeTab) setActiveSection(activeTab.title);
          }
        });
      },
      { rootMargin: "-100px 0px 0px 0px", threshold: 0.2 }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [tabs]);

  return (
    <div className="relative size-full">
      <div className="flex h-full gap-x-3 text-black dark:text-white">
        <TopFloatingDock2
          items={tabs}
          handleIsOpen={handleIsOpen}
          activeSection={activeSection}
          onSectionClick={scrollToSection} // Pass the scroll handler
        />
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
              className="px-4 pb-4 pt-8 h-full relative overflow-y-auto scroll-container"
            >
              {/* Add padding-top to create space at the top */}
              <div id="info" className="info-section">
                {info}
              </div>
              <div id="gallery" className="gallery-section">
                {gallery}
              </div>
              <div id="projects" className="projects-section mb-20">
                {projects}
              </div>
              <div id="experience" className="experience-section">
                {experience}
              </div>
              <div>{children}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
