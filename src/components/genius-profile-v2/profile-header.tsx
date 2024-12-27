"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  dob: string;
  bio: string;
  avatarUrl: string;
  onTabChange: (tab: string) => void;
  profilePic: string;
  coverPic: string;
  loggedUserProfile: boolean;
  renderTabContent: () => JSX.Element | null;
  xp: number;
  level: number;
  isScrolled: boolean;
}

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

export default function ProfileHeader({
  username,
  fullName,
  dob,
  bio,
  avatarUrl,
  onTabChange,
  profilePic,
  coverPic,
  loggedUserProfile,
  renderTabContent,
  xp,
  level,
  isScrolled,
}: ProfileHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const age = calculateAge(dob);
  const currentTab = searchParams.get("tab") || "gallery";

  const handleTabChange = (tab: string) => {
    if (tab === "gallery") {
      router.push(`/genius-profile/${username}`);
    } else {
      router.push(`/genius-profile/${username}?tab=${tab}`);
    }
    onTabChange(tab);
  };

  useEffect(() => {
    onTabChange(currentTab);
  }, [currentTab, onTabChange]);

  return (
    <>
      {/* Sticky Header */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="sticky top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800"
          >
            <div className="container mx-auto px-4 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-10 h-10 border-2 border-cyan-500">
                    <AvatarImage src={profilePic} alt={fullName} />
                    <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-semibold text-cyan-500">
                      {fullName}
                    </h2>
                    <p className="text-sm text-gray-400">@{username}</p>
                  </div>
                </div>
                {/* Social Links */}
                <div className="flex gap-3">
                  {[Twitter, Youtube, Instagram, Facebook, Twitch].map(
                    (Icon, index) => (
                      <Link
                        key={index}
                        href="#"
                        className="text-gray-400 hover:text-cyan-500 transition-colors"
                      >
                        <Icon className="h-5 w-5" />
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative px-4 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left column */}
          <motion.div
            animate={{ opacity: isScrolled ? 0 : 1 }}
            className="lg:sticky lg:top-0 lg:col-span-1 space-y-6"
          >
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden border-4 border-cyan-500 shadow-lg shadow-cyan-500/50">
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
              {loggedUserProfile ? (
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
                value={calculateXpProgress(xp)}
                className="h-2 bg-gray-700"
              />
            </div>
          </motion.div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              animate={{ opacity: isScrolled ? 0 : 1 }}
              className="space-y-4"
            >
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
              <div>
                <p className="text-lg leading-relaxed max-w-2xl">{bio}</p>
                <div className="flex items-center space-x-2 text-gray-400">
                  <span className="text-cyan-500">{age} years old</span>
                  <span>•</span>
                  <span>Joined 2023</span>
                </div>
              </div>
            </motion.div>

            {/* Tab Navigation */}
            <div className="sticky top-16 z-40 bg-gray-900/95 backdrop-blur-sm py-4 -mx-4 px-4">
              <div className="flex flex-wrap gap-4">
                {["gallery", "projects", "cards"].map((tab) => (
                  <Button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    variant={currentTab === tab ? "default" : "secondary"}
                    className={`${
                      currentTab === tab
                        ? "bg-cyan-500 hover:bg-cyan-600 text-black"
                        : "bg-gray-800 hover:bg-gray-700"
                    } transition-all duration-300 ease-in-out transform hover:scale-105`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="relative z-30">{renderTabContent()}</div>
          </div>
        </div>

        {/* Social Links */}
        <div className="absolute top-2 right-2 flex gap-3">
          {[Twitter, Youtube, Instagram, Facebook, Twitch].map(
            (Icon, index) => (
              <Link
                key={index}
                href="#"
                className="text-gray-400 hover:text-cyan-500 transition-colors"
              >
                <Icon className="h-5 w-5" />
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
}
