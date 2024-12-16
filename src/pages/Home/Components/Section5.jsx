/* eslint-disable react/prop-types */
import CommonSwiper from "../../../Components/commonSlider";

const Card = ({ image, title, description }) => {
  return (
    <div className="rounded-[30px] section overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-[304px] w-full object-cover"
      />
      <div className="md:px-9 h-36 md:h-64 md:py-10 p-5 text-left shadow-lg bg-white rounded-[30px] top-[-22px] relative">
        <h3 className="text-[18px] lg:text-[30px] font-semibold text-gray-800">{title}</h3>
        <p className="mt-2  text-[14px] lg:text-[22px] text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const Section5=({cards})=> {



  const renderCard = (card, index) => (
    <Card
      key={index}
      image={card.image}
      title={card.title}
      description={card.description}
    />
  );
  return (
    <div className="swiper-container bg-[#BAE9EF] py-20 p-5 lg:ps-[165px]">
      <CommonSwiper
        items={cards}
        renderItem={renderCard}
        slidesPerView={3.5}
        spaceBetween={30}
        loop={true}
      />
    </div>
  );
}

export default Section5