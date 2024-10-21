"use client";

import { Avatar } from "@/components/Avatar";

export default function GeniusUserAvatar() {
  return (
    <>
      <div className="relative w-[550px] h-[380px]">
        <Avatar
          modelSrc="https://models.readyplayer.me/66fbd22e36a151e549ea8397.glb"
          animationSrc="/animations/taunt.fbx"
          style={{ background: "rgb(0,0,6)" }}
          fov={38}
          cameraTarget={0}
          cameraInitialDistance={20}
          effects={{
            ambientOcclusion: true,
          }}
          followModel={true}
        />
      </div>
    </>
  );
}
