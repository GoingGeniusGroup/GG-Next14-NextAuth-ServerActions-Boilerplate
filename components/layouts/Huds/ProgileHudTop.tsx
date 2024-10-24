"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, UserRound } from "lucide-react";
import { toast } from "react-toastify";
import { ExtendedUser } from "@/types/next-auth";
import { CgProfile } from "react-icons/cg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileHudProps {
  setShowMobile: React.Dispatch<React.SetStateAction<boolean>>;
  showMobile: boolean;
  handleServerSignOut: () => Promise<void>;
}

const tabs = ["Settings", "Mobile", "Cart", "Edit", "Wallet"] as const;
type TabType = (typeof tabs)[number];

export default function ProfileHudTop({
  setShowMobile,
  showMobile,
  handleServerSignOut,
}: ProfileHudProps) {
  const { data: session, status } = useSession();

  // Type the user properly
  const user = session?.user as ExtendedUser | undefined;

  const handleMobileButtonClick = () => {
    setShowMobile((prev) => !prev);
  };

  const logoutAndToggleSidebar = async () => {
    try {
      await handleServerSignOut();
      await signOut({ redirect: false });
      // If logout is success
      // 1. Show success message
      toast.success("Logout successful! Redirecting...");

      // 2. Small delay to ensure toast is shown
      setTimeout(() => {
        // 3. Reload the entire page
        window.location.reload();

        // 4. Optional: Replace current history entry with home page
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  // // Don't render if not authenticated
  // if (!isLoggedIn) return null;
  const username = user?.name || "user";
  const profilePic = user?.image;

  return (
    <div className="fixed  top-2 right-7 z-50 flex size-[40px] select-none items-center rounded-full">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none transition-all duration-300 ease-in-out flex dark:border-white/20 hover:dark:border-white border-black/40 hover:border-black justify-center items-center size-full overflow-hidden rounded-full bg-white dark:bg-gray-800 border">
          <Avatar className="relative">
            <AvatarImage src={profilePic || undefined} alt={username} />
            <AvatarFallback>
              <UserRound className="size-[20px] dark:text-white text-black" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer">
            {user ? (
              <Link href={`/genius-profile/${username}`} className="flex">
                <CgProfile className="mr-2 size-4" />
                Profile
              </Link>
            ) : (
              <div onClick={handleMobileButtonClick} className="flex">
                <CgProfile className="mr-2 size-4" />
                Login
              </div>
            )}
          </DropdownMenuItem>

          {user && (
            <DropdownMenuItem
              onClick={logoutAndToggleSidebar}
              className="cursor-pointer"
            >
              <LogOut className="mr-2 size-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}