"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { getAvatarsByUserId } from "@/services/avatar";
import { getUserByUsername } from "@/services/user";
import { getUserAvatars } from "@/actions/avatar";

// Types
export type AvatarType = {
  avatar_id: string;
  avatar_url: string | undefined;
};

export type Expression = {
  label: string;
  icon: string;
  bg: string;
  animation: string;
};

interface PublicAvatarContextType {
  publicAvatars: AvatarType[];
  selectedPublicAvatar: string | undefined;
  currentPublicEmote: string;
  publicExpressions: Expression[];
  setSelectedPublicAvatar: (url: string | undefined) => void;
  handlePublicEmote: (emote: string) => void;
  extractUserId: (avatarUrl: string | undefined) => string | undefined;
}

// Create the context
const PublicAvatarContext = createContext<PublicAvatarContextType | undefined>(
  undefined
);

// Expression data
const defaultExpressions: Expression[] = [
  {
    label: "neutral",
    icon: "/emojis/neutral.svg",
    bg: "#FFFFFF",
    animation: "/male-idle-3.fbx",
  },
  {
    label: "sad",
    icon: "/emojis/sad.svg",
    bg: "#0C2E5C",
    animation: "/M_Standing_Expressions_011.fbx",
  },
  {
    label: "happy",
    icon: "/emojis/happy.svg",
    bg: "#007F13",
    animation: "/M_Standing_Expressions_012.fbx",
  },
  {
    label: "amazed",
    icon: "/emojis/amazed.svg",
    bg: "#F8BF43",
    animation: "/M_Standing_Expressions_013.fbx",
  },
  {
    label: "angry",
    icon: "/emojis/angry.svg",
    bg: "#A20325",
    animation: "/M_Standing_Expressions_016.fbx",
  },
];

interface AvatarProviderProps {
  children: ReactNode;
  username: string;
}

export function PublicAvatarProvider({
  children,
  username,
}: AvatarProviderProps) {
  const [currentProfileOwner, setCurrentProfileOwner] = useState<any | null>(
    null
  );
  const [currentUserAvatar, setCurrentUserAvatar] = useState<
    AvatarType[] | null
  >(null);

  useEffect(() => {
    const fetchAvatars = async () => {
      const profileOwner = await getUserByUsername(username);
      setCurrentProfileOwner(profileOwner);
      if (profileOwner) {
        const avatarsResponse = await getUserAvatars(profileOwner.gg_id);
        const avatars: AvatarType[] =
          avatarsResponse.success && Array.isArray(avatarsResponse.data)
            ? avatarsResponse.data
            : [];
        setCurrentUserAvatar(avatars);
      }
    };

    fetchAvatars();
  }, [username]);

  const [publicAvatars, setPublicAvatars] = useState<AvatarType[]>(
    currentUserAvatar || []
  );

  const [selectedPublicAvatar, setSelectedPublicAvatar] = useState<
    string | undefined
  >(currentUserAvatar ? currentUserAvatar[0]?.avatar_url : undefined);
  const [currentPublicEmote, setCurrentPublicEmote] = useState<string>(
    defaultExpressions[0].animation
  );

  useEffect(() => {
    // Only fetch avatars if currentProfileOwner exists
    if (currentProfileOwner?.gg_id) {
      const fetchAvatars = async () => {
        const fetchedAvatars = await getAvatarsByUserId(
          currentProfileOwner.gg_id
        );
        if (fetchedAvatars) {
          setPublicAvatars(
            fetchedAvatars.map((avatar) => ({
              avatar_id: avatar.avatar_id,
              avatar_url: avatar.avatar_url || undefined,
            }))
          );
        }
      };
      fetchAvatars();
    }
  }, [currentProfileOwner?.gg_id]);

  const handlePublicEmote = (emote: string) => {
    setCurrentPublicEmote(emote);
  };

  const extractUserId = (avatarUrl: string | undefined): string | undefined => {
    if (!avatarUrl) return undefined;
    const match = avatarUrl.match(/\/([^/]+)\.glb$/);
    return match ? match[1] : undefined;
  };

  const value = {
    publicAvatars,
    selectedPublicAvatar,
    currentPublicEmote,
    publicExpressions: defaultExpressions,
    setSelectedPublicAvatar,
    handlePublicEmote,
    extractUserId,
  };

  return (
    <PublicAvatarContext.Provider value={value}>
      {children}
    </PublicAvatarContext.Provider>
  );
}

// Custom hook to use the avatar context
export function usePublicAvatar() {
  const context = useContext(PublicAvatarContext);
  if (context === undefined) {
    throw new Error("usePublicAvatar must be used within an AvatarProvider");
  }
  return context;
}
