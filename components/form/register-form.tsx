"use client";

import { CardWrapper } from "@/components/comp/auth/card-wrapper";
import { Form } from "@/components/ui/form";
import { registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "@/components/comp/auth/form-input";
import { Button } from "@/components/ui/button/button";
import { useTransition } from "react";
import { register } from "@/actions/register";
import { login } from "@/actions/login"; // Import the login action
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const RegisterForm = ({ isMobile }: { isMobile: boolean }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone_number: "", // Adding default value for optional phone number
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      register(values).then((data) => {
        if (data.success) {
          // Attempt to log the user in after successful registration
          login({ login: values.email, password: values.password })
            .then((loginData) => {
              if (loginData.success) {
                // Redirect the user to the home page after successful login
                // If login is successful without 2FA:
                // 1. Show success message
                toast.success("Registration and login successful!");

                // 2. Small delay to ensure toast is shown
                setTimeout(() => {
                  // 3. Reload the entire page
                  window.location.reload();

                  // 4. Optional: Replace current history entry with home page
                  window.location.href = "/";
                }, 1000);
              } else {
                toast.error("Registration successful, but login failed.");
              }
            })
            .catch(() => toast.error("Something went wrong while logging in."));
        } else {
          toast.error(data.error.message);
        }
      });
    });
  });

  return (
    <CardWrapper
      headerTitle="Register"
      headerDescription="Register your account by filling out the form below, make sure the data you enter is correct."
      backButtonLabel="Already have an account? Login"
      backButtonHref="/login"
      isMobile={isMobile}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 text-black dark:text-white">
            <FormInput
              control={form.control}
              name="username"
              label="Username"
              type="text"
              placeholder="e.g. John Doe"
              isPending={isPending}
            />
            <FormInput
              control={form.control}
              name="email"
              label="Email Address"
              type="email"
              placeholder="e.g. johndoe@example.com"
              isPending={isPending}
            />
            <FormInput
              control={form.control}
              name="password"
              label="Password"
              type="password"
              placeholder="******"
              isPending={isPending}
            />
            <FormInput
              control={form.control}
              name="phone_number"
              label="Phone Number (Optional)"
              type="tel"
              placeholder="e.g. +1234567890"
              isPending={isPending}
            />
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
