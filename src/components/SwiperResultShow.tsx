import Image from "next/image";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/effect-cards';
import { EffectCards } from "swiper/modules";
import { Dispatch, SetStateAction } from "react";

interface SwiperResultShowProps {
  imageURL1 : string;
  imageURL2 : string;
  imageURL3 : string;
  imageURL4 : string;
  setSelectedImage : Dispatch<SetStateAction<undefined>>;
}

function SwiperResultShow({
  imageURL1,
  imageURL2,
  imageURL3,
  imageURL4,
  setSelectedImage,
}: SwiperResultShowProps) {
    const handleSlideChange = (swiper: SwiperClass) => {
          const activeIndex = swiper.activeIndex;
          setSelectedImage(activeIndex);
      };
  return (
    <div className="my-[30px] flex h-[220px] w-[320px] flex-col items-center justify-center rounded-2xl shadow-md shadow-[#999] dark:shadow-[#111]">
      <Swiper
        onSlideChange={handleSlideChange}
        effect={"cards"}
        modules={[Pagination, EffectCards]}
        pagination={{ clickable: true }}
        slidesPerView={1}
        grabCursor={true}
        className="flex h-full w-full flex-col rounded-2xl"
      >
        <SwiperSlide>
          <div className="flex flex-col rounded-2xl items-center justify-center">
            <Image
              className="flex rounded-2xl object-scale-down"
              src={imageURL1}
              alt="Resultado 1"
              height={220}
              width={220}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col rounded-2xl items-center justify-center">
            <Image
              className="flex rounded-2xl object-scale-down"
              src={imageURL2}
              alt="Resultado 2"
              height={220}
              width={220}
            />
          </div>
        </SwiperSlide>
        {imageURL3 ? (
          <SwiperSlide>
            <div className="flex flex-col rounded-2xl items-center justify-center">
              <Image
                className="flex rounded-2xl object-scale-down"
                src={imageURL3}
                alt="Resultado 3"
                height={220}
                width={220}
              />
            </div>
          </SwiperSlide>
        ) : null}
        {imageURL4 ? (
          <SwiperSlide>
            <div className="flex flex-col rounded-2xl items-center justify-center">
              <Image
                className="flex rounded-2xl object-scale-down"
                src={imageURL4}
                alt="Resultado 4"
                height={220}
                width={220}
              />
            </div>
          </SwiperSlide>
        ) : null}
      </Swiper>
    </div>
  );
}

export default SwiperResultShow;
