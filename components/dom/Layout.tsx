"use client";

import React, { ReactNode, useState } from "react";
import ProfileHud from "../Huds/ProfileHud";
import MobileSimulator from "../MobileSimulator/MobileSimulator";
// import CartHud from "../Huds/CartHud";
import "../../app/globals.css";

interface LayoutProps {
  children: ReactNode;
  handleServerSignOut: () => Promise<void>;
}

const Layout: React.FC<LayoutProps> = ({ children, handleServerSignOut }) => {
  const [showMobile, setShowMobile] = useState(false);

  return (
    <>
      <ProfileHud
        showMobile={showMobile}
        setShowMobile={setShowMobile}
        handleServerSignOut={handleServerSignOut}
      />
      {/* <CartHud /> */}
      <MobileSimulator showMobile={showMobile} setShowMobile={setShowMobile} />
      {children}
    </>
  );
};

const LayoutWithProvider: React.FC<LayoutProps> = ({
  children,
  handleServerSignOut,
}) => {
  return <Layout handleServerSignOut={handleServerSignOut}>{children}</Layout>;
};

export { LayoutWithProvider as Layout };
