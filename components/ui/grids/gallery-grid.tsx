"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { XIcon } from "lucide-react";

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

export const GalleryGrid = ({ cards }: { cards: Card[] }) => {
  const [selectedImage, setSelectedImage] = useState<Card | null>(null);

  return (
    <div className="container size-full overflow-y-auto overflow-x-hidden mx-auto px-4 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedImage(card)}
          >
            <Image
              src={card.thumbnail}
              alt={`Gallery image ${card.id}`}
              width={500}
              height={500}
              className="object-cover w-full h-full"
              unoptimized
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="text-white">
                {typeof card.content === "string" ? (
                  <p>{card.content}</p>
                ) : (
                  card.content
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 "
            onClick={() => setSelectedImage(null)} // Close the modal on outer click
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-full rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevent click events from propagating to the parent
            >
              <Image
                src={selectedImage.thumbnail}
                alt={`Full size image ${selectedImage.id}`}
                fill
                className="object-contain "
                unoptimized
              />
              <button
                className="absolute top-8 right-0 text-white hover:text-gray-300"
                onClick={() => setSelectedImage(null)}
              >
                <div className="size-4 bg-red-600 rounded-full"></div>
              </button>
              <div className="absolute bottom-4 left-4 right-4 text-white bg-black bg-opacity-50 p-4 rounded">
                {typeof selectedImage.content === "string" ? (
                  <p>{selectedImage.content}</p>
                ) : (
                  selectedImage.content
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
