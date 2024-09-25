"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const buttonVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
  transition: { duration: 0.6, ease: "easeOut" },
};

function Button({ text = "Add Product" }: { text: string }) {
  return (
    <AnimatePresence>
      <motion.div {...buttonVariants}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="p-2 border border-blue-800 rounded-full bg-gray-400/20 backdrop-blur-md text-white/80 hover:text-white capitalize flex items-center gap-4"
        >
          <motion.span whileHover={{ scale: 1.05 }} className="pl-2.5">
            {text}
          </motion.span>
          <span className="h-8 w-8 rounded-full inline-flex items-center justify-center bg-blue-500 text-2xl">
            +
          </span>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}

export default Button;
