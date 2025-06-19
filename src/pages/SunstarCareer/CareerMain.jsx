import { useEffect } from "react"
import Herosection from "./Components/Herosection"
import JobApplicationForm from "./Components/JobApplicationForm"
import JobRoles from "./Components/JobRoles"
import JoinTeamSection from "./Components/JoinTeamSection"
import ImagesGallery from "../TourAndTravelPaage/TourAndTravelMain/Component/ImagesGallery"

const CareerMain = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return (
    <div>
      <Herosection/>
      {/* <JobRoles/> */}
      <JobApplicationForm/>
      <JoinTeamSection/>
      <ImagesGallery/>
    </div>
  )
}

export default CareerMain
