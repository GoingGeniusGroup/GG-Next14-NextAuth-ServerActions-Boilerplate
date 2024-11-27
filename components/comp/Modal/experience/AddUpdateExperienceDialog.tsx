"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { Button as MovingBorderButton } from "@/components/ui/border/moving-border";
import ExperienceForm from "../../Forms/AddExperienceForm";
import { Button } from "@/components/ui/button";

interface ExperienceDialogProps {
  gg_id: string;
  experience_id?: string;
  defaultValues?: {
    type?: string;
    name?: string;
    description?: string;
    tools?: string[];
    project_skills?: string[]; // Added skills
    project_pictures?: string[];
    link?: string;
  };
}

const ExperienceDialog: React.FC<ExperienceDialogProps> = ({
  gg_id,
  experience_id,
  defaultValues,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {!experience_id ? (
          <MovingBorderButton
            borderRadius="1.75rem"
            className="bg-white size-10 dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <IconPlus size={20} />
          </MovingBorderButton>
        ) : (
          <Button
            variant="ghost"
            size="mini"
            className="hover:bg-white/10 hover:text-sky-500"
          >
            <IconEdit className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md h-[80%] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-center uppercase font-semibold text-sm">
            {experience_id ? "Update Experience" : "Add Experience"}
          </DialogTitle>
        </DialogHeader>
        <ExperienceForm
          gg_id={gg_id}
          experience_id={experience_id}
          defaultValues={{
            type: defaultValues?.type || "",
            name: defaultValues?.name || "",
            description: defaultValues?.description || "",
            tools: defaultValues?.tools?.map((tool) => tool.trim()) || [], // Trim tools if available
            project_skills:
              defaultValues?.project_skills?.map((skill) => skill.trim()) || [], // Trim skills if available
            project_pictures: defaultValues?.project_pictures || [],
            link: defaultValues?.link || "",
          }}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceDialog;
