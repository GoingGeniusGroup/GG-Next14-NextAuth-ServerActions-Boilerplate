import { Card } from "@/src/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/src/ui/carousel";
import Image from "next/image";
import React from "react";

const AchievementSlider = () => {
  return (
    <Carousel className="w-full max-w-screen-xl mx-auto px-4">
      <CarouselContent className="gap-4">
        <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
          <div className="px-1">
            <Card className="group relative size-[80px] mx-auto rounded-lg dark:bg-black/40 hover:border-2 border-white bg-gray-200 flex items-center justify-center transition-colors duration-300">
              <Image
                src="/achievements/gg/GG-Beta-Tester.png"
                alt="GG-Trophy"
                width={60}
                height={60}
                className="object-contain"
              />
              <div className="absolute bottom-1 w-full text-center group-hover:opacity-100 opacity-0 uppercase text-yellow-500 text-[10px] font-bold px-1">
                Beta Tester
              </div>
            </Card>
          </div>
        </CarouselItem>

        <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
          <div className="px-1">
            <Card className="group relative size-[80px] mx-auto rounded-lg dark:bg-black/40 hover:border-2 border-white bg-gray-200 flex items-center justify-center transition-colors duration-300">
              <Image
                src="/achievements/gg/Globe.png"
                alt="GG-Trophy"
                width={50}
                height={50}
                className="object-contain"
              />
              <div className="absolute bottom-1 w-full text-center group-hover:opacity-100 opacity-0 uppercase text-yellow-500 text-[10px] font-bold px-1">
                GG-Globe
              </div>
            </Card>
          </div>
        </CarouselItem>

        <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
          <div className="px-1">
            <Card className="group relative size-[80px] mx-auto rounded-lg dark:bg-black/40 hover:border-2 border-white bg-gray-200 flex items-center justify-center transition-colors duration-300">
              <Image
                src="/achievements/gg/GG-Member-Trophy.png"
                alt="GG-Trophy"
                width={50}
                height={50}
                className="object-contain"
              />
              <div className="absolute bottom-1 w-full text-center group-hover:opacity-100 opacity-0 uppercase text-yellow-500 text-[10px] font-bold px-1">
                GG-Member
              </div>
            </Card>
          </div>
        </CarouselItem>

        <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
          <div className="px-1">
            <Card className="group relative size-[80px] mx-auto rounded-lg dark:bg-black/40 hover:border-2 border-white bg-gray-200 flex items-center justify-center transition-colors duration-300">
              <Image
                src="/achievements/gg/User-Profile-Achievement.png"
                alt="User-Profile-Achievement"
                width={52}
                height={52}
                className="object-contain"
              />
              <div className="absolute bottom-1 w-full text-center group-hover:opacity-100 opacity-0 uppercase text-yellow-500 text-[10px] font-bold px-1">
                GG-User
              </div>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default AchievementSlider;
