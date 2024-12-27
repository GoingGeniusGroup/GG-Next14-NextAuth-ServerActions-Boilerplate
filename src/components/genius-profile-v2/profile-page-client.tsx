"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProfileHeader from "./profile-header";
import GalleryClient from "../comp/gallery/gallery-client";
import GeniusUserProjectsV2 from "../GeniusUserProfile/GeniusUserProjectsV2";
import CardsSection from "./cards-section";
import { Button } from "@/src/ui/button";

interface ProfileData {
  username: string;
  fullName: string;
  dob: string | Date;
  bio: string;
  avatarUrl: string;
  gg_id: string;
  profilePic: string;
  coverPic: string;
  xp: number;
  level: number;
}

interface ProfilePageClientProps {
  profileData: ProfileData;
  isLoggedUserProfile: boolean;
  imagePosts: any;
  experiences: any[];
}

export default function ProfilePageClient({
  profileData,
  isLoggedUserProfile,
  imagePosts,
  experiences,
}: ProfilePageClientProps) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("gallery");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["gallery", "projects", "cards"].includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab("gallery");
    }
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const convertedImagePosts = useMemo(
    () =>
      imagePosts.map(
        (img_post: {
          img_id: any;
          image_url: any;
          caption: any;
          description: any;
        }) => ({
          img_id: img_post.img_id,
          image_url: img_post.image_url,
          caption: img_post.caption || "",
          description: img_post.description || "",
        })
      ),
    [imagePosts]
  );

  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      case "gallery":
        return (
          <GalleryClient
            gg_id={profileData.gg_id}
            convertedImagePosts={convertedImagePosts}
            loggedUserProfile={isLoggedUserProfile}
            imagePosts={imagePosts}
            cards={convertedImagePosts}
          />
        );
      case "projects":
        return (
          <GeniusUserProjectsV2
            userInfo={{ gg_id: profileData.gg_id }}
            LoggedUserProfile={isLoggedUserProfile}
            items={experiences}
          />
        );
      case "cards":
        return <CardsSection />;
      default:
        return null;
    }
  }, [
    activeTab,
    profileData.gg_id,
    convertedImagePosts,
    isLoggedUserProfile,
    imagePosts,
    experiences,
  ]);

  return (
    <div className="overflow-x-hidden w-full rounded-lg relative text-white">
      <ProfileHeader
        {...profileData}
        isLoggedUserProfile={isLoggedUserProfile}
      />
      <div
        className="z-40 bg-gray-900/95 backdrop-blur-sm py-4 mx-4 rounded-lg px-4"
        role="tablist"
        aria-label="Profile sections"
      >
        <div className="flex flex-wrap gap-4">
          {["gallery", "projects", "cards"].map((tab) => (
            <Button
              key={tab}
              onClick={() => handleTabChange(tab)}
              variant={activeTab === tab ? "default" : "secondary"}
              className={`${
                activeTab === tab
                  ? "bg-cyan-500 hover:bg-cyan-600 text-black"
                  : "bg-gray-800 hover:bg-gray-700"
              } transition-all duration-300 ease-in-out transform hover:scale-105`}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`${tab}-content`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-6">{renderTabContent()}</div>
    </div>
  );
}
