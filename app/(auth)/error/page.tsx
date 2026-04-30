import { ErrorCard } from "@/src/components/comp/auth/error-card";
import { Metadata } from "next";
import { AuthError } from "next-auth";

export const metadata: Metadata = {
  title: "Oops! Something went wrong",
};

export default async function AuthErrorPage(
  props: {
    searchParams: Promise<{ message: AuthError["type"] }>;
  }
) {
  const searchParams = await props.searchParams;
  return <ErrorCard message={searchParams.message} />;
}
