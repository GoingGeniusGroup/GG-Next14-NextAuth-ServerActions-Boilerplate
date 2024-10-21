"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  { title: "Physical Shop", href: "/shop" },
  { title: "Virtual Shop", href: "/shop/virtual-shop" },
  { title: "Getting Started", href: "/shop/getting-started" },
  { title: "Basic Concepts", href: "/shop/basic-concepts" },
  { title: "Advanced Topics", href: "/shop/advanced-topics" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav
      className={`pt-24 bg-transparent p-4 border-r border-gray-200/20 overflow-y-auto w-64 flex-shrink-0`}
    >
      <div className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-2 py-1 rounded-md transition-all duration-200 ease-in-out ${
              pathname === item.href
                ? "text-gray-300 font-semibold translate-x-1"
                : "text-gray-600 hover:text-gray-300 hover:font-semibold hover:translate-x-1"
            }`}
          >
            <span className="inline-block w-full">{item.title}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
