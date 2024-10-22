"use client";

import { AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Lens } from "../lens/lens";

interface ImageData {
  src: string;
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

  const getGlobalIndex = (columnIndex: number, idx: number) => {
    if (columnIndex === 1) return idx;
    if (columnIndex === 2) return third + idx;
    if (columnIndex === 3) return 2 * third + idx;
    return -1;
  };

  const handleClick = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  const renderCard = (
    el: ImageData,
    idx: number,
    columnIndex: number,
    translateY: any
  ) => {
    const globalIndex = getGlobalIndex(columnIndex, idx);
    const isFlipped = flippedIndex === globalIndex;

    console.log(el.src); // Check the image URL

    return (
      <motion.div
        style={{ y: translateY }}
        key={`grid-${columnIndex}-${idx}`}
        className="relative group h-80 w-full perspective-1000"
        onMouseEnter={() => setHoveredIndex(globalIndex)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => handleClick(globalIndex)}
      >
        <AnimatePresence>
          {hoveredIndex === globalIndex && !isFlipped && (
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
          <div className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden">
            <Lens>
              <div className="w-full h-full relative rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
                  alt="thumbnail"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={90}
                  priority={idx < 4}
                  fill
                  unoptimized
                />
              </div>
            </Lens>
          </div>

          {/* Back face */}
          <div
            className="absolute w-full h-full backface-hidden bg-zinc-800 text-white p-4 rounded-lg flex items-center justify-center"
            style={{ transform: "rotateY(180deg)" }}
          >
            <p className="text-center">{el.description}</p>
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
