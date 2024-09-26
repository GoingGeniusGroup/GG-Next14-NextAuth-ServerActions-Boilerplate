"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useRightSideHud } from "@/components/Huds/Context/RightSideHudProvider";
import TabButton from "./SubComponents/TabButton";
import TabContent from "./SubComponents/TabContent";
import ClearAllButton from "./SubComponents/ClearAllButton";

export type Tab = "Profile" | "Wallet" | "Shop" | "Emergency" | "Notifications";

const tabs: Tab[] = ["Profile", "Wallet", "Shop", "Emergency", "Notifications"];

const RightSideHud: React.FC = () => {
  const {
    selectedTabs,
    removingTab,
    showClearAll,
    handleTabClick,
    closeAllTabs,
  } = useRightSideHud();

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getVisibleTabsCount = () => {
    if (windowWidth < 740) return 1;
    if (windowWidth < 1060) return 2;
    if (windowWidth < 1360) return 3;
    return 4;
  };

  const visibleTabsCount = getVisibleTabsCount();
  const visibleTabs = selectedTabs.slice(0, visibleTabsCount);

  return (
    <>
      <motion.div
        layout
        className="fixed right-[5px] md:right-[20px] top-1/2 z-50 flex w-[33px] -translate-y-1/2 select-none flex-col items-center space-y-[6px] rounded-full bg-white px-[6px] py-[4px] shadow-lg shadow-black/50 transition-all duration-300 ease-in-out"
      >
        {tabs.map((tab, i) => (
          <TabButton
            key={i}
            tab={tab}
            isSelected={selectedTabs.includes(tab)}
            onClick={() => handleTabClick(tab)}
          />
        ))}
        <ClearAllButton
          showClearAll={showClearAll}
          selectedTabsLength={selectedTabs.length}
          closeAllTabs={closeAllTabs}
        />
      </motion.div>

      {selectedTabs.length > 0 && (
        <div className="fixed inset-0 w-full z-30 bg-black/20 backdrop-blur-sm"></div>
      )}

      <div className="fixed top-1/2 z-40 flex h-[73%] -translate-y-1/2 md:right-[76px] right-[45px]">
        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            {visibleTabs.map((tab, index) => (
              <TabContent
                key={tab}
                tab={tab}
                index={index}
                removingTab={removingTab}
                handleTabClick={handleTabClick}
              />
            ))}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </>
  );
};

export default RightSideHud;
