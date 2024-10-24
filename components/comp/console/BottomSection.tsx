"use client";

import { HoverEffect } from "@/components/ui/card/card-hover-effect";

interface BottomSectionProps {
  items: { title: string; image: string; description: string; link: string }[];
}

export default function BottomSection({ items }: BottomSectionProps) {
  return (
    <div className="w-full relative">
      <HoverEffect items={items} />
    </div>
  );
}
