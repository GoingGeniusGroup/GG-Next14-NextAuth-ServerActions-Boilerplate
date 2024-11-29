"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const BentoGridHoverV2 = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-3 md:grid-cols-4 gap-0",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridHoverItemV2 = ({
  className,
  title,
  description,
  header,
  skills,
  link,
  tools,
  onMouseEnter,
  onMouseLeave,
  isHovered,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: string;
  skills?: string[];
  tools?: string[];
  link?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isHovered?: boolean;
}) => {
  const [isSubCardHovered, setSubCardIsHovered] = useState(false);
  return (
    <div
      className={cn(
        "relative group p-2 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none ",
        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Hover background effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-zinc-400 dark:bg-zinc-600/[0.8] block  rounded-lg"
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

      <div
        className="rounded-lg h-full w-full overflow-hidden"
        onMouseEnter={() => setSubCardIsHovered(true)}
        onMouseLeave={() => setSubCardIsHovered(false)}
      >
        <div className="relative z-50 h-full rounded-lg group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:p-4 p-2 dark:bg-black dark:border-white/[0.2] bg-gray-300 border border-transparent flex flex-col">
          <div className="relative w-full aspect-[4/3] mb-4">
            <Image
              src={header ?? ""}
              alt={typeof title === "string" ? title : ""}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              unoptimized
            />
          </div>

          <h3 className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2">
            {title}
          </h3>

          {isSubCardHovered && (
            <div className="absolute inset-0 bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-90 rounded-xl p-4 flex flex-col justify-between transition-opacity duration-200 opacity-0 group-hover/bento:opacity-100">
              <div className="overflow-auto">
                <div className="overflow-auto">
                  <h3 className="font-sans font-bold text-lg text-gray-800 dark:text-gray-100 mb-3">
                    {title}
                  </h3>
                  <p className="font-sans text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <p className="font-sans text-xs text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        SKILLS:
                      </span>{" "}
                      {skills}
                    </p>
                    <p className="font-sans text-xs text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        TOOLS:
                      </span>{" "}
                      {tools}
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href={link ? link : ""}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
              >
                Visit Project
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
