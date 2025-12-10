import { useState, useEffect, useRef, useCallback } from "react";
import WifiIcon from "@mui/icons-material/Wifi";
import CommonSwiper from "../../../Components/CommonSlider";
import { LocationOnSharp, Restaurant, SmokeFreeSharp, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { CctvIcon } from "lucide-react";
import { useGetHotels } from "../../../ApiHooks/useHotelHook2";
import { useNavigate } from "react-router-dom";
import { generateHotelUrl } from "../../../utils/urlHelper";
import { formatHotelAddress } from "../../../utils/addressFormatter";

/* eslint-disable react/prop-types */

// Image Carousel Component
const ImageCarousel = ({ images, cardIndex, hoveredCard }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isHovered = hoveredCard === cardIndex;

  const carouselImages = images?.imageSections?.carouselImages || images?.images || [];

  if (carouselImages.length === 0) return null;

  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative w-full h-full">
      {/* Images with smooth fade transition */}
      <div className="absolute inset-0 overflow-hidden">
        {carouselImages.map((img, idx) => (
          <img
            key={idx}
            src={img?.replace('/upload/', '/upload/f_auto,q_auto,w_800/')}
            alt={`Hotel carousel ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>

      {/* Hover Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-700 ease-in-out z-5 ${isHovered ? "opacity-20" : "opacity-0"
          }`}
      />

      {/* Navigation Arrows - Show only on hover and if multiple images */}
      {carouselImages.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${isHovered ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <ChevronLeft style={{ fontSize: "18px" }} />
          </button>

          <button
            onClick={goToNext}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${isHovered ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <ChevronRight style={{ fontSize: "18px" }} />
          </button>



          {/* Dot Indicators */}
          {carouselImages.length > 1 && (
            <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 transition-opacity duration-300 z-10`}>
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`h-1 rounded-full transition-all duration-300 ${currentImageIndex === index
                    ? 'bg-primary-green w-6'
                    : 'bg-white/60 w-4 hover:bg-white'
                    }`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
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
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setScreenInfo({
          width,
          isMobile: width <= 425,
          isTablet: width > 425 && width <= 768,
          isLaptop: width > 768 && width <= 1024,
          isDesktop: width > 1024,
        });
      }, 200);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();
  const { data: hotels } = useGetHotels();

  const features = useRef([
    { label: "Wifi", icon: WifiIcon },
    { label: "No Smoking", icon: SmokeFreeSharp },
    { label: "CCTV", icon: CctvIcon },
    { label: "Restaurant", icon: Restaurant },
  ]).current;

  const renderTripAdvisorBadge = useCallback((rating) => {
    const numericRating = Number(rating) || 0;
    const ratingText = numericRating > 0 ? `${numericRating.toFixed(1)}` : "Guest favorite";

    return (
      <div className="flex items-center gap-2  px-3 py-1 w-fit">
        <img
          src="/images/tripadvisor-logo.svg"
          alt="Tripadvisor rating"
          className="h-4 w-auto"
          loading="lazy"
        />
        <span className="text-xs font-semibold text-gray-900">{ratingText}</span>

      </div>
    );
  }, []);

  const renderCard = useCallback((card, index) => {
    return (
      <>
        {card?.active && (
          <div
            className="relative w-full md:px-4"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {/* Card Image with Carousel */}
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
              onClick={() => navigate(generateHotelUrl(card?.hotelCode, card?.name))}
            >
              <ImageCarousel
                images={card}
                cardIndex={index}
                hoveredCard={hoveredCard}
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

              <div className="flex justify-between items-center">

                {/* Hotel Name */}
                <h2
                  onClick={() => navigate(generateHotelUrl(card?.hotelCode, card?.name))}
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

                {/* Rating / Tripadvisor */}
                <div className={screenInfo.isMobile ? "mb-1" : screenInfo.isTablet ? "mb-1" : " mb-1"}>
                  {renderTripAdvisorBadge(card.rating)}
                </div>


              </div>

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
                  {formatHotelAddress(card.location?.hotelAddress)}
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
              {features.map((feature, idx) => (
                <div key={idx} className="flex flex-col items-center">
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
                  {idx !== features.length - 1 && (
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
  }, [screenInfo, hoveredCard, navigate, renderTripAdvisorBadge, features, hotels?.hotels?.length]);

  const getSlidesPerView = () => {
    if (screenInfo.isMobile) return 1;
    if (screenInfo.isTablet) return 2;
    if (screenInfo.isLaptop) return 2;
    return 3;
  };

  const getSpaceBetween = () => {
    if (screenInfo.isMobile) return 20;
    if (screenInfo.isTablet) return 20;
    if (screenInfo.isLaptop) return 25;
    return 30;
  };

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
          320: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
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
          1200: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
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