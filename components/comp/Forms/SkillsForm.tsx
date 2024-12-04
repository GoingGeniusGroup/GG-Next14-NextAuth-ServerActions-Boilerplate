"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LabelInputContainer } from "@/components/ui/animated-input/label-input-container";
import { Label } from "@/components/ui/animated-input/label";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedInput } from "@/components/ui/animated-input/animated-input";
import { SkillsFormPropsInterface } from "@/core/interface/form/skillsFormInterface";
import { skillsFormSchema } from "@/schemas/FormSchema";
import { z } from "zod";
import { addSkills, updateUserSkills } from "@/actions/skills";
import { toast } from "sonner";

const SkillsForm: React.FC<SkillsFormPropsInterface> = ({
  //   setOpen,
  gg_id,
  skill_id,
  defaultValues,
}) => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    resolver: zodResolver(skillsFormSchema),
    defaultValues: defaultValues || {
      skill_name: "",
      skill_percentage: 0,
      certifications: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof skillsFormSchema>) => {
    try {
      const formData = new FormData();

      formData.append("gg_id", gg_id);
      formData.append("skill_id", skill_id || "");
      formData.append("skill_name", data.skill_name);
      formData.append("skill_percentage", data.skill_percentage.toString());
      // formData.append("certifications", (data.certifications || []).join(","));

      let result;

      if (skill_id) {
        result = await updateUserSkills(skill_id, formData);
      } else {
        result = await addSkills(formData);
      }

      console.log("result", result);

      if (result.success) {
        form.reset();
        toast.success(
          skill_id ? "Skill updated successfully" : "Skill created successfully"
        );
        router.refresh();
      } else {
        toast.error(result.error?.message || "An unknown error occurred");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* <form className="space-y-4"> */}
        <FormField
          control={form.control}
          name="skill_name"
          render={({ field }) => (
            <FormItem>
              <LabelInputContainer>
                <Label>Skill Name</Label>
                <FormControl>
                  <AnimatedInput {...field} placeholder="Eg. Web Development" />
                </FormControl>
              </LabelInputContainer>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skill_percentage"
          render={({ field }) => (
            <FormItem>
              <LabelInputContainer>
                <Label>Skill Percentage</Label>
                <FormControl>
                  <AnimatedInput
                    {...field}
                    type="number"
                    placeholder="Eg. 90"
                  />
                </FormControl>
              </LabelInputContainer>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isUploading || form.formState.isSubmitting}
        >
          {isUploading
            ? "Uploading Images..."
            : form.formState.isSubmitting
            ? skill_id
              ? "Updating..."
              : "Creating..."
            : skill_id
            ? "Update"
            : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default SkillsForm;
