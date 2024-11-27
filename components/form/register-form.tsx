"use client";

import { CardWrapper } from "@/components/comp/auth/card-wrapper";
import { Form } from "@/components/ui/form";
import { normalizePhoneNumber, registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "@/components/comp/auth/form-input";
import { Button } from "@/components/ui/button/button";
import { useTransition } from "react";
import { register } from "@/actions/register";
import { login } from "@/actions/login"; // Import the login action
import { toast } from "sonner";

export const RegisterForm = ({ isMobile }: { isMobile: boolean }) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone_number: "", // Adding default value for optional phone number
    },
    mode: "onChange", // Enable real-time validation
  });

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      // Normalize the phone number before registration
      const normalizedPhoneNumber = normalizePhoneNumber(values.phone_number);
      const registrationData = {
        ...values,
        phone_number: normalizedPhoneNumber,
      };

      register(registrationData).then((data) => {
        if (data.success) {
          // Use the normalized phone number for login
          login({
            login: normalizedPhoneNumber, // Use normalized phone number
            password: values.password,
          })
            .then((loginData) => {
              if (loginData.success) {
                toast.success("Registration and login successful!");
                setTimeout(() => {
                  window.location.reload();
                  window.location.href = "/";
                }, 1000);
              } else {
                console.error("Login failed after registration:", loginData);
                toast.error(
                  "Registration successful, but login failed. Please try logging in manually."
                );
              }
            })
            .catch((error) => {
              console.error("Login error:", error);
              toast.error(
                "Something went wrong while logging in. Please try logging in manually."
              );
            });
        } else {
          toast.error(data.error?.message || "Registration failed");
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
              name="phone_number"
              label="Phone Number"
              type="tel"
              placeholder="e.g. +1234567890"
              isPending={isPending}
            />
            <FormInput
              control={form.control}
              name="email"
              label="Email Address (optional)"
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
          </div>
          <Button
            type="submit"
            disabled={isPending || !form.formState.isValid}
            className="w-full"
          >
            {isPending ? "Processing..." : "Create Account"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
