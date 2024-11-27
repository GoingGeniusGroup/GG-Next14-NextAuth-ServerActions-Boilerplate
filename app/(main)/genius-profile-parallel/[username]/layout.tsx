"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useMemo, useState, useCallback } from "react";
import {
  IconExposure,
  IconPhoto,
  IconTool,
  IconUser,
} from "@tabler/icons-react";
import TopFloatingDock2 from "@/components/ui/dock/top-floating-dock2";
import { AvatarType } from "@/components/comp/AvatarManager/provider/AvatarManagerContext";
import { getUserAvatars } from "@/actions/avatar";
import { getUserByUsername } from "@/services/user";
import { PublicAvatarProvider } from "@/components/comp/AvatarManager/provider/AvatarManagerPublicContext";

// Define the expected props for the component
interface GeniusProfileLayoutProps {
  info: ReactNode;
  avatar: ReactNode;
  gallery: ReactNode;
  projects: ReactNode;
  experience: ReactNode;
  children: ReactNode;
  params: {
    username: string;
  };
}

// Define the structure for navigation tabs
type Tab = {
  title: string;
  link: string;
  icon: React.ReactNode;
};

export default function GeniusProfileLayout({
  info,
  gallery,
  avatar,
  projects,
  experience,
  children,
  params,
}: GeniusProfileLayoutProps) {
  const { username } = params;

  useEffect(() => {
    localStorage.setItem("currentUsername", JSON.stringify(username));
  }, [username]);

  // Memoize tabs array to prevent unnecessary recreations
  // This only runs once and stays constant throughout component lifecycle
  const tabs = useMemo(
    () => [
      { title: "Profile", icon: <IconUser size={14} />, link: "#info" },
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

  // State for dock visibility and active section tracking
  const [isOpen, setIsOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("Home");

  // Memoized toggle handler to prevent recreation on every render
  // Using useCallback ensures the function reference stays stable
  const handleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev); // Using functional update for better state management
  }, []);

  // Memoized scroll handler that smoothly scrolls to the selected section
  // This prevents recreation of the function on every render
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.querySelector(sectionId);
    const container = document.querySelector(".scroll-container");
    if (element && container) {
      const offsetTop = element.getBoundingClientRect().top;
      container.scrollTo({
        top: container.scrollTop + offsetTop - 150, // Adjust scroll position with offset
        behavior: "smooth",
      });
    }
  }, []);

  // Set up intersection observer to track which section is currently visible
  useEffect(() => {
    // Callback function for the observer
    // This runs whenever the visibility of observed elements changes
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Find the tab corresponding to the visible section
          const activeTab = tabs.find(
            (tab) => tab.link === `#${entry.target.id}`
          );
          if (activeTab) setActiveSection(activeTab.title);
        }
      });
    };

    // Create the observer with options
    // rootMargin adds a margin to the viewport for earlier/later triggering
    // threshold determines how much of the element needs to be visible
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-100px 0px 0px 0px",
      threshold: 0.2,
    });

    // Get all sections and filter out any null values
    // Then observe each section
    const sections = tabs
      .map((tab) => document.querySelector(tab.link))
      .filter(Boolean);
    sections.forEach((section) => observer.observe(section!));

    // Cleanup function to disconnect observer when component unmounts
    return () => observer.disconnect();
  }, [tabs]); // Only recreate observer when tabs change

  return (
    <>
      <PublicAvatarProvider username={username}>
        <div className="relative size-full">
          <div className="flex h-full gap-x-3 text-black dark:text-white">
            {/* Top navigation dock component */}
            <TopFloatingDock2
              items={tabs}
              handleIsOpen={handleIsOpen}
              activeSection={activeSection}
              onSectionClick={scrollToSection}
            />

            {/* Main content container with sliding animation */}

            <div
              className={`flex-1 border-2 rounded-lg w-full mx-[69px] overflow-hidden transition-transform duration-300 ease-in-out`}
            >
              <div className="fixed w-full top-20 flex items-center justify-center left-1/2 -translate-x-1/2">
                {avatar}
              </div>
              {/* AnimatePresence enables exit animations */}
              <AnimatePresence mode="wait">
                {/* Animated container for all sections */}
                <motion.div
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  className="px-4 pb-4 pt-8 h-full relative overflow-y-auto scroll-container"
                  style={{ scrollBehavior: "smooth" }}
                >
                  {/* Individual sections using semantic HTML5 section tags */}
                  <section id="info" className="info-section">
                    {info}
                  </section>
                  <section id="gallery" className="gallery-section">
                    {gallery}
                  </section>
                  <section id="projects" className="projects-section">
                    {projects}
                  </section>
                  {/* <section id="experience" className="experience-section">
                  {experience}
                </section> */}
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </PublicAvatarProvider>
    </>
  );
}
