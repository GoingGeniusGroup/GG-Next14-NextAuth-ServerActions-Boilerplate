import { Layout } from "@/components/layouts/dom/Layout";
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
        <TooltipProvider>{children}</TooltipProvider>
      </Layout>
    </>
  );
}
