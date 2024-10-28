"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button as MovingBorderButton } from "@/components/ui/border/moving-border";

import UploadImagesGalleryForm from "../../Forms/UploadImagesGalleryForm";
import { IconPhotoAi } from "@tabler/icons-react";

interface UploadGalleryDialogProps {
  gg_id: string;
  currentGalleryImages: string[];
}

const UploadGalleryDialog: React.FC<UploadGalleryDialogProps> = ({
  gg_id,
  currentGalleryImages,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MovingBorderButton
          borderRadius="1.75rem"
          className="bg-white size-10 dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          <IconPhotoAi size={20} />
        </MovingBorderButton>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex justify-center uppercase font-semibold text-sm">
            Upload Gallery Images
          </DialogTitle>
        </DialogHeader>
        <UploadImagesGalleryForm
          gg_id={gg_id}
          currentGalleryImages={currentGalleryImages}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UploadGalleryDialog;
