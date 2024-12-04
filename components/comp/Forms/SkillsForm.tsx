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

  return (
    <Form {...form}>
      <form className="space-y-4">
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
                  <AnimatedInput {...field} placeholder="Eg. Web Development" />
                </FormControl>
              </LabelInputContainer>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SkillsForm;
