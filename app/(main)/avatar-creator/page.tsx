'use client'

import { AvatarCreator } from '@/components/comp/AvatarComponents/avatar_creator'
import { AssetUnlockedEvent, AvatarExportedEvent, UserAuthorizedEvent, UserSetEvent } from '@/components/comp/AvatarComponents/avatar_creator/events'
import { useState } from 'react'

export default function AvatarCreatorPage() {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  
    const handleAvatarExported = (event: AvatarExportedEvent) => {
      console.log('Avatar exported:', event.data.url)
      setAvatarUrl(event.data.url)
    }
  
    const handleUserSet = (event: UserSetEvent) => {
      console.log('User set:', event.data)
    }
  
    const handleUserAuthorized = (event: UserAuthorizedEvent) => {
      console.log('User authorized:', event.data)
    }
  
    const handleAssetUnlock = (event: AssetUnlockedEvent) => {
      console.log('Asset unlock:', event.data)
    }
  
    return (
      <div className="container mx-auto p-4 h-screen flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Avatar Creator</h1>
        <div className="flex-grow relative">
          <AvatarCreator
            subdomain="gguser" 
            className="w-full h-full absolute inset-0 border border-gray-300 rounded-lg"
            config={{
              clearCache: true,
              bodyType: 'fullbody',
              quickStart: true,
            }}
            onAvatarExported={handleAvatarExported}
            onUserSet={handleUserSet}
            onUserAuthorized={handleUserAuthorized}
            onAssetUnlock={handleAssetUnlock}
          />
        </div>
        {avatarUrl && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Exported Avatar URL:</h2>
            <p className="break-all">{avatarUrl}</p>
          </div>
        )}
      </div>
    )
  }