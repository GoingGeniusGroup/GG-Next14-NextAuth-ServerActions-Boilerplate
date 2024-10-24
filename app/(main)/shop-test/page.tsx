import ShopSection from "@/components/comp/shop/ShopSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
};

export default function Shop() {
  return <ShopSection isMobile={false} />;
}
