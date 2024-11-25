"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import {
  FaUser,
  FaShoppingCart,
  FaBell,
  FaEnvelope,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import SimulatorToggleButton from "./SimulatorToggleButton";
import MobileSimulatorContainer from "./MobileSimulatorContainer";
import { SectionProps } from "./interface/Section.interface";
import { BackgroundProps } from "./interface/Background.interface";
// import ProfileComponent from "../profile/ProfileMobileView/ProfileComponent";
import ShopSection from "../shop/ShopSection";
import { LoginForm } from "../../form/login-form";
import { RegisterForm } from "../../form/register-form";
import { Button } from "../../ui/button/button";

const backgrounds = [
  {
    name: "Cosmic Nebula",
    class:
      "bg-gradient-to-b from-indigo-600 to-purple-600 via-pink-500 text-white",
  },
  {
    name: "Cyberpunk City",
    class:
      "bg-gradient-to-b from-blue-900 to-purple-800 via-pink-700 text-white",
  },
  {
    name: "Glimmering Stars",
    class:
      "bg-gradient-to-b from-blue-900 to-purple-800 via-pink-700 text-white",
  },
  {
    name: "Dark Matter",
    class: "bg-gradient-to-b from-gray-900 to-black text-white",
  },
  {
    name: "Snowfall",
    class: "bg-gradient-to-b from-white to-gray-100 text-black",
  },
];

interface MobileSimulatorProps {
  showMobile: boolean;
  setShowMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileSimulator: React.FC<MobileSimulatorProps> = ({
  showMobile,
  setShowMobile,
}) => {
  const { status } = useSession();
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [currentBackground, setCurrentBackground] = useState<BackgroundProps>(
    backgrounds[0]
  );
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [activeScreens, setActiveScreens] = useState<number[]>([]);

  // Directly compute isLoggedIn from session status
  const isLoggedIn = status === "authenticated";

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Reset screens when auth state changes
  useEffect(() => {
    setActiveScreens([]);
  }, [isLoggedIn]);

  const handleToggleAuth = useCallback(() => {
    setShowLogin((prev) => !prev);
  }, []);

  // Define sections with useMemo
  const sections: SectionProps[] = useMemo(
    () => [
      {
        id: 1,
        title: isLoggedIn ? "Profile" : showLogin ? "Login" : "Register",
        icon: isLoggedIn ? (
          <FaUser />
        ) : showLogin ? (
          <FaSignInAlt />
        ) : (
          <FaUserPlus />
        ),
        content: isLoggedIn ? (
          // <ProfileComponent />
          <div>Profile Component</div>
        ) : showLogin ? (
          <div className="flex flex-col gap-4 h-full overflow-auto">
            <LoginForm isMobile={true} />
            <div className="flex w-full justify-center">
              <Button variant="black" onClick={handleToggleAuth}>
                Register Here
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 h-full overflow-auto">
            <RegisterForm isMobile={true} />
            <div className="flex w-full justify-center">
              <Button variant="black" onClick={handleToggleAuth}>
                Login Here
              </Button>
            </div>
          </div>
        ),
      },
      {
        id: 2,
        title: "Shop",
        icon: <FaShoppingCart />,
        content: <ShopSection isMobile={true} />,
      },
      {
        id: 3,
        title: "Notifications",
        icon: <FaBell />,
        content: "View your latest notifications.",
      },
      {
        id: 4,
        title: "Messages",
        icon: <FaEnvelope />,
        content: "Check your messages and chats.",
      },
    ],
    [isLoggedIn, showLogin, handleToggleAuth]
  );

  const toggleScreen = useCallback((section: SectionProps) => {
    setActiveScreens((prev) => {
      const isOpen = prev.includes(section.id);
      if (isOpen) {
        return prev.filter((id) => id !== section.id);
      } else {
        return [section.id, ...prev].slice(0, 2);
      }
    });
  }, []);

  // Convert activeScreens IDs to actual screen objects
  const screens = useMemo(() => {
    return activeScreens
      .map((id) => sections.find((section) => section.id === id))
      .filter((section): section is SectionProps => section !== undefined);
  }, [activeScreens, sections]);

  return (
    <>
      <SimulatorToggleButton
        showMobile={showMobile}
        setShowMobile={setShowMobile}
      />

      <MobileSimulatorContainer
        showMobile={showMobile}
        isSmallScreen={isSmallScreen}
        backgrounds={backgrounds}
        currentBackground={currentBackground}
        sections={sections}
        toggleScreen={toggleScreen}
        screens={screens}
        removeScreen={(id) =>
          setActiveScreens((prev) => prev.filter((screenId) => screenId !== id))
        }
        closeAllScreens={() => setActiveScreens([])}
        updateCurrentBackground={setCurrentBackground}
      />
    </>
  );
};

export default MobileSimulator;
