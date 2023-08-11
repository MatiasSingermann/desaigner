import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";

const SwiperSlider: React.FC = () => {
  SwiperCore.use([Autoplay]);
  return (
    <div className="relative flex h-[220px] w-[280px] flex-col items-center justify-center overflow-clip rounded-2xl object-scale-down">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2000 }}
        pagination={{ clickable: true }}
        slidesPerView={1}
        className="flex h-[512px] w-[512px] flex-col"
      >
        <SwiperSlide>
          <Image
            className="object-contain"
            src="/../public/Pieza.png"
            alt="Pieza"
            height={280}
            width={280}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="object-contain"
            src="/../public/Living.png"
            alt="Living"
            height={280}
            width={280}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="object-contain"
            src="/../public/Baño.png"
            alt="Baño"
            height={280}
            width={280}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
