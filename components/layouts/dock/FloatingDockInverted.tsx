import React from "react";
import { FloatingDockInverted } from "@/components/ui/dock/floating-dock-inverted";
import {
  IconBrandPushover,
  IconDeviceGamepad2,
  IconFocus,
  IconGridPattern,
  IconHome,
  IconShoppingBag,
  IconShoppingBagHeart,
  IconSlash,
  IconUser,
} from "@tabler/icons-react";

export default function FloatingDockInvertedComponent() {
  const links = [
    {
      title: "Home",
      icon: <IconHome className="size-full" />,
      href: "/",
    },

    {
      title: "Shop",
      icon: <IconShoppingBag className="size-full" />,
      href: "/shop-test",
    },
    {
      title: "Virtual Shop",
      icon: <IconShoppingBagHeart className="size-full" />,
      href: "/shop-2",
    },
    {
      title: "Steam",
      icon: <IconDeviceGamepad2 className="size-full" />,
      href: "/steam",
    },
    {
      title: "Focus Cards",
      icon: <IconFocus className="size-full" />,
      href: "/focus-cards",
    },

    {
      title: "Card Hover Effect",
      icon: <IconBrandPushover className="size-full" />,
      href: "/card-hover-effect",
    },
    {
      title: "Bento Grid",
      icon: <IconGridPattern className="size-full" />,
      href: "/bento-grid",
    },
    {
      title: "Tabs",
      icon: <IconSlash className="size-full" />,
      href: "/tabs",
    },
    {
      title: "Profile",
      icon: <IconUser className="size-full" />,
      href: "/profile",
    },
  ];
  return <FloatingDockInverted items={links} />;
}
