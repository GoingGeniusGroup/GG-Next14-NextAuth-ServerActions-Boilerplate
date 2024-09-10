'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-cube'
import 'swiper/css/pagination'
import { EffectCube, Navigation, Pagination } from 'swiper/modules'
import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'

export default function SkinsCard() {
  const swiperRef = useRef(null)
  const skins = [
    {
      name: 'Stealthy Shadow',
      price: '$4.99',
      image:
        'https://cdnb.artstation.com/p/assets/images/images/037/588/885/4k/marcelo-m-prado-female-ninja-black-05.jpg?1621516675',
    },
    {
      name: 'Galactic Warrior',
      price: '$7.99',
      image:
        'https://media.sketchfab.com/models/65c441d2146c49a1af115bceb1588727/thumbnails/99ed5e82c5a943dc9a11d3c6c7cda128/ab7d63a6b68f4ef18a95dda919163d16.jpeg',
    },
    {
      name: 'Mythic Mage',
      price: '$3.99',
      image:
        'https://media.sketchfab.com/models/76eb28a30c4743358822e168a74d4634/thumbnails/3c5aa21988b842e881d0cd4668d5a585/47af80f4c83b46789729c624a1bb63c5.jpeg',
    },
    {
      name: 'Cyberpunk Assassin',
      price: '$9.99',
      image: 'https://design4real.de/wp-content/uploads/2024/01/ar_avatar-1536x878.webp',
    },
  ]

  return (
    <div className='flex justify-center'>
      <div className='relative mt-[-50px] h-[260px] w-[300px] rounded-lg '>
        <Swiper
          ref={swiperRef}
          effect={'cube'}
          grabCursor={true}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          pagination={{
            clickable: false,
          }}
          navigation={false}
          modules={[EffectCube, Navigation, Pagination]}
          className='absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-lg'
        >
          {skins.map((skin, index) => (
            <SwiperSlide className='bg-cover bg-center' key={index}>
              <a
                href='#'
                className='relative flex size-full min-w-0 flex-col items-center justify-center rounded-lg bg-purple-900/30 transition duration-500 ease-out'
                key={index}
              >
                <Image
                  unoptimized
                  src={skin.image}
                  alt={skin.name}
                  fill
                  className='block w-full rounded-lg object-cover'
                />
                <span className='absolute top-0 flex w-full flex-col items-center rounded-t-md px-3 py-2 transition duration-300 hover:text-purple-400'>
                  <h1 className='font-bold'>{skin.name}</h1>
                </span>
                <span className='absolute bottom-7 flex w-full items-center justify-between bg-black/50 py-2 pl-3 backdrop-blur-sm'>
                  <h1 className='font-bold text-white'>{skin.price}</h1>
                  <DrawOutlineButton>Add to cart</DrawOutlineButton>
                </span>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='absolute top-[110px] z-10  flex w-full justify-between pl-2 text-2xl'>
          <button onClick={() => swiperRef.current.swiper.slidePrev()}>
            <MdNavigateBefore />
          </button>
          <button onClick={() => swiperRef.current.swiper.slideNext()}>
            <MdNavigateNext />
          </button>
        </div>
      </div>
    </div>
  )
}
