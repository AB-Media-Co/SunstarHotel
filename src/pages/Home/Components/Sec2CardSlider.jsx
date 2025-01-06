import { useState, useEffect } from "react";
import useScrollAnimations from "../../../hooks/useScrollAnimations";
import WifiIcon from "@mui/icons-material/Wifi";
import CommonSwiper from "../../../Components/CommonSlider";
import { LocationOnSharp, Restaurant, SmokeFreeSharp } from "@mui/icons-material";
import { CctvIcon } from "lucide-react";

export default function SwiperComponent() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useScrollAnimations();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cards = [
    {
      img: "/images/HomepageImages/cardImg1.png",
      text: "Deluxe Room",
      description: "A deluxe room with modern amenities and great views.",
      rating: 4.5,
      reviews: 320,
      link: "#",
      location: "Gurgaon",
      price: 5000, // in your currency, e.g., INR
      originalPrice: 6000,
    },
    {
      img: "/images/HomepageImages/cardImg1.png",
      text: "Executive Suite",
      description: "Experience luxury in our executive suite.",
      rating: 4.8,
      reviews: 200,
      link: "#",
      location: "Delhi",
      price: 8000, // in your currency
      originalPrice: 10000,
    },
    {
      img: "/images/HomepageImages/cardImg1.png",
      text: "Standard Room",
      description: "A cozy and budget-friendly option for travelers.",
      rating: 4.2,
      reviews: 180,
      link: "#",
      location: "Noida",
      price: 3000, // in your currency
      originalPrice: 4000,
    },
    {
      img: "/images/HomepageImages/cardImg1.png",
      text: "Deluxe Room",
      description: "A deluxe room with modern amenities and great views.",
      rating: 4.5,
      reviews: 320,
      link: "#",
      location: "Delhi",
      price: 5500, // in your currency
      originalPrice: 6500,
    },
    {
      img: "/images/HomepageImages/cardImg1.png",
      text: "Executive Suite",
      description: "Experience luxury in our executive suite.",
      rating: 4.8,
      reviews: 200,
      link: "#",
      location: "Gurgaon",
      price: 8500, // in your currency
      originalPrice: 9500,
    },
  ];

  const features = [
    { label: "Wifi", icon: WifiIcon },
    { label: "No Smoking", icon: SmokeFreeSharp },
    { label: "CCTV", icon: CctvIcon },
    { label: "Restaurant", icon: Restaurant },
  ];

  const renderCard = (card) => (
    <div className="border shadow-lg mr-4 rounded-xl relative w-full">
      <div>
        {/* Image Section */}
        <div
          className="zoom-in-on-scroll h-60 bg-cover z-30 bg-center rounded-t-lg"
          style={{
            backgroundImage: `url(${card.img})`,
          }}
        ></div>

        {/* Content Section */}
        <div className="flex absolute z-40 left-4 top-[54%] px-4 py-2 rounded-full bg-[#4DB8B6] w-[170px] items-center space-x-1 text-white">
          <strong className="text-desktop/body/2">{card.rating}</strong>
          <span className="text-mobile/body/2">
            ({card.reviews} reviews)
          </span>
        </div>
        <div className="p-4 h-[150px] pt-5 w-sm text-left gap-2 flex flex-col">
          <h2 className="text-mobile/h5 md:text-desktop/h5 font-bold">{card.text}</h2>
          <div className="text-mobile/body/2 flex gap-2">
            <LocationOnSharp className="text-[#4DB8B6]" />
            <span className="text-[#707070] font-semibold text-mobile/body/2">
              {card.location}
            </span>
          </div>

          <div className="mt-4 flex items-center text-[#707070] font-semibold justify-end gap-3">
            <span className="text-mobile/body/2">Starting From</span>
            {card.originalPrice && (
              <p className="text-mobile/body/2 text-red-500 font-bold line-through">₹{card.originalPrice}</p>
            )}
            <p className="text-desktop/body/1 font-bold text-[#4DB8B6]">₹{card.price}</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="absolute left-[77%] z-40 top-[3rem] md:left-[84%] w-[80px] shadow-lg gap-[2px] justify-between items-center bg-[#4DB8B6] p-4 rounded-xl flex flex-col">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            {feature.icon && <feature.icon className="text-white" />}
            <span className="text-mobile/body/2 text-white">{feature.label}</span>

            {index !== features.length - 1 && (
              <hr className="w-[80px] h-[1px] bg-white my-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="swiper-container sec2Swiper pb-5">
      <CommonSwiper
        items={cards}
        renderItem={renderCard}
        slidesPerViewDesktop={isMobile ? 1 : 3.5}
        spaceBetween={30}
        loop={false}
        className="mySwiper"
      />
    </div>
  );
}
