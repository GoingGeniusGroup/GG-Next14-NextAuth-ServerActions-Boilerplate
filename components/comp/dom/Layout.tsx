"use client";

import React, { ReactNode, useState } from "react";
import ProfileHudTop from "../Huds/ProfileHudTop";
import MobileSimulator from "../MobileSimulator/MobileSimulator";

interface LayoutProps {
  children: ReactNode;
  handleServerSignOut: any;
}

const Layout: React.FC<LayoutProps> = ({ children, handleServerSignOut }) => {
  const [showMobile, setShowMobile] = useState(false);

  return (
    <>
      <ProfileHudTop
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
