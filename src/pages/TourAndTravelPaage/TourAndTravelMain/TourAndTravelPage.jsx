import { useEffect } from "react"
import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook"
import TestimonialSection from "../../../Components/TestimonialSection"
import AdvantagesSection from "./Component/AdvantagesSection"
import HeroSection from "./Component/HeroSection"
import ImagesGallery from "./Component/ImagesGallery"
import PopularDestination from "./Component/PopularDestination"
import TopSellingPackages from "./Component/TopSellingPackages"
import { useGetMetas } from "../../../ApiHooks/useMetaHook"
import { Helmet } from "react-helmet"

const TourAndTravelPage = () => {
  const { data: metas } = useGetMetas();

  const { Testimonials } = useUpdatePagesHook();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const TourAndTravel = Array.isArray(metas)
  ? metas.find(meta => meta.page === "TourAndTravel")
  : null;
  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>{TourAndTravel?.metaTitle || 'Tour & Travel - Sunstar Hotels'}</title>
        <meta name="description" content={TourAndTravel?.metaDescription || ''} />
        <meta name="keywords" content={TourAndTravel?.metaKeywords?.join(', ') || ''} />
      </Helmet>
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
