import { useEffect } from "react";
import { Helmet } from "react-helmet"
import { useGetMetas } from "../../ApiHooks/useMetaHook";
import Banner from "./Component/Banner";
import Description from "./Component/Description";
import BenefitsCard from "./Component/BenefitsCard";
import DayRoomTandC from "./Component/DayRoomTandC";
import DaysUseRoomFaq from "./Component/DaysUseRoomFaq";
import Rooms from "./Component/Rooms";
import ImageGallery from "../../Components/ImageGallery";

const DayUseRoom = () => {

    const { data: metas } = useGetMetas();
    const contactUsMeta = Array.isArray(metas)
        ? metas.find(meta => meta.page === "dayuseroom")
        : null;


    return (
        <div>
            <Helmet>
                <title>{contactUsMeta?.metaTitle || 'Day Use Room'}</title>
                <meta name="description" content={contactUsMeta?.metaDescription || ''} />
                <meta name="keywords" content={contactUsMeta?.metaKeywords?.join(', ') || ''} />
            </Helmet>
            <Banner />
            <Description />
            <BenefitsCard />
            <Rooms />
            <DayRoomTandC />
            {/* <ImageGallery /> */}
            <div className="relative flex  flex-col justify-between content items-center  z-0">
                <ImageGallery />
            </div>
            <DaysUseRoomFaq />
        </div>
    )
}

export default DayUseRoom
