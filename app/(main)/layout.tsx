import { TooltipProvider } from "@/src/ui/tooltip/tooltip";

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
