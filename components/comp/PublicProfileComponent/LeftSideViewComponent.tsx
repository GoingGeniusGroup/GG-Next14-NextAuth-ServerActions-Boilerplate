"use client";

import { useEffect, useState } from "react";
import { getUserAvatars } from "@/actions/avatar";
import { getCurrentUser } from "@/actions/userAndGuild";
import { Avatar } from "@/components/comp/Avatar";

interface LeftSideViewComponentProps {
  emote?: string;
}

export default function LeftSideViewComponent({
  emote: parentEmote,
}: LeftSideViewComponentProps) {
  const [user, setUser] = useState<any>(null);
  const [currentEmote, setCurrentEmote] = useState("/male-idle-3.fbx");
  const [avatarsData, setAvatarsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (currentUser) {
        const result = await getUserAvatars(currentUser.gg_id);
        if (result.success) {
          // setAvatarsData(result);
          console.log("Avatars fetched:", result.data);
        } else if (result.error) {
          console.error("Error fetching avatars:", result.error);
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
