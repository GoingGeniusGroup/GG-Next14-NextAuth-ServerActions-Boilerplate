"use client";
import { AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Lens } from "../lens/lens";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  // Function to handle hover across all columns
  const getGlobalIndex = (columnIndex: number, idx: number) => {
    if (columnIndex === 1) return idx;
    if (columnIndex === 2) return third + idx;
    if (columnIndex === 3) return 2 * third + idx;
    return -1;
  };

  return (
    <div
      className={cn("h-[98%] items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 p-6"
        ref={gridRef}
      >
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst }} // Apply the translateY motion value here
              key={"grid-1" + idx}
              className="relative group block p-2 h-full w-full"
              onMouseEnter={() => setHoveredIndex(getGlobalIndex(1, idx))}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === getGlobalIndex(1, idx) && (
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
              <Lens>
                <Image
                  src={el}
                  className="h-80 relative w-full z-20 object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                  height="400"
                  width="400"
                  alt="thumbnail"
                  unoptimized
                  loading="lazy"
                />
              </Lens>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div
              style={{ y: translateSecond }}
              key={"grid-2" + idx}
              className="relative group block p-2 h-full w-full"
              onMouseEnter={() => setHoveredIndex(getGlobalIndex(2, idx))}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === getGlobalIndex(2, idx) && (
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
              <Lens>
                <Image
                  src={el}
                  className="h-80 w-full relative z-20 object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                  height="400"
                  width="400"
                  alt="thumbnail"
                  unoptimized
                  loading="lazy"
                />
              </Lens>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div
              style={{ y: translateThird }}
              key={"grid-3" + idx}
              className="relative group block p-2 h-full w-full"
              onMouseEnter={() => setHoveredIndex(getGlobalIndex(3, idx))}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === getGlobalIndex(3, idx) && (
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
              <Lens>
                <Image
                  src={el}
                  className="h-80 w-full relative z-20 object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                  height="400"
                  width="400"
                  alt="thumbnail"
                  unoptimized
                  loading="lazy"
                />
              </Lens>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
