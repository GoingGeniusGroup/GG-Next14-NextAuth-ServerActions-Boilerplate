"use client";
"use cache";

import { memo, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Twitch,
  Twitter,
  Youtube,
  Instagram,
  Gamepad2,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/ui/avatar";
import { Progress } from "@/src/ui/progress";
import AvatarManagerClientProfile from "../comp/AvatarManager/avatar-manager-client-profile";
import PublicAvatarManagerClientProfile from "../comp/AvatarManager/public-avatar-manager-client-profile";
import { useAvatar } from "../comp/AvatarManager/provider/AvatarManagerContext";
import { usePublicAvatar } from "../comp/AvatarManager/provider/AvatarManagerPublicContext";
import {
  AvatarCreatorConfig,
  BodyType,
  Language,
} from "@readyplayerme/react-avatar-creator";
import ExpressionCard from "../comp/Huds/ExpressionsCard";
import ExpressionBottomMidHud from "../comp/Huds/ExpressionBottomMidHud";
import AchievementSlider from "../comp/console/achievement-slider";
import { Dialog, DialogContent, DialogTrigger } from "@/src/ui/dialog";
import { Button } from "@/src/ui/button/button";
import { AvatarCreator } from "../comp/AvatarComponents/avatar_creator";
import IconButton from "@/src/layout/base/button/icon-button";
import { IconTrash } from "@tabler/icons-react";
import { Carousel, CarouselContent, CarouselItem } from "@/src/ui/carousel";
import { Card, CardContent } from "@/src/ui/card";
import Image from "next/image";
import SharePopup from "../GeniusUserProfile/share/SharePopUp";
import UpdateCoverPhotoDialog from "../comp/Modal/profile/UpdateCoverPhotoDialog";
import UpdateProfileDialog from "../comp/Modal/profile/UpdateProfileDialog";
import { IoLogoLinkedin, IoShareSocialSharp } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/ui/tooltip/tooltip";
import SocialMediaDialog from "../GeniusUserProfile/Info/SocialMediaDialog";
import { socialType } from "@prisma/client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaSteam } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { SiFacebook } from "react-icons/si";
import { BsGoogle } from "react-icons/bs";

type socialvalueType = {
  name: socialType;
  icon: JSX.Element;
  link: string;
};

const socials: socialvalueType[] = [
  {
    name: socialType.GOOGLE,
    icon: <BsGoogle />,
    link: "https://google.com",
  },
  {
    name: socialType.GITHUB,
    icon: <FaGithub />,
    link: "https://github.com",
  },
  {
    name: socialType.STEAM,
    icon: <FaSteam />,
    link: "https://tiktok.com",
  },
  {
    name: socialType.INSTAGRAM,
    icon: <AiFillInstagram />,
    link: "https://instagram.com",
  },
  {
    name: socialType.FACEBOOK,
    icon: <SiFacebook />,
    link: "https://facebook.com",
  },
  {
    name: socialType.LINKDN,
    icon: <IoLogoLinkedin />,
    link: "https://linkedin.com",
  },
];

interface ProfileHeaderProps {
  username: string;
  fullName: string;
  dob: string | Date;
  bio: string;
  firstName: string;
  lastName: string;
  gg_id: string;
  address: string;
  avatarUrl: string;
  profilePic: string;
  coverPic: string;
  isLoggedUserProfile: boolean;
  xp: number;
  level: number;
  loggedUserAvatarUrl: string;
}

const SocialLinks = memo(
  ({
    isLoggedUserProfile,
    gg_id,
  }: {
    isLoggedUserProfile: boolean;
    gg_id: string;
  }) => (
    <div className="flex gap-1">
      {socials.map((social, index) => (
        <Card key={index}>
          <SocialMediaDialog
            social={social}
            ifOwnProfile={isLoggedUserProfile}
            userId={gg_id}
          />
        </Card>
      ))}
    </div>
  )
);
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
  firstName,
  lastName,
  dob,
  bio,
  avatarUrl,
  gg_id,
  loggedUserAvatarUrl,
  profilePic,
  coverPic,
  address,
  isLoggedUserProfile,
  xp,
  level,
}: ProfileHeaderProps) => {
  "use cache";
  const age = useMemo(() => calculateAge(dob.toString()), [dob]);
  const xpProgress = useMemo(() => calculateXpProgress(xp), [xp]);

  let ref = useRef<HTMLDivElement>(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const currentPageUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const {
    avatars,
    selectedAvatar,
    isAvatarCreatorOpen,
    isProcessing,
    expressions,
    setIsAvatarCreatorOpen,
    handleCreateAvatar,
    handleEditAvatar,
    handleDeleteAvatar,
    handleAvatarCreated,
    handleUpdateAvatar,
    handleEmote,
    editingAvatar,
    setSelectedAvatar,
    getAvatarCreatorUrl,
    privateExpressions,
  } = useAvatar();

  const { publicExpressions, handlePublicEmote } = usePublicAvatar();

  const baseAvatarCreatorConfig: AvatarCreatorConfig = {
    bodyType: "fullbody" as BodyType,
    quickStart: true,
    language: "en" as Language,
  };

  const createAvatarConfig: AvatarCreatorConfig = {
    ...baseAvatarCreatorConfig,
    clearCache: true,
  };

  const editAvatarConfig: AvatarCreatorConfig = {
    ...baseAvatarCreatorConfig,
    clearCache: false,
  };

  const extractUserId = (avatarUrl: string | undefined): string | undefined => {
    if (!avatarUrl) return undefined;
    const match = avatarUrl.match(/\/([^/]+)\.glb$/);
    return match ? match[1] : undefined;
  };

  return (
    <>
      <div className="relative p-4">
        {!isLoggedUserProfile && (
          <div className="fixed bottom-4 right-4 z-50">
            <ExpressionBottomMidHud
              expressions={expressions}
              handleEmote={handleEmote}
            />
          </div>
        )}

        {isPopupOpen && (
          <SharePopup
            url={currentPageUrl}
            onClose={() => setPopupOpen(false)}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left column */}
          <div className="lg:sticky lg:top-10 lg:col-span-1 space-y-4">
            <div className="relative w-full h-[380px] rounded-lg overflow-hidden border-2 hover:border-yellow-600 border-cyan-500 shadow-lg hover:shadow-yellow-500/50 shadow-cyan-500/50 transition-colors duration-300 ease-in-out">
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
              <PublicAvatarManagerClientProfile
                fov={40}
                cameraInitialDistance={5}
                cameraTarget={0}
                avatarUrl={!isLoggedUserProfile ? avatarUrl : selectedAvatar}
              />

              {!isLoggedUserProfile ? (
                <div className="absolute bottom-1 right-0 space-y-4 z-40">
                  <div className="size-[200px]">
                    <AvatarManagerClientProfile
                      fov={40}
                      cameraInitialDistance={5}
                      cameraTarget={0}
                      avatarUrl={
                        // !isLoggedUserProfile
                        //   ? loggedUserAvatarUrl
                        selectedAvatar
                      }
                    />
                  </div>
                </div>
              ) : (
                <div className="absolute flex items-center gap-1 bottom-1 right-1">
                  <UpdateCoverPhotoDialog
                    gg_id={gg_id}
                    currentCoverImage={coverPic ?? ""}
                  />
                  <Dialog
                    open={isAvatarCreatorOpen}
                    onOpenChange={setIsAvatarCreatorOpen}
                  >
                    <DialogTrigger asChild>
                      <Tooltip>
                        <TooltipTrigger>
                          <IconButton
                            onClick={handleCreateAvatar}
                            icon={
                              <Plus className="text-black dark:text-white hover:text-green-500" />
                            }
                            label="Create New Avatar"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <span className="text-green-500">
                            Create New Avatar
                          </span>
                        </TooltipContent>
                      </Tooltip>
                    </DialogTrigger>
                    <DialogContent>
                      <div className="h-[600px] w-full relative rounded-xl overflow-hidden">
                        <AvatarCreator
                          subdomain="gguser"
                          config={
                            editingAvatar
                              ? {
                                  ...editAvatarConfig,
                                  avatarId: extractUserId(
                                    editingAvatar.avatar_url
                                  ),
                                }
                              : createAvatarConfig
                          }
                          onAvatarExported={
                            editingAvatar
                              ? handleUpdateAvatar
                              : handleAvatarCreated
                          }
                          onUserSet={(event) => console.log("User set:", event)}
                          iframeUrl={
                            editingAvatar
                              ? getAvatarCreatorUrl(editingAvatar.avatar_url)
                              : undefined
                          }
                        />
                        {isProcessing && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            {editingAvatar
                              ? "Updating avatar..."
                              : "Creating avatar..."}
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>

            <div className="backdrop-blur-md border hover:border-yellow-600 shadow-md border-cyan-500 hover:shadow-yellow-500 shadow-cyan-500 rounded-lg px-2 py-3 transition-colors duration-300 ease-in-out">
              <ExpressionCard
                expressions={publicExpressions}
                handleEmote={handlePublicEmote}
              />
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20 border-2 border-cyan-500 hover:border-yellow-600 transition-colors duration-300 ease-in-out shadow shadow-cyan-500 hover:shadow-yellow-500">
                  <AvatarImage src={profilePic} alt={fullName} />
                  <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="w-full">
                  <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text flex items-center gap-2">
                    <h1>{fullName}</h1>
                    <div className="flex items-start -mt-6 gap-2">
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            onClick={() => setPopupOpen(true)}
                            variant="transparent"
                            size="mini2"
                            aria-label="Share Button"
                            className="text-cyan-500 dark:text-green-500 rounded-full hover:text-yellow-500 border border-cyan-500/50 dark:border-green-500/50"
                          >
                            <IoShareSocialSharp size={20} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <span className="text-green-500">Share</span>
                        </TooltipContent>
                      </Tooltip>
                      {isLoggedUserProfile && (
                        <>
                          <div className="flex justify-end gap-2 transition-all duration-300">
                            <UpdateProfileDialog
                              gg_id={gg_id}
                              defaultValues={{
                                first_name: firstName ?? "",
                                last_name: lastName ?? "",
                                address: address ?? "",
                                description: bio ?? "",
                                dob: dob ? new Date(dob) : null,
                                image: profilePic ?? "",
                              }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-md text-gray-400">
                    @{username} | {address}
                  </p>
                </div>
              </div>
              <ProfileInfo
                fullName={fullName}
                username={username}
                bio={bio}
                age={age}
              />
            </div>

            {/* Achievement And Avatar Select */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="relative flex border p-2 mt-4 rounded-xl overflow-auto backdrop-blur-md border-black/10 dark:border-white/10 dark:hover:border-[#FCBB3F]/60 hover:border-sky-500/60 transition-all duration-200 ease-in-out">
                <AchievementSlider />
              </div>
              {isLoggedUserProfile && (
                <div className="w-full relative mt-4 h-fit backdrop-blur-lg rounded-lg border dark:border-white/20 border-black/20 hover:border-yellow-500 transition-all duration-300 ease-in-out">
                  <Carousel className="w-full">
                    <CarouselContent className="-ml-1">
                      {avatars.map((avatar, index) => (
                        <CarouselItem key={index} className="pl-1 basis-1/3">
                          <div className="p-2">
                            <Card
                              key={avatar.avatar_id}
                              className={`border h-fit rounded-lg  transition-all duration-300 ease-in-out ${
                                selectedAvatar === avatar.avatar_url
                                  ? "border-sky-500"
                                  : "border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white"
                              }`}
                            >
                              <CardContent className="relative pt-6 pb-1">
                                <div className="flex flex-col items-center space-y-1 w-full">
                                  <Image
                                    src={
                                      avatar.avatar_url?.replace(
                                        ".glb",
                                        ".png"
                                      ) || "/placeholder-avatar.png"
                                    }
                                    alt="Avatar"
                                    width={128}
                                    height={128}
                                    className="rounded-full"
                                  />
                                  <Button
                                    variant="black"
                                    className={`hover:text-yellow-500 w-full h-5 font-light text-xs ${
                                      selectedAvatar === avatar.avatar_url
                                        ? "text-sky-500"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      setSelectedAvatar(avatar.avatar_url)
                                    }
                                  >
                                    {selectedAvatar === avatar.avatar_url
                                      ? "Selected"
                                      : "Select"}
                                  </Button>
                                </div>
                                <div className="absolute top-1 flex gap-1 right-1">
                                  {/* <Button
                                variant="transparent_rounded"
                                className="hover:text-yellow-500 hover:bg-transparent text-sky-600 p-[1px]"
                                size="mini2"
                                onClick={() => handleEditAvatar(avatar)}
                              >
                                <IconEdit size={12} />
                              </Button> */}
                                  <Button
                                    variant="transparent_rounded"
                                    className="hover:text-yellow-500 hover:bg-transparent text-red-600 p-[1px]"
                                    size="mini2"
                                    onClick={() =>
                                      handleDeleteAvatar(avatar.avatar_id)
                                    }
                                  >
                                    <IconTrash size={12} />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
              )}
            </div>

            {/* Level Progress */}
            <div className="bg-black py-6 px-4 rounded-lg">
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
        </div>

        <div className="absolute top-6 right-6 md:top-0 md:right-4">
          <SocialLinks
            isLoggedUserProfile={isLoggedUserProfile}
            gg_id={gg_id}
          />
        </div>
      </div>
    </>
  );
};

export default memo(ProfileHeader);
