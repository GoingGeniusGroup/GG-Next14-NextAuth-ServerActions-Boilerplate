'use client'

import { addAvatar, deleteAvatar, updateAvatar } from '@/actions/avatar'
import { Avatar } from '@/components/comp/Avatar'
import { AvatarCreator, AvatarCreatorConfig, BodyType, Language } from '@/components/comp/AvatarComponents/avatar_creator'
import { AvatarExportedEvent, UserSetEvent } from '@/components/comp/AvatarComponents/avatar_creator/events'
import SpotlightButton from '@/components/ui/button/spotlightButton'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getAvatarsByUserId } from '@/services/avatar'
import { ExtendedUser } from "@/types/next-auth"
import { AvatarResponse } from '@/types/utils'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { toast } from "sonner"

type AvatarType = {
  avatar_id: string
  avatar_url: string | undefined
}

interface AvatarManagerClientProps {
  initialAvatars: AvatarType[]
  user: ExtendedUser
}

const expressions = [
  { label: "neutral", icon: "/emojis/neutral.svg", bg: "#FFFFFF", animation: "/male-idle-3.fbx" },
  { label: "sad", icon: "/emojis/sad.svg", bg: "#0C2E5C", animation: "/M_Standing_Expressions_011.fbx" },
  { label: "happy", icon: "/emojis/happy.svg", bg: "#007F13", animation: "/M_Standing_Expressions_012.fbx" },
  { label: "amazed", icon: "/emojis/amazed.svg", bg: "#F8BF43", animation: "/M_Standing_Expressions_013.fbx" },
  { label: "angry", icon: "/emojis/angry.svg", bg: "#A20325", animation: "/M_Standing_Expressions_016.fbx" },
]

