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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/ui/tooltip/tooltip";

interface UpdateProfileDialogProps {
  gg_id: string;
  defaultValues?: {
    first_name?: string;
    last_name?: string;
    address?: string;
    description?: string;
    dob?: Date | string | null; // Allow for string dates
    image?: string;
  };
}

const UpdateProfileDialog: React.FC<UpdateProfileDialogProps> = ({
  gg_id,
  defaultValues,
}) => {
  const [open, setOpen] = React.useState(false);

  // Ensure dob is always a valid Date object or null
  const parseDob = (dob: Date | string | null) => {
    if (!dob) return null;
    const parsedDate = typeof dob === "string" ? new Date(dob) : dob;
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="transparent"
                size="mini2"
                aria-label="Edit Info Button"
                className="text-cyan-500 dark:text-pink-500 rounded-full hover:text-yellow-500 border border-cyan-500/50 dark:border-pink-500/50"
              >
                <IconUserEdit size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-pink-500">Edit Profile</span>
            </TooltipContent>
          </Tooltip>
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
            dob: parseDob(defaultValues?.dob ?? null),
            image: defaultValues?.image || "",
          }}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
