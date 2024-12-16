import { useRef, useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Import required modules
import { Navigation, Pagination, Keyboard, Autoplay } from "swiper/modules";

import WifiIcon from "@mui/icons-material/Wifi";
import PersonIcon from "@mui/icons-material/Person";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import CommonButton from "../../../Components/CommonButton";
import Icon from "../../../Components/Icons";

export default function SwiperComponent() {
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
    return () => window.removeEventListener('resize', handleResize); // Clean up
  }, []);

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
  }, [isMobile]); // React on isMobile state change
  

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


  const cards = [
    {
      img: "/images/HomepageImages/cardImg1.png",
      text: "Deluxe Room",
      description: "A deluxe room with modern amenities and great views.",
      rating: 4.5,
      reviews: 320,
      link: "#",
      linkText: "View Details >",
    },
    {
      img: "/images/HomepageImages/cardImg1.png",
      text: "Executive Suite",
      description: "Experience luxury in our executive suite.",
      rating: 4.8,
      reviews: 200,
      link: "#",
      linkText: "View Details >",
    },
    {
      img: "/images/HomepageImages/cardImg1.png",
      text: "Standard Room",
      description: "A cozy and budget-friendly option for travelers.",
      rating: 4.2,
      reviews: 180,
      link: "#",
      linkText: "View Details >",
    },
    {
      img: "/images/HomepageImages/cardImg1.png",
      text: "Standard Room",
      description: "A cozy and budget-friendly option for travelers.",
      rating: 4.2,
      reviews: 180,
      link: "#",
      linkText: "View Details >",
    },
  ];

  const features = [
    { label: "Wifi", icon: WifiIcon },
    { label: "Occupancy", icon: PersonIcon },
    { label: "Tea / Coffee", icon: LocalCafeIcon },
    { label: "Rooms Left", icon: null, value: 4 },
  ];




  return (
    <div className="swiper-container  pb-10 md:w-[850px]">
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
        modules={[Navigation, Pagination, Keyboard,Autoplay ]}
        slidesPerView={isMobile ? 1 : 2.5}
        spaceBetween={30}
        loop={true} // Enables infinite looping
        className="mySwiper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange} // Detect slide change
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index} >
            <div className="md:max-w-sm border shadow-lg rounded-lg relative">
              {/* Image Section */}
              <div
                className="h-60 bg-cover bg-center rounded-t-lg"
                style={{
                  backgroundImage: `url(${card.img})`,
                }}
              ></div>

              {/* Content Section */}
              <div className="p-4 h-[180px] w-sm text-left flex flex-col justify-between">
                <h2 className="text-xl font-bold">{card.text}</h2>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <span>{card.rating}</span>
                  <span className="text-sm text-gray-500">
                    ({card.reviews} Google reviews)
                  </span>
                </div>
                <p className="text-sm mt-2 w-[230px] md:w-[250px]">
                  {card.description.split(" ").length > 50
                    ? `${card.description.split(" ").slice(0, 50).join(" ")}...`
                    : card.description}
                </p>
                <a
                  href={card.link}
                  className="text-black font-semibold mt-2 inline-block"
                >
                  {card.linkText}
                </a>
              </div>

              {/* Features Section */}
              <div className="absolute top-[5rem] left-[14rem] md:left-[16rem] w-[91px] shadow-lg gap-[24px] justify-between items-center bg-[#4DB8B6] p-4 rounded-xl flex flex-col">
                {features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex flex-col items-center "
                  >
                    {feature.icon && <feature.icon className="text-white" />}
                    {feature.value && (
                      <span className="text-xl font-bold text-white ">
                        {feature.value}
                      </span>
                    )}
                    <span className="text-[10px] text-white ">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Book Now Button */}
              <CommonButton/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hidden justify-end gap-8 px-10 pe-[11rem] pt-8  lg:flex">
        <button
          ref={prevRef}
          className={`p-4 rounded-full custom-prev-button flex ${isFirstSlide ? "bg-gray-300 disabled" : "bg-[#FDC114]"
            }`}
          disabled={isFirstSlide}
        >
          <Icon name="leftIcon" className="h-6 w-6" />
        </button>
        <button
          ref={nextRef}
          className={`p-4 rounded-full custom-next-button flex ${isLastSlide ? "" : "bg-[#FDC114]"
            }`}
          disabled={isLastSlide}
        >
          <Icon name="rightIcon" className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
