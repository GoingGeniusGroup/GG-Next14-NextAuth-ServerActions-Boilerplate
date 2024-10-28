"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const GalleryGridSkeleton = () => {
  // Create an array of 6 items to match the grid layout
  const skeletonCards = Array(11)
    .fill(null)
    .map((_, i) => ({
      id: i + 1,
      className: i % 2 === 0 ? "md:col-span-2" : "col-span-1",
    }));

  return (
    <>
      <div className="flex justify-center font-bold w-full text-yellow-500">
        GALLERY IS EMPTY
      </div>
      <div className="w-full h-[92%] px-2 pt-2 grid grid-cols-3 md:grid-cols-6 gap-4">
        {skeletonCards.map((card) => (
          <div key={card.id} className={cn(card.className)}>
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-400/80 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <div className="absolute inset-0 bg-neutral-900/20 backdrop-blur-sm">
                <div className="h-full w-full p-4 flex flex-col justify-end">
                  {/* Title skeleton */}
                  <div className="h-6 w-3/4 bg-neutral-800/50 rounded-md mb-2" />
                  {/* Description skeleton - only show on larger cards */}
                  {card.className.includes("md:col-span-2") && (
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-neutral-800/50 rounded-md" />
                      <div className="h-4 w-2/3 bg-neutral-800/50 rounded-md" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GalleryGridSkeleton;
