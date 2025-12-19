/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { Suspense, useState, useCallback, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FlashOnRounded } from "@mui/icons-material";

// Lazy load the hotel card modal
const AllHotelCard = React.lazy(() => import("../../../Components/AllHotelCard"));

const Section1 = ({ section1Data }) => {
  const { heroSectionUpdate, loading, Loader } = useUpdatePagesHook();
  const { words = [], buttonLabel = "Search for" } = section1Data || {};

  const [hotelOpen, setHotelOpen] = useState(false);
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);
  const sectionRef = useRef(null);

  const handleHotelOpen = useCallback(() => setHotelOpen(true), []);
  const handleHotelClose = useCallback(() => setHotelOpen(false), []);

  const heading = heroSectionUpdate?.heading || "";
  const description = heroSectionUpdate?.description || "";

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionBottom = sectionRef.current.offsetTop + sectionRef.current.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight;

        // Show button when user scrolls past this section
        setShowFloatingBtn(window.scrollY > sectionRef.current.offsetHeight - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader fullScreen={false} size="md" />
    </div>
  );

  return (
    <div className="overflow-hidden md:overflow-visible">
      <Suspense fallback={<div className="w-full h-screen bg-gray-200 animate-pulse" />}>
        {/* HERO SECTION */}
        <section ref={sectionRef} className="relative w-full h-screen">
          <picture>
            {/* WebP for modern browsers */}
            <source
              srcSet="/images/HomepageImages/Section1Main.avif"
              type="image/avif"
            />
            {/* Fallback to AVIF */}
            <img
              src="/images/HomepageImages/Section1Main.avif"
              alt="hotels near karol bagh"
              width={1920}
              height={1080}
              loading="eager"
              fetchpriority="high"
              decoding="sync"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ contentVisibility: 'auto' }}
            />
          </picture>

          {/* overlay */}
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

          {/* rotating decorative image */}
          <img
            src="/images/HomepageImages/round.png"
            alt=""
            width={300}
            height={300}
            className="md:z-10 z-0 absolute left-[20%] md:left-auto md:top-[20rem]
                       md:right-8 lg:right-[19rem] top-[33rem] lg:top-[27rem]
                       h-[300px] w-[300px] pointer-events-none select-none
                       animate-[spin_18s_linear_infinite]"
          />

          {/* main text + button */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute top-1/2 -translate-y-1/2 left-[5%] sm:left-1/2 sm:-translate-x-1/2
                       md:top-[45%] md:left-[10%] md:translate-x-0 md:translate-y-0 flex flex-col md:gap-4 gap-2
                       text-left text-primary-white max-w-[90%]
                       sm:max-w-[45%] md:max-w-7xl z-10"
          >
            <h1 className="text-mobile/h2 md:text-desktop/h2 font-semibold">
              {heading}
            </h1>
            <p className="text-mobile/body/2 md:text-desktop/body/1 md:max-w-[53%]">
              {description}
            </p>

            {/* SEARCH BUTTON with typing animation */}
            <button
              onClick={handleHotelOpen}
              className="mt-6 flex justify-between items-center
                         md:w-[490px] h-12 md:h-16 font-semibold
                         bg-primary-white rounded-full py-2 md:py-4 px-7
                         hover:bg-gray-50 transition-colors"
            >
              <span className="flex gap-2 items-center">
                <span className="text-mobile/button md:text-desktop/button text-gray-600">
                  {buttonLabel}
                </span>
                {/* fixed width container to stop CLS during typing */}
                <span className="text-mobile/button md:text-desktop/button text-[#FDC114] inline-block w-[150px] text-left truncate">
                  <TypeAnimation
                    sequence={[
                      ...words.flatMap((word) => [word, 1500]),
                      () => { }, // loop callback
                    ]}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                  />
                </span>

              </span>
              <span className="text-[#FDC114]">
                <SearchIcon />
              </span>
            </button>

            <div className="flex items-center mt-4 md:mt-0 ">
              <FlashOnRounded className="rotate-[10deg] text-primary-green" style={{ height: "18px" }} />
              <span className="text-mobile/body/2 md:text-desktop/body/1 md:font-bold capitalize">
                Book Direct for Lowest Prices!
              </span>
            </div>

            <div className="flex items-center mt-4 md:mt-0 border rounded-full  border-primary-green px-4 py-1 md:max-w-[39%]">
              {/* <FlashOnRounded className="rotate-[10deg] " style={{ height: "18px" }} /> */}
              <span className="text-mobile/body/2 md:text-desktop/body/1 md:font-bold capitalize">
                Get up to <span className="text-primary-green">15% off</span>  extra on your stays!
              </span>
            </div>

          </motion.div>
        </section>
      </Suspense>

      {/* FLOATING SEARCH BUTTON - Mobile Only (Shows after scrolling past section) */}
      <AnimatePresence>
        {showFloatingBtn && (
          <motion.button
            onClick={handleHotelOpen}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed right-5 bottom-4 z-40 
                       bg-[#FDC114] text-white rounded-full 
                       w-14 h-14 flex items-center justify-center
                       shadow-lg hover:shadow-xl transition-shadow
                       active:bg-[#e5ad0f]"
            aria-label="Search Hotels"
          >
            <SearchIcon className="text-white" sx={{ fontSize: 28 }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* MODAL */}
      {hotelOpen && (
        <Suspense fallback={null}>
          <AllHotelCard
            isOpen={hotelOpen}
            onClose={handleHotelClose}
            className="fixed top-0 left-0 w-screen h-screen z-50"
          />
        </Suspense>
      )}
    </div>
  );
};

export default React.memo(Section1);