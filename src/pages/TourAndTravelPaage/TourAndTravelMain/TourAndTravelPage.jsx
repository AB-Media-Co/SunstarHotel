import { useEffect } from "react"
import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook"
import TestimonialSection from "../../../Components/TestimonialSection"
import AdvantagesSection from "./Component/AdvantagesSection"
import HeroSection from "./Component/HeroSection"
import PopularDestination from "./Component/PopularDestination"
import TopSellingPackages from "./Component/TopSellingPackages"
import { useGetMetas } from "../../../ApiHooks/useMetaHook"
import { Helmet } from "react-helmet"
import ImageGallery from "../../../Components/ImageGallery"
import { useGetTourAndTravel } from "../../../ApiHooks/useTourAndTravel"

const TourAndTravelPage = () => {
  const { data: metas } = useGetMetas();
  const { data, isLoading: isLoadingGet, isFetching, refetch } = useGetTourAndTravel();
  // const { Testimonials } = useUpdatePagesHook();
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
      <HeroSection data={data?.hero} />
      <PopularDestination />
      <AdvantagesSection data={data?.advantages} />
      <TopSellingPackages />
      <div className="relative flex  flex-col justify-between content items-center  z-0">

        <ImageGallery path='travelAgent' />
      </div>
      <TestimonialSection page="tours and travel" head="Meet Our Stars" />
    </div>
  )
}

export default TourAndTravelPage
