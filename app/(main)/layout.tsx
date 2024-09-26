import Navbar from "@/app/_components/navbar";
import ProfileHud from "@/components/Huds/ProfileHud";
// import { MobileSimulatorProvider } from "@/components/MobileSimulator/Context/MobileSimulatorContext";
import MobileSimulator from "@/components/MobileSimulator/MobileSimulator";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <MobileSimulatorProvider> */}
      <MobileSimulator />
      <Navbar />
      <main>{children}</main>
      <ProfileHud />
      {/* </MobileSimulatorProvider> */}
    </>
  );
}
