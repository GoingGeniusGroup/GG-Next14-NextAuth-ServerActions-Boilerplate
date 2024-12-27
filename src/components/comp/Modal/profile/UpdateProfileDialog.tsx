"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/ui/dialog";
import { IconUserEdit } from "@tabler/icons-react";
import UpdateProfileForm from "../../Forms/UpdateProfileForm";
import { Button } from "@/src/ui/button/button";

interface UpdateProfileDialogProps {
  gg_id: string;
  defaultValues?: {
    first_name?: string;
    last_name?: string;
    address?: string;
    description?: string;
    dob?: Date | null;
    image?: string;
  };
}

const UpdateProfileDialog: React.FC<UpdateProfileDialogProps> = ({
  gg_id,
  defaultValues,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="transparent"
          size="mini2"
          aria-label="Edit Info Button"
          className="text-cyan-500 dark:text-pink-500 rounded-full hover:text-yellow-500"
        >
          <IconUserEdit size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md h-[80%] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-center uppercase font-semibold text-sm">
            Update Profile
          </DialogTitle>
        </DialogHeader>
        <UpdateProfileForm
          gg_id={gg_id}
          defaultValues={{
            first_name: defaultValues?.first_name || "",
            last_name: defaultValues?.last_name || "",
            address: defaultValues?.address || "",
            description: defaultValues?.description || "",
            dob: defaultValues?.dob || null,
            image: defaultValues?.image || "",
          }}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
