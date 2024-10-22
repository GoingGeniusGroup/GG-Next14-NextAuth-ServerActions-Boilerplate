"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { loginSchema } from "@/schemas";
import { Button } from "@/components/ui/button/button";
import { useTransition } from "react";
import { login } from "@/actions/login";
import { FormInput } from "@/components/auth/form-input";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const LoginForm = ({ isMobile }: { isMobile: boolean }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      login(values)
        .then((data) => {
          if (!data) return;

          if (!data.success) {
            return toast.error(data.error.message);
          }

          toast.success(data.message);

          // If 2FA is required, redirect to 2FA page
          if (data.twoFactor) {
            return router.push("/two-factor");
          }

          // If login is successful without 2FA:
          // 1. Show success message
          toast.success("Login successful! Redirecting...");

          // 2. Small delay to ensure toast is shown
          setTimeout(() => {
            // 3. Reload the entire page
            window.location.reload();

            // 4. Optional: Replace current history entry with home page
            window.location.href = "/";
          }, 1000);
        })
        .catch(() => {
          toast.error("Something went wrong.");
          // Reset form on error
          form.reset();
        });
    });
  });

  return (
    <CardWrapper
      headerTitle="Login"
      headerDescription="Welcome back! Please fill out the form below before logging in to the website."
      backButtonLabel="Don't have an account? Register"
      backButtonHref="/register"
      isMobile={isMobile}
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          // Prevent default form submission
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
        >
          <div className="space-y-4 text-black dark:text-white">
            <FormInput
              control={form.control}
              name="email"
              label="Email Address"
              type="email"
              placeholder="e.g. johndoe@example.com"
              isPending={isPending}
              // Disable autocomplete for security
              autoComplete="off"
            />
            <div>
              <FormInput
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="******"
                isPending={isPending}
                // Disable autocomplete for security
                autoComplete="new-password"
              />
              <Button
                size="sm"
                variant="anylink"
                className="w-full justify-end -mt-6 p-0 text-xs"
                asChild
              >
                <Link href="/reset">Forgot password?</Link>
              </Button>
            </div>
          </div>
          <Button
            type="submit"
            disabled={isPending || !form.formState.isValid}
            className="w-full"
          >
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
