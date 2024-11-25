"use client";

import { useMobileSimulator } from "@/components/comp/MobileSimulator/MobileSimulatorContext";

const SomeComponent = () => {
  const { showMobile, setShowMobile, toggleScreen } = useMobileSimulator();

  return (
    <div className="relative size-full justify-center items-center bg-white">
      <button onClick={() => setShowMobile(!showMobile)} className="z-50">
        {showMobile ? "Close Simulator" : "Open Simulator"}
      </button>
    </div>
  );
};

export default SomeComponent;
