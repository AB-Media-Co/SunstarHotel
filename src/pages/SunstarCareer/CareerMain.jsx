import { useEffect } from "react"
import Herosection from "./Components/Herosection"
import JobApplicationForm from "./Components/JobApplicationForm"
import JoinTeamSection from "./Components/JoinTeamSection"
import ImagesGallery from "../TourAndTravelPaage/TourAndTravelMain/Component/ImagesGallery"
import SunstarValuesCard from "./Components/SunstarValuesCard"
import WhyWorkWithUs from "./Components/WhyWorkWithUs"
import SunstarCareersSection from "./Components/SunstarCareersSection"
import TestimonialSection from "../../Components/TestimonialSection"
import CareerPageFaq from "./Components/CareerPageFaq"
import { useGetMetas } from "../../ApiHooks/useMetaHook"
import { Helmet } from "react-helmet"

const CareerMain = () => {

  const { data: metas } = useGetMetas();

  const career = Array.isArray(metas)
    ? metas.find(meta => meta.page === "career")
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Helmet>
        <title>{career?.metaTitle || 'Tour & Travel - Sunstar Hotels'}</title>
        <meta name="description" content={career?.metaDescription || ''} />
        <meta name="keywords" content={career?.metaKeywords?.join(', ') || ''} />
      </Helmet>
      <Herosection />
      {/* <JobRoles/> */}
      <SunstarValuesCard />
      <JoinTeamSection />
      <WhyWorkWithUs />
      <JobApplicationForm />
      <ImagesGallery />
      <TestimonialSection page="career" />
      <SunstarCareersSection />
      <CareerPageFaq />

    </div>
  )
}

export default CareerMain
