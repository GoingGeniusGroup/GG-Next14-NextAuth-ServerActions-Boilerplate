import React from "react";

import { Avatar } from "@/components/Avatar";

export default function ProfileComponent() {
  return (
    <div>
      <h1>Profile</h1>
      <div className="relative h-[500px] w-[300px]">
        <Avatar
          modelSrc="https://models.readyplayer.me/65bb234c4c8598ef839cdcc2.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0"
          // shadows
          animationSrc="/animations/female-animation-catwalk.glb"
          style={{ background: "rgb(9,20,26)" }}
          fov={45}
          effects={{
            ambientOcclusion: false,
          }}
        />
      </div>
    </div>
  );
}
