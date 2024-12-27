"use client";

import { useState, useEffect } from "react";
import { Button } from "@/src/ui/button";
import { Facebook, Twitch, Twitter, Youtube, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/ui/avatar";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface ProfileHeaderProps {
  username: string;
  fullName: string;
  dob: string;
  bio: string;
  avatarUrl: string;
  onTabChange: (tab: string) => void;
  profilePic: string;
  coverPic: string;
}

// Helper function to calculate age
const calculateAge = (dob: string) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

export default function ProfileHeader({
  username,
  fullName,
  dob,
  bio,
  avatarUrl,
  onTabChange,
  profilePic,
  coverPic,
}: ProfileHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const age = calculateAge(dob);

  // Get the current tab from query parameter or default to gallery
  const currentTab = searchParams.get("tab") || "gallery";

  // Handle tab changes with URL updates
  const handleTabChange = (tab: string) => {
    if (tab === "gallery") {
      router.push(`/genius-profile/${username}`);
    } else {
      router.push(`/genius-profile/${username}?tab=${tab}`);
    }
    onTabChange(tab);
  };

  // Set initial tab on component mount
  useEffect(() => {
    onTabChange(currentTab);
  }, [currentTab, onTabChange]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={coverPic}
          alt="Cover background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-amber-500 uppercase">
              {age} YEARS OLD
            </h3>
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={profilePic} alt="profile picture" />
                <AvatarFallback>{age}</AvatarFallback>
              </Avatar>
              <h1 className="text-6xl font-bold tracking-tighter">
                {fullName}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mt-2">@{username}</p>
          </div>
          <p className="text-lg leading-relaxed max-w-xl">{bio}</p>
          <div className="flex gap-4">
            <Button
              onClick={() => handleTabChange("gallery")}
              variant={currentTab === "gallery" ? "default" : "secondary"}
              className={currentTab === "gallery" ? "ring-2 ring-primary" : ""}
            >
              Gallery
            </Button>
            <Button
              onClick={() => handleTabChange("projects")}
              variant={currentTab === "projects" ? "default" : "secondary"}
              className={currentTab === "projects" ? "ring-2 ring-primary" : ""}
            >
              Projects
            </Button>
            <Button
              onClick={() => handleTabChange("cards")}
              variant={currentTab === "cards" ? "default" : "secondary"}
              className={currentTab === "cards" ? "ring-2 ring-primary" : ""}
            >
              Profile Cards
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="relative w-96 h-96">
            <Image
              src={avatarUrl}
              alt="Profile Avatar"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <div className="absolute top-2 right-2 flex gap-3">
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Youtube className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Instagram className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Twitch className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
