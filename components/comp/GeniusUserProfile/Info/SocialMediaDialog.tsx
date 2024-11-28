"use client";

import React, { useEffect, useTransition } from "react";
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
import { getSocialsbyUserId, postSocial } from "@/actions/social";
import { socialType, social } from "@prisma/client";
import { toast } from "sonner";
import { SpinningButton } from "@/components/ui/spinning-button";

const SocialMediaDialog = ({
  social,
  userLinks,

  ifOwnProfile,
}: {
  social: { name: socialType; icon: JSX.Element };
  userLinks: Record<string, string>;
  ifOwnProfile: boolean;
}) => {
  const [url, setUrl] = useState(userLinks[social.name.toLowerCase()] || "");
  const socialUrl = userLinks[social.name.toLowerCase()];
  const [socialvals, setSocialVals] = useState<
    { key: socialType; value: string }[]
  >([]);

  const UrlValue = socialvals.find((s) => s.key === social.name)?.value || null;

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const data = await getSocialsbyUserId();
        const formattedSocials = data.map((socialD: social) => ({
          key: socialD.key,
          value: socialD.value,
        }));
        setSocialVals(formattedSocials);
      } catch (error) {
        console.error("Error fetching socials:", error);
      }
    };

    fetchSocials();
  }, []);

  const [ispending, startTransition] = useTransition();

  const handleSave = async () => {
    startTransition(async () => {
      try {
        const res = await postSocial(url, social.name);
        if (!res || !res.success) {
          toast.error("failed to post url");
        }
        toast.success(`successfully added ${social.name} url`);
      } catch (error) {
        toast.error("failed to post url");
      }
    });
  };

  const SocialIcon = () => (
    <div
      className={`size-[52px] rounded-full flex items-center justify-center transition-all duration-300 ${
        UrlValue
          ? "bg-gray-300 hover:bg-gray-400"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {React.cloneElement(social.icon, {
        className: UrlValue ? "" : "opacity-20",
      })}
    </div>
  );

  if (!ifOwnProfile) {
    if (!UrlValue) {
      return <SocialIcon />;
    }

    return (
      <Link href={UrlValue} target="_blank" rel="noopener noreferrer">
        <SocialIcon />
      </Link>
    );
  }

  return (
    <>
      {UrlValue ? (
        <Link href={UrlValue} target="_blank" rel="noopener noreferrer">
          <SocialIcon />
        </Link>
      ) : (
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
                <SpinningButton onClick={handleSave} isLoading={ispending}>
                  Save
                </SpinningButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default SocialMediaDialog;
