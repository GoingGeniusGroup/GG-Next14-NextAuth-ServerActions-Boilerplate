'use client'

import { useState, useEffect } from 'react'
import RegionHeader from '@/components/Regions/RegionHeader'
import toast from 'react-hot-toast'
import DiscoverRegion from '../Regions/DiscoverRegion'

const getUsers = async () => {
  try {
    const res = await fetch('/api/public/users')
    if (!res.ok) {
      toast.error('Failed to fetch users data')
      return []
    }
    const users = await res.json()

    const filteredUsers = users.filter(
      (user) => user.username && user.email && user.region.ip && user.avatar.length !== 0 && user.guild_id,
    )
    return filteredUsers
  } catch (error) {
    toast.error('Internal Server Error')
    return []
  }
}

const getGuilds = async () => {
  try {
    const res = await fetch('/api/public/guilds')
    if (!res.ok) {
      toast.error('Failed to fetch guilds data')
      return []
    }
    return res.json()
  } catch (error) {
    toast.error('Internal Server Error')
    return []
  }
}

const continents = [
  {
    continent_name: 'AFRICA',
    continent_code: 'AF',
  },
  {
    continent_name: 'ANTARCTICA',
    continent_code: 'AN',
  },
  {
    continent_name: 'ASIA',
    continent_code: 'AS',
  },
  {
    continent_name: 'EUROPE',
    continent_code: 'EU',
  },
  {
    continent_name: 'NORTH AMERICA',
    continent_code: 'NA',
  },
  {
    continent_name: 'OCEANIA',
    continent_code: 'OC',
  },
  {
    continent_name: 'SOUTH AMERICA',
    continent_code: 'SA',
  },
]

const DiscoverPage = ({ facultyTags }) => {
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('ASIA') // Using continent asia
  const [selectedGuildFilter, setSelectedGuildFilter] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [publicUsers, setPublicUsers] = useState([])
  const [guildData, setGuildData] = useState([])
  const [guilds, setGuilds] = useState([])

  const handleRegionFilterChange = (filter) => {
    setSelectedRegionFilter(filter)
    setSearchTerm('')
  }

  const handleFilterGuildChange = (filter) => {
    setSelectedGuildFilter(filter)
    setSearchTerm('')
  }

  // Fetch the users data
  useEffect(() => {
    const savePublicUsers = async () => {
      const users = await getUsers()
      setPublicUsers(users)
    }
    savePublicUsers()
  }, [])

  // Fetch the guilds data
  useEffect(() => {
    const saveGuilds = async () => {
      const guild = await getGuilds()
      setGuildData(guild)
    }
    saveGuilds()
  }, [])

  // Map the guilds with the public users
  useEffect(() => {
    const mapGuildInfo = () => {
      const guilds = publicUsers.map((publicUser) => {
        const guild = guildData.find((g) => g.id === publicUser.guild_id)
        const continent = continents.find((continent) => continent.continent_code === publicUser.region.continent_code)
        const avatarUrl = publicUser.avatar.length > 0 ? publicUser.avatar[publicUser.avatar.length - 1].avatar_url : ''
        const userImages = publicUser.image_urls
        const experience = publicUser.experience

        return {
          name: `${publicUser.first_name} ${publicUser.last_name}`,
          username: publicUser.username,
          description: publicUser.description,
          image_urls: userImages,
          guild: guild ? guild.guild_name : 'Unknown Guild',
          avatarimg: avatarUrl.replace('glb', 'png'),
          continent: continent ? continent.continent_name : 'Unknown Continent',
          experience: experience,
        }
      })
      setGuilds(guilds)
    }

    if (Array.isArray(publicUsers) && publicUsers.length !== 0 && Array.isArray(guildData) && guildData.length !== 0) {
      mapGuildInfo()
    }
  }, [publicUsers, guildData])

  return (
    <>
      <div className='relative h-screen w-full'>
        <div className='flex size-full justify-center'>
          {/* Discover Page Main Content */}
          <DiscoverRegion
            selectedRegionFilter={selectedRegionFilter}
            guilds={guilds}
            selectedGuildFilter={selectedGuildFilter}
            searchTerm={searchTerm}
            handleFilterGuildChange={handleFilterGuildChange}
            setSearchTerm={setSearchTerm}
            facultyTags={facultyTags}
          />
        </div>
        <div className='absolute top-20 flex w-full justify-center lg:top-32 lg:justify-start'>
          {/* Left Sidebar/Header Section to showcase the regions to filter with */}
          <RegionHeader onFilterChange={handleRegionFilterChange} />
        </div>
      </div>
    </>
  )
}

export default DiscoverPage
