import { Helmet } from 'react-helmet'
import { useGetMetas } from '../../ApiHooks/useMetaHook';
import Banner from './Components/Banner';
import LiveBanner from './Components/LiveBanner';
import SliderSection from './Components/SliderSection';
import WhyPartner from './Components/whypartner';
import HowItWorks from './Components/HowItWorks';
import WhatWeDeliver from './Components/whatwedeliver';
import { useEffect } from 'react';
import TestimonialSection from '../../Components/TestimonialSection';
import useUpdatePagesHook from '../../ApiHooks/useUpdatePagesHook';
import EnquieryForm from './Components/EnquieryForm';

const DevelopersOwners = () => {
    const { Testimonials } = useUpdatePagesHook();

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    const { data: metas } = useGetMetas();

    const developersMeta = Array.isArray(metas)
    ? metas.find(meta => meta.page === "developersowners")
    : null;

    return (
        <div>
            <Helmet>
                <title>{developersMeta?.metaTitle || 'Developers & Owners'}</title>
                <meta name="description" content={developersMeta?.metaDescription || ''} />
                <meta name="keywords" content={developersMeta?.metaKeywords?.join(', ') || ''} />
            </Helmet>
            <Banner />
            <LiveBanner />
            <SliderSection />
            <WhyPartner />
            <HowItWorks />
            <WhatWeDeliver />
            <TestimonialSection Testimonials={Testimonials} />
            <EnquieryForm/>

        </div>
    )
}

export default DevelopersOwners
