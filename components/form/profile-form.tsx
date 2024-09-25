"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/auth/form-input";
import { profile } from "@/actions/profile";
import { toast } from "sonner";
import { ExtendedUser } from "@/types/next-auth";
import { FormToggle } from "@/components/auth/form-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";

import { profileSchema } from "@/schemas";

// SpotlightButton
import SpotlightButton from "../ui/button/spotlightButton";

type ProfileFormProps = {
  user: ExtendedUser;
};

export const ProfileForm = ({ user }: ProfileFormProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      password: "",
      newPassword: "",
      isTwoFactorEnabled: user.isTwoFactorEnabled || false,
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      profile(values).then((data) => {
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.error.message);
        }
      });
    });
  });

  return (
    <div className="space-y-6">
      {/* Avatar Section with Circular Gradient and Hover Animation */}
      <div className="flex justify-center mb-4">
        <Avatar className="w-24 h-24 sm:w-32 sm:h-32 relative">
          <div className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-blue-500 to-purple-600 animate-pulse"></div>
          <AvatarImage src={user.image ?? ""} />
          <AvatarFallback>
            <UserRound className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500" />
          </AvatarFallback>
        </Avatar>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Only show email and password fields if not an OAuth user */}
          {!user.isOAuth && (
            <>
              <FormInput
                control={form.control}
                name="name"
                label="Name"
                type="text"
                placeholder="e.g. John Doe"
                className="input-with-floating-label"
                disabled={isPending}
              />
              <FormInput
                control={form.control}
                name="email"
                label="Email Address"
                type="email"
                placeholder="e.g. johndoe@example.com"
                className="input-with-floating-label"
                disabled={isPending}
              />
              <FormInput
                control={form.control}
                name="password"
                label="Current Password"
                type="password"
                placeholder="******"
                autoComplete="current-password"
                disabled={isPending}
              />
              <FormInput
                control={form.control}
                name="newPassword"
                label="New Password"
                type="password"
                placeholder="******"
                autoComplete="new-password"
                disabled={isPending}
              />
              <FormToggle
                control={form.control}
                name="isTwoFactorEnabled"
                label="Two-Factor Authentication"
                description="Enable two-factor authentication for enhanced account security."
                disabled={isPending}
              />
            </>
          )}

          {/* For OAuth users, show email but disable editing */}
          {user.isOAuth && (
            <>
              <FormInput
                control={form.control}
                name="name"
                label="Name"
                type="text"
                placeholder="e.g. John Doe"
                className="input-with-floating-label"
                disabled={true}
              />
              <FormInput
                control={form.control}
                name="email"
                label="Email Address"
                type="email"
                placeholder="e.g. johndoe@example.com"
                disabled={true}
              />
            </>
          )}

          <SpotlightButton
            text={isPending ? "Updating..." : "Update Profile"}
            type="submit"
            isPending={isPending}
          />
        </form>
      </Form>
    </div>
  );
};
