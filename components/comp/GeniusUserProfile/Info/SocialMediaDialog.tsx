"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

const SocialMediaDialog = ({
  social,
  userLinks,
  onSave,
  ifOwnProfile,
}: {
  social: { name: string; icon: JSX.Element };
  userLinks: Record<string, string>;
  onSave: (name: string, url: string) => void;
  ifOwnProfile: boolean;
}) => {
  const [url, setUrl] = useState(userLinks[social.name.toLowerCase()] || "");
  const socialUrl = userLinks[social.name.toLowerCase()];

  const handleSave = () => {
    onSave(social.name.toLowerCase(), url);
  };

  const SocialIcon = () => (
    <div
      className={`size-[52px] rounded-full flex items-center justify-center transition-all duration-300 ${
        socialUrl
          ? " bg-white hover:border-2 hover:border-green-500"
          : "bg-transparent border-2 border-black/20 dark:border-white/20 hover:border-red-600/60"
      }`}
    >
      {React.cloneElement(social.icon, {
        className: socialUrl ? "grayscale-0" : "grayscale",
      })}
    </div>
  );

  if (!ifOwnProfile) {
    if (!socialUrl) {
      return <SocialIcon />;
    }
    return (
      <Link href={socialUrl} target="_blank" rel="noopener noreferrer">
        <SocialIcon />
      </Link>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <SocialIcon />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add {social.name} Link (Demo)</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder={`Enter your ${social.name} profile URL`}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialMediaDialog;
