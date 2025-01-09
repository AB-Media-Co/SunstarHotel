/* eslint-disable react/prop-types */
import { InstagramEmbed } from 'react-social-media-embed';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Instagram } from '@mui/icons-material';

const StayInTheLoop = ({ theme = 'light' }) => {
    const isDarkTheme = theme === 'dark';

    return (
        <div className={`${isDarkTheme ? 'bg-[#0A0C08]' : 'bg-white'}`}>
            <div className={`content flex font-markot flex-col justify-between px-[16px] md:px-0 pt-[60px] pb-[20px] `}>
                <div className="flex justify-between flex-col md:flex-row">
                    <h3 className={`text-mobile/h4 md:text-desktop/h4 ${isDarkTheme ? 'text-white' : 'text-black'}`}>
                        <Instagram className='text-[#43AFAD] mr-2 ' style={{fontSize:"36px"}}/>
                        @sunstarhotel on Instagram!
                    </h3>
                    <a href="#" target='_blank' className={`flex items-center justify-center border-white border w-[200px] md:w-[350px] text-white font-semibold p-2 md:px-4 mt-3 md:mt-0 rounded-full mt shadow-md hover:shadow-lg transition duration-300`}>
                        <span className={`uppercase text-mobile/button md:text-desktop/button ${isDarkTheme ? 'text-white' : 'text-black'}`}>Follow us on Instagram</span>
                        <svg
                            className="ml-2 w-4 h-4 text-red-500"
                            fill="none"
                            stroke="red"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
                <Swiper
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        }
                    }}
                    slidesPerView={1}
                    spaceBetween={100}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        waitForTransition: 500
                    }}
                    loop
                    modules={[Pagination, Autoplay]}
                    // onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                    className="max-h-screen w-full mt-6 "
                >
                    <SwiperSlide>
                        <div className="flex items-center justify-center">
                            <InstagramEmbed url="#" className='md:w-[300px] lg:w-[350px]' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex items-center justify-center">
                            <InstagramEmbed url="#" className='md:w-[300px] lg:w-[350px]' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex items-center justify-center">
                            <InstagramEmbed url="#" className='md:w-[300px] lg:w-[350px]' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex items-center justify-center">
                            <InstagramEmbed url="#" className='md:w-[300px] lg:w-[350px]' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex items-center justify-center">
                            <InstagramEmbed url="#" className='md:w-[300px] lg:w-[350px]' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex items-center justify-center">
                            <InstagramEmbed url="#" className='md:w-[300px] lg:w-[350px]' />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default StayInTheLoop;
