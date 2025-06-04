import { Helmet } from "react-helmet"
import { useGetHotels } from "../../ApiHooks/useHotelHook2"
import { useGetMetas } from "../../ApiHooks/useMetaHook"
import { enquiries, hotels } from "../../Data/ContactUsData"
import Banner from "./Components/Banner"
import HotelsInfo from "./Components/HotelsInfo"
import InstagramData from "./Components/InstagramData"
import OtherEnquiries from "./Components/OtherEnquiries"
import { useEffect } from "react"

const ContactUs = () => {
    const { data: hotels } = useGetHotels();
    const { data: metas } = useGetMetas();
    const contactUsMeta = Array.isArray(metas)
    ? metas.find(meta => meta.page === "contactus")
    : null;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Helmet>
                <title>{contactUsMeta?.metaTitle || 'Contact Us'}</title>
                <meta name="description" content={contactUsMeta?.metaDescription || ''} />
                <meta name="keywords" content={contactUsMeta?.metaKeywords?.join(', ') || ''} />
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
