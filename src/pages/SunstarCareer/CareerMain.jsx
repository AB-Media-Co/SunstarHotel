import { useEffect, useState } from "react";
import Herosection from "./Components/Herosection";
import JobApplicationForm from "./Components/JobApplicationForm";
import JoinTeamSection from "./Components/JoinTeamSection";
import SunstarValuesCard from "./Components/SunstarValuesCard";
import SunstarCareersSection from "./Components/SunstarCareersSection";
import TestimonialSection from "../../Components/TestimonialSection";
import { useGetMetas } from "../../ApiHooks/useMetaHook";
import { Helmet } from "react-helmet";
import SunstarInfoCards from "../InTheMedia/Component/SunstarInfoCards";

import { FileText, Mic, Building } from "lucide-react";
import { useGetCareersPage } from "../../ApiHooks/use-Career-Page";
import ImageGallery from "../../Components/ImageGallery";
import useUpdatePagesHook from "../../ApiHooks/useUpdatePagesHook";
import CompnayCards from "../About/Components/CompnayCards";
import { SeoData } from "../../Data/SeoData";
import { usePricing } from "../../Context/PricingContext";

const CareerMain = () => {
  const { data: metas } = useGetMetas();
  const { data: careerPageData } = useGetCareersPage();
  const { offeringSection } = useUpdatePagesHook();
  const { openHotelModal } = usePricing();

  const career = Array.isArray(metas)
    ? metas.find((meta) => meta.page === "career")
    : null;


  const handleCardClick = (card) => {
    // Check if this is the "View Hotels" card (id: 3) or checks title/button
    if (card.id === 3 || card?.title === 'Our Hotels' || card?.buttonText === 'View Hotels') {
      openHotelModal();
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Helmet>
        <title>{career?.metaTitle || "Tour & Travel - Sunstar Hotels"}</title>
        <meta name="description" content={career?.metaDescription || ""} />
        <meta
          name="keywords"
          content={career?.metaKeywords?.join(", ") || ""}
        />
        <meta property="og:title" content={SeoData.career.title} />
        <meta property="og:description" content={SeoData.career.description} />
      </Helmet>
      <Herosection
        data={careerPageData?.hero}
      />
      <SunstarValuesCard
        data={careerPageData?.benefits}
      />
      <JoinTeamSection
        data={careerPageData?.joinTeam}
      />
      <div className="relative flex  flex-col justify-between content items-center  z-0">
        <ImageGallery path="career" />
      </div>
      <TestimonialSection page="career" head="Meet Our Stars" />
      <JobApplicationForm />
      <SunstarCareersSection data={careerPageData?.readyToJoin} />
      <SunstarInfoCards
        infoCards={offeringSection?.comeShineWithUs}
        onCardClick={handleCardClick}
      />

    </div>
  );
};

export default CareerMain;