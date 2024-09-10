'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-cards'

import { EffectCards } from 'swiper/modules'
import { Children, ReactNode } from 'react'

interface CustomCardStackProps {
  children: ReactNode
  height: number
  initialSlide: number
  speed: number
  perSlideOffset: number
  slideShadows: boolean
  perSlideRotate: number
}

const CustomCardStack = ({
  children,
  height,
  speed,
  initialSlide,
  perSlideOffset,
  slideShadows,
  perSlideRotate,
}: CustomCardStackProps) => {
  return (
    <div className='relative w-full py-2'>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        speed={speed}
        mousewheel={{
          invert: false,
        }}
        initialSlide={initialSlide}
        style={{
          height: `${height}px`,
        }}
        className='flex w-full items-center justify-center'
        cardsEffect={{
          slideShadows: slideShadows,
          perSlideOffset: perSlideOffset,
          perSlideRotate: perSlideRotate,
        }}
      >
        {Children.map(children, (child, index) => (
          <SwiperSlide key={index} className='overflow-hidden rounded-lg pl-2 pr-1'>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CustomCardStack
