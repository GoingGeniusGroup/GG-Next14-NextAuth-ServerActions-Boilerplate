import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandSteam,
  IconBrandX,
  IconExchange,
  IconNewSection,
  IconShoppingBag
} from "@tabler/icons-react";
import Image from "next/image";

export default function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconShoppingBag className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/shop-test",
    },

    {
      title: "Products",
      icon: (
        <IconBrandSteam className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/steam",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Aceternity UI",
      icon: (
        <Image
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];
  return (
    <div className="flex items-center justify-center h-[35rem] w-full">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
