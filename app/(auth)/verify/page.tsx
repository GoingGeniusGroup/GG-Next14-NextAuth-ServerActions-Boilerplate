import { newVerification } from "@/actions/auth/verify-token";
import { NewVerificationForm } from "@/src/components/form/verify-token-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Verify Email",
};

export default async function NewVerificationPage(
  props: {
    searchParams: Promise<{ token: string }>;
  }
) {
  const searchParams = await props.searchParams;
  if (!searchParams.token) redirect("/login");
  const data = await newVerification(searchParams.token);

  return <NewVerificationForm data={data} />;
}
