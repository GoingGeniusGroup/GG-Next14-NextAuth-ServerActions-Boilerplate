import { NewPasswordForm } from "@/src/components/form/new-password-form";
import { getResetPasswordToken } from "@/services/reset-password-token";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default async function NewPassword(
  props: {
    searchParams: Promise<{ token: string }>;
  }
) {
  const searchParams = await props.searchParams;
  if (!searchParams.token) redirect("/");
  const resetPasswordToken = await getResetPasswordToken(searchParams.token);
  if (!resetPasswordToken) redirect("/");

  return <NewPasswordForm token={resetPasswordToken.token} />;
}
