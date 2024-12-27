"use client";

import { useState, useEffect } from "react";
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

  // Set initial tab based on URL query parameter
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["gallery", "projects", "cards"].includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab("gallery");
    }
  }, [searchParams]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "gallery":
        return (
          <div className="relative w-full pt-10">
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
          <div className="relative w-full pt-10">
            <GeniusUserProjectsV2
              userInfo={{
                gg_id: gg_id,
              }}
              LoggedUserProfile={loggedUserProfile}
              items={experiences.map(
                (exp: {
                  name: string;
                  description: string;
                  project_pictures: string[];
                  type: string;
                  link: string;
                  tools: string[];
                  project_skills: string[];
                  experience_id: string;
                }) => ({
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
                })
              )}
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
    <main className="overflow-y-auto overflow-x-hidden h-full">
      <ProfileHeader
        username={username}
        fullName={fullName}
        dob={dob.toString()}
        bio={bio}
        profilePic={profilePic}
        coverPic={coverPic}
        avatarUrl={avatarUrl}
        onTabChange={setActiveTab}
      />
      <div className="container mx-auto pb-8">{renderTabContent()}</div>
    </main>
  );
}
