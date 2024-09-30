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
import ProfileComponent from "../profile/ProfileMobileView/ProfileComponent";
import ShopSection from "../shop/ShopSection";
import { LoginForm } from "../form/login-form";
import { RegisterForm } from "../form/register-form";
import { Button } from "../ui/button/button";

// Define the backgrounds array
const backgrounds = [
  {
    name: "Cosmic Nebula",
    class:
      "bg-gradient-to-b from-indigo-600/90 to-purple-600/60 via-pink-500/40 text-white",
  },
  {
    name: "Cyberpunk City",
    class:
      "bg-gradient-to-b from-blue-900/80 to-purple-800/50 via-pink-700/30 text-white",
  },
  {
    name: "Glimmering Stars",
    class:
      "bg-gradient-to-b from-blue-900/90 to-purple-800/60 via-pink-700/40 text-white",
  },
  {
    name: "Dark Matter",
    class: "bg-gradient-to-b from-gray-900/80 to-black/95 text-white",
  },
  {
    name: "Snowfall",
    class: "bg-gradient-to-b from-white/80 to-gray-100/60 text-black",
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
  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [screens, setScreens] = useState<SectionProps[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [currentBackground, setCurrentBackground] = useState<BackgroundProps>(
    backgrounds[0]
  );
  const [showLogin, setShowLogin] = useState<boolean>(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    setIsLoggedIn(status === "authenticated");
  }, [status]);

  const handleToggleAuth = useCallback(() => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
  }, []);

  // Define sections array based on login status
  const sections: SectionProps[] = useMemo(
    () =>
      isLoggedIn
        ? [
            {
              id: 1,
              title: "Profile",
              icon: <FaUser />,
              content: <ProfileComponent />,
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
          ]
        : [
            {
              id: 1,
              title: showLogin ? "Login" : "Register",
              icon: showLogin ? <FaSignInAlt /> : <FaUserPlus />,
              content: showLogin ? (
                <>
                  <LoginForm isMobile={true} />
                  <div className="flex w-full justify-center">
                    <Button variant="black" onClick={handleToggleAuth}>
                      Register Here
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <RegisterForm isMobile={true} />
                  <div className="flex w-full justify-center">
                    <Button variant="black" onClick={handleToggleAuth}>
                      Login Here
                    </Button>
                  </div>
                </>
              ),
            },
            {
              id: 2,
              title: "Shop",
              icon: <FaShoppingCart />,
              content: <ShopSection isMobile={true} />,
            },
          ],
    [isLoggedIn, showLogin, handleToggleAuth]
  );

  const toggleScreen = useCallback((section: SectionProps) => {
    setScreens((prevScreens) => {
      const isOpen = prevScreens.some((screen) => screen.id === section.id);
      if (isOpen) {
        return prevScreens.filter((screen) => screen.id !== section.id);
      } else {
        return [section, ...prevScreens].slice(0, 3);
      }
    });
  }, []);

  useEffect(() => {
    // Update screens when sections change
    setScreens((prevScreens) => {
      return prevScreens.map((screen) => {
        const updatedSection = sections.find((s) => s.id === screen.id);
        return updatedSection || screen;
      });
    });
  }, [sections]);

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
          setScreens((prevScreens) =>
            prevScreens.filter((screen) => screen.id !== id)
          )
        }
        closeAllScreens={() => setScreens([])}
        updateCurrentBackground={setCurrentBackground}
      />
    </>
  );
};

export default MobileSimulator;
