"use client";

interface SliderLayoutProp {
  children: React.ReactNode;
  avatar: React.ReactNode;
  card: React.ReactNode;
  experience: React.ReactNode;
  projects: React.ReactNode;
  skills: React.ReactNode;
}

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function SliderLayout({
  children,
  avatar,
  card,
  experience,
  projects,
  skills,
}: SliderLayoutProp) {
  return (
    <div className="relative dark:text-white text-black h-full">
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="h-full"
      >
        <SwiperSlide>{avatar}</SwiperSlide>
        <SwiperSlide>{card}</SwiperSlide>
        <SwiperSlide>{experience}</SwiperSlide>
        <SwiperSlide>{projects}</SwiperSlide>
        <SwiperSlide>{skills}</SwiperSlide>
      </Swiper>

      {children}
    </div>
  );
}
