import React from "react";
import { FloatingDockConsole } from "../ui/floating-dock/floating-dock-console";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import Image from "next/image";

export function FloatingDockDemo({
  handleBgColor,
}: {
  handleBgColor: (color: string) => void;
}) {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      bgColor: "bg-blue-500 dark:bg-blue-700",
    },
    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      bgColor: "bg-green-500 dark:bg-green-700",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      bgColor: "bg-yellow-500 dark:bg-yellow-700",
    },
    {
      title: "Aceternity UI",
      icon: (
        <Image
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          unoptimized
          loading="lazy"
          alt="Aceternity Logo"
        />
      ),
      href: "#",
      bgColor: "bg-purple-500 dark:bg-purple-700",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      bgColor: "bg-red-500 dark:bg-red-700",
    },
    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      bgColor: "bg-cyan-500 dark:bg-cyan-700",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      bgColor: "bg-gray-500 dark:bg-gray-700",
    },
  ];

  return (
    <FloatingDockConsole
      items={links}
      desktopClassName="bg-transparent"
      onIconSelect={handleBgColor}
    />
  );
}
