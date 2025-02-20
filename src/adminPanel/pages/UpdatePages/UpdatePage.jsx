import Amenities from "./Amenities/Amenities"
import CoorporateBooking from "./CoorporateBooking/CoorporateBooking"
import Faq from "./Faq/Faq"
import Images from "./GalleryImages/Images"
import HeroSection from "./HeroSection/HeroSection"
import HomePageDescription from "./HeroSection/HomePageDescription"
import ManageLocation from "./Locations/ManageLocation"
import OurValue from "./OurValue/OurValue"
import ShineSectionUpdate from "./ShineSection/ShineSectionUpdate"
import Testimonials from "./Testimonials/Testimonials"
import WhatWeOffering from "./WhatWeOffering/WhatWeOffering"

const UpdatePage = () => {
  return (
    <div className="p-6 pt-24 bg-gray-50 min-h-screen">
        <HeroSection />
        <HomePageDescription/>
        <Amenities />
        <ManageLocation />
        <Images />
        <ShineSectionUpdate />
        <WhatWeOffering />
        <OurValue/>
        <Testimonials/>

        <CoorporateBooking/>
        <Faq/>
    
    </div>
  )
}

export default UpdatePage
