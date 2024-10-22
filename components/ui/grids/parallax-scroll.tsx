"use client";

import { AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Lens } from "../lens/lens";
import { CardSpotlight } from "@/components/layouts/card/CardSpotlight";

interface ImageData {
  src: string;
  title: string;
  description: string;
}

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: ImageData[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  const handleBackButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the card
    setFlippedIndex(null);
  };

  const getGlobalIndex = (columnIndex: number, idx: number) => {
    if (columnIndex === 1) return idx;
    if (columnIndex === 2) return third + idx;
    if (columnIndex === 3) return 2 * third + idx;
    return -1;
  };

  const renderCard = (
    el: ImageData,
    idx: number,
    columnIndex: number,
    translateY: any
  ) => {
    const globalIndex = getGlobalIndex(columnIndex, idx);
    const isFlipped = flippedIndex === globalIndex;

    return (
      <motion.div
        style={{ y: translateY }}
        key={`grid-${columnIndex}-${idx}`}
        className="relative group h-80 w-full perspective-1000 p-2"
        onMouseEnter={() => setHoveredIndex(globalIndex)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => setFlippedIndex(globalIndex)}
      >
        <AnimatePresence>
          {hoveredIndex === globalIndex && (
            <motion.span
              className="absolute inset-0 h-full w-full bg-zinc-400 dark:bg-zinc-600/[0.8] block rounded-xl"
              layoutId="hoverBackground"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.15 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.15, delay: 0.2 },
              }}
            />
          )}
        </AnimatePresence>
        <motion.div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${isFlipped ? "180deg" : "0deg"})`,
          }}
        >
          {/* Front face */}
          <div className="absolute size-full backface-hidden rounded-lg overflow-hidden">
            <Lens>
              <Image
                src={el.src}
                alt="thumbnail"
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                quality={90}
                priority={idx < 4}
                height={400}
                width={400}
                unoptimized
              />
            </Lens>
          </div>

          {/* Back face (description only) */}
          <div
            className="absolute size-full backface-hidden z-20 bg-black/95 text-white p-2 rounded-lg flex items-center justify-center"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <CardSpotlight
              item={{
                title: el.title,
                image: el.src,
                description: el.description,
              }}
            />
            <button
              onClick={handleBackButtonClick} // Flip back button
              className="size-3 rounded-full bg-red-500 text-white absolute top-3 right-3 z-20"
            ></button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div
      className={cn("h-[98%] items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 p-6">
        <div className="grid gap-10">
          {firstPart.map((el, idx) => renderCard(el, idx, 1, translateFirst))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => renderCard(el, idx, 2, translateSecond))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => renderCard(el, idx, 3, translateThird))}
        </div>
      </div>
    </div>
  );
};
