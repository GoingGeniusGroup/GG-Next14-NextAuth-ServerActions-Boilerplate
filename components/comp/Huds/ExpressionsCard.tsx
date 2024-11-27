"use client";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel/carousel";
import Image from "next/image";

export default function ExpressionCard({
  expressions,
  handleEmote,
}: {
  expressions: { label: string; icon: string; bg: string; animation: string }[];
  handleEmote: (emote: string) => void;
}) {
  return (
    <>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {expressions.map((expression, index) => (
            <CarouselItem
              key={index}
              className="pl-1 basis-1/6"
              onClick={() => handleEmote(expression.animation)}
            >
              <Card
                className={`w-[60px] h-[75px] rounded-lg  flex items-center justify-center hover:border border-yellow-600 transition-colors duration-300 `}
                style={{ backgroundColor: expression.bg }}
              >
                <div className="relative">
                  <Image
                    src={expression.icon}
                    className="object-cover"
                    alt={expression.label}
                    height={31}
                    width={31}
                  />
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
