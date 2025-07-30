import { useEffect } from "react"
import Herosection from "./Components/Herosection"
import JobApplicationForm from "./Components/JobApplicationForm"
import JobRoles from "./Components/JobRoles"
import JoinTeamSection from "./Components/JoinTeamSection"
import ImagesGallery from "../TourAndTravelPaage/TourAndTravelMain/Component/ImagesGallery"
import SunstarValuesCard from "./Components/SunstarValuesCard"
import WhyWorkWithUs from "./Components/WhyWorkWithUs"
import SunstarCareersSection from "./Components/SunstarCareersSection"

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
      <SunstarCareersSection/>
    </div>
  )
}

export default CareerMain
