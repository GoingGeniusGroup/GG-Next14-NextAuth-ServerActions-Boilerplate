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
        "grid md:auto-rows-[18rem] grid-cols-3 md:grid-cols-3 gap-0",
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
  topTitle,
  skills,
  link,
  tools,
  onMouseEnter,
  onMouseLeave,
  isHovered,
}: {
  className?: string;
  title?: string | React.ReactNode;
  topTitle?: string;
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

  const formattedUrl =
    link?.startsWith("http://") || link?.startsWith("https://")
      ? link
      : `https://${link}`;

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
        <div className="relative z-50 h-full rounded-lg group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:p-3 p-2 dark:bg-black dark:border-white/[0.2] bg-gray-200 border border-transparent flex flex-col">
          <div className="relative size-full">
            <Image
              src={header ?? ""}
              alt={typeof title === "string" ? title : ""}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              loading="eager"
            />
            <span className="uppercase text-sm font-semibold absolute top-1 left-1 opacity-30">
              {topTitle}
            </span>
          </div>

          {isSubCardHovered && (
            <div className="absolute inset-0 bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-90 rounded-xl p-4 flex flex-col justify-between transition-opacity duration-200 opacity-0 group-hover/bento:opacity-100 overflow-hidden">
              <div
                className="flex-1 overflow-y-auto overflow-x-hidden
               scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 pb-2"
              >
                <h3 className="font-sans font-bold text-lg text-gray-800 dark:text-gray-100 mb-3 sticky -top-1 bg-white/70 dark:bg-black/50 backdrop-blur-sm p-1 rounded">
                  {title}
                </h3>
                <p className="font-sans text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {description}
                </p>
                <div className="space-y-2">
                  <div className="font-sans text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-800 dark:text-gray-200 block mb-1">
                      SKILLS
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {(skills ?? [])
                        .join(",")
                        .split(",")
                        .map((skill, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded-md"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div className="font-sans text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-800 dark:text-gray-200 block mb-1">
                      TOOLS
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {(tools ?? [])
                        .join(",")
                        .split(",")
                        .map((tool, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded-md"
                          >
                            {tool.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <Link
                href={formattedUrl}
                target="_blank"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background dark:bg-white bg-black text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
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
