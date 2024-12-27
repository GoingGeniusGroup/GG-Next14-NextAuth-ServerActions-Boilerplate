"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/ui/dialog";
import { Input } from "@/src/ui/input";
import { Button } from "@/src/ui/button";
import Link from "next/link";
import { getSocialsbyUserId, postSocial, deleteSocial } from "@/actions/social";
import { socialType, social } from "@prisma/client";
import { toast } from "sonner";
import { SpinningButton } from "@/src/ui/spinning-button";
import { useRouter } from "next/navigation";

type SocialIconProps = {
  icon: JSX.Element;
  link: string | null;
  isOwnProfile: boolean;
  onClick?: () => void;
};

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

const SocialIcon = ({ icon, link, isOwnProfile, onClick }: SocialIconProps) => {
  if (!isOwnProfile && !link) return null;

  return (
    <div
      className={`size-5 flex items-center justify-center transition-all duration-300 ${
        !isOwnProfile
          ? link
            ? "text-cyan-500 hover:text-cyan-400"
            : "text-white"
          : link
          ? "text-cyan-500 hover:text-cyan-400"
          : "text-gray-500 hover:text-gray-400"
      }`}
      onClick={onClick}
    >
      {icon}
    </div>
  );
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
  const [socialvals, setSocialVals] = useState<
    { key: socialType; value: string; social_id?: string }[]
  >([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const UrlValue = socialvals.find((s) => s.key === social.name)?.value || null;
  const SocialId = socialvals.find((s) => s.key === social.name)?.social_id;

  useEffect(() => {
    getSocialsbyUserId(userId)
      .then((data) => {
        if (data) {
          const formattedSocials = data.map((socialD: social) => ({
            key: socialD.key,
            value: socialD.value,
            social_id: socialD.social_id,
          }));
          setSocialVals(formattedSocials);
        }
      })
      .catch((error) => {
        console.error("Error fetching socials:", error);
      });
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

  if (!ifOwnProfile && !UrlValue) return null;

  if (!ifOwnProfile && UrlValue) {
    const formattedUrl =
      UrlValue.startsWith("http://") || UrlValue.startsWith("https://")
        ? UrlValue
        : `https://${UrlValue}`;

    return (
      <Link
        href={formattedUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <SocialIcon icon={social.icon} link={UrlValue} isOwnProfile={false} />
      </Link>
    );
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button onClick={() => setUrl(UrlValue || "")}>
          <SocialIcon
            icon={social.icon}
            link={UrlValue}
            isOwnProfile={ifOwnProfile}
          />
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
                disabled={isPending}
              >
                Remove
              </Button>
            )}
            <SpinningButton onClick={handleSave} isLoading={isPending}>
              {UrlValue ? "Update" : "Save"}
            </SpinningButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialMediaDialog;
