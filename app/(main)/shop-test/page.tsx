import ShopSection from "@/components/shop/ShopSection";
import { Metadata } from "next";
import physicalProducts from "@/core/data/physicalProduct";

export const metadata: Metadata = {
  title: "Shop",
};

const categories = ["All", "Clothing", "Shoes", "Accessories"];

export default function Shop() {
  return (
    <ShopSection
      isMobile={false}
      products={physicalProducts}
      categories={categories}
    />
  );
}
