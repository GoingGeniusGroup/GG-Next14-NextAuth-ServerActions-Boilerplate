"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconPhotoEdit } from "@tabler/icons-react";
import { Button as MovingBorderButton } from "@/components/ui/border/moving-border";
import UpdateCoverImageForm from "../../Forms/UpdateCoverImageForm";

interface UpdateCoverPhotoDialogProps {
  gg_id: string;
  currentCoverImage: string;
}

const UpdateProfileDialog: React.FC<UpdateCoverPhotoDialogProps> = ({
  gg_id,
  currentCoverImage,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MovingBorderButton
          borderRadius="1.75rem"
          className="bg-white size-10 dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          <IconPhotoEdit size={20} />
        </MovingBorderButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex justify-center uppercase font-semibold text-sm">
            Update Cover Photo
          </DialogTitle>
        </DialogHeader>
        <UpdateCoverImageForm
          gg_id={gg_id}
          currentCoverImage={currentCoverImage}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
