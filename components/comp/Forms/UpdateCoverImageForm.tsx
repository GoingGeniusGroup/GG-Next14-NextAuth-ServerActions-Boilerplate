"use client";

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
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LabelInputContainer } from "@/components/ui/animated-input/label-input-container";
import { Label } from "@/components/ui/animated-input/label";
import { FileUploaderMinimal } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import Image from "next/image";
import { useState } from "react";
import { updateCoverPhoto } from "@/actions/update-cover-photo";

// Define the form schema
const ProfileFormSchema = z.object({
  cover_images: z.array(z.string()),
});

interface UpdateCoverImageFormProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  gg_id: string;
  currentCoverImage: string;
}

export default function UpdateCoverImageForm({
  setOpen,
  gg_id,
  currentCoverImage,
}: UpdateCoverImageFormProps) {
  const router = useRouter();
  const [isImageUploading, setIsImageUploading] = useState(false);

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    mode: "onBlur",
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      cover_images: Array.isArray(currentCoverImage)
        ? currentCoverImage
        : currentCoverImage
        ? [currentCoverImage]
        : [],
    },
  });

  const handleImageUpload = (info: { allEntries: any[] }) => {
    const hasUploadingFiles = info.allEntries.some(
      (file) => file.status === "uploading"
    );
    setIsImageUploading(hasUploadingFiles);

    const successfulFiles = info.allEntries.filter(
      (file) => file.status === "success"
    );

    if (successfulFiles.length > 0) {
      const imageUrl = successfulFiles[successfulFiles.length - 1].cdnUrl;
      // Update form with array of strings
      form.setValue("cover_images", [imageUrl]);

      if (!hasUploadingFiles) {
        setIsImageUploading(false);
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof ProfileFormSchema>) => {
    if (isImageUploading) {
      toast.error("Please wait for image upload to complete");
      return;
    }

    try {
      const formData = {
        gg_id,
        cover_images: data.cover_images, // Already an array
      };

      const result = await updateCoverPhoto(formData);

      if (result.success) {
        toast.success("Cover photo updated successfully");
        router.refresh();
        setOpen?.(false);
        form.reset();
      } else {
        toast.error(result.error?.message || "Failed to update cover photo");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="cover_images"
          render={({ field }) => (
            <FormItem>
              <LabelInputContainer>
                <div className="flex justify-between items-center">
                  <Label>Change Cover Picture</Label>
                  {field.value?.length > 0 && (
                    <div className="relative size-8 rounded-full overflow-hidden">
                      <Image
                        src={field.value[0]}
                        alt="Cover picture"
                        fill
                        className="object-cover"
                        unoptimized
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
                <FileUploaderMinimal
                  onChange={handleImageUpload}
                  pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}
                  imgOnly
                  className="text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  multiple={false}
                />
              </LabelInputContainer>
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
            disabled={isImageUploading || form.formState.isSubmitting}
          >
            {isImageUploading
              ? "Image Uploading..."
              : form.formState.isSubmitting
              ? "Updating..."
              : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
