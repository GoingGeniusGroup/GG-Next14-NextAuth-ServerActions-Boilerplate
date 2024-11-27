import { ReactNode } from "react";
import ProfileHudTop from "../Huds/ProfileHudTop";

interface LayoutProps {
  children: ReactNode;
  handleServerSignOut: any;
}

const Layout: React.FC<LayoutProps> = ({ children, handleServerSignOut }) => {
  let currentUsername = "Guest"; // Default username

  if (typeof window !== "undefined") {
    const storedUsername = localStorage.getItem("currentUsername");
    if (storedUsername) {
      currentUsername = JSON.parse(storedUsername);
    }
  }
  return (
    <>
      <div className="text-white">{currentUsername}</div>
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
