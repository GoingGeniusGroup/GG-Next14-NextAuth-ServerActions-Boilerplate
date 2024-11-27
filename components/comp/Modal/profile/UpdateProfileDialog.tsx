"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconUserEdit } from "@tabler/icons-react";
import { Button as MovingBorderButton } from "@/components/ui/border/moving-border";
import UpdateProfileForm from "../../Forms/UpdateProfileForm";

interface UpdateProfileDialogProps {
  gg_id: string;
  currentFirstName: string;
  currentLastName: string;
  currentAddress: string;
  currentDescription: string;
  currentDob: Date | null;
  currentImage: string;
}

const UpdateProfileDialog: React.FC<UpdateProfileDialogProps> = ({
  gg_id,
  currentFirstName,
  currentLastName,
  currentAddress,
  currentDescription,
  currentDob,
  currentImage,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MovingBorderButton
          borderRadius="1.75rem"
          className="bg-white size-10 dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          <IconUserEdit size={20} />
        </MovingBorderButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md h-[80%] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-center uppercase font-semibold text-sm">
            Update Profile
          </DialogTitle>
        </DialogHeader>
        <UpdateProfileForm
          gg_id={gg_id}
          currentFirstName={currentFirstName}
          currentLastName={currentLastName}
          currentAddress={currentAddress}
          currentDescription={currentDescription}
          currentDob={currentDob}
          currentImage={currentImage}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
