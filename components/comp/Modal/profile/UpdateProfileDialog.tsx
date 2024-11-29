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
import CustomToolTip from "../../CustomComponents/CustomToolTip";

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
        <div className="group">
          <MovingBorderButton
            borderRadius="1.75rem"
            className="bg-gray-200 size-10 dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800  hover:text-yellow-600 transition-colors duration-300"
          >
            <IconUserEdit size={20} />
          </MovingBorderButton>
          <CustomToolTip content="Edit Profile" />
        </div>
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
