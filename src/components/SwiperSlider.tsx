import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { motion } from "framer-motion";

const SwiperSlider: React.FC = () => {
  SwiperCore.use([Autoplay]);
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      variants={{
        visible: { opacity: 1, scale: 1, translateY: 0 },
        hidden: { opacity: 0, scale: 1, translateY: 22 },
      }}
      className="relative mb-[54px] mt-[6px] flex h-[220px] w-[280px] flex-col items-center justify-center overflow-clip rounded-2xl shadow-md shadow-[#999] dark:shadow-[#111]"
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2000 }}
        pagination={{ clickable: true }}
        slidesPerView={1}
        loop={true}
        grabCursor={true}
        className="flex h-[220px] w-[280px] flex-col"
      >
        <SwiperSlide>
          <div className="flex flex-col">
            <Image
              className="flex object-contain"
              src="/../public/Pieza.png"
              alt="Pieza"
              height={280}
              width={280}
            />
          </div>
          <div className="absolute bottom-0 z-10 flex h-1/2 w-full bg-gradient-to-b from-transparent to-black"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col">
            <Image
              className="flex object-contain"
              src="/../public/Living.png"
              alt="Living"
              height={280}
              width={280}
            />
          </div>
          <div className="absolute bottom-0 z-10 flex h-1/2 w-full bg-gradient-to-b from-transparent to-black"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col">
            <Image
              className="flex object-contain"
              src="/../public/Baño.png"
              alt="Baño"
              height={280}
              width={280}
            />
          </div>
          <div className="absolute bottom-0 z-10 flex h-1/2 w-full bg-gradient-to-b from-transparent to-black"></div>
        </SwiperSlide>
      </Swiper>
    </motion.div>
  );
};

export default SwiperSlider;
