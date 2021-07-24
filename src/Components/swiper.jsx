import React from "react";
import { withRouter } from "react-router-dom";

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

function SwiperComponent() {
  const slides = [];

  for (let i = 0; i < 9; i++) {
    slides.push(
      <SwiperSlide key={`slide-${i}`}>
        <img src="" />
      </SwiperSlide>
    );
  }
  return (
    <React.Fragment>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        ...
      </Swiper>
    </React.Fragment>
  );
}

export default withRouter(SwiperComponent);