export default function AvatarManagerClient({ initialAvatars, user }: AvatarManagerClientProps) {
  const [avatars, setAvatars] = useState<AvatarType[]>(initialAvatars)
  const [isAvatarCreatorOpen, setIsAvatarCreatorOpen] = useState(false)
  const [editingAvatar, setEditingAvatar] = useState<AvatarType | null>(null)
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(initialAvatars[0]?.avatar_url)
  const [currentEmote, setCurrentEmote] = useState<string>(expressions[0].animation)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const fetchAvatars = async () => {
      const fetchedAvatars = await getAvatarsByUserId(user.gg_id)
      if (fetchedAvatars) {
        setAvatars(fetchedAvatars.map(avatar => ({
          avatar_id: avatar.avatar_id,
          avatar_url: avatar.avatar_url || undefined
        })))
      }
    }
    fetchAvatars()
  }, [user.gg_id])

  const handleCreateAvatar = useCallback(() => {
    setIsAvatarCreatorOpen(true)
    setEditingAvatar(null)
  }, [])

  const handleEditAvatar = useCallback((avatar: AvatarType) => {
    setIsAvatarCreatorOpen(true)
    setEditingAvatar(avatar)
  }, [])

  const handleAvatarCreated = useCallback(async (event: AvatarExportedEvent) => {
    setIsProcessing(true)
    try {
      const response = await addAvatar(event.data.url) as AvatarResponse
      
      if (response.success) {
        setAvatars(prevAvatars => [...prevAvatars, {
          avatar_id: response.data.avatar_id,
          avatar_url: response.data.avatar_url
        }])
        setSelectedAvatar(response.data.avatar_url)
        toast.success("Your new avatar has been successfully saved.")
      } else {
        throw new Error(response.error.message)
      }
    } catch (error) {
      console.error("Error adding avatar:", error)
      toast.error("Failed to save the avatar. Please try again.")
    } finally {
      setIsProcessing(false)
      setIsAvatarCreatorOpen(false)
    }
  }, [])

  const handleUpdateAvatar = async (event: AvatarExportedEvent) => {
    if (editingAvatar) {
      setIsProcessing(true)
      try {
        const response = await updateAvatar(editingAvatar.avatar_id, event.data.url) as AvatarResponse
        if (response.success) {
          setAvatars(prevAvatars => prevAvatars.map(avatar =>
            avatar.avatar_id === editingAvatar.avatar_id ? {
              ...avatar,
              avatar_url: response.data.avatar_url
            } : avatar
          ))
          setSelectedAvatar(response.data.avatar_url)
          toast.success("Your avatar has been successfully updated.")
        } else {
          throw new Error(response.error.message)
        }
      } catch (error) {
        console.error("Error updating avatar:", error)
        toast.error("Failed to update the avatar. Please try again.")
      } finally {
        setIsProcessing(false)
        setIsAvatarCreatorOpen(false)
        setEditingAvatar(null)
      }
    }
  }

  const handleDeleteAvatar = async (avatarId: string) => {
    try {
      const response = await deleteAvatar(avatarId) as AvatarResponse
      if (response.success) {
        setAvatars(prevAvatars => prevAvatars.filter(avatar => avatar.avatar_id !== avatarId))
        if (avatars.length > 1) {
          setSelectedAvatar(avatars.find(avatar => avatar.avatar_id !== avatarId)?.avatar_url)
        } else {
          setSelectedAvatar(undefined)
        }
        toast.success("Avatar successfully deleted.")
      } else {
        throw new Error(response.error.message)
      }
    } catch (error) {
      console.error("Error deleting avatar:", error)
      toast.error("Failed to delete the avatar. Please try again.")
    }
  }

  const handleEmote = (emote: string) => {
    setCurrentEmote(emote)
  }

  const baseAvatarCreatorConfig: AvatarCreatorConfig = {
    bodyType: 'fullbody' as BodyType,
    quickStart: true,
    language: 'en' as Language,
  }

  const createAvatarConfig: AvatarCreatorConfig = {
    ...baseAvatarCreatorConfig,
    clearCache: true,
  }

  const editAvatarConfig: AvatarCreatorConfig = {
    ...baseAvatarCreatorConfig,
    clearCache: false,
  }

  const extractUserId = (avatarUrl: string | undefined): string | undefined => {
    if (!avatarUrl) return undefined;
    const match = avatarUrl.match(/\/([^/]+)\.glb$/);
    return match ? match[1] : undefined;
  };

  const getAvatarCreatorUrl = (avatarUrl: string | undefined): string => {
    const userId = extractUserId(avatarUrl);
    if (userId) {
      return `https://gguser.readyplayer.me/avatar/${userId}?frameApi`;
    }
    return 'https://gguser.readyplayer.me/avatar?frameApi';
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Avatar Showcase</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full relative">
            <Avatar
              modelSrc={selectedAvatar || "https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0"}
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
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Avatars</CardTitle>
        </CardHeader>
        <CardContent>
          {isAvatarCreatorOpen ? (
            <div className="h-[600px] relative z-50">
              <AvatarCreator
                subdomain="gguser"
                config={editingAvatar ? {
                  ...editAvatarConfig,
                  avatarId: extractUserId(editingAvatar.avatar_url),
                } : createAvatarConfig}
                onAvatarExported={editingAvatar ? handleUpdateAvatar : handleAvatarCreated}
                onUserSet={(event: UserSetEvent) => console.log('User set:', event)}
                iframeUrl={editingAvatar ? getAvatarCreatorUrl(editingAvatar.avatar_url) : undefined}
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  {editingAvatar ? "Updating avatar..." : "Creating avatar..."}
                </div>
              )}
            </div>
          ) : (
            <SpotlightButton
              text="Create New Avatar"
              isPending={isProcessing}
              type="button"
              onClick={handleCreateAvatar}
            />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {avatars.map((avatar) => (
          <Card key={avatar.avatar_id}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Image
                  src={avatar.avatar_url?.replace('.glb', '.png') || '/placeholder-avatar.png'}
                  alt="Avatar"
                  width={128}
                  height={128}
                  className="rounded-full"
                />
                <SpotlightButton
                  text={selectedAvatar === avatar.avatar_url ? "Selected" : "Select"}
                  isPending={false}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar.avatar_url)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <SpotlightButton
                text="Edit"
                isPending={false}
                type="button"
                onClick={() => handleEditAvatar(avatar)}
              />
              <SpotlightButton
                text="Delete"
                isPending={false}
                type="button"
                onClick={() => handleDeleteAvatar(avatar.avatar_id)}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}