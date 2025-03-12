import Amenities from "./Amenities/Amenities";
import ContactUsPage from "./ContactUs/ContactUsPage";
import CoorporateBooking from "./CoorporateBooking/CoorporateBooking";
// import Faq from "./Faq/Faq";
import Images from "./GalleryImages/Images";
import EditHomePageData from "./HeroSection/EditHomePageData";
import OurValue from "./OurValue/OurValue";
import ShineSectionUpdate from "./ShineSection/ShineSectionUpdate";
import Testimonials from "./Testimonials/Testimonials";
import WhatWeOffering from "./WhatWeOffering/WhatWeOffering";

const UpdatePage = () => {
  return (
    <div className="p-8 pt-24 flex flex-col gap-8 bg-gray-100 min-h-screen  ">
      <h1 className="text-desktop/h3">Pages Sections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <EditHomePageData />
        <OurValue />
        <CoorporateBooking />
        <ContactUsPage />

      </div>
      <h1 className="text-desktop/h3">Common Sections</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* <Amenities /> */}
        <Images />
        <ShineSectionUpdate />
        <WhatWeOffering />
        <Testimonials />
        {/* <Faq /> */}

      </div>
    </div>
  );
};

export default UpdatePage;
