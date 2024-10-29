'use client'

import { getUserAvatars } from "@/actions/avatar";
import { getCurrentUser } from "@/actions/userAndGuild";
import { Avatar } from "@/components/comp/Avatar";
import { useEffect, useState } from "react";

interface LeftSideViewComponentProps {
  emote?: string;
}

type CurrentUser = {
  gg_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  password: string | null;
  phone_number: string | null;
  oauth_provider: string | null;
  oauth_token: string | null;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: Date | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
  username: string | null;
  image: string | null;
  role: string;
  two_factor_enabled: boolean;
  two_factor_secret: string | null;
  dob: Date | null;
};

type Avatar = {
  avatar_url: string;
};

export default function LeftSideViewComponent({
  emote: parentEmote,
}: LeftSideViewComponentProps) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [currentEmote, setCurrentEmote] = useState("/male-idle-3.fbx");
  const [avatarsData, setAvatarsData] = useState<Avatar[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser as CurrentUser | null);

      if (currentUser && currentUser.gg_id) {
        const result = await getUserAvatars(currentUser.gg_id);
        if (result.success && 'data' in result) {
          setAvatarsData(result.data as Avatar[]);
        } else if (!result.success) {
          console.error("Error fetching avatars:", result.error.message);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (parentEmote) {
      setCurrentEmote(parentEmote);
    }
  }, [parentEmote]);

  const latestAvatar =
    avatarsData.length > 0 ? avatarsData[0].avatar_url : null;

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {latestAvatar ? (
        <Avatar
          modelSrc={latestAvatar}
          shadows
          animationSrc={currentEmote}
          style={{ background: "rgb(9,20,26)", pointerEvents: "none" }}
          fov={40}
          cameraTarget={1.5}
          cameraInitialDistance={30}
          effects={{
            ambientOcclusion: true,
          }}
        />
      ) : (
        <Avatar
          modelSrc="https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0"
          shadows
          animationSrc={currentEmote}
          style={{ background: "rgb(9,20,26)", pointerEvents: "none" }}
          fov={40}
          cameraTarget={1.5}
          cameraInitialDistance={30}
          effects={{
            ambientOcclusion: true,
          }}
        />
      )}
    </>
  );
}