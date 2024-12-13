import { MouseImageTrail } from "@/src/components/animated/mouse-trail-card";
import React from "react";

import { FiMousePointer } from "react-icons/fi";

const page = () => {
  return (
    <div>
      <MouseImageTrail
        renderImageBuffer={50}
        rotationRange={25}
        images={[
          "/imgs/active/1.jpg",
          "/imgs/active/2.jpg",
          "/imgs/active/3.jpg",
          "/imgs/active/4.jpg",
          "/imgs/active/5.jpg",
          "/imgs/active/6.jpg",
          "/imgs/active/7.jpg",
          "/imgs/active/8.jpg",
          "/imgs/active/9.jpg",
          "/imgs/active/10.jpg",
          "/imgs/active/11.jpg",
          "/imgs/active/12.jpg",
          "/imgs/active/13.jpg",
          "/imgs/active/14.jpg",
          "/imgs/active/15.jpg",
          "/imgs/active/16.jpg",
        ]}
      >
        <section className="grid h-screen w-full place-content-center bg-white">
          <p className="flex items-center gap-2 text-3xl font-bold uppercase text-black">
            <FiMousePointer />
            <span>Hover me</span>
          </p>
        </section>
      </MouseImageTrail>
    </div>
  );
};

export default page;
