/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useMemo } from "react";
import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook";
import CommonSwiper from "../../../Components/CommonSlider";
import { useNavigate } from "react-router-dom";

/** Build Cloudinary URL with transforms */
const cldUrl = (url, w) =>
  url?.includes("/upload/")
    ? url.replace("/upload/", `/upload/f_auto,q_auto,dpr_auto,w_${w}/`)
    : url;

/** Very tiny placeholder (Cloudinary blur) */
const cldPlaceholder = (url) =>
  url?.includes("/upload/")
    ? url.replace("/upload/", "/upload/f_auto,q_10,w_20,e_blur:1200/")
    : url;

/** Invisible 1×1 fallback to avoid empty src */
const TRANSPARENT_PX =
  "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";

const LazyImage = ({ src, alt = "", className = "", width, height }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  // Precompute responsive sources
  const src400 = useMemo(() => cldUrl(src, 400), [src]);
  const src800 = useMemo(() => cldUrl(src, 800), [src]);
  const src1200 = useMemo(() => cldUrl(src, 1200), [src]);
  const placeholder = useMemo(() => cldPlaceholder(src), [src]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <img
      ref={ref}
      // Always give a valid src so the element paints without warnings
      src={inView ? src800 : placeholder || TRANSPARENT_PX}
      srcSet={
        inView
          ? `${src400} 400w, ${src800} 800w, ${src1200} 1200w`
          : undefined
      }
      sizes="(max-width: 768px) 100vw, 33vw"
      alt={alt}
      decoding="async"
      loading="lazy"
      fetchpriority="low"
      width={width}
      height={height}
      className={className}
      style={{ backgroundColor: "#f3f4f6" }} // soft gray while loading
    />
  );
};

const Card = ({ image, title, description, link, buttonText }) => {
  // Ensure we have a valid string link
  const linkHref =
    typeof link === "string"
      ? link
      : link?.path || link?.url || "/why-sunstar#what-we-offer";

  return (
    <a
      href={linkHref}
      className="block rounded-[10px] overflow-hidden cursor-pointer h-full transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
    >
      {/* Image */}
      <LazyImage
        src={image}
        alt={title}
        width={1200}
        height={750}
        className="h-[250px] w-full object-cover"
      />

      {/* Content */}
      <div className="md:px-6 h-[180px] md:py-6 py-4 px-4 bg-white shadow-lg text-left">
        <h3 className="text-mobile/h5 md:text-desktop/h5 font-bold text-gray-800 mb-2">
          {title}
        </h3>
        <p className="text-mobile/body/2 md:text-desktop/body/1 whitespace-pre-line text-gray-600 line-clamp-3">
          {description}
        </p>
      </div>
    </a>
  );
};

const Section5 = () => {
  const { offeringSection } = useUpdatePagesHook();
  const homeOfferings = offeringSection?.home || {};

  const renderCard = (card, index) => (
    // ✅ key on the outermost element returned to Swiper
    <div key={card?.id || index} data-aos="fade-up" data-aos-delay={index * 100}>
      <Card
        image={card?.image}
        title={card?.title}
        description={card?.description}
        link={card?.link}
        buttonText={card?.buttonText}
      />
    </div>
  );

  return (
    <div className="swiper-container bg-[#BAE9EF]">
      <div className="py-12 p-5 content">
        {/* <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold text-left mb-8">
          {homeOfferings?.heading}
        </h2> */}

        <CommonSwiper
          items={homeOfferings?.offers || []}
          renderItem={renderCard}
          slidesPerViewDesktop={3.5}
          spaceBetween={0}
          loop={true}
        />


      </div>
    </div>
  );
};

export default Section5;
