"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const LazyAvatar = dynamic(
  () => import("@/components/Avatar/Avatar.component"),
  {
    ssr: false, // Disable server-side rendering
  }
);

export default function GeniusUserAvatar() {
  return (
    <div className="relative w-[550px] h-[380px]">
      <Suspense fallback={<div>Loading Avatar...</div>}>
        <LazyAvatar
          modelSrc="https://models.readyplayer.me/66fbd22e36a151e549ea8397.glb"
          animationSrc="/animations/taunt.fbx"
          style={{ background: "rgb(0,0,6)" }}
          fov={30}
          cameraTarget={0}
          cameraInitialDistance={10}
          effects={{ ambientOcclusion: false }}
          followModel={true}
        />
      </Suspense>
    </div>
  );
}
