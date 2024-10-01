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
import { z } from "zod";

// Zod schemas (unchanged)
const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  images: z.array(z.string()),
  category: z.string(),
  description: z.string(),
});

type Product = z.infer<typeof ProductSchema>;

// Updated mock data for products with multiple images
const products: Product[] = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 19.99,
    images: [
      "https://purepng.com/public/uploads/large/white-tshirt-n0j.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIVucqpahoTxy07vRpCjW-q7yFOl6x7aPKTA&s",
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSgZfQJ7Gdl8faPRPDa22VZe3trWauW-3r_KC2mkQfvrcqWjUaA",
    ],
    category: "Clothing",
    description:
      "A comfortable and versatile classic t-shirt, perfect for everyday wear.",
  },
  {
    id: 2,
    name: "Denim Jeans",
    price: 49.99,
    images: [
      "https://static.vecteezy.com/system/resources/thumbnails/021/938/733/small_2x/blue-jeans-isolated-on-a-transparent-background-png.png",
    ],
    category: "Clothing",
    description:
      "High-quality denim jeans that offer both style and durability.",
  },
  {
    id: 3,
    name: "Sneakers",
    price: 79.99,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByAWaWoInX4M5P9luXYgAU-Y9W7FisXvTbQ&s",
    ],
    category: "Shoes",
    description:
      "Comfortable and stylish sneakers suitable for various activities.",
  },
  {
    id: 4,
    name: "Hoodie",
    price: 39.99,
    images: [
      "https://png.pngtree.com/png-vector/20240402/ourmid/pngtree-blank-black-male-hoodie-sweatshirt-long-sleeve-with-clipping-path-mens-png-image_12258589.png",
    ],
    category: "Clothing",
    description: "A cozy hoodie that's perfect for layering or lounging.",
  },
  {
    id: 5,
    name: "Sunglasses",
    price: 29.99,
    images: [
      "https://img.drz.lazcdn.com/static/pk/p/b6326aee217bb925d7bc39cd65fead89.jpg_720x720q80.jpg",
    ],
    category: "Accessories",
    description:
      "Stylish sunglasses that provide both UV protection and a fashionable look.",
  },
];

const categories = ["All", "Clothing", "Shoes", "Accessories"];

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
              content: (
                <ShopSection
                  isMobile={true}
                  products={products}
                  categories={categories}
                />
              ),
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
              content: (
                <ShopSection
                  isMobile={true}
                  products={products}
                  categories={categories}
                />
              ),
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
        // Number of screen to show in the simulator
        return [section, ...prevScreens].slice(0, 2);
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
  }, [sections, isLoggedIn]);

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
