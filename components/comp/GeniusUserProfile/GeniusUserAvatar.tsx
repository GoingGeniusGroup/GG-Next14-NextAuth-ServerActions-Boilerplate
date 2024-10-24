"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const LazyAvatar = dynamic(
  () => import("@/components/comp/Avatar/Avatar.component"),
  {
    ssr: false, // Disable server-side rendering
  }
);

export default function GeniusUserAvatar() {
  return (
    <div className="relative w-[650px] h-[500px]">
      <Suspense fallback={<div>Loading Avatar...</div>}>
        <LazyAvatar
          modelSrc="https://models.readyplayer.me/66fbd22e36a151e549ea8397.glb"
          animationSrc="/animations/female-animation-catwalk.glb"
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
  );
}
