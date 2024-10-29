"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AnimatedInput } from "@/components/ui/animated-input/animated-input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/animated-input/label";
import { LabelInputContainer } from "@/components/ui/animated-input/label-input-container";
import { FileUploaderMinimal } from "@uploadcare/react-uploader";

const experienceSchema = z.object({
  type: z.string().min(3, "Type must be at least 3 characters"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  tools: z.array(z.string()).min(1, "At least one tool is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"), // Ensure this line is present
  project_pictures: z
    .array(z.string())
    .min(1, "At least one picture is required"),
  link: z.string().url("Must be a valid URL"),
});

interface ExperienceFormProps {
  setOpen: (open: boolean) => void;
  gg_id: string;
  experience_id?: string;
  defaultValues?: {
    type: string;
    name: string;
    description: string;
    tools: string[];
    skills: string[]; // Added skills to default values
    project_pictures: string[];
    link: string;
  };
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  setOpen,
  gg_id,
  experience_id,
  defaultValues,
}) => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: defaultValues || {
      type: "",
      name: "",
      description: "",
      tools: [],
      skills: [], // Default value for skills
      project_pictures: [],
      link: "",
    },
  });

  const handleImageUpload = (info: { allEntries: any[] }) => {
    const hasUploadingFiles = info.allEntries.some(
      (file) => file.status === "uploading"
    );
    setIsUploading(hasUploadingFiles);

    const successfulFiles = info.allEntries.filter(
      (file) => file.status === "success"
    );

    if (successfulFiles.length > 0) {
      const imageUrl = successfulFiles[successfulFiles.length - 1].cdnUrl;
      const currentPictures = form.getValues("project_pictures");
      form.setValue("project_pictures", [...currentPictures, imageUrl]);

      if (!hasUploadingFiles) {
        setIsUploading(false);
      }
    }
  };

  // const onSubmit = async (data: z.infer<typeof experienceSchema>) => {
  //   if (isUploading) {
  //     toast.error("Please wait for image upload to complete");
  //     return;
  //   }

  //   try {
  //     const formData = {
  //       ...data,
  //       gg_id,
  //       experience_id,
  //       skills: data.skills || [], // Ensure skills is always an array
  //       tools: data.tools || [], // Ensure tools is always an array
  //       project_pictures: data.project_pictures || [], // Ensure project_pictures is always an array
  //     };

  //     const result = await experienceActions(formData);

  //     if (result.success) {
  //       toast.success(
  //         experience_id
  //           ? "Experience updated successfully"
  //           : "Experience created successfully"
  //       );
  //       router.refresh();
  //       setOpen(false);
  //       form.reset();
  //     } else {
  //       toast.error(result.error?.message || "An unknown error occurred");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Something went wrong");
  //   }
  // };

  return (
    <Form {...form}>
      {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"> */}
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <LabelInputContainer>
                <Label>Type</Label>
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <LabelInputContainer>
                <Label>Project Name</Label>
                <FormControl>
                  <AnimatedInput
                    {...field}
                    placeholder="Eg. E-commerce Website"
                  />
                </FormControl>
              </LabelInputContainer>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <LabelInputContainer>
                <Label>Description</Label>
                <FormControl>
                  <AnimatedInput
                    {...field}
                    placeholder="Describe your project"
                    className="min-h-[100px]"
                  />
                </FormControl>
              </LabelInputContainer>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tools"
          render={({ field }) => (
            <FormItem>
              <LabelInputContainer>
                <Label>Tools (comma-separated)</Label>
                <FormControl>
                  <AnimatedInput
                    {...field}
                    placeholder="Eg. React, Node.js, MongoDB"
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.split(",").map((tool) => tool.trim())
                      )
                    }
                    value={field.value.join(", ")}
                  />
                </FormControl>
              </LabelInputContainer>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Skills Field */}
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <LabelInputContainer>
                <Label>Skills (comma-separated)</Label>
                <FormControl>
                  <AnimatedInput
                    {...field}
                    placeholder="Eg. JavaScript, HTML, CSS"
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.split(",").map((skill) => skill.trim())
                      )
                    }
                    value={field.value.join(", ")}
                  />
                </FormControl>
              </LabelInputContainer>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="project_pictures"
          render={({ field }) => (
            <FormItem>
              <LabelInputContainer>
                <div className="flex justify-between items-center">
                  <Label>Project Pictures</Label>
                  {field.value.length > 0 && (
                    <span className="text-sm text-gray-500">
                      {field.value.length} image(s) uploaded
                    </span>
                  )}
                </div>
                <FileUploaderMinimal
                  onChange={handleImageUpload}
                  pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}
                  imgOnly
                  className="text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                />
              </LabelInputContainer>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <LabelInputContainer>
                <Label>Project Link</Label>
                <FormControl>
                  <AnimatedInput
                    {...field}
                    placeholder="https://your-project.com"
                  />
                </FormControl>
              </LabelInputContainer>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen && setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isUploading || form.formState.isSubmitting}
          >
            {isUploading
              ? "Uploading Images..."
              : form.formState.isSubmitting
              ? experience_id
                ? "Updating..."
                : "Creating..."
              : experience_id
              ? "Update"
              : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ExperienceForm;
