import { useState, useEffect } from "react";
import useScrollAnimations from "../../../hooks/useScrollAnimations";
import WifiIcon from "@mui/icons-material/Wifi";
import PersonIcon from "@mui/icons-material/Person";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import CommonSwiper from "../../../Components/CommonSlider";

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
      linkText: "View Details >",
    },
    {
      img: "/images/HomepageImages/cardImg1.png",
      text: "Executive Suite",
      description: "Experience luxury in our executive suite.",
      rating: 4.8,
      reviews: 200,
      link: "#",
      linkText: "View Details >",
    },
    {
      img: "/images/HomepageImages/cardImg1.png",
      text: "Standard Room",
      description: "A cozy and budget-friendly option for travelers.",
      rating: 4.2,
      reviews: 180,
      link: "#",
      linkText: "View Details >",
    },
    {
      img: "/images/HomepageImages/cardImg1.png",
      text: "Deluxe Room",
      description: "A deluxe room with modern amenities and great views.",
      rating: 4.5,
      reviews: 320,
      link: "#",
      linkText: "View Details >",
    },
    {
      img: "/images/HomepageImages/cardImg1.png",
      text: "Executive Suite",
      description: "Experience luxury in our executive suite.",
      rating: 4.8,
      reviews: 200,
      link: "#",
      linkText: "View Details >",
    }
  ];

  const features = [
    { label: "Wifi", icon: WifiIcon },
    { label: "Occupancy", icon: PersonIcon },
    { label: "Tea / Coffee", icon: LocalCafeIcon },
    { label: "Rooms Left", icon: null, value: 4 },
  ];

  const renderCard = (card) => (
    <div className=" border shadow-lg mr-4 rounded-lg relative w-full">
      <div>
        {/* Image Section */}
        <div
          className="zoom-in-on-scroll h-60 bg-cover bg-center rounded-t-lg"
          style={{
            backgroundImage: `url(${card.img})`,
          }}
        ></div>

        {/* Content Section */}
        <div className="p-4 h-[180px] w-sm text-left flex flex-col justify-between">
          <h2 className="text-xl font-bold">{card.text}</h2>
          <div className="flex items-center space-x-1 text-yellow-500">
            <span>{card.rating}</span>
            <span className="text-sm text-gray-500">
              ({card.reviews} Google reviews)
            </span>
          </div>
          <p className="text-sm mt-2 w-[230px] md:w-[250px]">
            {card.description.split(" ").length > 50
              ? `${card.description.split(" ").slice(0, 50).join(" ")}...`
              : card.description}
          </p>
          <a href={card.link} className="text-black font-semibold mt-2 inline-block">
            {card.linkText}
          </a>
        </div>

      </div>

      {/* Features Section */}
      <div className=" absolute left-[77%]  top-[4rem]  md:left-[75%]  w-[91px] shadow-lg gap-[2px] justify-between items-center bg-[#4DB8B6] p-4 rounded-xl flex flex-col">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            {feature.icon && <feature.icon className="text-white" />}
            {feature.value && (
              <span className="text-xl font-bold text-white">{feature.value}</span>
            )}
            <span className="text-[10px] text-white">{feature.label}</span>

            <hr className="w-[90px] h-[1px] bg-white my-2"/>
          </div>
        ))}
      </div>


    </div>
  );

  return (
    <div className="swiper-container pb-10">
      <CommonSwiper
        items={cards}
        renderItem={renderCard}
        slidesPerViewDesktop={isMobile ? 1 : 3.5}
        spaceBetween={30}
        loop={true}
        className="mySwiper"
      />
    </div>
  );
}
