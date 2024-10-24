"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateProfile } from "@/actions/update-profile";
import { toast } from "sonner";

const formSchema = z.object({
  // username: z
  //   .string()
  //   .min(3, {
  //     message: "Username must be at least 3 characters.",
  //   })
  //   .max(20, {
  //     message: "Username must not exceed 20 characters.",
  //   }),
  // email: z.string().email(),
  first_name: z.string().min(3, {
    message: "First name must be at least 3 characters.",
  }),
  last_name: z.string().min(3, {
    message: "Last name must be at least 3 characters.",
  }),
  address: z.string().min(3, {
    message: "Address must be at least 3 characters.",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters.",
  }),
  region: z.string().min(3, {
    message: "Region must be at least 3 characters.",
  }),
  dob: z.string().min(3, {
    message: "Date of birth must be at least 3 characters.",
  }),
});

interface UpdateProfileDialogProps {
  gg_id: string;
  // currentEmail: string;
  currentFirstName: string;
  currentLastName: string;
  currentAddress: string;
  currentDescription: string;
  currentDob: string | Date;
}

const UpdateProfileDialog: React.FC<UpdateProfileDialogProps> = ({
  gg_id,
  // currentEmail,
  currentFirstName,
  currentLastName,
  currentAddress,
  currentDescription,
  currentDob,
}) => {
  const [open, setOpen] = React.useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // email: currentEmail || "",
      first_name: currentFirstName || "",
      last_name: currentLastName || "",
      address: currentAddress || "",
      description: currentDescription || "",
      dob: currentDob || "",
    },
  });

  const onSubmit = async (values: any) => {
    try {
      const result = await updateProfile({
        gg_id,
        // email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        address: values.address,
        description: values.description,
        dob: values.dob,
      });

      if (result.success) {
        toast.success("Profile updated successfully");
        setOpen(false);
        window.location.reload(); //Reload the entire page
      } else {
        toast.error(result.error.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Update Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter new username" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
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
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value?.toString() || ""}
                      placeholder="Eg. 01/01/2000"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
