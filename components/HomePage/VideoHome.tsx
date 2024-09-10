// 'use client'

// import { motion } from 'framer-motion'
// import { useEffect, useRef, useState } from 'react'
// import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
// import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md'
// import 'swiper/css'
// import { Autoplay } from 'swiper/modules'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import useUserAndGuildData from '../CustomHooks/useUserAndGuildData'
// import AvatarSlideHome from './SlidesHomePage/AvatarSlideHome'
// import DiscoverSlideLast from './SlidesHomePage/DiscoverSlideLast'
// import GgOne from './SlidesHomePage/GgOne'
// import GuildsSlide from './SlidesHomePage/GuildsSlide'
// import HomeSlide from './SlidesHomePage/HomeSlide'

// export default function VideoHome() {
//   const { users, guilds } = useUserAndGuildData()
//   const paginationLabels = ['HOME', 'AVATAR', 'BUDDHA', 'VAJRA', 'KARMA', 'RATNA', 'PADMA', 'GGONE', 'DISCOVER']
//   const swiperRefs = useRef(null)
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [isSmallScreen, setIsSmallScreen] = useState(false)
//   const [mappedGuilds, setMappedGuilds] = useState([])
//   const [isPlaying, setIsPlaying] = useState(true)

//   // Map the users and guilds data
//   useEffect(() => {
//     if (users.length && guilds.length) {
//       const mappedData = users.map((user) => {
//         const guild = guilds.find((g) => g.id === user.guild_id)
//         const avatarUrl = user.avatar.length > 0 ? user.avatar[user.avatar.length - 1].avatar_url : ''

//         return {
//           name: `${user.first_name} ${user.last_name}`,
//           username: user.username,
//           description: user.description,
//           image_urls: user.image_urls,
//           faculty: user.faculty,
//           guild: guild ? guild.guild_name : 'Unknown Guild',
//           avatarimg: avatarUrl.replace('glb', 'png'),
//           experience: user.experience,
//         }
//       })
//       setMappedGuilds(mappedData)
//     }
//   }, [users, guilds])

//   // Handle the click on the HUD on the bottom of the screen | HUD as an bottom nav bar
//   const handleHudClick = (index) => {
//     setCurrentSlide(index)
//     swiperRefs.current?.slideTo(index, 0)
//   }

//   // Check if the screen is small
//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth < 1025) // Adjust the breakpoint as needed
//     }

//     handleResize() // Initial check
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   // Handle play/pause button click
//   const togglePlayPause = () => {
//     if (isPlaying) {
//       swiperRefs.current?.autoplay.stop()
//     } else {
//       swiperRefs.current?.autoplay.start()
//     }
//     setIsPlaying(!isPlaying)
//   }

//   return (
//     <div className='relative h-screen w-screen overflow-hidden'>
//       <Swiper
//         spaceBetween={30}
//         centeredSlides={true}
//         autoplay={{
//           delay: 5000,
//           disableOnInteraction: false,
//         }}
//         modules={[Autoplay]}
//         className='absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2'
//         onSwiper={(swiper) => {
//           swiperRefs.current = swiper // Store the Swiper instance in a ref
//         }}
//         onSlideChange={(e) => {
//           setCurrentSlide(e.activeIndex) // Update the state when slide changes
//         }}
//         pagination={{
//           clickable: true,
//         }}
//       >
//         {/* Home Slide */}
//         <SwiperSlide className='bg-cover bg-center'>
//           <HomeSlide />
//         </SwiperSlide>
//         {/* Avatar Slide */}
//         <SwiperSlide className='bg-cover bg-center'>
//           <AvatarSlideHome />
//         </SwiperSlide>

//         {/* Guilds Slide */}
//         {guilds.map((guild, index) => (
//           <SwiperSlide key={index} className='bg-cover bg-center'>
//             <GuildsSlide guild={guild} guilds={mappedGuilds} />
//           </SwiperSlide>
//         ))}

//         {/* GG One */}
//         <SwiperSlide className='bg-cover bg-center'>
//           <GgOne />
//         </SwiperSlide>
//         {/* Discover */}
//         <SwiperSlide className='bg-cover bg-center'>
//           <DiscoverSlideLast />
//         </SwiperSlide>
//         {/* HUD at the bottom */}
//         <div className='absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2 rounded-full px-2 py-1 shadow shadow-white dark:shadow-purple-700'>
//           {paginationLabels.map((label, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               className={`size-4 cursor-pointer rounded-full border-b border-white text-center text-xs font-semibold backdrop-blur-lg lg:size-fit lg:px-4 lg:py-2 dark:border-violet-700 ${
//                 currentSlide === index ? 'bg-pink-300 text-black' : 'text-white'
//               }`}
//               onClick={() => handleHudClick(index)}
//             >
//               {isSmallScreen ? label.substring(0, 1) : label}
//             </motion.div>
//           ))}
//         </div>

//         {/* Navigation Arrows */}
//         <div
//           className={`absolute left-0 top-0 h-full items-center text-purple-200 ${currentSlide === 0 ? 'hidden' : 'flex'}`}
//         >
//           <motion.div
//             whileHover={{ scale: 1.2 }}
//             whileTap={{ scale: 0.8 }}
//             className='z-20 ml-5'
//             onClick={() => swiperRefs.current?.slidePrev()}
//           >
//             <MdOutlineNavigateBefore size={30} />
//           </motion.div>
//         </div>
//         <div
//           className={`absolute right-0 top-0 flex h-full items-center text-purple-200 ${currentSlide === 8 ? 'hidden' : 'flex'}`}
//         >
//           <motion.div
//             whileHover={{ scale: 1.2 }}
//             whileTap={{ scale: 0.8 }}
//             className='z-20 mr-5'
//             onClick={() => swiperRefs.current?.slideNext()}
//           >
//             <MdOutlineNavigateNext size={30} />
//           </motion.div>
//         </div>

//         {/* Play/Pause Button */}
//         <div className='absolute bottom-6 right-6 z-30'>
//           <button className='rounded-full border-2 bg-white text-black shadow-lg' onClick={togglePlayPause}>
//             {isPlaying ? <FaPauseCircle size={20} /> : <FaPlayCircle size={20} />}
//           </button>
//         </div>
//       </Swiper>
//     </div>
//   )
// }
