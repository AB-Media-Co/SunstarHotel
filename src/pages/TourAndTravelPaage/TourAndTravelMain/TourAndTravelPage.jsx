import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook"
import TestimonialSection from "../../../Components/TestimonialSection"
import AdvantagesSection from "./Component/AdvantagesSection"
import HeroSection from "./Component/HeroSection"
import ImagesGallery from "./Component/ImagesGallery"
import PopularDestination from "./Component/PopularDestination"
import TopSellingPackages from "./Component/TopSellingPackages"

const TourAndTravelPage = () => {

  const { Testimonials } = useUpdatePagesHook();

  return (
    <div className="overflow-hidden">
      <HeroSection />
      <PopularDestination />
      <AdvantagesSection />
      <TopSellingPackages />
      <ImagesGallery />
      <TestimonialSection Testimonials={Testimonials} />


    </div>
  )
}

export default TourAndTravelPage
