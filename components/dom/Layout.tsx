"use client";
import React, { ReactNode, useState } from "react";
import ProfileHud from "../Huds/ProfileHud";
import MobileSimulator from "../MobileSimulator/MobileSimulator";
import CartHud from "../Huds/CartHud";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showMobile, setShowMobile] = useState(false);

  return (
    <>
      <ProfileHud showMobile={showMobile} setShowMobile={setShowMobile} />
      <CartHud />
      <MobileSimulator showMobile={showMobile} setShowMobile={setShowMobile} />
      {children}
    </>
  );
};

const LayoutWithProvider: React.FC<LayoutProps> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export { LayoutWithProvider as Layout };
