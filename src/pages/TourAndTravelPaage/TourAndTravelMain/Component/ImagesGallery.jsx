import ImageGallery from "../../../../Components/ImageGallery";
import RoatinfImg from "../../../../Components/RoatinfImg";


const ImagesGallery = () => {
  return (
    <div className="relative flex  flex-col justify-between content items-center  z-0">
      <div className="absolute top-0 left-0 z-0 w-full h-full">
        <RoatinfImg position='md:left-0 top-[-60px] md:top-0 left-[-60px] ' />
      </div>
        <ImageGallery />
    </div>
  );
};

export default ImagesGallery;
