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
import UpdateCoverImageForm from "../../Forms/UpdateCoverImageForm";
import IconButton from "@/src/layout/base/button/icon-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/ui/tooltip/tooltip";

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
        <Tooltip>
          <TooltipTrigger>
            <IconButton
              icon={
                <IconPhotoEdit
                  size={20}
                  className="text-black dark:text-white hover:text-cyan-500"
                />
              }
              label="Edit Cover Picture"
            />
          </TooltipTrigger>
          <TooltipContent>
            <span className="text-cyan-500">Edit Cover Image</span>
          </TooltipContent>
        </Tooltip>
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
