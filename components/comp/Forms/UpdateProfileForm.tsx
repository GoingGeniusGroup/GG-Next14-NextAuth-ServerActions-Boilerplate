"use client";

import { Button } from "@/components/ui/button/button";
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

import { ProfileFormSchema } from "@/schemas/FormSchema";
import { updateProfile } from "@/actions/update-profile";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";

interface UpdateProfileDialogProps {
  gg_id: string;
  currentFirstName: string;
  currentLastName: string;
  currentAddress: string;
  currentDescription: string;
}

export default function UpdateProfileForm({
  gg_id,
  currentFirstName,
  currentLastName,
  currentAddress,
  currentDescription,
}: UpdateProfileDialogProps) {
  const router = useRouter();

  const form = useForm({
    mode: "onBlur",
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      first_name: currentFirstName || "",
      last_name: currentLastName || "",
      address: currentAddress || "",
      description: currentDescription || "",
    },
  });

  const onSubmit = async (data: any) => {
    // Correctly receive data from form
    try {
      const result = await updateProfile({
        gg_id,
        first_name: data.first_name, // Pass the form data
        last_name: data.last_name, // Pass the form data
        address: data.address, // Pass the form data
        description: data.description, // Pass the form data
      });

      if (result.success) {
        toast.success("Profile updated successfully");
        router.refresh();
        form.reset();
      } else {
        toast.error(result.error.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Eg. John" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Eg. Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Eg. 1234 Main St" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Eg. Web Developer" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-3">
          {/* <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button> */}
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
