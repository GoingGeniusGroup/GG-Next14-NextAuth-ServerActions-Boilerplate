"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { removeImage } from "@/actions/image-post";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../button/button";
import { IconTrash, IconX } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/ui/dialog";

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
    <div className="container px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <motion.div
            key={card.index}
            className="relative aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer bg-gray-100 dark:bg-gray-800"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedImage(card)}
          >
            <Image
              src={card.thumbnail}
              alt={`Gallery image ${card.index}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
              <div className="text-white">
                {typeof card.content === "string" ? (
                  <p className="text-sm">{card.content}</p>
                ) : (
                  card.content
                )}
              </div>
              {loggedUserProfile && (
                <Button
                  variant="destructive"
                  className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-600/80"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteConfirmation({ card, isOpen: true });
                  }}
                >
                  <IconTrash size={18} />
                  <span className="sr-only">Delete image</span>
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
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/80 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/9] w-full bg-gray-100 dark:bg-gray-800">
                <Image
                  src={selectedImage.thumbnail}
                  alt={`Full size image ${selectedImage.index}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1920px) 90vw, 1400px"
                  priority
                  quality={90}
                />
              </div>
              <div className="p-6 bg-white dark:bg-gray-900 border-t dark:border-gray-800">
                {typeof selectedImage.content === "string" ? (
                  <p className="text-gray-700 dark:text-gray-200">
                    {selectedImage.content}
                  </p>
                ) : (
                  selectedImage.content
                )}
              </div>
              <button
                className="absolute top-4 right-4 p-2 backdrop-blur-sm bg-black/20 hover:bg-black/30 dark:bg-white/20 dark:hover:bg-white/30 rounded-full transition-colors"
                onClick={() => setSelectedImage(null)}
                aria-label="Close image preview"
              >
                <IconX size={20} className="text-white" />
              </button>
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

export default GalleryGrid;
