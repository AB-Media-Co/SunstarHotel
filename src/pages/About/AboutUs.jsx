import HeroSection from './Components/HeroSection'
import ValuesSection from './Components/ValuesSection'
import { heroData, testimonialData, AboutUsSection5cards } from '../../Data/AboutSectionData';
import TestimonialSection from '../../Components/TestimonialSection';
import SunstarBrandsSection from './Components/SunstarBrandsSection';
import ShineSection from './Components/ShineSection';
import CompnayCards from './Components/CompnayCards';
import { useGetHotels } from '../../ApiHooks/useHotelHook2';
import useUpdatePagesHook from '../../ApiHooks/useUpdatePagesHook';
import { Helmet } from 'react-helmet';
import { useGetMetas } from '../../ApiHooks/useMetaHook';
import { useEffect } from 'react';
import { usePricing } from '../../Context/PricingContext';
import { SeoData } from '../../Data/SeoData';

const AboutUs = () => {
  // const { data: hotels } = useGetHotels();
  const { whysunstarValue, Testimonials, offeringSection } = useUpdatePagesHook();
  const { openHotelModal } = usePricing();
  const { data: metas } = useGetMetas();
  const whySunstarMeta = Array.isArray(metas)
    ? metas.find(meta => meta.page === "whysunstar")
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-sans ">
      <Helmet>
        <title>{whySunstarMeta?.metaTitle || 'WhySunstar'}</title>
        <meta name="description" content={whySunstarMeta?.metaDescription || ''} />
        <meta name="keywords" content={whySunstarMeta?.metaKeywords?.join(', ') || ''} />
        <meta property="og:title" content={SeoData.aboutUs.title} />
        <meta property="og:description" content={SeoData.aboutUs.description} />
      </Helmet>
      <HeroSection
        title={heroData?.title}
        highlightText={heroData?.highlightText}
        subtitle={heroData?.subtitle}
        description={whysunstarValue?.heroSectionDescription}
        imageSrc={heroData?.imageSrc}
        tags={heroData?.tags}
      />
      <ValuesSection />
      <ShineSection />
      <CompnayCards
        data={offeringSection?.whySunstar}
        onCardClick={(card) => {
          if (card?.title === 'Our Hotels' || card?.buttonText === 'View Hotels') {
            openHotelModal();
          }
        }}
      />


      <TestimonialSection
        page='whysunstar'

      />

      {/* <SunstarBrandsSection hotels={hotels?.hotels} /> */}
    </div>
  )
}

export default AboutUs
