import { useLocation, useParams } from "react-router-dom";
import HeroSection from "./Component/HeroSection";
import TourPackages from "./Component/TourPackages";
import ImageGallery from "../../../Components/ImageGallery";
import TestimonialSection from "../../../Components/TestimonialSection";
import { useEffect } from "react";
import { Helmet } from "react-helmet"

const SelectedState = () => {
  // const { state: stateName } = useParams();
  const { state } = useLocation();
  const { state: stateName } = useParams(); // URL param
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Helmet>
        <title>{stateName}</title>
      </Helmet>
      <HeroSection img={state?.item?.image} />
      <TourPackages stateName={stateName} />
      <div className="content">
        <ImageGallery />
      </div>
      <TestimonialSection page="tours and travel" />

    </div>
  )
}

export default SelectedState
