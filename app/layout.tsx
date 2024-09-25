// import { Layout } from '@/components/dom/Layout';
import "@/styles/globals.css";
import { Toaster } from "@/ui/sonner";
import type { Metadata } from "next";
import Providers from "@/app/providers/SessionProvider";
import { Inter } from "next/font/google";
// import { Providers } from "./store/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Next Dashboard ",
    template: "Next Dashboard",
  },
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Layout> */}
        <Toaster position="bottom-left" richColors theme="light" />
        <Providers>{children}</Providers>
        {/* </Layout> */}
      </body>
    </html>
  );
}


