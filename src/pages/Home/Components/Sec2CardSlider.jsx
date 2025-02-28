import { useState, useEffect } from "react";
import WifiIcon from "@mui/icons-material/Wifi";
import CommonSwiper from "../../../Components/CommonSlider";
import { LocationOnSharp, Restaurant, SmokeFreeSharp } from "@mui/icons-material";
import { CctvIcon } from "lucide-react";
import { useGetHotels } from "../../../ApiHooks/useHotelHook2";

export default function SwiperComponent() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

  const renderCard = (card, index) => (
    <div
      className="relative w-full"
      data-aos="fade-up"
      data-aos-delay={index * 100} // Adjust the multiplier (100ms here) as needed
    >
      <div
        className=" h-60 bg-center rounded-t-lg z-10 bg-cover bg-no-repeat "
        style={{ backgroundImage: `url(${card.images[0]})` }}
      >
        {/* Rating Section */}
        {/* <div className="absolute left-4 top-[90%] flex items-center space-x-1 px-4 py-[6px] bg-[#4DB8B6] text-primary-white rounded-full w-[140px] z-20">
          <strong className="text-desktop/body/2">{card.rating}</strong>
          <span className="text-mobile/body/2">({card.reviews} reviews)</span>
        </div> */}
      </div>

      <div className="absolute top-[100%] w-full shadow-lg p-4 pt-8 h-[150px] bg-primary-white border rounded-b-lg flex flex-col gap-2">
        {/* Title */}
        <h2 className="text-mobile/h5 md:text-desktop/h5 font-bold text-start">
          {card.name}
        </h2>

        {/* Location */}
        <div className="flex items-end gap-1 text-mobile/body/2 text-[#707070] font-semibold">
          <LocationOnSharp className="text-[#4DB8B6]" style={{ fontSize: "18px" }} />
          <span>{card.location?.hotelAddress}</span>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-end gap-3 mt-2 text-[#707070] font-semibold">
          <span className="text-mobile/body/2">Starting From</span>
          <p className="text-desktop/body/1 font-bold text-[#4DB8B6]">
            ₹{card.price}
          </p>
        </div>
      </div>

      <div className="absolute left-[77%] md:left-[84%] top-[3rem] z-40 flex flex-col items-center gap-[2px] w-[80px] p-4 bg-[#4DB8B6] rounded-xl shadow-lg">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            {feature.icon && <feature.icon className="text-primary-white" />}
            <span className="text-mobile/body/2 text-primary-white">{feature.label}</span>
            {index !== features.length - 1 && (
              <hr className="w-full h-[1px] bg-primary-white my-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );


  const { data: hotels } = useGetHotels();
  console.log(hotels)


  return (
    <div className="swiper-container sec2Swiper pb-5">
      <CommonSwiper
        items={hotels?.hotels}
        renderItem={renderCard}
        slidesPerViewDesktop={isMobile ? 1 : 3.5}
        spaceBetween={30}
        loop={false}
        className="mySwiper"
        cssMode={true} // Add this for Safari
      />
    </div>
  );
}
