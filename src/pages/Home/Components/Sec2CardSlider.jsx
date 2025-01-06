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
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
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
    <div className=" relative w-full ">
      <div
        className="relative h-60  bg-center rounded-t-lg z-10 "
        style={{ backgroundImage: `url(${card.img})` }}
      >
        {/* Rating Section */}
        <div className="absolute left-4 top-[90%] flex items-center space-x-1 px-4 py-[6px] bg-[#4DB8B6] text-white rounded-full w-[140px] z-20">
          <strong className="text-desktop/body/2">{card.rating}</strong>
          <span className="text-mobile/body/2">({card.reviews} reviews)</span>
        </div>
      </div>
    
      <div className="absolute top-[100%] w-full  shadow-lg p-4 pt-8 h-[150px] bg-white border rounded-b-lg flex flex-col gap-2">
        {/* Title */}
        <h2 className="text-mobile/h5 md:text-desktop/h5 font-bold text-start">{card.text}</h2>

        {/* Location */}
        <div className="flex items-end gap-1 text-mobile/body/2 text-[#707070] font-semibold">
          <LocationOnSharp className="text-[#4DB8B6]" style={{ fontSize: "18px" }} />
          <span>{card.location}</span>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-end gap-3 mt-2 text-[#707070] font-semibold">
          <span className="text-mobile/body/2">Starting From</span>
          {card.originalPrice && (
            <p className="text-mobile/body/2 text-red-500 font-bold line-through">
              ₹{card.originalPrice}
            </p>
          )}
          <p className="text-desktop/body/1 font-bold text-[#4DB8B6]">
            ₹{card.price}
          </p>
        </div>
      </div>

      <div className="absolute left-[77%] md:left-[84%] top-[3rem] z-40 flex flex-col items-center gap-[2px] w-[80px] p-4 bg-[#4DB8B6] rounded-xl shadow-lg">
      {/* <div className="absolute  bg-[#4DB8B6]  left-[77%] md:left-[84%] top-[3rem] z-50"> */}
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            {feature.icon && <feature.icon className="text-white" />}
            <span className="text-mobile/body/2 text-white">{feature.label}</span>
            {index !== features.length - 1 && (
              <hr className="w-full h-[1px] bg-white my-2" />
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
        cssMode={true} // Add this for Safari

      />
    </div>
  );
}
