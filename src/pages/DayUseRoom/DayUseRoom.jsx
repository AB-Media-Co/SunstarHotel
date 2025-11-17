import { useEffect } from "react";
import { Helmet } from "react-helmet"
import { useGetMetas } from "../../ApiHooks/useMetaHook";
import Banner from "./Component/Banner";
import Description from "./Component/Description";
import BenefitsCard from "./Component/BenefitsCard";
import DayRoomTandC from "./Component/DayRoomTandC";
import FAQSectionWithAPI from "../../Components/FAQSectionWithAPI";
import Rooms from "./Component/Rooms";
import ImageGallery from "../../Components/ImageGallery";
import { useGetDayUseContent } from "../../ApiHooks/useDayUseRoomHook";
import Loader from "../../Components/Loader";

const DayUseRoom = () => {
    const { data, isFetching, isLoading } = useGetDayUseContent();
    console.log(data)

    const { data: metas } = useGetMetas();
    const contactUsMeta = Array.isArray(metas)
        ? metas.find(meta => meta.page === "dayuseroom")
        : null;

    // Show loader while fetching data
    if (isFetching || isLoading) {
        return <Loader />;
    }

    // Extract data safely with fallbacks
    const pageData = data || {};
    const heroData = pageData?.hero || {};
    const descCardData = pageData?.descCard || {};
    const benefitsData = pageData?.benefits || [];
    const tandcData = pageData?.tandc || {};

    return (
        <div>
            <Helmet>
                <title>{contactUsMeta?.metaTitle || 'Day Use Room'}</title>
                <meta name="description" content={contactUsMeta?.metaDescription || ''} />
                <meta name="keywords" content={contactUsMeta?.metaKeywords?.join(', ') || ''} />
            </Helmet>
            <Banner hero={heroData} />
            <Description descCard={descCardData} />
            <BenefitsCard benefits={benefitsData} />
            <Rooms />
            <DayRoomTandC tandc={tandcData} />
            <div className="relative flex  flex-col justify-between content items-center  z-0">
                <ImageGallery />
            </div>
            <FAQSectionWithAPI pageName="Day Stays Rooms" />
        </div>
    )
}

export default DayUseRoom
