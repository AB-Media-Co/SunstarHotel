/* eslint-disable react/prop-types */
import Carousel from "../../../Components/CardsCommonComp/CommonCarousel";


function Banner({ businessPlatformFeatures }) {
  return (
    <div>
      <Carousel
        features={businessPlatformFeatures}
        height="h-[600px]"
        buttonColor="#FDC114"
        iconSize="h-6 w-6"
        NavClass="md:left-1/2 md:-translate-x-1/2 bottom-[12rem] "
      />

    </div>
  );
}

export default Banner;