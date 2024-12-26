import { enquiries, hotels, images } from "../../Data/ContactUsData"
import Banner from "./Components/Banner"
import HotelsInfo from "./Components/HotelsInfo"
import InstagramGallery from "./Components/InstagramGallery"
import OtherEnquiries from "./Components/OtherEnquiries"

const ContactUs = () => {
    return (
        <div>
            <Banner />
            <HotelsInfo hotels={hotels}/>
            <hr className="content"/>
            <OtherEnquiries enquiries={enquiries}/>
            <InstagramGallery images={images}/>
        </div>
    )
}

export default ContactUs
