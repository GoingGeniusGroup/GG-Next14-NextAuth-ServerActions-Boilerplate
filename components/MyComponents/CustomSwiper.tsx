'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { EffectCoverflow } from 'swiper/modules'
import { Children, ReactNode } from 'react'

interface CustomSwiperProps {
  children: ReactNode
  depth: number
  modifier: number
  rotate: number
  stretch: number
  slideShadows: boolean
  initialSlide: number
  slidesPerView: number
}

const CustomSwiper = ({
  children,
  depth,
  rotate,
  stretch,
  modifier,
  slideShadows,
  slidesPerView,
  initialSlide,
}: CustomSwiperProps) => {
  return (
    <Swiper
      speed={500}
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      initialSlide={initialSlide}
      slidesPerView={slidesPerView}
      coverflowEffect={{
        rotate: rotate,
        stretch: stretch,
        depth: depth,
        modifier: modifier,
        slideShadows: slideShadows,
      }}
      modules={[EffectCoverflow]}
      style={{
        width: '100%',
        paddingTop: '20px',
        paddingBottom: '20px',
      }}
    >
      {Children.map(children, (child) => (
        <SwiperSlide>{child}</SwiperSlide>
      ))}
    </Swiper>
  )
}

export default CustomSwiper
