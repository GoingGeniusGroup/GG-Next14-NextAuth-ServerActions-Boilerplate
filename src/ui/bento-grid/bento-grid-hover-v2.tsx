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
        "grid md:auto-rows-[18rem] grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4",
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
        "relative group rounded-xl transition duration-200 shadow-md hover:shadow-xl dark:shadow-none",
        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-zinc-400/20 dark:bg-zinc-700/50 block rounded-lg"
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
        <div className="relative z-10 h-full rounded-lg transition duration-200 bg-white dark:bg-gray-900 flex flex-col">
          <div className="relative w-full h-48 md:h-64">
            <Image
              src={header ?? "/placeholder.svg"}
              alt={typeof title === "string" ? title : "Project Image"}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
            <span className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs font-semibold">
              {topTitle}
            </span>
          </div>

          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {description}
            </p>
            <div className="mt-auto">
              <Link
                href={formattedUrl}
                target="_blank"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
              >
                Visit Project
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <AnimatePresence>
            {isSubCardHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 rounded-lg p-4 flex flex-col justify-between overflow-hidden"
              >
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 pb-2">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-3 sticky top-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-1 rounded">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {description}
                  </p>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-gray-800 dark:text-gray-200 block mb-1">
                        SKILLS
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {skills?.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-gray-800 dark:text-gray-200 block mb-1">
                        TOOLS
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {tools?.map((tool, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md"
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
                  className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Visit Project
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
