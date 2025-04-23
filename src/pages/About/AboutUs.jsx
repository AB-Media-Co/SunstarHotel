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

const AboutUs = () => {
  // const { data: hotels } = useGetHotels();
  const { whysunstarValue, Testimonials } = useUpdatePagesHook();
  const { data: metas } = useGetMetas();
  const whySunstarMeta = metas?.find(meta => meta.page === "whysunstar");
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return ( 
    <div className="font-sans ">
       <Helmet>
        <title>{whySunstarMeta?.metaTitle ||  'WhySunstar'}</title>
        <meta name="description" content={whySunstarMeta?.metaDescription || ''} />
        <meta name="keywords" content={whySunstarMeta?.metaKeywords?.join(', ') || ''} />
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
      <CompnayCards  />


      <TestimonialSection
        Testimonials={Testimonials}
        backgroundImage={testimonialData.backgroundImage}
      />

      {/* <SunstarBrandsSection hotels={hotels?.hotels} /> */}
    </div>
  )
}

export default AboutUs
