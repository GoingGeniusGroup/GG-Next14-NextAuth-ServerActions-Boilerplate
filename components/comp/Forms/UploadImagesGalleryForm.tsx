"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { FileUploaderMinimal } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LabelInputContainer } from "@/components/ui/animated-input/label-input-container";
import { Label } from "@/components/ui/animated-input/label";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateImagesGallery } from "@/actions/image-post";

// Zod schema for form validation
const imageSchema = z.object({
  image_url: z.string().url({ message: "Invalid image URL" }),
  caption: z.string().optional(),
  description: z.string().optional(),
});

const formSchema = z.object({
  image: imageSchema,
});

interface UploadImagesGalleryFormProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  gg_id: string;
  currentGalleryImages?: imagePostType[];
}

export type imagePostType = {
  img_id?: string;
  image_url: string;
  caption?: string | null;
  description?: string | null;
};

export default function UploadImagesGalleryForm({
  setOpen,
  gg_id,
  currentGalleryImages = [],
}: UploadImagesGalleryFormProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: {
        image_url: "",
        caption: "",
        description: "",
      },
    },
  });

  const handleImageUpload = (info: { allEntries: any[] }) => {
    setIsProcessing(true);

    const hasUploadingFiles = info.allEntries.some(
      (file) => file.status === "uploading"
    );
    setIsUploading(hasUploadingFiles);

    const successfulFile = info.allEntries.find(
      (file) => file.status === "success"
    );

    if (successfulFile) {
      form.setValue("image.image_url", successfulFile.cdnUrl);
    }

    if (!hasUploadingFiles) {
      setIsProcessing(false);
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isUploading || isProcessing) return;

    try {
      const formData = {
        gg_id: gg_id,
        image_urls: [data.image.image_url],
        imageposts: [data.image],
      };

      const result = await updateImagesGallery(formData);

      if (result.success) {
        toast.success("Image uploaded successfully");
        router.refresh();
        setOpen?.(false);
        form.reset();
      } else {
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("An error occurred while uploading the image.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="image.image_url"
          render={({ field }) => (
            <FormItem>
              <LabelInputContainer>
                <Label>Gallery Image</Label>
                <FileUploaderMinimal
                  onChange={handleImageUpload}
                  pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}
                  imgOnly
                  multiple={false}
                  className="text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                />
              </LabelInputContainer>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image.caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter image caption" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter image description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen?.(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              isUploading ||
              isProcessing ||
              form.formState.isSubmitting ||
              !form.getValues("image.image_url")
            }
          >
            {isUploading || isProcessing
              ? "Processing..."
              : form.formState.isSubmitting
              ? "Submitting..."
              : "Upload Image"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
