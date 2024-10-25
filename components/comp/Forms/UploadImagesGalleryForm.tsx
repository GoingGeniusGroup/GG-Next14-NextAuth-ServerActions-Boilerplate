"use client";

import { updateImagesGallery } from "@/actions/update-images-gallery";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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

interface UploadImagesGalleryFormProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  gg_id: string;
  currentGalleryImages: string[];
}

export default function UploadImagesGalleryForm({
  setOpen,
  gg_id,
  currentGalleryImages,
}: UploadImagesGalleryFormProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false); // Track upload status

  const form = useForm({
    defaultValues: {
      image_urls: currentGalleryImages || [],
    },
  });

  const handleImageUpload = (info: { allEntries: any[] }) => {
    setIsUploading(true); // Start uploading

    const successfulFiles = info.allEntries.filter(
      (file) => file.status === "success"
    );

    if (successfulFiles.length > 0) {
      const imageUrls = successfulFiles.map((file) => file.cdnUrl);
      const currentUrls = form.getValues("image_urls");
      form.setValue("image_urls", [...currentUrls, ...imageUrls]);
    }

    setIsUploading(false); // Complete uploading after successful upload
  };

  const onSubmit = async (data: any) => {
    if (isUploading) return; // Prevent submission if files are still uploading

    try {
      const formData = {
        gg_id,
        image_urls: data.image_urls,
      };

      const result = await updateImagesGallery(formData);

      if (result.success) {
        toast.success("Images uploaded successfully");
        router.refresh();
        setOpen && setOpen(false);
        form.reset();
      } else {
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("An error occurred while uploading images.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="image_urls"
          render={({ field }) => (
            <FormItem>
              <LabelInputContainer>
                <Label>Gallery Images</Label>
                <FileUploaderMinimal
                  onChange={handleImageUpload}
                  pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}
                  imgOnly
                  className="text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  multiple={true}
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
            onClick={() => setOpen && setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isUploading || form.formState.isSubmitting}
          >
            {isUploading
              ? "Uploading..."
              : form.formState.isSubmitting
              ? "Submitting..."
              : "Upload Images"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
