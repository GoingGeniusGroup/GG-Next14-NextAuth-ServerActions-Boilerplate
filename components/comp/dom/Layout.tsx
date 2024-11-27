import { ReactNode } from "react";
import ProfileHudTop from "../Huds/ProfileHudTop";
import { getUserByUsername } from "@/services/user";

interface LayoutProps {
  children: ReactNode;
  handleServerSignOut: any;
}

const Layout: React.FC<LayoutProps> = ({ children, handleServerSignOut }) => {
  return (
    <>
      <ProfileHudTop handleServerSignOut={handleServerSignOut} />
      {/* <CartHud /> */}
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
