/* eslint-disable react/prop-types */

import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook";
import CommonSwiper from "../../../Components/CommonSlider";

const Card = ({ image, title, description, index }) => {
  return (
    <div className="rounded-[10px] pb-10 md:pb-2 overflow-hidden"

    >
      <img
        src={image}
        alt={title}
        className="h-[350px] w-full object-cover"
      />
      <div className="md:px-6 h-36 md:h-[12rem] md:py-8 py-3 px-4  bg-custom-bg bg-cover bg-left text-left shadow-lg bg-white rounded-b-[20px] top-[-22px] relative">
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

const Section5 = () => {
  const { offeringSection } = useUpdatePagesHook();

  const renderCard = (card, index) => (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >

      <Card
        key={index}
        image={card.image}
        title={card.title}
        description={card.description}
      />

    </div>
  );

  return (
    <div className="swiper-container bg-[#BAE9EF]">
      <div className=" pt-12 p-5 content">
        <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold text-left mb-8">
          {offeringSection?.heading}
        </h2>
        <CommonSwiper
          items={offeringSection?.offers}
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
