import { useState, useEffect, useRef } from "react";
import WifiIcon from "@mui/icons-material/Wifi";
import CommonSwiper from "../../../Components/CommonSlider";
import { Star, LocationOnSharp, Restaurant, SmokeFreeSharp } from "@mui/icons-material";
import { CctvIcon } from "lucide-react";
import { useGetHotels } from "../../../ApiHooks/useHotelHook2";
import { useNavigate } from "react-router-dom";

const LazyBackground = ({ src, className, hovered }) => {
  const ref = useRef();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLoaded(true);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        backgroundImage: loaded ? `url(${src})` : "none",
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
      }}
    />
  );
};

export default function SwiperComponent() {
  const [screenInfo, setScreenInfo] = useState({
    width: window.innerWidth,
    isMobile: window.innerWidth <= 768,
    isTablet: window.innerWidth > 768 && window.innerWidth <= 1024,
    isLaptop: window.innerWidth > 1024 && window.innerWidth <= 1440,
    isDesktop: window.innerWidth > 1440,
  });
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenInfo({
        width,
        isMobile: width <= 768,
        isTablet: width > 768 && width <= 1024,
        isLaptop: width > 1024 && width <= 1440,
        isDesktop: width > 1440,
      });
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const features = [
    { label: "Wifi", icon: WifiIcon },
    { label: "No Smoking", icon: SmokeFreeSharp },
    { label: "CCTV", icon: CctvIcon },
    { label: "Restaurant", icon: Restaurant },
  ];

  const navigate = useNavigate();
  const { data: hotels } = useGetHotels();

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${i < fullStars
              ? 'text-yellow-400'
              : (i === fullStars && hasHalfStar)
                ? 'text-yellow-400 opacity-60'
                : 'text-gray-300'}`}
            style={{ fontSize: "16px" }}
          />
        ))}
      </div>
    );
  }; 

  const renderCard = (card, index) => {
    return (
      <>
        {card?.active && (
          <div
            className="relative w-full md:px-4"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {/* Card Image */}
            <div
              className={`relative overflow-hidden rounded-t-lg z-10 transition-all duration-300
                ${screenInfo.isMobile 
                  ? 'h-60' 
                  : screenInfo.isTablet 
                    ? 'h-64' 
                    : 'h-60 lg:h-64 xl:h-60'
                }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => navigate(`hotels/${card?.hotelCode}`)}
            >
              <LazyBackground
                src={card.images[0]?.replace('/upload/', '/upload/f_auto,q_auto,w_800/')}
                hovered={hoveredCard === index}
                className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-all duration-700 ease-in-out"
              />

              <div
                className={`cursor-pointer absolute inset-0 bg-black transition-opacity duration-700 ease-in-out ${
                  hoveredCard === index ? "opacity-20" : "opacity-0"
                }`}
              />
            </div>

            {/* Card Content */}
            <div className={`absolute top-[100%] w-full shadow-lg border rounded-b-lg flex flex-col bg-primary-white
              ${screenInfo.isMobile 
                ? 'p-4 pt-8 h-[180px] gap-2' 
                : screenInfo.isTablet 
                  ? 'p-4 pt-6 h-[170px] gap-1.5' 
                  : 'p-4 pt-8 h-[180px] gap-2'
              }`}>

              {/* Rating */}
              <div className={screenInfo.isMobile ? "mt-1 mb-1" : screenInfo.isTablet ? "mb-1" : "mt-1 mb-1"}>
                {renderRatingStars(card.rating)}
              </div>
              
              {/* Hotel Name */}
              <h2
                onClick={() => navigate(`hotels/${card?.hotelCode}`, { state: { hotelData: card} })}
                className={`cursor-pointer hover:text-primary-green font-bold text-start transition-colors duration-300
                  ${screenInfo.isMobile 
                    ? 'text-mobile/h5/medium md:text-desktop/h5' 
                    : screenInfo.isTablet 
                      ? 'text-lg leading-tight' 
                      : 'text-desktop/h5 xl:text-xl'
                  }`}
              >
                {card.name?.length > (screenInfo.isTablet ? 18 : 20) 
                  ? `${card.name.slice(0, screenInfo.isTablet ? 18 : 20)}...` 
                  : card.name}
              </h2>

              {/* Location */}
              <div className={`flex items-end gap-1 text-[#707070] font-semibold
                ${screenInfo.isMobile 
                  ? 'text-mobile/body/2' 
                  : screenInfo.isTablet 
                    ? 'text-sm' 
                    : 'text-mobile/body/2'
                }`}>
                <LocationOnSharp 
                  className="text-[#4DB8B6]" 
                  style={{ fontSize: "18px" }} 
                />
                <span className={`truncate
                  ${screenInfo.isMobile 
                    ? 'max-w-[200px]' 
                    : screenInfo.isTablet 
                      ? 'max-w-[180px]' 
                      : screenInfo.isLaptop 
                        ? 'max-w-[220px]' 
                        : 'max-w-[280px]'
                  }`}>
                  {card.location?.hotelAddress}
                </span>
              </div>

              {/* Price */}
              <div
                className={`flex items-center ${hotels?.hotels?.length === 3 ? "justify-between" : "justify-end"} gap-3 mt-2 text-[#707070] font-semibold`}
              >
                <span className={screenInfo.isTablet ? "text-sm" : "text-mobile/body/2"}>
                  Starting From
                </span>
                <p className={`font-bold text-[#4DB8B6]
                  ${screenInfo.isTablet ? 'text-lg' : 'text-desktop/body/1'}`}>
                  ₹{card.price}
                </p>
              </div>
            </div>

            {/* Features Badge */}
            <div className={`absolute z-40 flex flex-col items-center gap-[2px] bg-[#4DB8B6] rounded-xl shadow-lg
              ${screenInfo.isMobile 
                ? 'left-[77%] top-[2rem] w-[80px] p-4' 
                : screenInfo.isTablet 
                  ? 'left-[82%] top-[1.5rem] w-[75px] p-3' 
                  : screenInfo.isLaptop 
                    ? 'left-[86%] top-[2rem] w-[80px] p-4' 
                    : 'left-[90%] top-[2rem] w-[80px] p-4'
              }`}>
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center">
                  {feature.icon && (
                    <feature.icon 
                      className="text-primary-white" 
                      style={{ 
                        fontSize: screenInfo.isTablet ? "18px" : "20px" 
                      }}
                    />
                  )}
                  <span className={`text-primary-white text-center
                    ${screenInfo.isTablet 
                      ? 'text-[9px] leading-tight' 
                      : 'text-mobile/small/body'
                    }`}>
                    {feature.label}
                  </span>
                  {index !== features.length - 1 && (
                    <hr className={`w-full h-[1px] bg-primary-white
                      ${screenInfo.isTablet ? 'my-1.5' : 'my-2'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  // Enhanced slides per view calculation
  const getSlidesPerView = () => {
    if (screenInfo.isMobile) return 1;
    if (screenInfo.isTablet) return 2;
    if (screenInfo.isLaptop) return 2.5;
    return 3;
  };

  // Enhanced space between calculation
  const getSpaceBetween = () => {
    if (screenInfo.isMobile) return 20;
    if (screenInfo.isTablet) return 20;
    if (screenInfo.isLaptop) return 25;
    return 30;
  };

  // Dynamic swiper height
  const getSwiperHeight = () => {
    if (screenInfo.isMobile) return 'h-[28rem]';
    if (screenInfo.isTablet) return 'h-[27rem]';
    return 'h-[28rem]';
  };

  return (
    <div className="swiper-container sec2Swiper pb-5">
      <CommonSwiper
        items={hotels?.hotels}
        renderItem={renderCard}
        slidesPerViewDesktop={getSlidesPerView()}
        spaceBetween={getSpaceBetween()}
        loop={true}
        className={`mySwiper hotelCardsHome pb-10`}
        swiperh={getSwiperHeight()}
        cssMode={true}
        breakpoints={{
          // Mobile breakpoints
          320: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // Tablet breakpoints (including 1024)
          768: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          // Laptop breakpoints
          1200: {
            slidesPerView: 2.5,
            spaceBetween: 25,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          // Large desktop
          1920: {
            slidesPerView: 3,
            spaceBetween: 35,
          },
        }}
        onInit={(swiper) => {
          const wrapper = swiper.wrapperEl;
          if (hotels?.hotels?.length === 3) {
            wrapper.setAttribute('data-cards', '3');
          }
        }}
      />
    </div>
  );
}
