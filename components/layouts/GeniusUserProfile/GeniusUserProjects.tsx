"use client";

import React, { useState } from "react";
import {
  BentoGridHover,
  BentoGridHoverItem,
} from "@/components/ui/bento-grid/bento-grid-hover";

interface ItemsProp {
  items: {
    title: string;
    description: string;
    icon: React.ReactNode;
    image: string;
  }[];
}

export default function GeniusUserProjects({ items }: ItemsProp) {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <BentoGridHover className="py-10">
      {items.map((item, idx) => (
        <BentoGridHoverItem
          key={idx}
          title={item.title}
          description={item.description}
          header={item.image}
          icon={item.icon}
          className={idx === 3 || idx === 6 ? "md:col-span-2" : ""}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          isHovered={hoveredIndex === idx}
        />
      ))}
    </BentoGridHover>
  );
}
