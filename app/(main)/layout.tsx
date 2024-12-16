import { TooltipProvider } from "@/src/ui/tooltip";

export default async function MainLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TooltipProvider>{children}</TooltipProvider>
    </>
  );
}
