import { useState, useEffect, useRef } from "react";
import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook";
import CommonSwiper from "../../../Components/CommonSlider";
import { useNavigate } from "react-router-dom";

const LazyImage = ({ src, alt = "", className = "" }) => {
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
    <img
      ref={ref}
      src={loaded ? src.replace('/upload/', '/upload/f_auto,q_auto,w_800/') : ""}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
};

const Card = ({ image, title, description }) => {
  const navigate = useNavigate();

  return (
    <div
      className="rounded-[10px] overflow-hidden cursor-pointer h-full"
      onClick={() => {
        navigate("/why-sunstar#what-we-offer");
        setTimeout(() => {
          document.getElementById("what-we-offer")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }}
    >
      <LazyImage
        src={image}
        alt={title}
        className="h-[250px] w-full object-cover"
      />
      <div className="md:px-6 h-[180px] md:py-6 py-4 px-4 bg-custom-bg bg-cover bg-left text-left shadow-lg bg-white">
        <h3 className="text-mobile/h5 md:text-desktop/h5 font-bold text-gray-800 mb-2">
          {title}
        </h3>
        <p className="text-mobile/body/2 whitespace-pre-line md:text-desktop/body/large text-gray-600 line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};

const Section5 = () => {
  const { offeringSection } = useUpdatePagesHook();

  const renderCard = (card, index) => {
    return (
      <div data-aos="fade-up" data-aos-delay={index * 100}>
        <Card
          key={index}
          image={card?.image}
          title={card?.title}
          description={card?.description}
        />
      </div>
    );
  };

  return (
    <div className="swiper-container bg-[#BAE9EF]">
      <div className="py-12 p-5 content">
        <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold text-left mb-8">
          {offeringSection?.heading}
        </h2>
        <CommonSwiper
          items={offeringSection?.offers}
          renderItem={renderCard}
          slidesPerViewDesktop={3.5}
          spaceBetween={30}
          loop={true}
                  />
      </div>
    </div>
  );
};

export default Section5;