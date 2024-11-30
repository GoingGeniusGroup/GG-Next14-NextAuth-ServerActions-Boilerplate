"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { removeImage } from "@/actions/image-post";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../button/button";
import { IconTrash } from "@tabler/icons-react";

type Card = {
  img_id: string;
  index: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

export const GalleryGrid = ({
  cards,
  gg_id,
  loggedUserProfile,
}: {
  cards: Card[];
  gg_id: any;
  loggedUserProfile: boolean;
}) => {
  const [selectedImage, setSelectedImage] = useState<Card | null>(null);
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(true);

  const removeSelectedImage = async (
    gg_id: string,
    img_id: string,
    index: number
  ) => {
    try {
      setIsDeleting(false);
      await removeImage(gg_id, img_id, index);
      toast.success("Image removed successfully.");
      setIsDeleting(true);
      router.refresh();
    } catch (error) {
      toast.error("Failed to remove image.");
    }
  };

  return (
    <div className="container size-full overflow-y-auto overflow-x-hidden mx-auto px-4 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <motion.div
            key={card.index}
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedImage(card)}
          >
            <Image
              src={card.thumbnail}
              alt={`Gallery image ${card.index}`}
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
              {loggedUserProfile && (
                <Button
                  variant="transparent_rounded"
                  className="hover:text-yellow-500 hover:bg-transparent absolute top-2 right-2 text-red-600 p-[1px]"
                  size="mini2"
                  disabled={!isDeleting}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the parent click event
                    card.img_id &&
                      removeSelectedImage(gg_id, card.img_id, card.index);
                  }}
                >
                  <IconTrash size={12} />
                </Button>
              )}
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
                alt={`Full size image ${selectedImage.index}`}
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
