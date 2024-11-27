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
import { useAvatar } from "./provider/AvatarManagerContext";

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
      </div>
    </>
  );
}
