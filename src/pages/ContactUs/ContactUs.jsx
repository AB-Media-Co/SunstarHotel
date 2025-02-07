import { enquiries, hotels } from "../../Data/ContactUsData"
import Banner from "./Components/Banner"
import HotelsInfo from "./Components/HotelsInfo"
import InstagramData from "./Components/InstagramData"
import OtherEnquiries from "./Components/OtherEnquiries"

const ContactUs = () => {
    return (
        <div>
            <Banner />
            <HotelsInfo hotels={hotels}/>
            <hr className="content"/>
            <OtherEnquiries enquiries={enquiries}/>
            {/* <StayInTheLoop/> */}
            <InstagramData/>
        </div>
    )
}

export default ContactUs
