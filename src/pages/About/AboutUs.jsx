import HeroSection from './Components/HeroSection'
import ValuesSection from './Components/ValuesSection'
import { heroData, valuesData, testimonialData,  AboutUsSection5cards } from '../../Data/AboutSectionData';
import TestimonialSection from '../../Components/TestimonialSection';
import SunstarBrandsSection from './Components/SunstarBrandsSection';
import ShineSection from './Components/ShineSection';
import CompnayCards from './Components/CompnayCards';
import { useGetHotels } from '../../ApiHooks/useHotelHook2';
import useUpdatePagesHook from '../../ApiHooks/useUpdatePagesHook';

const AboutUs = () => {
  const { data: hotels } = useGetHotels();
  const { whysunstarValue ,Testimonials} = useUpdatePagesHook();

  return (
    <div className="font-sans ">
      <HeroSection
        title={heroData.title}
        highlightText={heroData.highlightText}
        subtitle={heroData.subtitle}
        description={whysunstarValue.heroSectionDescription}
        imageSrc={heroData.imageSrc}
        tags={heroData.tags}
      />
      <ValuesSection />
      <ShineSection />
      <CompnayCards cards={AboutUsSection5cards} />
      <TestimonialSection
        title={testimonialData.title}
        testimonials={testimonialData.testimonials}
        
        />

<TestimonialSection
       Testimonials  = {Testimonials}
       backgroundImage={testimonialData.backgroundImage}
      />

      <SunstarBrandsSection hotels={hotels?.hotels} />
    </div> 
  )
}

export default AboutUs
