import {
  CredentialsProvider,
  GithubProvider,
  GoogleProvider,
} from "@/app/auth/providers";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [CredentialsProvider, GithubProvider, GoogleProvider],
} satisfies NextAuthConfig;
