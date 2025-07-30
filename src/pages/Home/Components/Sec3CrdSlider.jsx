import { useState, useEffect, useRef } from "react";
import CommonSwiper from "../../../Components/CommonSlider";
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
        backgroundImage: loaded ? `url(${src})` : "none",
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

const Sec3CardSlider = () => {
  const { shineSection } = useUpdatePagesHook();
  const { heading, description, features } = shineSection || {};
  const navigate = useNavigate();

  const renderItem = (item, index) => (
    <div
      className="max-w-full sm:max-w-lg relative "
      data-aos="fade-up"
      data-aos-delay={index * 100}

    >
      <LazyBackground
        src={item.image?.replace('/upload/', '/upload/f_auto,q_auto,w_800/')}
        className="h-[300px] md:h-[280px] bg-cover rounded-lg bg-center hover:scale-105 ease-in-out duration-300"
      />
      <div className="py-4 w-full cursor-pointer gap-2h-[180px] text-left flex flex-col"

        onClick={() => {
          navigate("/why-sunstar#what-make-us-shine");
          setTimeout(() => {
            document.getElementById("what-make-us-shine")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}>
        <h3 className="text-mobile/h4 md:text-desktop/h4 md:font-semibold mb-2">
          {item.title}
        </h3>
        <p className="text-mobile/body/2 md:text-desktop/body/1 whitespace-pre-line">
          {truncateText(item.description, 20)}
          {/* {truncateText(item.description, 15)} */}
        </p>
      </div>
    </div>
  );

  if (!features || features.length === 0) {
    return (
      <div className=" md:px-6 text-primary-white pb-5">
        <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold text-left mb-4">
          {heading || "No Heading Available"}
        </h2>
        <p className="text-mobile/body/2 md:text-desktop/body/1 text-left mb-4 md:mb-8">
          {truncateText(description, 15)}
        </p>
        <p className="text-mobile/body/2 md:text-desktop/body/2">
          No features to display.
        </p>
      </div>
    );
  }

  return (
    <div className=" md:px-6 text-primary-white pb-5">
      <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold text-left mb-4">
        {heading}
      </h2>
      <p className="text-mobile/body/2 whitespace-pre-line md:text-desktop/body/1 text-left mb-4 md:mb-8">
        {description}
      </p>
      <CommonSwiper
        items={features}
        renderItem={renderItem}
        slidesPerView={{
          default: 1,
          768: 2.5,
          1024: 4,
        }}
        spaceBetween={16}
        loop={true}
        className="mySwiper"
        arrow="hidden"
      />
    </div>
  );
};

export default Sec3CardSlider;