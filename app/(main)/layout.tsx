import Navbar from "@/app/_components/navbar";
import { Layout } from "@/components/dom/Layout";
import { TooltipProvider } from "@/components/ui/tooltip/tooltip";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Layout>
        <TooltipProvider>
          <Navbar />
          <main>{children}</main>
        </TooltipProvider>
      </Layout>
    </>
  );
}
