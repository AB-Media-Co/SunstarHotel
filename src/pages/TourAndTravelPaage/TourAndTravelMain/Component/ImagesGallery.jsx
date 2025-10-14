import ImageGallery from "../../../../Components/ImageGallery";
import RoatinfImg from "../../../../Components/RoatinfImg";


const ImagesGallery = ({path}) => {
  return (
    <div className="relative flex  flex-col justify-between content items-center  z-0">
   
        <ImageGallery  path={path}/>
    </div>
  );
};

export default ImagesGallery;
