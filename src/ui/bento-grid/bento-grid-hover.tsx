import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Lens } from "../lens/lens";

export const BentoGridHover = ({
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

export const BentoGridHoverItem = ({
  className,
  title,
  description,
  header,
  skills,
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
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isHovered?: boolean;
}) => {
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
            className="absolute inset-0 h-full w-full bg-zinc-400 dark:bg-zinc-600/[0.8] block  rounded-xl"
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

      {/* Content */}
      <div className="rounded-2xl h-full w-full overflow-hidden ">
        <div className="relative z-50 h-full row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col ">
          <Lens lensSize={70}>
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={header ?? ""}
                alt={typeof title === "string" ? title : ""}
                height={100}
                width={100}
                className="object-cover object-left-top   rounded-xl mx-auto flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
                unoptimized
              />
            </div>
          </Lens>

          <div className="group-hover/bento:translate-x-2 transition duration-200">
            <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
              {title}
            </div>
            <div className="h-20 overflow-auto">
              <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                {description}
              </div>
              <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                SKILLS : {skills}
              </div>
              <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                TOOLS : {tools}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
