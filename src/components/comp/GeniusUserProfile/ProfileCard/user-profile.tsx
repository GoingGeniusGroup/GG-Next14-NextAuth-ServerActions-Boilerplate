"use client";

import { Card, CardContent } from "@/src/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface UserProfileProps {
  username: string;
  name: string;
  role: string;
  avatarUrl: string;
  isUserLoggedIn: boolean;
  toggleModal: () => void;
  className?: string; // Added optional className prop
}

export function UserProfile({
  username,
  name,
  role,
  avatarUrl,
  isUserLoggedIn,
  toggleModal,
  className = "", // Default to empty string if not provided
}: UserProfileProps) {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    if (!isUserLoggedIn && e.currentTarget === e.target) {
      e.preventDefault();
      toggleModal();
    }
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    if (isUserLoggedIn) {
      router.push(`/genius-profile/${username}`);
    } else {
      toggleModal();
    }
  };
  return (
    <div
      onClick={handleCardClick}
      className={`block transition-transform hover:scale-105 relative ${className}`}
    >
      <Card className="group size-[300px] bg-white dark:bg-black rounded-lg overflow-hidden relative">
        <CardContent className="relative overflow-hidden w-full h-full flex items-center p-0">
          <div className="w-full h-full relative">
            <Image
              src={avatarUrl}
              alt={name}
              fill
              unoptimized
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          {/* Hover Overlay */}
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 flex items-center justify-center">
            <div
              onClick={handleIconClick}
              className="bg-white/80 dark:bg-black/80 p-3 rounded-full cursor-pointer hover:scale-110 transition-transform"
            >
              <ArrowRight className="text-black dark:text-white" size={24} />
            </div>
          </div>

          <h3 className="absolute inset-0 opacity-50 group-hover:opacity-100 flex justify-center items-center text-xl font-bold uppercase text-black dark:text-white transition-all duration-300 pointer-events-none">
            {username}
          </h3>
        </CardContent>
      </Card>
    </div>
  );
}
