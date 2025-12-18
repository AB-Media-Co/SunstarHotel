import React from 'react'
import InTheMediaPage from './Component/InTheMediaPage'
import SunstarMediaSection from './Component/SunstarMediaSection'
import SunstarInfoCards from './Component/SunstarInfoCards'
import ImageGallery from '../../Components/ImageGallery'
import { Helmet } from 'react-helmet'
import { useGetMetas } from '../../ApiHooks/useMetaHook'
import { FileText, Star, Building, User, Monitor, Sun, Phone } from 'lucide-react';
import { usePricing } from '../../Context/PricingContext';

const IntheMediaMain = () => {
    const { data: metas } = useGetMetas();
    const { openHotelModal } = usePricing();

    const inthemedia = Array.isArray(metas)
        ? metas.find(meta => meta.page === "in-the-media")
        : null;



    const infoCards = [
        {
            id: 1,
            title: "For the Press",
            description: "Access everything you need to pen down an amazing article.",
            buttonText: "Get the scoop",
            icon: <FileText className="w-8 h-8 text-primary-green" />,
            illustration: "/images/forthepress.svg"

        },
        {
            id: 2,
            title: "Why Sunstar?",
            description: "Hear all about our story & see what makes us so special.",
            buttonText: "Check us out",
            icon: <Star className="w-8 h-8 text-primary-green" />,
            illustration: "/images/whysunsar.svg"

        },
        {
            id: 3,
            title: "Developers & Owners",
            description: "We're growing rapidly across the country, don't miss out.",
            buttonText: "Partner with us",
            icon: <Building className="w-8 h-8 text-primary-green" />,
            illustration: "/images/dev.svg"

        }
    ];
    return (
        <div>
            <Helmet>
                <title>{inthemedia?.metaTitle || 'Tour & Travel - Sunstar Hotels'}</title>
                <meta name="description" content={inthemedia?.metaDescription || ''} />
                <meta name="keywords" content={inthemedia?.metaKeywords?.join(', ') || ''} />
            </Helmet>
            <InTheMediaPage />
            <SunstarMediaSection />

            <SunstarInfoCards
                infoCards={infoCards}
                onCardClick={(card) => {
                    if (card?.title === 'Our Hotels' || card?.buttonText === 'View Hotels' || card?.title === 'Developers & Owners') { // Included Developers & Owners just in case
                        openHotelModal();
                    }
                }}
            />
            <div className='content'>

                <ImageGallery />
            </div>

        </div>
    )
}

export default IntheMediaMain
