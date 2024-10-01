import VirtualShop from "@/components/shop/VirtualShop";
import { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip/tooltip";

export const metadata: Metadata = {
  title: "Shop",
};

export default function Shop2() {
  return (
    <TooltipProvider>
      <VirtualShop />
    </TooltipProvider>
  );
}
