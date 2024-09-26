import { createContext } from "react";
import { MobileSimulatorContextType } from "../types/MobileSimulatorContextType";

export const MobileSimulatorContext = createContext<MobileSimulatorContextType | undefined>(undefined); 
