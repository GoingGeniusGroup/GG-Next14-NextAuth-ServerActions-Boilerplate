"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/ui/dialog";
import { IconPhotoEdit } from "@tabler/icons-react";
import { Button as MovingBorderButton } from "@/src/ui/border/moving-border";
import UpdateCoverImageForm from "../../Forms/UpdateCoverImageForm";
import IconButton from "@/src/layout/base/button/icon-button";

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
        <IconButton
          icon={
            <IconPhotoEdit size={20} className="text-black dark:text-white" />
          }
          label="Edit Cover Picture"
        />
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
