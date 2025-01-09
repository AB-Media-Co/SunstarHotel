import { enquiries, hotels } from "../../Data/ContactUsData"
import Banner from "./Components/Banner"
import HotelsInfo from "./Components/HotelsInfo"
import OtherEnquiries from "./Components/OtherEnquiries"
import StayInTheLoop from "./Components/StayInLoop"

const ContactUs = () => {
    return (
        <div>
            <Banner />
            <HotelsInfo hotels={hotels}/>
            <hr className="content"/>
            <OtherEnquiries enquiries={enquiries}/>
            <StayInTheLoop/>
        </div>
    )
}

export default ContactUs
