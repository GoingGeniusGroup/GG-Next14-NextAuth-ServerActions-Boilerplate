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
  images: z.array(imageSchema).min(1, { message: "At least one image is required" }),
});


interface UploadImagesGalleryFormProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  gg_id: string;
  currentGalleryImages?: imagePostType[];
}

export type imagePostType = {
  image_url: string;
  caption?: string;
  description?: string;
}
export default function UploadImagesGalleryForm({
  setOpen,
  gg_id,
  currentGalleryImages = [],
}: UploadImagesGalleryFormProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFiles, setProcessedFiles] = useState<Set<string>>(new Set());

  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [],
    },
  });
  

  console.log('====================================');
  console.log(form.watch('images'),currentGalleryImages);
  console.log('====================================');
  const handleImageUpload = (info: { allEntries: any[] }) => {
    setIsProcessing(true);

    const hasUploadingFiles = info.allEntries.some(
      (file) => file.status === "uploading"
    );
    setIsUploading(hasUploadingFiles);

    const successfulFiles = info.allEntries.filter(
      (file) => file.status === "success" && !processedFiles.has(file.uuid)
    );

    if (successfulFiles.length > 0) {
      const newImages = successfulFiles.map((file) => ({
        image_url: file.cdnUrl,
        caption: "",
        description: "",
      }));

      const currentImages = form.getValues("images");
      const uniqueImagesMap = new Map(
        [...currentImages, ...newImages].map((image) => [image.image_url, image])
      );
      const uniqueImages = Array.from(uniqueImagesMap.values());

      form.setValue("images", uniqueImages);
      successfulFiles.forEach((file) => {
        setProcessedFiles((prev) => new Set([...prev, file.uuid]));
      });
    }

    if (!hasUploadingFiles) {
      setIsProcessing(false);
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isUploading || isProcessing) return;

    try {
      const final_images_urls= new Map (
        [...currentGalleryImages, ...data.images].map((image) => [image.image_url, image])
      )
      const final_urls = Array.from(final_images_urls.values());


      const formData = {
        gg_id:gg_id,
        image_urls: final_urls.map(img => img.image_url),
        imageposts: data.images
      };
    console.log('====================================');
    console.log(formData,data,final_urls,'from onsubmi');
    console.log('====================================');
      const result = await updateImagesGallery(formData);

      if (result.success) {
        toast.success("Images uploaded successfully");
        router.refresh();
        setOpen?.(false);
        form.reset();
        setProcessedFiles(new Set());
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
          name="images"
          render={({ field }) => (
            <FormItem>
              <LabelInputContainer>
                <Label>Gallery Images</Label>
                <FileUploaderMinimal
                  onChange={handleImageUpload}
                  pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}
                  imgOnly
                  multiple={true}
                  className="text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                />
                {form.getValues("images").map((_, index) => (
                  <div key={index} className="space-y-2">
                    <FormLabel>Caption</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register(`images.${index}.caption`)}
                        placeholder="Enter image caption"
                      />
                    </FormControl>

                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...form.register(`images.${index}.description`)}
                        placeholder="Enter image description"
                      />
                    </FormControl>
                  </div>
                ))}
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
            disabled={
              isUploading ||
              isProcessing ||
              form.formState.isSubmitting ||
              form.getValues("images").length === 0
            }
          >
            {isUploading || isProcessing
              ? "Processing..."
              : form.formState.isSubmitting
              ? "Submitting..."
              : "Upload Images"}
          </Button>
        </div>
      </form>
    </Form>
  );
}