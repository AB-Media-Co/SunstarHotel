import { Helmet } from "react-helmet";
import useUpdatePagesHook from "../../ApiHooks/useUpdatePagesHook";
import BannerSection from "../../Components/BannerSection";
import BusinessPlatform from "./Components/BusinessPlatform";
import SunstarEnquiryForm from "./Components/SunstarEnquiryForm";
import { useGetMetas } from "../../ApiHooks/useMetaHook";
import FormData from "./Components/FormData";
import { useEffect, useState } from "react";
import FAQSectionWithAPI from "../../Components/FAQSectionWithAPI";
import CorporateSignupModal from "./Components/CorporateSignupModal"; // ⬅️ NEW
import Partnerlogos from "../Home/Components/Partnerlogos";
import ExclusiveBenifits from "./Components/ExclusiveBenifits";
import TestimonialSection from "../../Components/TestimonialSection"
import SunstarInfoCards from "../InTheMedia/Component/SunstarInfoCards";
import ImagesGallery from "../TourAndTravelPaage/TourAndTravelMain/Component/ImagesGallery";
import CompnayCards from "../About/Components/CompnayCards";
import { usePricing } from "../../Context/PricingContext";


const CorporateBooking = () => {
  const { CoorporateBooking, offeringSection } = useUpdatePagesHook();
  console.log(offeringSection)
  const { data: metas } = useGetMetas();
  const { openHotelModal } = usePricing();
  const [openSignup, setOpenSignup] = useState(false); // ⬅️ NEW

  const whySunstarMeta = Array.isArray(metas)
    ? metas.find(meta => meta.page === "corporatebooking")
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLoginSignup = () => {
    setOpenSignup(true); // ⬅️ open modal
  };

  return (
    <div>
      <Helmet>
        <title>{whySunstarMeta?.metaTitle || 'CoorporateBooking'}</title>
        <meta name="description" content={whySunstarMeta?.metaDescription || ''} />
        <meta name="keywords" content={whySunstarMeta?.metaKeywords?.join(', ') || ''} />
      </Helmet>

      <BannerSection
        data={CoorporateBooking?.CoorporateBookingHeadContent}
        text="text-mobile/h2 md:text-desktop/h2"
        lineh="text-mobile/body/1 md:leading-[50px]"
        paddTop="pt-[80px]"
        imgClass="px-10"
        buttton={true}
        onButtonClick={handleLoginSignup} // ⬅️ opens modal
      />

      <BannerSection
        data={CoorporateBooking?.CoorporateBookingDescription}
        text="text-mobile/h3 md:text-desktop/h3"
        textC="black"
        ptext="text-mobile/body/2 md:text-[16px] "
        lineh="text-mobile/body/1 md:leading-[50px]"
        bg="bg-primary-white"
        paddTop="pt-0"
        imgClass="px-10"
      />

      <hr className="content" />

      <ExclusiveBenifits data={CoorporateBooking?.BenefitsSection} />
      {/* <BusinessPlatform features={CoorporateBooking?.BusinessPlatformSection} /> */}

      {/* <CompnayCards data={offeringSection?.corporate} /> */}

      <Partnerlogos category="Corporate" />

      <TestimonialSection page="coorporatebooking" />
      {/* <SunstarEnquiryForm /> */}
      <FormData />
      <ImagesGallery path="" />

      <SunstarInfoCards
        infoCards={offeringSection?.corporate}
        onCardClick={(card) => {
          if (card?.title === 'Our Hotels' || card?.buttonText === 'View Hotels') {
            openHotelModal();
          }
        }}
      />
      <FAQSectionWithAPI pageName="corporate-booking" />

      {/* Modal */}
      <CorporateSignupModal open={openSignup} onClose={() => setOpenSignup(false)} />

    </div>
  );
};

export default CorporateBooking;
