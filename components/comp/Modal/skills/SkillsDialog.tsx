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
import { Button } from "@/components/ui/button/button";
import CustomToolTip from "../../CustomComponents/CustomToolTip";
import SkillsForm from "../../Forms/SkillsForm";
import { SkillsDialogPropsInterface } from "@/core/interface/form/skillsFormInterface";

const SkillsDialog: React.FC<SkillsDialogPropsInterface> = ({
  gg_id,
  skill_id,
  defaultValues,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="group">
          {!skill_id ? (
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
          <CustomToolTip content="Add Skills" />
        </div>
      </DialogTrigger>
      <DialogTitle>{!skill_id ? "Add Skill" : "Update Skill"}</DialogTitle>
      <DialogContent>
        <SkillsForm
          //   setOpen={setOpen}
          gg_id={gg_id}
          skill_id={skill_id}
          defaultValues={{
            skill_name: defaultValues?.skill_name || "",
            skill_percentage: defaultValues?.skill_percentage || 0,
            certifications: defaultValues?.certifications || [],
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SkillsDialog;
