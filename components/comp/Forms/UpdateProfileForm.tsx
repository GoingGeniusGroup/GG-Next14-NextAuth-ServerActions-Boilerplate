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
import { Controller, useForm } from "react-hook-form";
import { ProfileFormSchema } from "@/schemas/FormSchema";
import { updateProfile } from "@/actions/update-profile";
import { toast } from "sonner";
import { AnimatedInput } from "@/components/ui/animated-input/animated-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { LabelInputContainer } from "@/components/ui/animated-input/label-input-container";
import { Label } from "@/components/ui/animated-input/label";

interface UpdateProfileDialogProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  gg_id: string;
  currentFirstName: string;
  currentLastName: string;
  currentAddress: string;
  currentDescription: string;
  currentDob: Date | null;
}

export default function UpdateProfileForm({
  setOpen,
  gg_id,
  currentFirstName,
  currentLastName,
  currentAddress,
  currentDescription,
  currentDob,
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
      // Properly parse the date, ensuring it's a Date object
      dob: currentDob ? new Date(currentDob) : null,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      // Ensure we're sending a proper Date object for dob
      const formData = {
        gg_id,
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        description: data.description,
        dob:
          data.dob instanceof Date
            ? data.dob
            : data.dob
            ? new Date(data.dob)
            : null,
      };

      const result = await updateProfile(formData);

      if (result.success) {
        toast.success("Profile updated successfully");
        router.refresh();
        setOpen && setOpen(false);
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
        {/* Other form fields remain the same */}
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <LabelInputContainer>
                <Label>First Name</Label>
                <FormControl>
                  <AnimatedInput {...field} placeholder="Eg. John" />
                </FormControl>
              </LabelInputContainer>
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
                <AnimatedInput {...field} placeholder="Eg. Doe" />
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
                <AnimatedInput {...field} placeholder="Eg. 1234 Main St" />
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
                <AnimatedInput {...field} placeholder="Eg. Web Developer" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Updated DOB field with proper date handling */}
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Controller
                  name="dob"
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      selected={value}
                      onChange={(date: Date | null) => onChange(date)}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select your date of birth"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      showYearDropdown
                      yearDropdownItemNumber={100}
                      scrollableYearDropdown
                    />
                  )}
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
            onClick={() => setOpen && setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
