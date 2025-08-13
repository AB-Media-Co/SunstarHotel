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
        NavClass="md:left- bottom-[5rem] md:bottom-[9rem] "
      />

    </div>
  );
}

export default Banner;