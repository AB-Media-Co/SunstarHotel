import { Helmet } from "react-helmet"
import { useGetHotels } from "../../ApiHooks/useHotelHook2"
import { enquiries, hotels } from "../../Data/ContactUsData"
import Banner from "./Components/Banner"
import HotelsInfo from "./Components/HotelsInfo"
import InstagramData from "./Components/InstagramData"
import OtherEnquiries from "./Components/OtherEnquiries"

const ContactUs = () => {
    const { data: hotels } = useGetHotels();

    return (
        <div>
            <Helmet>
                <title>Contact Us</title>
                <meta name="" content={``} />
                <meta name="" content={``} />
            </Helmet>
            <Banner />
            <HotelsInfo hotels={hotels} />
            <hr className="content" />
            <OtherEnquiries enquiries={enquiries} />
            {/* <StayInTheLoop/> */}
            <InstagramData />
        </div>
    )
}

export default ContactUs
