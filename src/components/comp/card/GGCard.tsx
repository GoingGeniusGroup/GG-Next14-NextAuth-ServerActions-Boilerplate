"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import QRCode from "qrcode";
import { UserCardData } from "@/src/core/interface/userCardData.interface";

const guildColors = {
  BUDDHA: "#FFFFFF",
  VAJRA: "#0000FF",
  KARMA: "#00FF00",
  RATNA: "#FFD700",
  PADMA: "#FF0000",
} as const;

const getGradientStyle = (
  guild: keyof typeof guildColors | null | undefined
) => {
  const color =
    guild && guild in guildColors
      ? guildColors[guild as keyof typeof guildColors]
      : "#FFFFFF";
  return {
    background: `linear-gradient(to right, black 20%, ${color} 90%, ${color} 100%)`,
  };
};

const getTextColor = (guild: string | null | undefined) => {
  return guild === "BUDDHA" ? "black" : "white";
};

// Format date to a readable string
const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return "No date";
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function GGCard({
  userData,
}: {
  userData: UserCardData | null;
}) {
  const [imgSrc, setImgSrc] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      QRCode.toDataURL(pathname).then(setImgSrc);
    }
  }, [pathname]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Early return if no userData
  if (!userData) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }

  return (
    <div className="group h-full [perspective:1000px]">
      <div
        style={getGradientStyle(userData.guild)}
        className={`relative size-full rounded-lg shadow-md transition-all duration-500 [transform-style:preserve-3d] cursor-pointer
          ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
        onClick={handleFlip}
      >
        {/* Front of card */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          {/* Address */}
          <div className="absolute right-2 top-2">
            <p
              className="text-montserrat text-xs font-semibold"
              style={{ color: getTextColor(userData.guild) }}
            >
              {userData.address || "No Address"}
            </p>
          </div>

          {/* GG Label */}
          <div className="absolute left-2 top-2">
            <p className="text-montserrat text-xs font-semibold text-white">
              GG
            </p>
          </div>

          {/* View More */}
          <div className="absolute bottom-2 right-2">
            <p
              className="text-montserrat text-xs font-semibold hover:underline"
              style={{ color: getTextColor(userData.guild) }}
            >
              View More
            </p>
          </div>

          {/* Name and Description */}
          <div className="absolute flex size-full flex-col items-start justify-center pl-4">
            <h1 className="text-2xl font-bold uppercase text-white">
              {userData.first_name || ""} {userData.last_name || ""}
            </h1>
            <p className="-mt-2 text-sm font-semibold text-white">
              {userData.description || "No description"}
            </p>
          </div>

          {/* Guild Icon */}
          <div className="absolute flex size-full flex-col items-end justify-center pr-2">
            <div
              className={`size-6 rounded-md ${
                userData.guild === "BUDDHA" ? "bg-black/70" : "bg-white/60"
              }`}
            />
          </div>

          {/* Date of Birth */}
          <div className="absolute bottom-2 left-2 text-sm font-bold text-white">
            {formatDate(userData.dob)}
          </div>
        </div>

        {/* Back of card */}
        <div
          style={getGradientStyle(userData.guild)}
          className="absolute inset-0 z-10 rounded-lg [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <div className="relative size-full">
            {/* Email */}
            <div className="absolute left-2 top-2 text-sm text-blue-300 hover:underline">
              {userData.email || "No email"}
            </div>

            {/* Region */}
            <div
              className="absolute right-2 top-2 text-sm font-bold"
              style={{ color: getTextColor(userData.guild) }}
            >
              REGION
            </div>

            {/* Guild ID */}
            <div className="absolute bottom-2 left-2 text-sm font-bold text-white">
              {userData.guild_id || "No Guild ID"}
            </div>

            {/* Back Label */}
            <div
              className="absolute bottom-2 right-2 text-xs font-semibold"
              style={{ color: getTextColor(userData.guild) }}
            >
              Back
            </div>

            {/* QR Code */}
            <div className="flex size-full items-center justify-center">
              {imgSrc && (
                <Image
                  className="rounded-sm object-cover"
                  alt="qr code"
                  src={imgSrc}
                  width={42}
                  height={42}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
