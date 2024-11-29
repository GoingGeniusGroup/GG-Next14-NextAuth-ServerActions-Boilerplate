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
import { useState } from "react";
import Link from "next/link";
import { getSocialsbyUserId, postSocial } from "@/actions/social";
import { socialType, social } from "@prisma/client";
import { toast } from "sonner";
import { SpinningButton } from "@/components/ui/spinning-button";
import { useRouter } from "next/navigation";

const SocialMediaDialog = ({
  social,
  ifOwnProfile,
}: {
  social: { name: socialType; icon: JSX.Element; link: string };
  ifOwnProfile: boolean;
}) => {
  const [url, setUrl] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const [socialvals, setSocialVals] = useState<
    { key: socialType; value: string }[]
  >([]);

  const UrlValue = socialvals.find((s) => s.key === social.name)?.value || null;

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const data = await getSocialsbyUserId();
        const formattedSocials = data?.map((socialD: social) => ({
          key: socialD.key,
          value: socialD.value,
        }));
        setSocialVals(formattedSocials!);
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
        if (res && res.success) {
          // Immediately update the local state
          setSocialVals((prevSocials) => {
            // Check if the social type already exists
            const existingIndex = prevSocials.findIndex(
              (s) => s.key === social.name
            );

            if (existingIndex !== -1) {
              // Update existing social
              const updatedSocials = [...prevSocials];
              updatedSocials[existingIndex] = { key: social.name, value: url };
              return updatedSocials;
            } else {
              // Add new social
              return [...prevSocials, { key: social.name, value: url }];
            }
          });

          toast.success(`Successfully added ${social.name} URL`);
          router.refresh(); // Optional: force a full page refresh
        } else {
          toast.error("Failed to post URL");
        }
      } catch (error) {
        toast.error("Failed to post URL");
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
        className: UrlValue ? "" : "grayscale",
      })}
    </div>
  );

  // If not own profile and no URL, show a disabled icon
  if (!ifOwnProfile && !UrlValue) {
    return <SocialIcon />;
  }

  // If not own profile and has URL, redirect to the URL
  if (!ifOwnProfile && UrlValue) {
    return (
      <Link href={UrlValue} target="_blank" rel="noopener noreferrer">
        <SocialIcon />
      </Link>
    );
  }

  // Own profile logic
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button>
          <SocialIcon />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {UrlValue
              ? `Update ${social.name} Link`
              : `Add ${social.name} Link`}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder={`Enter your ${social.name} profile URL`}
            value={url || UrlValue || ""}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="flex justify-end">
            <SpinningButton onClick={handleSave} isLoading={ispending}>
              {UrlValue ? "Update" : "Save"}
            </SpinningButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialMediaDialog;
