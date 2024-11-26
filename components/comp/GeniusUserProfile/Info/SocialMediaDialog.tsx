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

const SocialMediaDialog = ({
  social,
  userLinks,
  onSave,
}: {
  social: { name: string; icon: JSX.Element };
  userLinks: Record<string, string>;
  onSave: (name: string, url: string) => void;
}) => {
  const [url, setUrl] = useState(userLinks[social.name.toLowerCase()] || "");

  const handleSave = () => {
    onSave(social.name.toLowerCase(), url);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`size-[52px] rounded-full flex items-center justify-center transition-all duration-300 ${
            userLinks[social.name.toLowerCase()]
              ? "bg-gray-300 hover:bg-gray-400"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {React.cloneElement(social.icon, {
            className: userLinks[social.name.toLowerCase()] ? "" : "opacity-20",
          })}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add {social.name} Link</DialogTitle>
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
