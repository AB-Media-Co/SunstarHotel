/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Navigation, Pagination, Keyboard, Autoplay, EffectFade } from "swiper/modules";
import Icon from "./Icons";

const CommonSwiper = ({
  items = [],
  renderItem,
  spaceBetween = 30,
  loop = true,
  className = "",
  slidesPerViewDesktop = 3,
  slidesPerViewTablet = 2,
  arrow = '',
  autoplayDelay = 3000,
  enableAutoplay = true,
  speed = 500,
  effect = 'slide', // 'slide' or 'fade'
  showPagination = true,
  swiperh = "",
  breakpoints,
  onSlideChange,
  allowTouchMove = true,
  centeredSlides = false,
  customNavigation = false, // If user wants to control navigation externally
  initialSlide = 0
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [shouldShowNavigation, setShouldShowNavigation] = useState(true);

  // Default breakpoints if not provided - memoized
  const defaultBreakpoints = useMemo(() => ({
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: slidesPerViewTablet,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: slidesPerViewDesktop,
      spaceBetween: spaceBetween,
    }
  }), [slidesPerViewTablet, slidesPerViewDesktop, spaceBetween]);

  // Determine if mobile based on viewport width
  const isMobile = viewportWidth <= 768;
  
  // Calculate if navigation should be shown based on items length and visible slides
  useEffect(() => {
    const getCurrentSlidesPerView = () => {
      if (viewportWidth < 768) return 1;
      if (viewportWidth < 1024) return slidesPerViewTablet;
      return slidesPerViewDesktop;
    };
    
    const currentSlidesPerView = getCurrentSlidesPerView();
    // Only show navigation if there are more items than can be displayed at once
    setShouldShowNavigation(items.length > currentSlidesPerView);
  }, [items.length, slidesPerViewDesktop, slidesPerViewTablet, viewportWidth]);

  // Handle window resize with debounce - optimized
  useEffect(() => {
    let resizeTimer;
    
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setViewportWidth(window.innerWidth);
      }, 200); // Increased debounce for better performance
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Initialize navigation when component mounts
  useEffect(() => {
    if (swiperRef.current && !customNavigation) {
      setTimeout(() => {
        swiperRef.current.params.navigation.prevEl = prevRef.current;
        swiperRef.current.params.navigation.nextEl = nextRef.current;
        swiperRef.current.navigation.init();
        swiperRef.current.navigation.update();
      });
    }
  }, [customNavigation]);

  // Handle slide change
  const handleSlideChangeInternal = useCallback((swiper) => {
    // Check if it's actually a different slide to avoid unnecessary state updates
    const newIsFirstSlide = swiper.isBeginning;
    const newIsLastSlide = swiper.isEnd;
    const newCurrentSlide = swiper.realIndex;
    
    if (isFirstSlide !== newIsFirstSlide) setIsFirstSlide(newIsFirstSlide);
    if (isLastSlide !== newIsLastSlide) setIsLastSlide(newIsLastSlide);
    if (currentSlide !== newCurrentSlide) setCurrentSlide(newCurrentSlide);
    
    // Call external onSlideChange if provided
    if (onSlideChange) onSlideChange(swiper);
  }, [isFirstSlide, isLastSlide, currentSlide, onSlideChange]);

  // Navigation handler with improved loop logic
  const handleNavigationClick = useCallback((direction) => {
    if (isNavigating || !swiperRef.current) return;

    setIsNavigating(true);
    
    if (direction === "prev") {
      swiperRef.current.slidePrev();
    } else if (direction === "next") {
      swiperRef.current.slideNext();
    }
  }, [isNavigating]);

  // Set total slides when swiper initializes
  const handleSwiperInit = (swiper) => {
    swiperRef.current = swiper;
    setTotalSlides(swiper.slides.length);
    setIsFirstSlide(swiper.isBeginning);
    setIsLastSlide(swiper.isEnd);
  };

  // Manage transitions
  useEffect(() => {
    if (swiperRef.current) {
      const swiper = swiperRef.current;

      const handleTransitionStart = () => setIsNavigating(true);
      const handleTransitionEnd = () => setIsNavigating(false);

      swiper.on("transitionStart", handleTransitionStart);
      swiper.on("transitionEnd", handleTransitionEnd);

      return () => {
        swiper.off("transitionStart", handleTransitionStart);
        swiper.off("transitionEnd", handleTransitionEnd);
      };
    }
  }, []);

  // Handle autoplay based on viewport
  useEffect(() => {
    if (swiperRef.current && enableAutoplay) {
      swiperRef.current.autoplay.stop();
      
      if (isMobile) {
        swiperRef.current.params.autoplay = {
          delay: autoplayDelay,
          disableOnInteraction: false,
        };
        swiperRef.current.autoplay.start();
      }
    }
  }, [isMobile, autoplayDelay, enableAutoplay]);

  // Ensure items exist before rendering
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`swiper-container relative ${className}`}>
      <Swiper
        cssMode={false}
        navigation={
          !customNavigation && shouldShowNavigation
            ? {
                prevEl: prevRef.current,
                nextEl: nextRef.current,
                disabledClass: "cursor-not-allowed opacity-50",
              }
            : false
        }
        speed={speed}
        autoplay={
          enableAutoplay
            ? {
                delay: autoplayDelay,
                disableOnInteraction: false,
              }
            : false
        }
        effect={effect}
        mousewheel={true}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        lazy={{
          loadPrevNext: true,
          loadPrevNextAmount: 2,
        }}
        watchSlidesProgress={true}
        preloadImages={false}
        pagination={
          showPagination && (isMobile || !shouldShowNavigation)
            ? { 
                clickable: true,
                dynamicBullets: items.length > 5,
              }
            : false
        }
        modules={[Navigation, Pagination, Keyboard, Autoplay, EffectFade]}
        breakpoints={breakpoints || defaultBreakpoints}
        spaceBetween={spaceBetween}
        loop={loop && shouldShowNavigation}
        className={`mySwiper ${swiperh}`}
        onSwiper={handleSwiperInit}
        onSlideChange={handleSlideChangeInternal}
        allowTouchMove={allowTouchMove}
        centeredSlides={centeredSlides}
        initialSlide={initialSlide}
        observer={true}
        observeParents={true}
        resizeObserver={true}
      >
        {items?.map((item, index) => (
          <SwiperSlide className="md:p-2 " key={index}>
            {renderItem(item, index, currentSlide === index)}
          </SwiperSlide>
        ))}
      </Swiper>

      {!customNavigation && shouldShowNavigation && (
        <div className={`hidden justify-end gap-8 lg:flex ${arrow}`}>
          <button
            ref={prevRef}
            className={`p-4 rounded-full custom-prev-button flex transition-all ${
              isFirstSlide && !loop
                ? "bg-gray-300 disabled cursor-not-allowed"
                : "bg-primary-yellow hover:bg-primary-yellow/90"
            }`}
            onClick={() => handleNavigationClick("prev")}
            disabled={(isFirstSlide && !loop) || isNavigating}
            aria-label="Previous slide"
          >
            <Icon name="leftIcon" className="h-6 w-6" />
          </button>

          <button
            ref={nextRef}
            className={`p-4 rounded-full custom-next-button flex transition-all ${
              isLastSlide && !loop
                ? "bg-gray-300 disabled cursor-not-allowed"
                : "bg-primary-yellow hover:bg-primary-yellow/90"
            }`}
            onClick={() => handleNavigationClick("next")}
            disabled={(isLastSlide && !loop) || isNavigating}
            aria-label="Next slide"
          >
            <Icon name="rightIcon" className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CommonSwiper;