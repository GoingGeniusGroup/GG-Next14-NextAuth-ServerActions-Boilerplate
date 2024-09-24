import Navbar from "@/app/_components/navbar";
import { RightSideHudProvider } from "@/components/dom/RightSideHudProvider";
import RightSideHud from "@/components/Huds/RightSideHud";
import ProfileHud from "@/components/profile/ProfileHud";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RightSideHudProvider>
        <RightSideHud />
        <Navbar />
        <main>{children}</main>
        <ProfileHud />
      </RightSideHudProvider>
    </>
  );
}
