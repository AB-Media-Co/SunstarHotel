import { Helmet } from "react-helmet";
import useUpdatePagesHook from "../../ApiHooks/useUpdatePagesHook";
import BannerSection from "../../Components/BannerSection";
import BusinessPlatform from "./Components/BusinessPlatform";
import SunstarEnquiryForm from "./Components/SunstarEnquiryForm";
import { useGetMetas } from "../../ApiHooks/useMetaHook";
import FormData from "./Components/FormData";
import { useEffect } from "react";

const CorporateBooking = () => {
  const { CoorporateBooking } = useUpdatePagesHook();

  const { data: metas } = useGetMetas();
  const whySunstarMeta = metas?.find(meta => meta.page === "corporatebooking");
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  return (
    <div>
      <Helmet>
        <title>{whySunstarMeta?.metaTitle || 'CoorporateBooking'}</title>
        <meta name="description" content={whySunstarMeta?.metaDescription || ''} />
        <meta name="keywords" content={whySunstarMeta?.metaKeywords?.join(', ') || ''} />
      </Helmet>
      <BannerSection
        data={CoorporateBooking?.CoorporateBookingHeadContent}
        text="text-mobile/h3 md:text-desktop/h3"
        lineh="text-mobile/body/1 md:leading-[50px]"
        paddTop="pt-[80px]"
        imgClass="px-10"
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
      <BusinessPlatform features={CoorporateBooking?.BusinessPlatformSection} />
      {/* <SunstarEnquiryForm /> */}


      <FormData />

    </div>
  );
};

export default CorporateBooking;
