import RoatinfImg from "../../../Components/RoatinfImg";
import { sec3CardSliderData } from "../../../Data/HomePageData";
import Sec3CardSlider from "./Sec3CrdSlider";

const Section3 = () => {
  return (
    <div className="relative bg-[#78C9C8] md:h-[750px] overflow-hidden z-10">
      {/* Image Container */}
      <div className="md:block hidden">
        <RoatinfImg position="right-0" src="/images/HomepageImages/section3pattern.png" />
      </div>
      {/* Content Section */}
      <div className="lg:ps-[165px] pt-5 md:pt-[50px] z-10 relative">
        <Sec3CardSlider sec3CardSliderData={sec3CardSliderData}/>
      </div>
    </div>
  );
};

export default Section3;
