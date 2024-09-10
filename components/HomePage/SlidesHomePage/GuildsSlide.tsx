'use client'

import Image from 'next/image'
import { useState } from 'react'
import { PiDiamondsFourLight } from 'react-icons/pi'

export default function GuildsSlide({ guild, guilds }) {
  const [selectedFaculty, setSelectedFaculty] = useState('All')

  // handle faculty selection
  const handleFacultySelection = (faculty) => {
    setSelectedFaculty(faculty)
  }

  // Filter guild members based on selected faculty
  const filteredGuildMembers =
    selectedFaculty === 'All'
      ? guilds.filter((user) => user.guild === guild.guild_name)
      : guilds.filter((user) => user.guild === guild.guild_name && user.faculty.primary_faculty === selectedFaculty)

  return (
    <>
      {/* Div for each guild where the opacity of the div is based on the guild color and reduced to 20% */}
      {guild.guild_name === 'VAJRA' ? (
        <div className='absolute z-20 h-screen w-full bg-[#0C2E5C]/20'></div>
      ) : guild.guild_name === 'BUDDHA' ? (
        <div className='absolute z-20 h-screen w-full bg-white/20'></div>
      ) : guild.guild_name === 'KARMA' ? (
        <div className='absolute z-20 h-screen w-full bg-[#007F13]/20'></div>
      ) : guild.guild_name === 'RATNA' ? (
        <div className='absolute z-20 h-screen w-full bg-[#F8BF43]/20'></div>
      ) : guild.guild_name === 'PADMA' ? (
        <div className='absolute z-20 h-screen w-full bg-[#9E021E]/20'></div>
      ) : null}

      <div
        className={`absolute top-20 z-20 flex w-full items-center justify-center overflow-hidden text-6xl font-extrabold md:text-9xl lg:hidden  ${
          guild.guild_name === 'VAJRA'
            ? 'text-[#498cff]'
            : guild.guild_name === 'BUDDHA'
              ? 'text-white'
              : guild.guild_name === 'KARMA'
                ? 'text-[#51fd6b]'
                : guild.guild_name === 'RATNA'
                  ? 'text-[#ffd372]'
                  : 'text-[#ff627f]'
        }`}
      >
        {guild.guild_name.toUpperCase()}
      </div>
      <div className='absolute left-36 z-20 hidden h-full items-center justify-center lg:flex lg:flex-col'>
        <div
          className={`flex flex-col items-center justify-center pt-4 text-8xl font-extrabold lg:pl-8  ${
            guild.guild_name === 'VAJRA'
              ? 'text-[#498cff]'
              : guild.guild_name === 'BUDDHA'
                ? 'text-white'
                : guild.guild_name === 'KARMA'
                  ? 'text-[#51fd6b]'
                  : guild.guild_name === 'RATNA'
                    ? 'text-[#ffd372]'
                    : 'text-[#ff627f]'
          }`}
        >
          {guild.guild_name.split('').map((letter, index) => (
            <span key={index}>{letter.toUpperCase()}</span>
          ))}
        </div>
      </div>
      <div className='absolute top-36 z-30 mt-20 flex w-full flex-col justify-center lg:mt-0'>
        <div className='flex items-center justify-center gap-x-3'>
          {guild.faculty.map((fac, facultyIndex) => (
            <div
              key={facultyIndex}
              className={`cursor-pointer rounded px-2 text-2xl font-bold text-black transition-all duration-500 ease-in-out hover:scale-105 ${selectedFaculty === fac.faculty_name ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
              onClick={() => handleFacultySelection(fac.faculty_name)}
            >
              <p>{fac.faculty_name.toUpperCase()}</p>
            </div>
          ))}
          <button
            className={`cursor-pointer px-2 text-2xl font-bold transition-all duration-500 ease-in-out ${selectedFaculty === 'All' ? 'rotate-180 scale-110 text-violet-300' : 'rotate-0 scale-100 text-white'}`}
            onClick={() => handleFacultySelection('All')}
          >
            <PiDiamondsFourLight />
          </button>
        </div>
        <div className='mt-10 flex size-full w-full flex-col items-center justify-center'>
          <h1 className='text-2xl font-bold'>Skills</h1>
          <p className='text-lg font-semibold'>{guild.skills.join(', ')}</p>
        </div>

        {/* Guild Members */}
        <div className='flex w-full items-center justify-center'>
          <div className='w-[90%] max-w-[450px] rounded-xl bg-black/20 p-4'>
            <h2 className='mb-4 text-center text-2xl font-bold'>Guild Members</h2>
            <div className='grid grid-cols-2 gap-4'>
              {filteredGuildMembers.slice(0, 4).map((user, userIndex) => (
                <div
                  key={userIndex}
                  className=' flex flex-col items-center rounded border-2 transition duration-200 ease-in-out hover:scale-105'
                >
                  <div className='relative flex h-[130px] w-full items-center justify-center overflow-hidden bg-white/20'>
                    <Image
                      src={user.avatarimg}
                      alt={user.username}
                      height={140}
                      width={140}
                      objectFit='cover'
                      className='cursor-pointer rounded'
                    />
                  </div>
                  <div className='flex w-full items-center justify-center bg-white text-black'>
                    <p className='text-center text-sm font-medium'>{user.username} </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <video className='absolute inset-0 size-full object-cover' autoPlay loop muted>
        <source src={guild.guild_frame} type='video/mp4' />
      </video>
      <div className='absolute z-30 hidden h-full lg:right-20 lg:flex lg:items-center'>
        <Image src={guild.symbol} height={250} width={250} alt='guild symbol' />
      </div>
      <div className='absolute bottom-0 z-30 flex justify-center lg:hidden'>
        <Image src={guild.symbol} height={80} width={80} alt='guild symbol' />
      </div>
    </>
  )
}
