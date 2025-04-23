import RoatinfImg from "../../../Components/RoatinfImg";
import ImageGallery from "../../../Components/ImageGallery";
import { HomePageImgGallery } from "../../../Data/HomePageData";

const Section4 = () => {
  return (
    <div className="relative flex  flex-col justify-between content items-center mt-10 py-10  z-0">
      <div className="absolute top-0 left-0 z-0 w-full h-full">
        <RoatinfImg position='md:left-0 top-[-60px] md:top-0 left-[-60px] ' />
      </div>
        <ImageGallery items={HomePageImgGallery.items} />
    </div>
  );
};

export default Section4;
