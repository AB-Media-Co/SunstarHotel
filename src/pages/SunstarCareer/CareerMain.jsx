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

const CareerMain = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return (
    <div>
      <Herosection/>
      {/* <JobRoles/> */}
      <SunstarValuesCard/>
      <JoinTeamSection/>
      <WhyWorkWithUs/>
      <JobApplicationForm/>
      <ImagesGallery/>
      <TestimonialSection page="career"/>
      <SunstarCareersSection/>
      <CareerPageFaq/>

    </div>
  )
}

export default CareerMain
