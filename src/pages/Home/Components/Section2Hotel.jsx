/* eslint-disable react/prop-types */
import React, { lazy, Suspense, useMemo, useState, useEffect, useRef } from "react";
import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook";
import RoatinfImg from "../../../Components/RoatinfImg";

// ✅ Lazy-load the slider so it doesn’t impact LCP
const CardSlider = lazy(() => import("./Sec2CardSlider"));

const Section2Hotel = () => {
  const { homePageDescription } = useUpdatePagesHook();

  // Stable values to avoid re-renders/CLS from late data
  const heading = useMemo(() => homePageDescription?.heading ?? "", [homePageDescription?.heading]);
  const description = useMemo(() => homePageDescription?.description ?? "", [homePageDescription?.description]);

  // ✅ Only mount the slider when scrolled into view (cuts JS on first paint)
  const [sliderVisible, setSliderVisible] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSliderVisible(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "200px 0px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="flex flex-col mt-[2rem] sm:mt-[3rem] lg:mt-0 md:gap-14 justify-between items-center lg:items-start px-2 sm:px-4 lg:px-8 lg:pr-0 z-0">
      {/* Heading + copy */}
      <div
        data-aos="fade-up"
        className="relative flex flex-col items-center lg:items-start mb-6 sm:mb-8 lg:mb-0 w-full"
      >
        {/* ✅ Wrap rotating image in a sized box to prevent layout shifts */}
        <div className="relative w-full">
          <div className="pointer-events-none absolute md:left-0 top-[0rem] sm:top-[-7rem] md:top-0 left-[-4rem] sm:left-[-6rem] z-0">
            {/* Give RoatinfImg an intrinsic box via width/height props if supported;
               otherwise this wrapper reserves space. */}
            <div className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px]">
              <RoatinfImg />
            </div>
          </div>

          <div className="relative content text-black mt-[-1rem] sm:mt-[-1.5rem] lg:mt-10 px-2 sm:px-4">
            <h1 className="text-mobile/h3 md:text-desktop/h3 sm:text-[1.8rem] md:text-[2rem] font-bold text-reveal-animation">
              {heading}
            </h1>

            {/* ✅ Preserve layout even if description streams in late */}
            <p className="text-mobile/body/2 md:text-desktop/body/1 whitespace-pre-line sm:text-[1rem] mt-3 sm:mt-4 animation-on-scroll min-h-[3.5rem] sm:min-h-[4rem]">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Card Slider */}
      <div ref={sliderRef} className="w-full content overflow-hidden mt-4 sm:mt-6 md:mt-0">
        <Suspense
          // ✅ Fixed-height skeleton so no CLS when the slider mounts
          fallback={
            <div className="w-full">
              <div className="h-[260px] sm:h-[300px] md:h-[340px] w-full rounded-2xl bg-gray-100 animate-pulse" />
            </div>
          }
        >
          {sliderVisible ? <CardSlider /> : null}
        </Suspense>
      </div>
    </div>
  );
};

export default React.memo(Section2Hotel);
