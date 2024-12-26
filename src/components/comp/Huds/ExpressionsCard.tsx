"use client";

import { Card } from "@/src/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/src/ui/carousel/carousel";
import Image from "next/image";

export default function ExpressionCard({
  expressions,
  handleEmote,
}: {
  expressions: { label: string; icon: string; bg: string; animation: string }[];
  handleEmote: (emote: string) => void;
}) {
  return (
    <Carousel className="w-full max-w-screen-xl mx-auto px-2">
      <CarouselContent className="-ml-2 md:-ml-3">
        {expressions.map((expression, index) => (
          <CarouselItem
            key={index}
            className="pl-2 md:pl-3 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
            onClick={() => handleEmote(expression.animation)}
          >
            <div className="flex items-center justify-center">
              <Card
                className="w-full aspect-square max-w-[72px] rounded-lg flex hover:border-2 items-center justify-center transition-all duration-300 border cursor-pointer"
                style={{
                  borderColor: expression.bg,
                  backgroundColor: "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = expression.bg;
                }}
              >
                <div className="relative w-[90%] h-[90%]">
                  <Image
                    src={expression.icon}
                    className="object-contain"
                    alt={expression.label}
                    fill
                    sizes="(max-width: 768px) 33vw,
                           (max-width: 1024px) 25vw,
                           16vw"
                  />
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
