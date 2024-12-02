"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { removeImage } from "@/actions/image-post";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../button/button";
import { IconTrash } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Card = {
  img_id?: string;
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
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    card: Card | null;
    isOpen: boolean;
  }>({ card: null, isOpen: false });

  const removeSelectedImage = async (card: Card) => {
    if (!card.img_id) return;
    try {
      setIsDeleting(true);
      await removeImage(gg_id, card.img_id, card.index);
      toast.success("Image removed successfully.");
      router.refresh();
    } catch (error) {
      toast.error("Failed to remove image.");
    } finally {
      setIsDeleting(false);
      setDeleteConfirmation({ card: null, isOpen: false });
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
                  variant="destructive"
                  className="absolute top-2 right-2 p-2"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteConfirmation({ card, isOpen: true });
                  }}
                >
                  <IconTrash size={20} />
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-full rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col">
                <div className="relative flex-grow">
                  <Image
                    src={selectedImage.thumbnail}
                    alt={`Full size image ${selectedImage.index}`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div className="p-4 bg-white dark:bg-gray-900">
                  {typeof selectedImage.content === "string" ? (
                    <p className="text-gray-800 dark:text-gray-200">
                      {selectedImage.content}
                    </p>
                  ) : (
                    selectedImage.content
                  )}
                </div>
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={() => setSelectedImage(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog
        open={deleteConfirmation.isOpen}
        onOpenChange={(isOpen) => setDeleteConfirmation({ card: null, isOpen })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this image? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setDeleteConfirmation({ card: null, isOpen: false })
              }
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                deleteConfirmation.card &&
                removeSelectedImage(deleteConfirmation.card)
              }
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
