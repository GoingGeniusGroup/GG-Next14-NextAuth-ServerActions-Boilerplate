import { Button } from "@/src/ui/button";
import { Card } from "@/src/ui/card";
import {
  Facebook,
  Twitch,
  Twitter,
  Youtube,
  Instagram,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProfileHeaderProps {
  username: string;
  fullName: string;
  dob: string;
  bio: string;
  avatarUrl: string;
  onTabChange: (tab: string) => void;
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
}: ProfileHeaderProps) {
  const age = calculateAge(dob);
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-amber-500/20 to-slate-900 rounded-xl">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-amber-500 uppercase">
              {age} YEARS OLD
            </h3>
            <h1 className="text-6xl font-bold tracking-tighter">{fullName}</h1>
            <p className="text-xl text-muted-foreground mt-2">@{username}</p>
          </div>
          <p className="text-lg leading-relaxed max-w-xl">{bio}</p>
          <div className="flex gap-4">
            <Button onClick={() => onTabChange("gallery")}>Gallery</Button>
            <Button onClick={() => onTabChange("projects")} variant="secondary">
              Projects
            </Button>
            <Button onClick={() => onTabChange("cards")} variant="secondary">
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
