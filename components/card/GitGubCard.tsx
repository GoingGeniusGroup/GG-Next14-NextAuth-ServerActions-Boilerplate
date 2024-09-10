'use client'

// GitHubCard.tsx
import axios from 'axios'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface Repo {
  language: string
}

interface GitData {
  repos_url: string
  login: string
  public_repos: number
  created_at: string
  followers: number
  following: number
}

export default function GitHubCard() {
  const [username, setUsername] = useState<string>('')
  const [token, setToken] = useState<string>('')
  const [gitData, setGitData] = useState<GitData>({
    repos_url: '',
    login: '',
    public_repos: 0,
    created_at: '',
    followers: 0,
    following: 0,
  })
  const [topLanguages, setTopLanguages] = useState<any[]>([])
  const [mostProductiveDay, setMostProductiveDay] = useState<string>('')
  const [starredRepo, setStarredRepo] = useState<any[]>([])
  const [pullRequestsMerged, setPullRequestsMerged] = useState<number>(0)
  const [contributionsCount, setContributionsCount] = useState<number>(0)

  useEffect(() => {
    const fetchGitData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const gitData = await response.json()
        setGitData(gitData)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchGitData()
  }, [username, token])

  useEffect(() => {
    if (gitData.repos_url) {
      const fetchTopLanguages = async () => {
        try {
          const response = await fetch(gitData.repos_url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          const data = await response.json()

          const languages = data.reduce((acc: Record<string, number>, repo: Repo) => {
            if (repo.language) {
              acc[repo.language] = acc[repo.language] ? acc[repo.language] + 1 : 1
            }
            return acc
          }, {})

          const sortedLanguages = Object.entries(languages)
            .sort((a, b) => {
              if (typeof a[1] === 'number' && typeof b[1] === 'number') {
                return b[1] - a[1]
              } else {
                return 0
              }
            })
            .map(([language, count]) => ({ language, count }))

          setTopLanguages(sortedLanguages.slice(0, 5))
        } catch (error) {
          console.error('Error fetching top languages:', error)
        }
      }

      fetchTopLanguages()
    }
  }, [gitData.repos_url, token])

  useEffect(() => {
    if (gitData.login) {
      const fetchActivity = async () => {
        try {
          const response = await fetch(`https://api.github.com/users/${username}/events`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          const data = await response.json()

          const days = data.reduce((acc: Record<string, number>, event: any) => {
            const date = new Date(event.created_at)
            const day = date.getDay()
            acc[day] = acc[day] ? acc[day] + 1 : 1
            return acc
          }, {})

          const mostProductive = Object.keys(days).reduce((a, b) => (days[a] > days[b] ? a : b))

          setMostProductiveDay(getDayName(parseInt(mostProductive, 10)))
        } catch (error) {
          console.error('Error fetching activity:', error)
        }
      }

      fetchActivity()
    }
  }, [gitData.login, token, username])

  const getDayName = (day: number): string => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return daysOfWeek[day]
  }

  useEffect(() => {
    const fetchStarredRepo = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${gitData.login}/starred`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()

        setStarredRepo(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchStarredRepo()
  }, [gitData, token])

  const handleChange = useDebouncedCallback((e) => {
    setUsername(e.target.value)
  }, 400)

  const handleTokenChange = useDebouncedCallback((e) => {
    setToken(e.target.value)
  }, 400)

  useEffect(() => {
    const fetchPullRequestsMerged = async () => {
      if (gitData.login) {
        try {
          const response = await fetch(
            `https://api.github.com/search/issues?q=author:${gitData.login}+is:pr+is:merged`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )

          const data = await response.json()

          setPullRequestsMerged(data.total_count)
        } catch (error) {
          console.error('Error fetching pull requests merged:', error)
        }
      }
    }

    fetchPullRequestsMerged()
  }, [gitData.login, token])

  useEffect(() => {
    const fetchContributions = async () => {
      if (gitData.login) {
        try {
          const response = await fetch(`https://api.github.com/users/${gitData.login}/events`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          const data = await response.json()

          const contributions = data.filter((event) => event.type === 'PushEvent')
          setContributionsCount(contributions.length)
        } catch (error) {
          console.error('Error fetching contributions:', error)
        }
      }
    }

    fetchContributions()
  }, [gitData.login, token])

  return (
    <>
      <div className='flex min-h-48 flex-col items-center justify-center px-4 md:px-8 xl:px-10'>
        <div className='flex flex-col justify-center rounded-2xl border border-slate-800 bg-black/10 bg-clip-padding p-11 shadow-xl shadow-purple-700 backdrop-blur-md hover:shadow-violet-500 '>
          <div className='flex gap-4'>
            <input
              type='text'
              placeholder='Enter your GitHub username'
              onChange={(e) => handleChange(e)}
              className='mx-auto rounded-md bg-blue-950 p-2 text-white focus:outline-none active:bg-blue-700'
            />
            <input
              type='text'
              placeholder='Enter your secret token'
              onChange={(e) => handleTokenChange(e)}
              className='mx-auto rounded-md bg-blue-950 p-2 text-white focus:outline-none active:bg-blue-700'
            />
          </div>

          {username.length !== 0 && (
            <div className='mt-10 flex justify-center'>
              <Image
                unoptimized
                width='1050'
                height='300'
                src={`https://ghchart.rshah.org/${username}`}
                alt='github chart'
              />
            </div>
          )}

          <div className=' flex items-center justify-center'>
            <div className='relative mt-10 overflow-x-auto rounded-lg bg-black/10'>
              <table className='flex w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400'>
                <tbody>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Top Five Languages
                    </th>
                    <td className='px-6 py-4'>
                      {topLanguages.map(({ language, count }) => (
                        <li key={language} className='mb-2'>
                          {language}: {count} repositories
                        </li>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Pull Requests Merged
                    </th>
                    <td className='px-6 py-4'>{pullRequestsMerged}</td>
                  </tr>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Contributions
                    </th>
                    <td className='px-6 py-4'>{contributionsCount}</td>
                  </tr>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Most Productive Day
                    </th>
                    <td className='px-6 py-4'>{mostProductiveDay}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Public Repos
                    </th>
                    <td className='px-6 py-4'>{gitData.public_repos}</td>
                  </tr>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Joined
                    </th>
                    <td className='px-6 py-4'>{gitData.created_at}</td>
                  </tr>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Followers
                    </th>
                    <td className='px-6 py-4'>{gitData.followers}</td>
                  </tr>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Following
                    </th>
                    <td className='px-6 py-4'>{gitData.following}</td>
                  </tr>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Starred
                    </th>
                    <td className='px-6 py-4'>{starredRepo.length}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
