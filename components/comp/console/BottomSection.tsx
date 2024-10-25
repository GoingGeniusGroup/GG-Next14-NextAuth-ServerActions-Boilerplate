"use client";

import { HoverEffect2 } from "@/components/ui/card/card-hover-effect2";

interface BottomSectionProps {
  items: { title: string; image: string; description: string; link: string }[];
}

export default function BottomSection({ items }: BottomSectionProps) {
  return (
    <>
      <div className="w-full relative border flex gap-2 p-2 rounded-xl backdrop-blur-md border-black/10 dark:border-white/10 dark:hover:border-[#FCBB3F]/60 hover:border-sky-500/60 transition-all duration-200 ease-in-out">
        <div className="h-[116px] w-full bg-white/20 rounded-md"></div>
        <div className="h-[116px] w-full bg-white/20 rounded-md"></div>
      </div>
      <div className="w-full relative border p-2 mt-4 rounded-xl backdrop-blur-md border-black/10 dark:border-white/10 dark:hover:border-[#FCBB3F]/60 hover:border-sky-500/60 transition-all duration-200 ease-in-out">
        <HoverEffect2 items={items} />
      </div>
    </>
  );
}
