"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ExpressionBottomMidHud({
  expressions,
  handleEmote,
}: {
  expressions: { label: string; icon: string; bg: string; animation: string }[];
  handleEmote: (emote: string) => void;
}) {
  return (
    <>
      <motion.div
        layout
        className="relative bottom-[20px] left-1/2 flex h-[44px] -translate-x-1/2 select-none items-center space-x-[6px] rounded-full bg-gray-200 px-[6px] py-[4px] shadow-lg shadow-black/50 transition-all duration-300 ease-in-out"
      >
        {expressions.map((expression, i) => (
          <div
            key={i}
            className={`flex size-[38px] items-center justify-center rounded-full shadow-black drop-shadow-lg transition-transform duration-300 ease-in-out `}
            style={{ background: expression.bg, cursor: "pointer" }}
            onClick={() => handleEmote(expression.animation)}
          >
            <div className="flex size-full items-center justify-center rounded-full hover:bg-black/50">
              <Image
                src={expression.icon}
                className="object-cover"
                alt={expression.label}
                height={30}
                width={30}
              />
            </div>
          </div>
        ))}
        <div
          className={`flex size-[38px] cursor-pointer items-center justify-center rounded-full border-2 border-white shadow-black drop-shadow-lg transition-transform duration-300 ease-in-out`}
          onClick={() => handleEmote("/male-idle-3.fbx")}
        >
          <div className="flex size-full items-center justify-center rounded-full hover:bg-black/50">
            <Image
              src="/emojis/time.svg"
              className="object-cover"
              alt="time"
              height={26}
              width={26}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}
