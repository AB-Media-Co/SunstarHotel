import BannerSection from "../../Components/BannerSection";
import { bannerData, businessPlatformFeatures, WhyUsSection } from "../../Data/CoorporateBooking";
import BusinessPlatform from "./Components/BusinessPlatform";
import SunstarEnquiryForm from "./Components/SunstarEnquiryForm";

const CorporateBooking = () => {
  return (
    <div>
      <BannerSection
        data={bannerData}
        text="text-mobile/h2 md:text-desktop/h2"
        lineh="text-mobile/body/1 md:leading-[50px]"
      />
      <BannerSection
        data={WhyUsSection}
        text="text-mobile/h3 md:text-desktop/h3"
        textC="black"
        ptext="text-mobile/body/2 md:text-desktop/body/large"
        lineh="text-mobile/body/1 md:leading-[50px]"
        bg="bg-white"
        paddTop="pt-0"
      />
      <hr className="content" />
      <BusinessPlatform features={businessPlatformFeatures} />
      <SunstarEnquiryForm />
    </div>
  );
};

export default CorporateBooking;
