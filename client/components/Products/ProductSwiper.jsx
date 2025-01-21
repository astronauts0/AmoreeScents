"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Navigation, Autoplay,Pagination } from "swiper/modules";

import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function ProductSwiper({ images }) {
  return (
    <Swiper
      effect={"creative"}
      pagination={true}
      navigation={true}
      autoplay={{
        delay: 10000,
        disableOnInteraction: true,
      }}
      grabCursor={true}
      slidesPerView={1}
      loop={true}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -800],
          rotate: [180, 0, 0],
        },
        next: {
          shadow: true,
          translate: [0, 0, -800],
          rotate: [-180, 0, 0],
        },
      }}
      modules={[EffectCreative, Navigation, Autoplay, Pagination]}
      className="mySwiper cursor-zoom-in"
    >
      {images.map((image, i) => (
        <SwiperSlide key={i}>
          <InnerImageZoom
            className="object-cover"
            src={image?.url}
            zoomSrc={image?.url}
            width={750}
            height={750}
            hasSpacer={true}
            zoomType="hover"
            fullscreenOnMobile={true}
            zoomPreload={true}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
