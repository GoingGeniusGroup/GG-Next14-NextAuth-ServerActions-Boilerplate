import React from "react";
import { FloatingDockInverted } from "@/components/ui/dock/floating-dock-inverted";
import {
  Icon3dRotate,
  IconBrandPushover,
  IconCoinEuroFilled,
  IconDeviceGamepad2,
  IconFocus,
  IconGridPattern,
  IconHome,
  IconPhotoStar,
  IconShoppingBag,
  IconShoppingBagHeart,
  IconSlash,
  IconUser,
  IconUserBitcoin,
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
      title: "Console",
      icon: <IconCoinEuroFilled className="size-full" />,
      href: "/console",
    },
    {
      title: "Genius Profile",
      icon: <IconUserBitcoin className="size-full" />,
      href: "/genius-profile/ro_.sth",
    },
    {
      title: "Posts",
      icon: <IconPhotoStar className="size-full" />,
      href: "/posts",
    },
    {
      title: "Profile",
      icon: <IconUser className="size-full" />,
      href: "/profile",
    },
    {
      title: "Profile Parallel Routing",
      icon: <Icon3dRotate className="size-full" />,
      href: "/genius-profile-parallel/ro_.sth",
    },
  ];
  return <FloatingDockInverted items={links} />;
}
