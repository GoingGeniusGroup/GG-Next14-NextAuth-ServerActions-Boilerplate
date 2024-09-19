"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

type Tab = "Profile" | "Wallet" | "Shop" | "Emergency" | "Notifications";

interface RightSideHudContextType {
  selectedTabs: Tab[];
  removingTab: Tab | null;
  openSignIn: boolean;
  showClearAll: boolean;
  handleTabClick: (tab: Tab) => void;
  closeAllTabs: () => void;
  setOpenSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const RightSideHudContext = createContext<RightSideHudContextType | undefined>(
  undefined
);

export const RightSideHudProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedTabs, setSelectedTabs] = useState<Tab[]>([]);
  const [removingTab, setRemovingTab] = useState<Tab | null>(null);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [showClearAll, setShowClearAll] = useState(false);

  const handleTabClick = (tab: Tab) => {
    setSelectedTabs((prevTabs) => {
      if (prevTabs.includes(tab)) {
        setRemovingTab(tab);
        setTimeout(() => setRemovingTab(null), 500);
        return prevTabs.filter((t) => t !== tab);
      } else {
        if (prevTabs.length >= 4) {
          return [tab, ...prevTabs.slice(0, 3)];
        } else {
          return [tab, ...prevTabs];
        }
      }
    });
  };

  const closeAllTabs = () => {
    setSelectedTabs([]);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (selectedTabs.length > 0) {
      timer = setTimeout(() => {
        setShowClearAll(true);
      }, 300);
    } else {
      setShowClearAll(false);
    }

    return () => clearTimeout(timer);
  }, [selectedTabs]);

  const value: RightSideHudContextType = {
    selectedTabs,
    removingTab,
    openSignIn,
    showClearAll,
    handleTabClick,
    closeAllTabs,
    setOpenSignIn,
  };

  return (
    <RightSideHudContext.Provider value={value}>
      {children}
    </RightSideHudContext.Provider>
  );
};

export const useRightSideHud = (): RightSideHudContextType => {
  const context = useContext(RightSideHudContext);
  if (context === undefined) {
    throw new Error(
      "useRightSideHud must be used within a RightSideHudProvider"
    );
  }
  return context;
};
