import React from 'react';

import SwiperCore, { Scrollbar, Mousewheel } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/mousewheel';
SwiperCore.use([Mousewheel, Scrollbar]);
function SwiperCat({ categories, setChoosedCategory }) {
  // const categories = ['😈', '👺', '😇', '😇', '😎', '🙃'];
  return (
    <div>
      <Swiper
        spaceBetween={10}
        slidesPerView={5}
        mousewheel={true}
        scrollbar={{ draggable: true }}
        style={{
          maxWidth: '500px',
          height: '90px',
          marginLeft: '0px',
          marginRight: '0px',
        }}
        onSlideChange={() => console.log('slide change')}>
        {categories.map((category, index) => (
          <SwiperSlide>
            <div
              key={index}
              className='flex justify-center cursor-pointer items-center h-[64px] w-[64px] text-[40px] text-center bg-[#37c2f4] rounded-full border-solid border-2 border-[#37379a] hover:bg-reg-color hover:border-4 ease-in-out relative duration-100'
              onClick={() => setChoosedCategory(category)}>
              {category.icon}
              <p className='text-xs absolute bottom-[-18px] m-0'>
                {category.category_name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperCat;
