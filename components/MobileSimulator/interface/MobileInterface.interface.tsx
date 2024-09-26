import { BackgroundProps } from "./Background.interface";
import { SectionProps } from "./Section.interface";

export interface MobileInterfaceProps {
  sections: SectionProps[];
  toggleScreen: (section: SectionProps) => void;
  closeAllScreens: () => void;
  screens: SectionProps[];
  backgrounds: BackgroundProps[];
  currentBackground: BackgroundProps;
  updateCurrentBackground: (newBackground: BackgroundProps) => void;
  textColor: string;
  setTextColor: (color: string) => void;
}
