import { BackgroundProps } from "../interface/Background.interface";
import { SectionProps } from "../interface/Section.interface";

export type MobileSimulatorContextType = {
    showMobile: boolean;
    setShowMobile: (show: boolean) => void;
    screens: SectionProps[];
    setScreens: (screens: SectionProps[]) => void;
    currentBackground: BackgroundProps;
    isSmallScreen: boolean;
    setCurrentBackground: (background: BackgroundProps) => void;
    toggleScreen: (section: SectionProps) => void;
    removeScreen: (id: number) => void;
    closeAllScreens: () => void;
    updateCurrentBackground: (newBackground: BackgroundProps) => void;
}