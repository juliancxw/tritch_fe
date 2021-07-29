import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation]);

function LandingPage() {
  const travelDestinations = [];

  useEffect(() => {
    // make an API call to Roadgoat?
  });

  for (let i = 0; i < 99; i++) {
    travelDestinations.push(
      <SwiperSlide key={`slide-${i}`}>
        <img src={`https://picsum.photos/id/${i + 1}/500/500`} />
      </SwiperSlide>
    );
  }

  return (
    <div className="landing-page">
      <div className="hook">
        <Typography variant="h3">Travel Itch?</Typography>
        <Typography variant="subtitle1">
          Plan your travels with TRITCH!
        </Typography>
      </div>
      <React.Fragment>
        <Swiper
          breakpoints={{
            640: {
              width: 640,
              slidesPerView: 1,
            },
            768: {
              width: 768,
              slidesPerView: 2,
            },
            1280: {
              width: 1280,
              slidesPerView: 3,
            },
            2560: {
              width: 2560,
              slidesPerView: 6,
            },
          }}
          id="swiper-main"
          navigation
        >
          {travelDestinations}
        </Swiper>
      </React.Fragment>
    </div>
  );
}

export default withRouter(LandingPage);
