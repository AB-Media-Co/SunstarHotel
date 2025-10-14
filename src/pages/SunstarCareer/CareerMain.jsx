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
import SunstarInfoCards from "../InTheMedia/Component/SunstarInfoCards"

import { FileText, Mic, Building } from "lucide-react";

const CareerMain = () => {

  const { data: metas } = useGetMetas();

  const career = Array.isArray(metas)
    ? metas.find(meta => meta.page === "career")
    : null;

  const infoCards = [
    {
      id: 1,
      title: "Why Bloom?",
      description: "Hear all about our story & see what makes us so special.",
      buttonText: "Check us out",
      icon: <FileText className="w-8 h-8 text-primary-green" />,
      illustration: "/images/whybloom.svg",
    },
    {
      id: 2,
      title: "In the Media",
      description: "Who cares what we think, see what others are saying about us.",
      buttonText: "Catch the coverage",
      icon: <Mic className="w-8 h-8 text-primary-green" />,
      illustration: "/images/media.svg",
    },
    {
      id: 3,
      title: "Developers & Owners",
      description: "We're growing rapidly across the country, don’t miss out.",
      buttonText: "Partner with us",
      icon: <Building className="w-8 h-8 text-primary-green" />,
      illustration: "/images/dev&owner.svg",
    },
  ];

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
      {/* <CareerPageFaq /> */}
      <SunstarInfoCards infoCards={infoCards} />

    </div>
  )
}

export default CareerMain
