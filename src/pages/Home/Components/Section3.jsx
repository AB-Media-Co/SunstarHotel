import { memo, lazy, Suspense } from 'react';

// Lazy load non-critical components
const RoatinfImg = lazy(() => import("../../../Components/RoatinfImg"));

import { useState, useEffect, useRef } from "react";
import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook";
import { useNavigate } from "react-router-dom";

const LazyBackground = ({ src, className }) => {
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
        backgroundImage: loaded && src ? `url(${src})` : "none",
      }}
      role="img"
      aria-label="Feature image"
    />
  );
};

const truncateText = (text, wordLimit) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};


const Section3 = () => {
  const { whatMakesUsShineData } = useUpdatePagesHook();

  const { heading, description, items } = whatMakesUsShineData || {};
  const navigate = useNavigate();

  const filteredFeatures = items || [];

  const normalizeNewlines = (s) => (s ? s.replace(/\\n/g, "\n").replace(/\r\n/g, "\n") : "");

  const handleShowMore = () => {
    navigate("/why-sunstar#what-make-us-shine");
    setTimeout(() => {
      document.getElementById("what-make-us-shine")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const renderItem = (item, index) => {
    const key = item?.id || item?.heading || index;
    const imageUrl = item?.image
      ? item.image.replace("/upload/", "/upload/f_auto,q_auto,w_800/")
      : "";

    return (
      <div
        key={key}
        className="max-w-full sm:max-w-lg relative"
        data-aos="fade-up"
        data-aos-delay={index * 100}
      >
        <LazyBackground
          src={imageUrl}
          className="h-[300px] md:h-[280px] bg-cover rounded-lg bg-center hover:scale-105 ease-in-out duration-300"
        />
        <div
          className="py-4 w-full cursor-pointer gap-2 text-left flex flex-col"
          onClick={() => {
            navigate("/why-sunstar#what-make-us-shine");
            setTimeout(() => {
              document.getElementById("what-make-us-shine")?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
        >
          <h3 className="text-mobile/h4 md:text-desktop/h4 md:font-semibold mb-2">
            {item?.heading}
          </h3>
          <p className="text-mobile/body/2 md:text-desktop/body/1 whitespace-pre-line">
            {item?.description}
          </p>
        </div>
      </div>
    );
  };




  if (!filteredFeatures || filteredFeatures.length === 0) {
    return (
      <div className="md:px-6 text-primary-white pb-5">
        <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold text-left mb-4">
          {heading || "No Heading Available"}
        </h2>
        <p className="text-mobile/body/2 md:text-desktop/body/1 text-left mb-4 md:mb-8">
          {truncateText(description, 15)}
        </p>
        <p className="text-mobile/body/2 md:text-desktop/body/2">No features to display.</p>
      </div>
    );
  }

  return (
    <div className="relative bg-[#78C9C8] overflow-hidden z-10">
      {/* Image Container - Lazy loaded decorative element */}
      <div className="md:block hidden">
        <Suspense fallback={<div className="w-[300px] h-[300px]" />}>
          <RoatinfImg position="right-0" src="/images/HomepageImages/section3pattern.png" />
        </Suspense>
      </div>

      {/* Content Section */}
      <div className="content pt-5 md:pt-[50px] z-10 relative">
        <Suspense fallback={
          <div className="animate-pulse space-y-4 py-8">
            <div className="h-8 bg-white/20 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-white/20 rounded w-2/3 mx-auto"></div>
          </div>
        }>
          <div className="md:px-6 text-primary-white pb-5">
            <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold text-left mb-4">{heading}</h2>

            <p className="text-mobile/body/2 whitespace-pre-line md:text-desktop/body/1 text-left mb-4 md:mb-8">
              {normalizeNewlines(description)}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredFeatures.map((feature, idx) => renderItem(feature, idx))}
            </div>

            <div className="flex justify-end mt-2">
              <button
                onClick={handleShowMore}
                className="bg-primary-yellow hover:bg-primary-gold/80 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
              >
                Know More
              </button>
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default memo(Section3);
