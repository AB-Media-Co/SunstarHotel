/* eslint-disable react/prop-types */
import React, { useEffect, useState, Suspense, useMemo, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AllHotelCard from "../../../Components/AllHotelCard";
import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook";
import { motion } from "framer-motion";
import CityPagesOptions from "../../Citypage/CityPagesOptions";

const useProgressiveImage = (src, placeholderSrc) => {
  const [sourceLoaded, setSourceLoaded] = useState(placeholderSrc);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setSourceLoaded(src);
      setIsLoaded(true);
    };
    return () => {
      img.onload = null;
    };
  }, [src]);

  return { sourceLoaded, isLoaded };
};

const Section1 = ({ section1Data }) => {
  const { heroSectionUpdate, loading, Loader } = useUpdatePagesHook();
  const { words = [], buttonLabel = "Search for" } = section1Data || {};
  const [isOpen, setIsOpen] = useState(false);

  const [index, setIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [delay, setDelay] = useState(false);
  const [hotelOpen, setHotelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 250);
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  const DESKTOP_IMAGE = "/images/HomepageImages/Section1Main.webp";
  const MOBILE_IMAGE = "/images/HomepageImages/mobileHeroSec.webp";

  // Progressive image loading
  const { sourceLoaded: bgImage, isLoaded: bgLoaded } = useProgressiveImage(
    DESKTOP_IMAGE,
    "/images/HomepageImages/Section1Main-placeholder.webp" // Use actual low-res placeholder
  );

  const { sourceLoaded: bgImageMobile, isLoaded: bgLoadedMobile } = useProgressiveImage(
    MOBILE_IMAGE,
    "/images/HomepageImages/mobileHeroSec-placeholder.webp" // Use actual low-res placeholder
  );

  // Memoize background style to prevent rerenders
  const backgroundStyle = useMemo(() => ({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${
      isMobile ? bgImageMobile : bgImage
    })`,
  }), [isMobile, bgImageMobile, bgImage]);

  // Memoize heading and description
  const heading = useMemo(() => heroSectionUpdate?.heading || "", [heroSectionUpdate?.heading]);
  const description = useMemo(() => heroSectionUpdate?.description || "", [heroSectionUpdate?.description]);

  // Optimize typing animation with useCallback
  useEffect(() => {
    if (!words.length) return;
    
    if (delay) {
      const delayTimer = setTimeout(() => setDelay(false), 1000);
      return () => clearTimeout(delayTimer);
    }

    const type = () => {
      const word = words[index] || "";
      if (isDeleting) {
        setCurrentWord((prev) => prev.slice(0, -1));
        if (currentWord === "") {
          setIsDeleting(false);
          setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      } else {
        setCurrentWord(word.slice(0, currentWord.length + 1));
        if (currentWord === word) {
          setIsDeleting(true);
          setDelay(true);
        }
      }
    };

    const typingSpeed = isDeleting ? 50 : 100;
    const timer = setTimeout(type, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentWord, isDeleting, index, words, delay]);

  // Handle hotel click with useCallback to prevent recreating function
  const handleHotelOpen = useCallback(() => setHotelOpen(true), []);
  const handleHotelClose = useCallback(() => setHotelOpen(false), []);

  if (loading) {
    return <Loader />;
  }



  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);



  return (
    <div className="overflow-hidden md:overflow-visible">
      <Suspense fallback={<div className="w-full h-screen bg-gray-200 animate-pulse" />}>
        {/* Reserve exact space for hero section to prevent layout shifts */}
        <div className="relative w-full h-screen">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: (isMobile ? bgLoadedMobile : bgLoaded) ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 z-10 bg-no-repeat bg-cover bg-center"
            style={backgroundStyle}
            aria-label="Hero background image"
          >
            {/* Decorative element */}
            <div
              className="md:z-10 absolute left-[20%] md:left-auto md:right-16 top-[33rem] md:top-[30rem] 
                       w-[300px] h-[300px] animate-spin-slow 
                       bg-no-repeat bg-contain"
              style={{
                backgroundImage: `url("/images/HomepageImages/round.png")`
              }}
              aria-hidden="true"
            />

            {/* Hero content with fixed dimensions */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute top-[60%] left-[5%] sm:top-[63%] sm:left-[53%] md:top-[45%] md:left-[10%] 
                         flex flex-col md:gap-4 text-left text-primary-white 
                         max-w-[90%] sm:max-w-[80%] md:max-w-7xl"
            >
              <h1 className="text-mobile/h1 sm:text-5xl md:text-desktop/large/h text-reveal-animation">
                {heading}
              </h1>
              <p className="text-mobile/body/2 md:text-desktop/body/1 md:max-w-[53%] animation-on-scroll-Section1">
                {description}
              </p>

              {/* Search button with fixed height to prevent layout shifts */}
              <div
                onClick={handleHotelOpen}
                className="mt-6 flex justify-between items-center lg:w-[490px] h-12 md:h-16
                         font-semibold cursor-pointer bg-primary-white 
                         rounded-full py-2 md:py-4 px-7 hover:bg-gray-50 transition-colors"
              >
                <div className="flex gap-2 items-center animation-on-scroll-Section1">
                  <p className="text-mobile/button md:text-desktop/button text-gray-600">
                    {buttonLabel}
                  </p>
                  <p className="text-mobile/button md:text-desktop/button text-[#FDC114] 
                              whitespace-nowrap min-w-[100px]">
                    {currentWord}
                  </p>
                </div>
                <div className="text-[#FDC114]">
                  <SearchIcon />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Suspense>


      {/* <div>
        <button onClick={handleOpen}>Open City Selection</button>

      </div> */}
        {/* <CityPagesOptions isOpen={isOpen} onClose={handleClose} /> */}

      {hotelOpen && (
        <AllHotelCard
          isOpen={hotelOpen}
          onClose={handleHotelClose}
          className="fixed top-0 left-0 w-screen h-screen z-50"
        />
      )}
    </div>
  );
};

export default React.memo(Section1);