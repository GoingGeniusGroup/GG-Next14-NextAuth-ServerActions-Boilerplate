import ShopSection from "@/components/Huds/SubComponents/ShopSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
};

export default function ProfilePage() {
  return (
    <div>
      <h2 className="text-xl col-span-full col-start-4 font-semibold">Shop</h2>
      <ShopSection />
    </div>
  );
}
