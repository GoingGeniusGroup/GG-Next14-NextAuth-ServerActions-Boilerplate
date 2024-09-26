import Navbar from "@/app/_components/navbar";
import ProfileHud from "@/components/Huds/ProfileHud";
import MobileSimulator from "@/components/MobileSimulator/MobileSimulator";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MobileSimulator />
      <Navbar />
      <main>{children}</main>
      <ProfileHud />
    </>
  );
}
