/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Keyboard, Autoplay } from "swiper/modules";
import Icon from "./Icons";

const CommonSwiper = ({
  items,
  renderItem,
  spaceBetween = 30,
  loop = true,
  className = "",
  slidesPerViewDesktop = 3 // new prop with default value
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [isFirstSlide, setIsFirstSlide] = useState(false);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  const handleSlideChange = (swiper) => {
    setIsFirstSlide(swiper.isBeginning);
    setIsLastSlide(swiper.isEnd);
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop(); // Always stop autoplay first
      if (isMobile) {
        swiperRef.current.params.autoplay = {
          delay: 3000,
          disableOnInteraction: false
        };
        swiperRef.current.autoplay.start(); // Then start if mobile
      }
    }
  }, [isMobile]); // React on isMobile state

  return (
    <div className={`swiper-container  ${className}`}>
      <Swiper
        cssMode={false}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        speed={500}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        mousewheel={true}
        keyboard={true}
        pagination={isMobile ? { clickable: true } : false}
        modules={[Navigation, Pagination, Keyboard, Autoplay]}
        slidesPerView={isMobile ? 1 : slidesPerViewDesktop} // Use the new prop
        spaceBetween={spaceBetween}
        loop={loop}
        className="mySwiper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
      >
        {items?.map((item, index) => (
          <SwiperSlide key={index}>{renderItem(item, index)}</SwiperSlide>
        ))}
      </Swiper>

      <div className="hidden justify-end gap-8 px-10 pt-8 lg:flex">
        <button
          ref={prevRef}
          className={`p-4 rounded-full custom-prev-button flex ${isFirstSlide ? "bg-gray-300 disabled" : "bg-[#FDC114]"}`}
          disabled={isFirstSlide}
        >
          {/* <img
            src="/images/HomepageImages/leftIcon.svg"
            className="h-6 w-6"
            alt="Previous"
          /> */}
          <Icon name="leftIcon" className="h-6 w-6" />

        </button>
        <button
          ref={nextRef}
          className={`p-4 rounded-full custom-next-button flex ${isLastSlide ? "bg-gray-300 disabled" : "bg-[#FDC114]"}`}
          disabled={isLastSlide}
        >
          {/* <img
            src="/images/HomepageImages/rightIcon.svg"
            className="h-6 w-6" 
            alt="Next"
          /> */}
          <Icon name="rightIcon" className="h-6 w-6" />

        </button>
      </div>
    </div>
  );
};

export default CommonSwiper;
