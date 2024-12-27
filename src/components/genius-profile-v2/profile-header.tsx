"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import {
  Facebook,
  Twitch,
  Twitter,
  Youtube,
  Instagram,
  Gamepad2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/ui/avatar";
import { Button } from "@/src/ui/button";
import { Progress } from "@/src/ui/progress";
import AvatarManagerClientProfile from "../comp/AvatarManager/avatar-manager-client-profile";
import PublicAvatarManagerClientProfile from "../comp/AvatarManager/public-avatar-manager-client-profile";

interface ProfileHeaderProps {
  username: string;
  fullName: string;
  dob: string | Date;
  bio: string;
  avatarUrl: string;
  profilePic: string;
  coverPic: string;
  isLoggedUserProfile: boolean;
  xp: number;
  level: number;
}

const SocialLinks = memo(() => (
  <div className="flex gap-3">
    {[
      { Icon: Twitter, name: "Twitter" },
      { Icon: Youtube, name: "YouTube" },
      { Icon: Instagram, name: "Instagram" },
      { Icon: Facebook, name: "Facebook" },
      { Icon: Twitch, name: "Twitch" },
    ].map(({ Icon, name }, index) => (
      <Link
        key={index}
        href="#"
        className="text-gray-400 hover:text-cyan-500 transition-colors"
        aria-label={`${name} profile`}
      >
        <Icon className="h-5 w-5" />
      </Link>
    ))}
  </div>
));
SocialLinks.displayName = "SocialLinks";

const ProfileInfo = memo(
  ({
    fullName,
    username,
    bio,
    age,
  }: {
    fullName: string;
    username: string;
    bio: string;
    age: number;
  }) => (
    <div className="space-y-4">
      <p className="text-lg leading-relaxed max-w-2xl">{bio}</p>
      <div className="flex items-center space-x-2 text-gray-400">
        <span className="text-cyan-500">{age} years old</span>
        <span>•</span>
        <span>Joined 2023</span>
      </div>
    </div>
  )
);
ProfileInfo.displayName = "ProfileInfo";

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

const calculateXpProgress = (xp: number) => {
  const xpPerLevel = 1000;
  return ((xp % xpPerLevel) / xpPerLevel) * 100;
};

const ProfileHeader = ({
  username,
  fullName,
  dob,
  bio,
  avatarUrl,
  profilePic,
  coverPic,
  isLoggedUserProfile,
  xp,
  level,
}: ProfileHeaderProps) => {
  const age = useMemo(() => calculateAge(dob.toString()), [dob]);
  const xpProgress = useMemo(() => calculateXpProgress(xp), [xp]);

  return (
    <>
      <div className="relative p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left column */}
          <div className="lg:sticky lg:top-10 lg:col-span-1 space-y-4">
            <div className="relative w-full h-[380px] rounded-lg overflow-hidden border-4 border-cyan-500 shadow-lg shadow-cyan-500/50">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${coverPic})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/25" />
              </div>
              {isLoggedUserProfile ? (
                <AvatarManagerClientProfile
                  fov={40}
                  cameraInitialDistance={5}
                  cameraTarget={0}
                  avatarUrl={avatarUrl}
                />
              ) : (
                <PublicAvatarManagerClientProfile
                  fov={40}
                  cameraInitialDistance={5}
                  cameraTarget={0}
                  avatarUrl={avatarUrl}
                />
              )}
            </div>

            <div className="bg-gray-900 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Gamepad2 className="text-cyan-500" />
                  <span className="text-lg font-semibold">Level {level}</span>
                </div>
                <span className="text-sm text-gray-400">{xp} XP</span>
              </div>
              <Progress
                value={xpProgress}
                className="h-2 bg-gray-700"
                aria-label={`XP Progress: ${xpProgress.toFixed(2)}%`}
              />
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20 border-4 border-cyan-500">
                  <AvatarImage src={profilePic} alt={fullName} />
                  <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                    {fullName}
                  </h1>
                  <p className="text-xl text-gray-400">@{username}</p>
                </div>
              </div>
              <ProfileInfo
                fullName={fullName}
                username={username}
                bio={bio}
                age={age}
              />
            </div>
          </div>
        </div>

        <div className="absolute top-2 right-4 lg:right-2">
          <SocialLinks />
        </div>
      </div>
    </>
  );
};

export default memo(ProfileHeader);
