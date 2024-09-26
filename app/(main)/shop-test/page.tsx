import ShopSection from "@/components/shop/ShopSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
};

export default function Shop() {
  return (
    <div className="pt-20">
      <ShopSection />;
    </div>
  );
}
