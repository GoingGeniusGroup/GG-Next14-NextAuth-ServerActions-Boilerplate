'use client'

import { useState, useCallback } from 'react'
import { addAvatar, deleteAvatar, updateAvatar } from '@/actions/avatar'
import { Avatar } from '@/components/comp/Avatar'
import { AvatarCreator, AvatarCreatorConfig, BodyType, Language } from '@/components/comp/AvatarComponents/avatar_creator'
import { AvatarExportedEvent, UserSetEvent } from '@/components/comp/AvatarComponents/avatar_creator/events'
import SpotlightButton from '@/components/ui/button/spotlightButton'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import { toast } from "sonner"
import { ExtendedUser } from "@/types/next-auth"

type AvatarType = {
  avatar_id: string
  avatar_url: string
}

const expressions = [
  { label: "neutral", icon: "/emojis/neutral.svg", bg: "#FFFFFF", animation: "/F_Talking_Variations_001.fbx" },
  { label: "sad", icon: "/emojis/sad.svg", bg: "#0C2E5C", animation: "/M_Standing_Expressions_011.fbx" },
  { label: "happy", icon: "/emojis/happy.svg", bg: "#007F13", animation: "/M_Standing_Expressions_012.fbx" },
  { label: "amazed", icon: "/emojis/amazed.svg", bg: "#F8BF43", animation: "/M_Standing_Expressions_013.fbx" },
  { label: "angry", icon: "/emojis/angry.svg", bg: "#A20325", animation: "/M_Standing_Expressions_016.fbx" },
]

interface AvatarManagerClientProps {
  initialAvatars: AvatarType[]
  user: ExtendedUser
}

export default function AvatarManagerClient({ initialAvatars, user }: AvatarManagerClientProps) {
  const [avatars, setAvatars] = useState<AvatarType[]>(initialAvatars)
  const [isCreatingAvatar, setIsCreatingAvatar] = useState(false)
  const [editingAvatar, setEditingAvatar] = useState<AvatarType | null>(null)
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(initialAvatars[0]?.avatar_url || null)
  const [currentEmote, setCurrentEmote] = useState<string>(expressions[0].animation)
  const [isCreationInProgress, setIsCreationInProgress] = useState(false)

  const handleCreateAvatar = useCallback(() => {
    setIsCreatingAvatar(true)
  }, [])

  const handleAvatarCreated = useCallback(async (event: AvatarExportedEvent) => {
    setIsCreationInProgress(true)
    try {
      const response = await addAvatar(event.data.url)
      if (response.success) {
        setAvatars(prevAvatars => [...prevAvatars])
        setIsCreatingAvatar(false)
        setSelectedAvatar(event.data.url)
        toast.success("Your new avatar has been successfully saved.")
      } else {
        throw new Error(response.error?.message || "Failed to add avatar")
      }
    } catch (error) {
      console.error("Error adding avatar:", error)
      toast.error("Failed to save the avatar. Please try again.")
    } finally {
      setIsCreationInProgress(false)
    }
  }, [])

  const handleUpdateAvatar = async (event: AvatarExportedEvent) => {
    if (editingAvatar) {
      try {
        const response = await updateAvatar(editingAvatar.avatar_id, event.data.url)
        if (response.success) {
          setAvatars(prevAvatars => prevAvatars.map(avatar => 
            avatar.avatar_id === editingAvatar.avatar_id ? { ...avatar, avatar_url: event.data.url } : avatar
          ))
          setEditingAvatar(null)
          setSelectedAvatar(event.data.url)
          toast.success("Your avatar has been successfully updated.")
        } else {
          throw new Error(response.error?.message || "Failed to update avatar")
        }
      } catch (error) {
        console.error("Error updating avatar:", error)
        toast.error("Failed to update the avatar. Please try again.")
      }
    }
  }

  const handleDeleteAvatar = async (avatarId: string) => {
    try {
      const response = await deleteAvatar(avatarId)
      if (response.success) {
        setAvatars(prevAvatars => prevAvatars.filter(avatar => avatar.avatar_id !== avatarId))
        if (avatars.length > 1) {
          setSelectedAvatar(avatars.find(avatar => avatar.avatar_id !== avatarId)?.avatar_url || null)
        } else {
          setSelectedAvatar(null)
        }
        toast.success("Avatar successfully deleted.")
      } else {
        throw new Error(response.error?.message || "Failed to delete avatar")
      }
    } catch (error) {
      console.error("Error deleting avatar:", error)
      toast.error("Failed to delete the avatar. Please try again.")
    }
  }

  const handleEmote = (emote: string) => {
    setCurrentEmote(emote)
  }

  const avatarCreatorConfig: AvatarCreatorConfig = {
    clearCache: true,
    bodyType: 'fullbody' as BodyType,
    quickStart: true,
    language: 'en' as Language,
  }

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
          {/* <ExpressionBottomMidHud expressions={expressions} handleEmote={handleEmote} /> */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Avatars</CardTitle>
        </CardHeader>
        <CardContent>
          {isCreatingAvatar ? (
            <div className="h-[600px] relative z-50">
              <AvatarCreator
                subdomain="gguser"
                config={avatarCreatorConfig}
                onAvatarExported={handleAvatarCreated}
                onUserSet={(event: UserSetEvent) => console.log('User set:', event)}
              />
              {isCreationInProgress && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  Creating avatar...
                </div>
              )}
            </div>
          ) : (
            <SpotlightButton
              text="Create New Avatar"
              isPending={isCreationInProgress}
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
                <Image src={avatar.avatar_url} alt="Avatar" width={128} height={128} className="rounded-full" />
                <SpotlightButton
                  text={selectedAvatar === avatar.avatar_url ? "Selected" : "Select"}
                  isPending={false}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar.avatar_url)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              {editingAvatar?.avatar_id === avatar.avatar_id ? (
                <div className="w-full">
                  <div className="h-[600px] relative z-50 mb-4">
                    <AvatarCreator
                      subdomain="gguser"
                      config={{...avatarCreatorConfig, avatarId: avatar.avatar_id}}
                      onAvatarExported={handleUpdateAvatar}
                      onUserSet={(event: UserSetEvent) => console.log('User set during edit:', event)}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <SpotlightButton
                      text="Cancel"
                      isPending={false}
                      type="button"
                      onClick={() => setEditingAvatar(null)}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <SpotlightButton
                    text="Edit"
                    isPending={false}
                    type="button"
                    onClick={() => setEditingAvatar(avatar)}
                  />
                  <SpotlightButton
                    text="Delete"
                    isPending={false}
                    type="button"
                    onClick={() => handleDeleteAvatar(avatar.avatar_id)}
                  />
                </>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}