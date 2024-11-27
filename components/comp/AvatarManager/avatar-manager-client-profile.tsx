"use client";

import { Avatar } from "@/components/comp/Avatar";
import { Suspense } from "react";
import AvatarSkeleton from "../GeniusUserProfile/skeleton/AvatarSkeleton";
import { useAvatar } from "./provider/AvatarManagerContext";

export default function AvatarManagerClientProfile() {
  const { selectedAvatar, currentEmote } = useAvatar();

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
