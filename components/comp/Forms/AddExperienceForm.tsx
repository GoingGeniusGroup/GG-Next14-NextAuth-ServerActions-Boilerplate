"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AnimatedInput } from "@/components/ui/animated-input/animated-input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/animated-input/label";

import "@uploadcare/react-uploader/core.css";
import { LabelInputContainer } from "@/components/ui/animated-input/label-input-container";
import { FileUploaderMinimal } from "@uploadcare/react-uploader";
import { addExperience, updateUserExperience } from "@/actions/experience";

const experienceSchema = z.object({
  type: z.string().min(3, "Type must be at least 3 characters"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  tools: z.array(z.string()).min(1, "At least one tool is required").optional(),
  project_skills: z
    .array(z.string())
    .min(1, "At least one skill is required")
    .optional(), // Ensure this line is present
  project_pictures: z
    .array(z.string())
    .min(1, "At least one picture is required")
    .optional(),
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
    project_skills: string[]; // Added skills to default values
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
      project_skills: [], // Default value for skills
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

  const onSubmit = async (data: z.infer<typeof experienceSchema>) => {
    if (isUploading) {
      toast.error("Please wait for image upload to complete");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("gg_id", gg_id);
      formData.append("experience_id", experience_id || "");
      formData.append("type", data.type);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("link", data.link);

      // Append array values as comma-separated strings or individual entries
      formData.append("tools", (data.tools || []).join(","));
      formData.append("project_skills", (data.project_skills || []).join(","));

      formData.append(
        "project_pictures",
        (data.project_pictures || []).join(",")
      );

      let result;

      if (experience_id) {
        // Update existing experience
        result = await updateUserExperience(experience_id, formData);
      } else {
        // Create new experience
        result = await addExperience(formData);
      }

      if (result.success) {
        form.reset();
        toast.success(
          experience_id
            ? "Experience updated successfully"
            : "Experience created successfully"
        );
        router.refresh();
        setOpen(false);
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
                        e.target.value
                          .split(",") // Split by comma
                          .map((tool) => tool.trim()) // Trim each entry to remove extra spaces
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
          name="project_skills"
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
