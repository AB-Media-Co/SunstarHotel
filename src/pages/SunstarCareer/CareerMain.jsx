import { useEffect } from "react";
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

const CareerMain = () => {
  const { data: metas } = useGetMetas();
  const { data: careerPageData } = useGetCareersPage();
  console.log(careerPageData)

  const career = Array.isArray(metas)
    ? metas.find((meta) => meta.page === "career")
    : null;

  const staticInfoCards = [
    {
      id: 1,
      buttonText: "Check us out",
      icon: <FileText className="w-8 h-8 text-primary-green" />,
      illustration: "/images/whybloom.svg",
    },
    {
      id: 2,
      buttonText: "Catch the coverage",
      icon: <Mic className="w-8 h-8 text-primary-green" />,
      illustration: "/images/blog.svg",
    },
    {
      id: 3,
      buttonText: "Partner with us",
      icon: <Building className="w-8 h-8 text-primary-green" />,
      illustration: "/images/dev&owner.svg",
    },
  ];

  const mergedInfoCards = careerPageData?.simpleCards?.map((apiCard, index) => ({
    ...apiCard,
    ...(staticInfoCards[index] || {}),
  }));

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
      <JobApplicationForm />
      <div className="relative flex  flex-col justify-between content items-center  z-0">

      <ImageGallery path="career" />
      </div>
      <TestimonialSection page="career" head="Meet Our Stars" />
      <SunstarCareersSection data={careerPageData?.readyToJoin} />
      <SunstarInfoCards infoCards={mergedInfoCards || staticInfoCards} />
    </div>
  );
};

export default CareerMain;
