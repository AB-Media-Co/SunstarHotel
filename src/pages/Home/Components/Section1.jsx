/* eslint-disable react/no-unknown-property */
import React, { Suspense, useState, useMemo, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AllHotelCard from "../../../Components/AllHotelCard";
import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation"; // 👈 your typing effect

const Section1 = ({ section1Data }) => {
  const { heroSectionUpdate, loading, Loader } = useUpdatePagesHook();
  const { words = [], buttonLabel = "Search for" } = section1Data || {};

  const [hotelOpen, setHotelOpen] = useState(false);
  const handleHotelOpen = useCallback(() => setHotelOpen(true), []);
  const handleHotelClose = useCallback(() => setHotelOpen(false), []);

  const heading = useMemo(() => heroSectionUpdate?.heading || "", [heroSectionUpdate?.heading]);
  const description = useMemo(() => heroSectionUpdate?.description || "", [heroSectionUpdate?.description]);

  if (loading) return <Loader />;

  return (
    <div className="overflow-hidden md:overflow-visible">
      <Suspense fallback={<div className="w-full h-screen bg-gray-200 animate-pulse" />}>
        {/* HERO SECTION */}
        <section className="relative w-full h-screen">
          {/* ✅ Responsive hero image for fast LCP */}
          <picture>

            <img
              src="/images/HomepageImages/Section1Main.avif"
              alt="Luxury hotel view"
              width={1280}
              height={700}
              loading="eager"
              fetchpriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
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
            className="absolute top-[60%] left-[5%] sm:top-[63%] sm:left-[53%]
                       md:top-[45%] md:left-[10%] flex flex-col md:gap-4
                       text-left text-primary-white max-w-[90%]
                       sm:max-w-[80%] md:max-w-7xl z-10"
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
                <span className="text-mobile/button md:text-desktop/button text-[#FDC114] inline-block w-[120px] text-left truncate">
                  <TypeAnimation
                    sequence={[
                      ...words.flatMap((word) => [word, 1500]),
                      () => {}, // loop callback
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
          </motion.div>
        </section>
      </Suspense>

      {/* MODAL */}
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
