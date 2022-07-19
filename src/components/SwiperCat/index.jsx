import React from 'react';

import SwiperCore, { Scrollbar, Mousewheel } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/mousewheel';
SwiperCore.use([Mousewheel, Scrollbar]);
function SwiperCat() {
  const smiles = ['😈', '👺', '😇', '😇', '😎', '🙃'];
  return (
    <div>
      <Swiper
        // install Swiper modules
        spaceBetween={10}
        slidesPerView={5}
        mousewheel={true}
        scrollbar={{ draggable: true }}
        style={{ maxWidth: '500px' }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}>
        {smiles.map((smile) => (
          <SwiperSlide>
            <div className='flex justify-center cursor-pointer items-center h-[64px] w-[64px] text-[40px] text-center bg-[#37c2f4] rounded-full border-solid border-4 border-[#37379a] hover:bg-reg-color ease-in-out duration-200'>
              {smile}
            </div>
          </SwiperSlide>
        ))}
        ...
      </Swiper>
    </div>
  );
}

export default SwiperCat;
