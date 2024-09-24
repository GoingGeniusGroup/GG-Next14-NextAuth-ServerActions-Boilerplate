'use client';

import React from "react";

import { Avatar } from "@/components/Avatar";

export default function AvatarPage() {
  return (
    <div className="flex justify-center flex-col items-center min-h-screen"> 
        <h1 className="text-2xl mt-16 text-black uppercase font-semibold text-center mb-6">Avatar</h1> 
        <div className="relative h-[700px] w-[400px]">
          <Avatar
            modelSrc="https://models.readyplayer.me/65bb234c4c8598ef839cdcc2.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0"
            // shadows
            animationSrc="/animations/female-animation-catwalk.glb"
            style={{ background: "rgb(9,20,26)" }}
            fov={60}
            effects={{
              ambientOcclusion: false,
            }}
          />
        </div>
    </div>
  );
}