import VirtualShop from "@/components/shop/VirtualShop";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
};

export default function Shop2() {
  return <VirtualShop />;
}
