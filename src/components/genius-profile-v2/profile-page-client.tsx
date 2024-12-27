"use client";

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  JSXElementConstructor,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { useSearchParams } from "next/navigation";
import ProfileHeader from "./profile-header";
import GalleryClient from "../comp/gallery/gallery-client";
import GeniusUserProjectsV2 from "../GeniusUserProfile/GeniusUserProjectsV2";
import CardsSection from "./cards-section";
import { Button } from "@/src/ui/button";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import UploadGalleryDialog from "../comp/Modal/gallery/UploadGalleryDialog";
import ExperienceDialog from "../comp/Modal/experience/AddUpdateExperienceDialog";

interface ProfileData {
  username: string;
  fullName: string;
  firstName: string;
  lastName: string;
  address: string;
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
  loggedUserAvatarUrl: string;
}

export default function ProfilePageClient({
  profileData,
  isLoggedUserProfile,
  imagePosts,
  experiences,
  loggedUserAvatarUrl,
}: ProfilePageClientProps) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("gallery");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["gallery", "projects", "cards"].includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab("gallery");
    }
  }, [searchParams]);

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

  const cards = useMemo(
    () =>
      convertedImagePosts.map(
        (
          img_post: {
            img_id: any;
            image_url: string | StaticImport;
            caption:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | PromiseLikeOfReactNode
              | null
              | undefined;
          },
          index: number
        ) => ({
          img_id: img_post.img_id,
          index: index,
          content: (
            <div className="flex flex-col justify-between h-full">
              <div className="flex-1">
                <Image
                  src={img_post.image_url}
                  alt="gallery"
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex justify-between items-center py-2">
                <div className="text-sm font-bold">{img_post.caption}</div>
              </div>
            </div>
          ),
          className: index % 2 === 0 ? "md:col-span-2" : "col-span-1",
          thumbnail: img_post.image_url,
        })
      ) || [],
    [convertedImagePosts]
  );

  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      case "gallery":
        return (
          <GalleryClient
            gg_id={profileData.gg_id}
            loggedUserProfile={isLoggedUserProfile}
            cards={cards}
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
  }, [activeTab, profileData.gg_id, isLoggedUserProfile, cards, experiences]);

  return (
    <div className="overflow-x-hidden w-full rounded-lg relative text-white">
      <ProfileHeader
        {...profileData}
        isLoggedUserProfile={isLoggedUserProfile}
        loggedUserAvatarUrl={loggedUserAvatarUrl}
      />
      <div
        className="z-40 bg-black backdrop-blur-sm py-4 mx-4 rounded-lg px-4"
        role="tablist"
        aria-label="Profile sections"
      >
        <div className="flex flex-wrap gap-4">
          {["gallery", "projects", "cards"].map((tab) => (
            <div key={tab} className="flex items-center space-x-2">
              <Button
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

              {/* Conditionally render the add buttons */}
              {isLoggedUserProfile && activeTab === tab && (
                <>
                  {tab === "gallery" && convertedImagePosts && (
                    <UploadGalleryDialog
                      gg_id={profileData.gg_id}
                      currentGalleryImages={convertedImagePosts}
                    />
                  )}
                  {tab === "projects" && (
                    <ExperienceDialog gg_id={profileData.gg_id} />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 px-2 mb-10">{renderTabContent()}</div>
    </div>
  );
}
