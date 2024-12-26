"use client";

import Image from "next/image";
import { useState } from "react";

export default function VideoHomeAvatarSlide() {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const avatars = [
    "/avatar-images/avatar-1.svg",
    "/avatar-images/avatar-2.svg",
  ];

  const handleAvatarClick = (index: any) => {
    setSelectedAvatar(index);
  };

  return (
    <div className="relative h-screen w-full">
      {/* Background Video */}
      <video
        className="absolute inset-0 size-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/livewallpapers/lines.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 lg:px-0">
        {/* Avatar Selection */}
        <div className="mb-12 flex justify-center">
          {avatars.map((avatar, index) => (
            <div
              key={index}
              className={`relative size-56 cursor-pointer rounded-full transition-all duration-300 
                ${selectedAvatar === index ? "scale-110" : "hover:scale-105"}`}
              onClick={() => handleAvatarClick(index)}
              style={{
                boxShadow:
                  selectedAvatar === index
                    ? "inset 0 -8px 15px rgba(34,211,238,0.7)" // Inner shadow only on the bottom
                    : "none", // No shadow for non-selected avatars
              }}
            >
              <Image
                src={avatar}
                alt={`Avatar ${index + 1}`}
                layout="fill"
                className="rounded-full object-fit"
              />
            </div>
          ))}
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-600 lg:text-6xl drop-shadow-lg">
          Customized Avatar For
          <br />
          <span className="mt-4 block text-lg lg:text-2xl text-gray-200">
            3D WEB
          </span>
        </h1>

        <p className="mt-6 text-base text-gray-300 lg:text-lg">
          Experience the 3D Web with personalized avatars for seamless
          navigation
        </p>
      </div>
    </div>
  );
}
