import { HoverEffect } from "@/components/ui/card/card-hover-effect";

interface BottomSectionProps {
  items: { title: string; image: string; description: string; link: string }[];
}

export default function BottomSectionConsole({ items }: BottomSectionProps) {
  return (
    <>
      <div className="w-full relative p-2 mt-4 rounded-xl backdrop-blur-md transition-all duration-200 ease-in-out">
        <HoverEffect items={items} />
      </div>
    </>
  );
}
