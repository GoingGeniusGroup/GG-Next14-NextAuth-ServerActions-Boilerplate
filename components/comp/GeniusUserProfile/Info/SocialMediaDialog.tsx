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
import { getSocialsbyUserId, postSocial, deleteSocial } from "@/actions/social";
import { socialType, social } from "@prisma/client";
import { toast } from "sonner";
import { SpinningButton } from "@/components/ui/spinning-button";
import { useRouter } from "next/navigation";

type ResponseType = {
  success: boolean;
  message?: string;
  code: number;
  data?: {
    data: social;
  };
  error?: {
    code: number;
    message: string;
  };
};

const SocialMediaDialog = ({
  social,
  ifOwnProfile,
  userId,
}: {
  social: { name: socialType; icon: JSX.Element; link: string };
  ifOwnProfile: boolean;
  userId: string;
}) => {
  const [url, setUrl] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const [socialvals, setSocialVals] = useState<
    { key: socialType; value: string; social_id?: string }[]
  >([]);
  const [ispending, startTransition] = useTransition();

  const UrlValue = socialvals.find((s) => s.key === social.name)?.value || null;
  const SocialId = socialvals.find((s) => s.key === social.name)?.social_id;

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const data = await getSocialsbyUserId(userId);
        if (data) {
          const formattedSocials = data.map((socialD: social) => ({
            key: socialD.key,
            value: socialD.value,
            social_id: socialD.social_id,
          }));
          setSocialVals(formattedSocials);
        }
      } catch (error) {
        console.error("Error fetching socials:", error);
      }
    };

    fetchSocials();
  }, [userId]);

  const handleSave = async () => {
    if (!url.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }

    startTransition(async () => {
      try {
        const res = (await postSocial(
          url.trim(),
          social.name,
          SocialId
        )) as ResponseType;

        if (res && res.success) {
          setSocialVals((prevSocials) => {
            const existingIndex = prevSocials.findIndex(
              (s) => s.key === social.name
            );
            if (existingIndex !== -1) {
              const updatedSocials = [...prevSocials];
              updatedSocials[existingIndex] = {
                key: social.name,
                value: url.trim(),
                social_id: res.data?.data?.social_id || SocialId,
              };
              return updatedSocials;
            } else {
              return [
                ...prevSocials,
                {
                  key: social.name,
                  value: url.trim(),
                  social_id: res.data?.data?.social_id,
                },
              ];
            }
          });

          setIsDialogOpen(false);
          toast.success(
            `Successfully ${SocialId ? "updated" : "added"} ${social.name} URL`
          );
          router.refresh();
        } else {
          toast.error(res?.error?.message || "Failed to save URL");
        }
      } catch (error) {
        toast.error("Failed to save URL");
      }
    });
  };

  const handleRemove = async () => {
    if (!SocialId) return;

    startTransition(async () => {
      try {
        const res = (await deleteSocial(SocialId)) as ResponseType;
        if (res && res.success) {
          setSocialVals((prevSocials) =>
            prevSocials.filter((s) => s.key !== social.name)
          );
          setUrl("");
          setIsDialogOpen(false);
          toast.success(`Successfully removed ${social.name} URL`);
          router.refresh();
        } else {
          toast.error(res?.error?.message || "Failed to remove URL");
        }
      } catch (error) {
        toast.error("Failed to remove URL");
      }
    });
  };

  const SocialIcon = () => (
    <div
      className={`size-[52px] rounded-full flex items-center justify-center transition-all duration-300 ${
        UrlValue
          ? "bg-sky-300 hover:bg-sky-400"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {React.cloneElement(social.icon, {
        className: UrlValue ? "" : "grayscale",
      })}
    </div>
  );

  if (!ifOwnProfile && !UrlValue) {
    return <SocialIcon />;
  }

  if (!ifOwnProfile && UrlValue) {
    const formattedUrl =
      UrlValue.startsWith("http://") || UrlValue.startsWith("https://")
        ? UrlValue
        : `https://${UrlValue}`;

    return (
      <a href={formattedUrl} target="_blank" rel="noopener noreferrer">
        <SocialIcon />
      </a>
    );
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button onClick={() => setUrl(UrlValue || "")}>
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
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            {UrlValue && (
              <Button
                variant="destructive"
                onClick={handleRemove}
                disabled={ispending}
              >
                Remove
              </Button>
            )}
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
