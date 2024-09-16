import Navbar from "@/app/_components/navbar";
import { RightSideHudProvider } from "@/components/dom/RightSideHudProvider";
import RightSideHud from '@/components/Huds/RightSideHud';

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
        <main className="mx-12 mt-12">{children}</main>
      </RightSideHudProvider>
    </>
  );
}
