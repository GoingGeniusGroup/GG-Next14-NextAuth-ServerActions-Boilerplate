import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { Tab } from "../RightSideHud";
import ShopSection from "@/components/shop/ShopSection";
import SideProfile from "@/components/profile/ProfileMobileView/ProfileMobileSection";

interface TabContentProps {
  tab: Tab;
  index: number;
  removingTab: Tab | null;
  handleTabClick: (tab: Tab) => void;
}

const renderMobileViewContent = (tab: Tab) => {
  switch (tab) {
    case "Profile":
      return <SideProfile />;
    case "Wallet":
      return <div>Wallet Content</div>;
    case "Shop":
      return <ShopSection isMobile={true} />;
    case "Emergency":
      return <div>Emergency Content</div>;
    case "Notifications":
      return <div>Notifications Content</div>;
  }
};

const TabContent: React.FC<TabContentProps> = ({
  tab,
  index,
  removingTab,
  handleTabClick,
}) => {
  const firstTabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (index === 0 && firstTabRef.current) {
      firstTabRef.current.focus();
    }
  }, [index]);

  return (
    <motion.div
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
      <motion.button
        className="absolute right-1 top-1 z-40 rounded-full bg-gray-200 p-1"
        onClick={() => handleTabClick(tab)}
        whileHover={{ rotate: 180, backgroundColor: "#d1d5db" }}
        transition={{ duration: 0.3 }}
      >
        <FaTimes size={14} />
      </motion.button>

      <div className="relative size-full">{renderMobileViewContent(tab)}</div>
    </motion.div>
  );
};

export default TabContent;
