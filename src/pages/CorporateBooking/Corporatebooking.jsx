import BannerSection from "../../Components/BannerSection";
import { bannerData,businessPlatformFeatures,WhyUsSection } from "../../Data/CoorporateBooking"; 
import BusinessPlatform from "./Components/BusinessPlatform";
import SunstarEnquiryForm from "./Components/SunstarEnquiryForm";

const CorporateBooking = () => {
  return (
    <div>
      <BannerSection data={bannerData} text='md:text-[48px]' lineh='md:leading-[50px]'  />
      <BannerSection data={WhyUsSection} text='md:text-[45px] text-[28px]' textC="black" ptext='[26px]' lineh='md:leading-[50px]' bg='bg-white' paddTop='pt-0' />
      <hr className="content"/>
      <BusinessPlatform features={businessPlatformFeatures} />
      <SunstarEnquiryForm/>

    </div>
  );
};

export default CorporateBooking;
