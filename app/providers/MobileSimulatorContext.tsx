"use client";

import { RegisterForm } from "@/components/form/register-form";
import { Button } from "@/components/ui/button/button";
import {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createContext } from "react";
import {
  FaBell,
  FaEnvelope,
  FaShoppingCart,
  FaSignInAlt,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import ShopSection from "../../components/comp/shop/ShopSection";
import { LoginForm } from "@/components/form/login-form";
import { SectionProps } from "../../components/comp/MobileSimulator/interface/Section.interface";
import { useSession } from "next-auth/react";
import { BackgroundProps } from "../../components/comp/MobileSimulator/interface/Background.interface";
import MobileSimulatorContainer from "../../components/comp/MobileSimulator/MobileSimulatorContainer";
import SimulatorToggleButton from "../../components/comp/MobileSimulator/SimulatorToggleButton";
import NotificationComponent from "@/components/comp/Notification/NotificationComponent";
import { getColorsbyUserId } from "@/services/color";
import { ThemeType } from "@prisma/client";

interface MobileSimulatorContextType {
  showMobile: boolean;
  setShowMobile: React.Dispatch<React.SetStateAction<boolean>>;
  isSmallScreen: boolean;
  
  sections: SectionProps[];
  toggleScreen: (section: SectionProps) => void;
  screens: SectionProps[];
  removeScreen: (id: number) => void;
  closeAllScreens: () => void;
  ColorPickerAttrs: {
    textColor: string;
    setTextColor: (color: string) => void;
    handleTextColorChange: (color: string) => void;
    currentBackground: BackgroundProps;
    setCurrentBackground: React.Dispatch<React.SetStateAction<BackgroundProps>>;
    tempColor: {value: string, typeColor: ThemeType}[]
  }
 
}

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

const MobileSimulatorContext = createContext<MobileSimulatorContextType | null>(
  null
);

export const MobileSimulatorProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { status } = useSession();
  const [showMobile, setShowMobile] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [currentBackground, setCurrentBackground] = useState<BackgroundProps>(
    backgrounds[0]
  );
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [activeScreens, setActiveScreens] = useState<number[]>([]);
  const [textColor, setTextColor] = useState("#000000");
  const [ tempColor, setTempColor] = useState<{value: string, typeColor: ThemeType}[]> ([])
  const handleTextColorChange = (color: string) => {
    const formattedColor = color.startsWith("#") ? color : `#${color}`;
    setTextColor(formattedColor); // Set the new text color globally
  };
  
 console.log(tempColor,'from provider');
 
  useEffect(()=> {
    const fetchcolors = async() => {
      const response = await getColorsbyUserId();
      if(response){
        
        response.map((colorObj) => {
          setTempColor((prev) => {
            return [
              ...prev,
              {
                value: colorObj.value,
                typeColor: colorObj.type,
              },
            ];
          });
          
          if(colorObj.type === "TEXT"){
            setTextColor(colorObj.value)
            
          }
          else{
            setCurrentBackground({
              name: "Custom Color",
              class:  `bg-[${colorObj.value}]`
            } )

           
          }
        })
       
          
      }
    }

    fetchcolors()

  },[])
  

  // Directly compute isLoggedIn from session status
  const isLoggedIn = status === "authenticated";

  // Update showMobile when auth status changes
  useEffect(() => {
    if (isLoggedIn) {
      setShowMobile(false);
    } else {
      setShowMobile(true);
    }
  }, [isLoggedIn]);

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
    setShowLogin((prev: any) => !prev);
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
        content: <NotificationComponent />,
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

  const ColorPickerAttrs = {
    handleTextColorChange,
    textColor,
    setTextColor,
    currentBackground,
    setCurrentBackground,tempColor
    
  }

  return (
    <MobileSimulatorContext.Provider
      value={{
        showMobile,
        setShowMobile,
        isSmallScreen,
    
        sections,
        toggleScreen,
        screens,
        removeScreen: (id: number) =>
          setActiveScreens((prev) =>
            prev.filter((screenId) => screenId !== id)
          ),
        closeAllScreens: () => setActiveScreens([]),
        ColorPickerAttrs
      }}
      
    >
      {children}
      <SimulatorToggleButton
        showMobile={showMobile}
        setShowMobile={setShowMobile}
      />

      {showMobile && (
        <>
          <MobileSimulatorContainer
            showMobile={showMobile}
            isSmallScreen={isSmallScreen}
            backgrounds={backgrounds}
            currentBackground={currentBackground}
            sections={sections}
            toggleScreen={toggleScreen}
            screens={screens}
            removeScreen={(id) =>
              setActiveScreens((prev) =>
                prev.filter((screenId) => screenId !== id)
              )
            }
            closeAllScreens={() => setActiveScreens([])}
            updateCurrentBackground={setCurrentBackground}
          />
        </>
      )}
    </MobileSimulatorContext.Provider>
  );
};

export const useMobileSimulator = () => {
  const context = useContext(MobileSimulatorContext);

  if (!context) {
    throw new Error(
      "useMobileSimulator must be used within a MobileSimulatorProvider"
    );
  }
  return context;
};
