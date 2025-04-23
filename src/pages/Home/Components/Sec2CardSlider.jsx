import { useState, useEffect, useRef } from "react";
import WifiIcon from "@mui/icons-material/Wifi";
import CommonSwiper from "../../../Components/CommonSlider";
import { LocationOnSharp, Restaurant, SmokeFreeSharp } from "@mui/icons-material";
import { CctvIcon } from "lucide-react";
import { useGetHotels } from "../../../ApiHooks/useHotelHook2";
import { useNavigate } from "react-router-dom";

const LazyBackground = ({ src, className, hovered }) => {
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
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
      }}
    />
  );
};

export default function SwiperComponent() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const features = [
    { label: "Wifi", icon: WifiIcon },
    { label: "No Smoking", icon: SmokeFreeSharp },
    { label: "CCTV", icon: CctvIcon },
    { label: "Restaurant", icon: Restaurant },
  ];

  const navigate = useNavigate();
  const { data: hotels } = useGetHotels();

  const renderCard = (card, index) => {
    return (
      <>
        {card?.active && (
          <div
            className="relative w-full md:px-4"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div
              className="relative h-60 overflow-hidden rounded-t-lg z-10"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => navigate(`hotels/${card?.hotelCode}`)}
            >
              <LazyBackground
                src={card.images[0]?.replace('/upload/', '/upload/f_auto,q_auto,w_800/')}
                hovered={hoveredCard === index}
                className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-all duration-700 ease-in-out"
              />

              <div
                className={`cursor-pointer absolute inset-0 bg-black transition-opacity duration-700 ease-in-out ${hoveredCard === index ? "opacity-20" : "opacity-0"
                  }`}
              />
            </div>

            <div className="absolute top-[100%] w-full shadow-lg p-4 pt-8 h-[150px] bg-primary-white border rounded-b-lg flex flex-col gap-2">
              <h2
                onClick={() => navigate(`hotels/${card?.hotelCode}`)}
                className="text-mobile/h5/medium cursor-pointer hover:text-primary-green md:text-desktop/h5 font-bold text-start transition-colors duration-300"
              >
                {card.name?.length > 20 ? `${card.name.slice(0, 20)}...` : card.name}
              </h2>

              <div className="flex items-end gap-1 text-mobile/body/2 text-[#707070] font-semibold">
                <LocationOnSharp className="text-[#4DB8B6]" style={{ fontSize: "18px" }} />
                <span className="truncate max-w-[200px]">{card.location?.hotelAddress}</span>
              </div>

              <div
                className={`flex items-center ${hotels?.hotels?.length === 3 ? "justify-between" : "justify-end"} gap-3 mt-2 text-[#707070] font-semibold`}
              >
                <span className="text-mobile/body/2">Starting From</span>
                <p className="text-desktop/body/1 font-bold text-[#4DB8B6]">
                  ₹{card.price}
                </p>
              </div>
            </div>

            <div className="absolute left-[77%] md:left-[90%] top-[2rem] z-40 flex flex-col items-center gap-[2px] w-[80px] p-4 bg-[#4DB8B6] rounded-xl shadow-lg">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center">
                  {feature.icon && <feature.icon className="text-primary-white" />}
                  <span className="text-mobile/small/body text-primary-white">{feature.label}</span>
                  {index !== features.length - 1 && (
                    <hr className="w-full h-[1px] bg-primary-white my-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="swiper-container sec2Swiper pb-5">
      <CommonSwiper
        items={hotels?.hotels}
        renderItem={renderCard}
        slidesPerViewDesktop={isMobile ? 1 : 3}
        spaceBetween={30}
        loop={true}
        className={`mySwiper hotelCardsHome`}
        cssMode={true}
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