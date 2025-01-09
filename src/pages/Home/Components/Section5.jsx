/* eslint-disable react/prop-types */

import CommonSwiper from "../../../Components/CommonSlider";

const Card = ({ image, title, description }) => {
  return (
    <div className="rounded-[10px] pb-10 md:pb-2 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-[400px] w-full object-cover"
      />
      <div className="md:px-6 h-36 md:h-64 md:py-10 py-3 px-4  bg-custom-bg bg-cover bg-left text-left shadow-lg bg-white rounded-b-[20px] top-[-22px] relative">
        <h3 className="text-mobile/h5 md:text-desktop/h5 font-bold text-gray-800">
          {title}
        </h3>
        <p className="mt-2 text-mobile/body/2 md:text-desktop/body/large text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

const Section5 = ({ cards }) => {
  const renderCard = (card, index) => (
    <Card
      key={index}
      image={card.image}
      title={card.title}
      description={card.description}
    />
  );

  return (
    <div className="swiper-container bg-[#BAE9EF]">
      <div className="md:py-20 py-10 p-5 content">
        <CommonSwiper
          items={cards}
          renderItem={renderCard}
          slidesPerView={3.5}
          spaceBetween={30}
          loop={false}
        />
      </div>
    </div>
  );
};

export default Section5;
