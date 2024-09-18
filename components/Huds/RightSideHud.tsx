"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  FaBell,
  FaBriefcase,
  FaStore,
  FaUserCircle,
  FaUsers,
  FaTimes,
} from "react-icons/fa";
import { VscClearAll } from "react-icons/vsc";
import CustomToolTipLeftRight from "../MyComponents/CustomToolTipLeftRight";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useRightSideHud } from "@/components/dom/RightSideHudProvider";
import ShopSection from "./SubComponents/ShopSection";

type Tab = "Profile" | "Wallet" | "Shop" | "Emergency" | "Notifications";

const tabs: Tab[] = ["Profile", "Wallet", "Shop", "Emergency", "Notifications"];

const getIcon = (tab: Tab) => {
  switch (tab) {
    case "Profile":
      return <FaUserCircle className="text-black" size={17} />;
    case "Wallet":
      return <FaBriefcase className="text-black" size={17} />;
    case "Shop":
      return <FaStore className="text-black" size={17} />;
    case "Emergency":
      return <FaUsers className="text-black" size={17} />;
    case "Notifications":
      return <FaBell className="text-black" size={17} />;
  }
};

const RightSideHud: React.FC = () => {
  const {
    selectedTabs,
    removingTab,
    openSignIn,
    showClearAll,
    handleTabClick,
    closeAllTabs,
  } = useRightSideHud();

  const firstTabRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Render mobile view content
  const renderMobileViewContent = (tab: Tab) => {
    switch (tab) {
      case "Profile":
        return <div>HIII</div>;
      case "Wallet":
        return <div>Wall</div>;
      case "Shop":
        return <ShopSection />;
      case "Emergency":
        return <div>Emer</div>;
      case "Notifications":
        return <div>Noti</div>;
    }
  };

  // Focus the first tab when a tab is selected
  useEffect(() => {
    if (selectedTabs.length > 0 && firstTabRef.current) {
      firstTabRef.current.focus();
    }
  }, [selectedTabs]);

  // Calculate the number of tabs to display based on screen width
  const getVisibleTabsCount = () => {
    if (windowWidth < 740) return 1; // Small mobile
    if (windowWidth < 1060) return 2; // Large mobile
    if (windowWidth < 1360) return 3; // Tablet
    return 4; // Desktop
  };

  const visibleTabsCount = getVisibleTabsCount();
  const visibleTabs = selectedTabs.slice(0, visibleTabsCount);

  return (
    <>
      {/* Right side hud */}
      <motion.div
        layout
        className="fixed right-[5px] md:right-[20px] top-1/2 z-50 flex w-[33px] -translate-y-1/2 select-none flex-col items-center space-y-[6px] rounded-full bg-white px-[6px] py-[4px] shadow-lg shadow-black/50 transition-all duration-300 ease-in-out"
      >
        {tabs.map((tab, i) => (
          <div
            key={i}
            onClick={() => handleTabClick(tab)}
            className={`group flex size-[26px] items-center justify-center rounded-full font-semibold shadow-black drop-shadow-lg hover:bg-blue-100 ${
              selectedTabs.includes(tab) ? "bg-blue-400" : "bg-gray-300"
            }`}
          >
            {getIcon(tab)}
            <CustomToolTipLeftRight
              content={tab}
              top="0"
              left={-35}
              translateY="0"
            />
          </div>
        ))}
        <AnimatePresence>
          {showClearAll && selectedTabs.length > 0 && (
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
      </motion.div>

      {/* Bg black for focus */}
      {selectedTabs.length > 0 && (
        <div className="fixed inset-0 w-full z-30 bg-black/20 backdrop-blur-sm"></div>
      )}

      {/* mobile views */}
      <div
        className={`fixed top-1/2 z-40 flex h-[73%] -translate-y-1/2 md:right-[76px] right-[45px]
        }`}
      >
        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            {visibleTabs.map((tab, index) => (
              <motion.div
                key={tab}
                ref={index === 0 ? firstTabRef : null}
                tabIndex={0}
                layout
                className="relative ml-4 h-full w-[296px] md:w-[306px] overflow-hidden rounded-md bg-custom-gradient-purple p-2 text-black shadow-lg shadow-black/50 backdrop-blur-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{
                  x: removingTab === tab ? -300 : 300,
                  opacity: 0,
                  transition: { duration: 0.3 },
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 0.5,
                }}
              >
                {/* minimize button */}
                <motion.button
                  className="absolute right-1 top-1 z-40 rounded-full bg-gray-200 p-1"
                  onClick={() => handleTabClick(tab)}
                  whileHover={{ rotate: 180, backgroundColor: "#d1d5db" }}
                  transition={{ duration: 0.3 }}
                >
                  <FaTimes size={14} />
                </motion.button>

                {/* content */}
                <div className="size-full">{renderMobileViewContent(tab)}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </>
  );
};

export default RightSideHud;
