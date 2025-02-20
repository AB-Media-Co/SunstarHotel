import useUpdatePagesHook from "../../ApiHooks/useUpdatePagesHook";
import BannerSection from "../../Components/BannerSection";
import {  businessPlatformFeatures } from "../../Data/CoorporateBooking";
import BusinessPlatform from "./Components/BusinessPlatform";
import SunstarEnquiryForm from "./Components/SunstarEnquiryForm";

const CorporateBooking = () => {
  const { CoorporateBooking } = useUpdatePagesHook();

  return (
    <div>
      <BannerSection
        data={CoorporateBooking?.CoorporateBookingHeadContent}
        text="text-mobile/h2 md:text-desktop/h2"
        lineh="text-mobile/body/1 md:leading-[50px]"
        paddTop="pt-[80px]"
      />
      <BannerSection
        data={CoorporateBooking?.CoorporateBookingDescription}
        text="text-mobile/h3 md:text-desktop/h3 md:font-bold"
        textC="black"
        ptext="text-mobile/body/2 md:text-[16px] "
        lineh="text-mobile/body/1 md:leading-[50px]"
        bg="bg-primary-white"
        paddTop="pt-0"
      />
      <hr className="content" />
      <BusinessPlatform features={businessPlatformFeatures} />
      <SunstarEnquiryForm />
    </div>
  );
};

export default CorporateBooking;
