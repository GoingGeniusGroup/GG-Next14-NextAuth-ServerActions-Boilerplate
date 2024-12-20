import { getUserAvatars } from "@/actions/genius-profile/avatar";
import { currentUser } from "@/lib/auth";
import {
  AvatarProvider,
  AvatarType,
} from "@/src/components/comp/AvatarManager/provider/AvatarManagerContext";
import FloatingDockInvertedComponent from "@/src/components/comp/dock/FloatingDockInverted";
import { MobileSimulatorProvider } from "@/src/components/comp/MobileSimulator/provider/MobileSimulatorContext";
import { ThemeSwitcher } from "@/src/components/comp/ThemeToggler/ThemeSwitcher";
import { UserProvider } from "@/src/hooks/UserProvider";
import Providers from "@/src/providers/SessionProvider";
import { AuroraBackground } from "@/src/ui/background/aurora-background";
import { Toaster } from "@/src/ui/sonner";
import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { ToastProvider } from "../src/providers/toast-provider";
import FullscreenButton from "@/src/ui/button/fullscreen-button";

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
  const user = await currentUser();

  if (!user) {
    return (
      <>
        <html lang="en" className="h-full">
          <body className={inter.className}>
            <Toaster position="bottom-left" richColors theme="light" />
            <Providers>
              <MobileSimulatorProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                >
                  <AuroraBackground>
                    <UserProvider>
                      {/* Theme switcher */}
                      <div className="absolute top-[8px] right-[73px] z-50">
                        <ThemeSwitcher />
                      </div>

                      {/* Dock section */}
                      <div className="w-full z-40">
                        <div className="p-4 text-black dark:text-white">
                          <FloatingDockInvertedComponent />
                        </div>
                      </div>

                      {/* Content section */}
                      <div className="flex-1 px-8 py-4 w-full overflow-auto">
                        {children}
                        <SpeedInsights/>
                      </div>
                    </UserProvider>
                    <ToastProvider />
                  </AuroraBackground>
                </ThemeProvider>
              </MobileSimulatorProvider>
            </Providers>
          </body>
        </html>
      </>
    );
  }

  const avatarsResponse = await getUserAvatars(user.gg_id);
  const avatars: AvatarType[] =
    avatarsResponse.success && Array.isArray(avatarsResponse.data)
      ? avatarsResponse.data
      : [];

  return (
    <html lang="en" className="h-full">
      <body className={inter.className}>
        <Toaster position="bottom-left" richColors theme="light" />
        <Providers>
          <MobileSimulatorProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <AuroraBackground>
                <UserProvider>
                  <AvatarProvider initialAvatars={avatars} user={user.gg_id}>
                    {/* Theme switcher */}
                    <div className="absolute top-[8px] right-[73px] z-50">
                      <ThemeSwitcher />
                    </div>

                    {/* Dock section */}
                    <div className="w-full z-40">
                      <div className="p-4 text-black dark:text-white">
                        <FloatingDockInvertedComponent />
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="flex-1 px-8 py-4 w-full overflow-auto">
                      {children}
                      <SpeedInsights/>
                    </div>
                    <FullscreenButton />
                  </AvatarProvider>
                </UserProvider>
                <ToastProvider />
              </AuroraBackground>
            </ThemeProvider>
          </MobileSimulatorProvider>
        </Providers>
      </body>
    </html>
  );
}
