import Navbar from "@/app/_components/navbar";
import { Layout } from "@/components/dom/Layout";
import { TooltipProvider } from "@/components/ui/tooltip/tooltip";
import { signOut } from "@/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  async function handleServerSignOut() {
    "use server";
    await signOut();
  }

  return (
    <>
      <Layout handleServerSignOut={handleServerSignOut}>
        <TooltipProvider>
          {/* <Navbar /> */}
          {children}
        </TooltipProvider>
      </Layout>
    </>
  );
}
