"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import ProfileHeader from "./profile-header";
import { Card, CardContent } from "@/src/ui/card";
import { Trophy, Palette, BadgeIcon as IdCard } from "lucide-react";
import CustomGalleryComponent from "../comp/gallery/CustomGalleryComponent";
import { imagePostType } from "../comp/Forms/UploadImagesGalleryForm";
import GalleryClient from "../comp/gallery/gallery-client";
import GeniusUserProjectsV2 from "../GeniusUserProfile/GeniusUserProjectsV2";
import { IconClipboardCopy } from "@tabler/icons-react";

type Card = {
  img_id?: string;
  index: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

export default function ProfilePageClient({
  username,
  fullName,
  dob,
  bio,
  avatarUrl,
  gg_id,
  convertedImagePosts,
  cards,
  loggedUserProfile,
  imagePosts,
  experiences,
  profilePic,
  coverPic,
}: {
  username: string;
  fullName: string;
  dob: string | Date;
  bio: string;
  avatarUrl: string;
  gg_id: string;
  convertedImagePosts: imagePostType[];
  cards: Card[];
  loggedUserProfile: boolean;
  imagePosts: any;
  experiences: any;
  profilePic: string;
  coverPic: string;
}) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("gallery");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Only add the event listener on the client side
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      // Initialize width on mount
      setWindowWidth(window.innerWidth);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

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
      if (scrollContainerRef.current) {
        const scrollPosition = scrollContainerRef.current.scrollTop;
        const threshold = windowWidth >= 1024 ? 200 : 800;
        setIsScrolled(scrollPosition > threshold);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [windowWidth]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "gallery":
        return (
          <div className="relative w-full">
            <GalleryClient
              gg_id={gg_id}
              convertedImagePosts={convertedImagePosts}
              cards={cards}
              loggedUserProfile={loggedUserProfile}
              imagePosts={imagePosts}
            />
          </div>
        );
      case "projects":
        return (
          <div className="relative w-full">
            <GeniusUserProjectsV2
              userInfo={{ gg_id: gg_id }}
              LoggedUserProfile={loggedUserProfile}
              items={experiences.map((exp: any) => ({
                title: exp.name ?? "Untitled",
                description: exp.description ?? "No description available",
                image:
                  exp.project_pictures[0] ??
                  "/default-pictures/cover-image.png",
                icon: (
                  <IconClipboardCopy className="h-4 w-4 text-neutral-500" />
                ),
                type: exp.type ?? "Unknown",
                link: exp.link ?? "",
                tools: exp.tools,
                project_skills: exp.project_skills ?? [],
                experience_id: exp.experience_id,
              }))}
            />
          </div>
        );
      case "cards":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6 flex items-center gap-4">
                  <IdCard className="h-8 w-8 text-amber-500" />
                  <div>
                    <h3 className="font-semibold">Card {i}</h3>
                    <p className="text-sm text-muted-foreground">
                      Description of card {i}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className="overflow-y-auto overflow-x-hidden w-full rounded-lg relative text-white"
      style={{ height: "calc(100vh - 96px)" }}
    >
      <ProfileHeader
        username={username}
        fullName={fullName}
        dob={dob.toString()}
        bio={bio}
        profilePic={profilePic}
        coverPic={coverPic}
        avatarUrl={avatarUrl}
        onTabChange={setActiveTab}
        loggedUserProfile={loggedUserProfile}
        renderTabContent={renderTabContent}
        xp={5000}
        level={10}
        isScrolled={isScrolled}
      />
    </div>
  );
}
