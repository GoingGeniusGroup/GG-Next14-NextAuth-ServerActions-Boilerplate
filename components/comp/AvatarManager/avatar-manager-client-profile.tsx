"use client";

import { Avatar } from "@/components/comp/Avatar";
import {
  AvatarCreator,
  AvatarCreatorConfig,
  BodyType,
  Language,
} from "@/components/comp/AvatarComponents/avatar_creator";
import { Button as MovingBorderButton } from "@/components/ui/border/moving-border";
import { Button } from "@/components/ui/button/button";

import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ExtendedUser } from "@/types/next-auth";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import { Suspense } from "react";
import ExpressionBottomMidHud from "../Huds/ExpressionBottomMidHud";
import AvatarSkeleton from "../GeniusUserProfile/skeleton/AvatarSkeleton";
import { AvatarType, useAvatar } from "./provider/AvatarManagerContext";

// interface AvatarManagerClientProps {
//   initialAvatars: AvatarType[];
//   user: ExtendedUser;
// }

export default function AvatarManagerClientProfile() {
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
      <div className="relative w-[650px] h-[500px] flex justify-center flex-col z-40 bg-pink-400/30">
        <Suspense fallback={<AvatarSkeleton />}>
          <Avatar
            modelSrc={
              selectedAvatar ||
              "https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0"
            }
            shadows={false}
            animationSrc={currentEmote}
            style={{ background: "rgb(0,0,6)", pointerEvents: "none" }}
            fov={35}
            cameraTarget={0}
            cameraInitialDistance={5}
            effects={{ ambientOcclusion: false }}
            followModel={true}
            // Disable interactivity
            headMovement={false} // Disable head tracking
            idleRotation={true}
          />
        </Suspense>
        <div className="w-full relative backdrop-blur-lg rounded-lg border dark:border-white/20 border-black/20 hover:border-yellow-500 transition-all duration-300 ease-in-out">
          <div className="absolute top-4 right-4 z-40">
            <Dialog
              open={isAvatarCreatorOpen}
              onOpenChange={setIsAvatarCreatorOpen}
            >
              <DialogTrigger asChild>
                <MovingBorderButton
                  onClick={handleCreateAvatar}
                  className="p-2"
                >
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
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <ExpressionBottomMidHud
              expressions={expressions}
              handleEmote={handleEmote}
            />
          </div>
        </div>

        <div className="w-1/2 relative h-[700px] backdrop-blur-lg rounded-lg border dark:border-white/20 border-black/20 hover:border-yellow-500 transition-all duration-300 ease-in-out">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-[99%] overflow-auto">
            {avatars.map((avatar) => (
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
