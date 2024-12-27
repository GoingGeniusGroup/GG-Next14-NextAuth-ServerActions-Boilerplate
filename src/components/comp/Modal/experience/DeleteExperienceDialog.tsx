"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/ui/alert-dialog/alert-dialog";
import { IconTrash } from "@tabler/icons-react";
import { Button } from "@/src/ui/button/button";
import { deleteUserExperience } from "@/actions/genius-profile/experience";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/ui/tooltip/tooltip";

interface DeleteExperienceDialogProps {
  experienceId: string;
  experienceName: string;
}

export const DeleteExperienceDialog: React.FC<DeleteExperienceDialogProps> = ({
  experienceId,
  experienceName,
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const result = await deleteUserExperience(experienceId);

      if (result.success) {
        toast.success("Experience deleted successfully");
        router.refresh();
        setIsOpen(false);
      } else {
        toast.error(result.error?.message || "Failed to delete experience");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong while deleting the experience");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="mini"
              className="hover:bg-white/10 hover:text-red-500"
              type="button"
            >
              <IconTrash className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span className="text-red-500">Delete Project</span>
          </TooltipContent>
        </Tooltip>
      </AlertDialogTrigger>
      <AlertDialogContent
        className="sm:max-w-[425px]"
        onEscapeKeyDown={() => setIsOpen(false)}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Experience</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{experienceName}&quot;? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setIsOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
