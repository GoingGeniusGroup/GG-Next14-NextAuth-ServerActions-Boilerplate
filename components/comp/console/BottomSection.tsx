"use client";

import { HoverEffect2 } from "@/components/ui/card/card-hover-effect2";
import SmallPreviewCard from "../card/SmallPreviewCard";
import UpdateCoverPhotoDialog from "../Modal/profile/UpdateCoverPhotoDialog";
import Image from "next/image";

import { Button as MovingBorderButton } from "@/components/ui/border/moving-border";
import AchievementsCard from "../GeniusUserProfile/Achievements/AchievementsCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button/button";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import ExpressionBottomMidHud from "../Huds/ExpressionBottomMidHud";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  AvatarCreator,
  AvatarCreatorConfig,
  BodyType,
  Language,
} from "../AvatarComponents/avatar_creator";
import { useAvatar } from "../AvatarManager/provider/AvatarManagerContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel/carousel";

export default function BottomSection({ userInfo }: { userInfo: any }) {
  const newsItems = [
    {
      title: "Project 1",
      image:
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/project_management_coursefees.jpg",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "#",
    },
    {
      title: "Project 2",
      image:
        "https://www.shutterstock.com/image-photo/project-manager-working-on-computer-600nw-2002388855.jpg",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "#",
    },
    {
      title: "Project 3",
      image:
        "https://www.michaelpage.com.au/sites/michaelpage.com.au/files/2022-06/IT%20Project%20Manager.jpg",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "#",
    },
    {
      title: "Project 4",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1qLr3cR3-yr-1UaLFYoIKDw3gl5FJbBjCxA&s",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "#",
    },
  ];

  const {
    avatars,
    selectedAvatar,
    currentEmote,
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
  } = useAvatar();

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
      <div className="w-full relative backdrop-blur-lg rounded-lg border dark:border-white/20 border-black/20 hover:border-yellow-500 transition-all duration-300 ease-in-out">
        <div>
          <Dialog
            open={isAvatarCreatorOpen}
            onOpenChange={setIsAvatarCreatorOpen}
          >
            <DialogTrigger asChild>
              <MovingBorderButton onClick={handleCreateAvatar} className="p-2">
                {isProcessing ? "..." : "Create New Avatar"}
              </MovingBorderButton>
            </DialogTrigger>
            <DialogContent>
              <div className="h-[600px] w-full relative rounded-xl overflow-hidden">
                <AvatarCreator
                  subdomain="gguser"
                  config={
                    editingAvatar
                      ? {
                          ...editAvatarConfig,
                          avatarId: extractUserId(editingAvatar.avatar_url),
                        }
                      : createAvatarConfig
                  }
                  onAvatarExported={
                    editingAvatar ? handleUpdateAvatar : handleAvatarCreated
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
        <div>
          <ExpressionBottomMidHud
            expressions={expressions}
            handleEmote={handleEmote}
          />
        </div>
      </div>

      <div className="w-full relative h-fit backdrop-blur-lg rounded-lg border dark:border-white/20 border-black/20 hover:border-yellow-500 transition-all duration-300 ease-in-out">
        <Carousel className="w-full max-w-sm">
          <CarouselContent className="-ml-1">
            {avatars.map((avatar, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card
                    key={avatar.avatar_id}
                    className={`border h-fit rounded-lg hover:border-yellow-500 transition-all duration-300 ease-in-out ${
                      selectedAvatar === avatar.avatar_url
                        ? "border-sky-500"
                        : "border-black/20 dark:border-white/20"
                    }`}
                  >
                    <CardContent className="relative pt-6">
                      <div className="flex flex-col items-center space-y-4">
                        <Image
                          src={
                            avatar.avatar_url?.replace(".glb", ".png") ||
                            "/placeholder-avatar.png"
                          }
                          alt="Avatar"
                          width={128}
                          height={128}
                          className="rounded-full"
                        />
                        <Button
                          variant="black"
                          size="sm"
                          className={`hover:text-yellow-500 w-full ${
                            selectedAvatar === avatar.avatar_url
                              ? "text-sky-500"
                              : ""
                          }`}
                          onClick={() => setSelectedAvatar(avatar.avatar_url)}
                        >
                          {selectedAvatar === avatar.avatar_url
                            ? "Selected"
                            : "Select"}
                        </Button>
                      </div>
                      <div className="absolute top-2 flex gap-2 right-2">
                        <Button
                          variant="transparent_rounded"
                          className="hover:text-yellow-500 text-sky-400 p-[1px]"
                          size="mini2"
                          onClick={() => handleEditAvatar(avatar)}
                        >
                          <IconEdit />
                        </Button>
                        <Button
                          variant="transparent_rounded"
                          className="hover:text-yellow-500 text-red-400 p-[1px]"
                          size="mini2"
                          onClick={() => handleDeleteAvatar(avatar.avatar_id)}
                        >
                          <IconTrash />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="w-full relative border p-2 mt-4 rounded-xl backdrop-blur-md border-black/10 dark:border-white/10 dark:hover:border-[#FCBB3F]/60 hover:border-sky-500/60 transition-all duration-200 ease-in-out">
        <AchievementsCard />
      </div>
      <div className="w-full relative border p-2 mt-4 rounded-xl backdrop-blur-md border-black/10 dark:border-white/10 dark:hover:border-[#FCBB3F]/60 hover:border-sky-500/60 transition-all duration-200 ease-in-out">
        <HoverEffect2 items={newsItems} />
      </div>
    </>
  );
}
