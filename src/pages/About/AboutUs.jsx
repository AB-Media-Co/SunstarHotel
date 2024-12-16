import HeroSection from './Components/HeroSection'
import ValuesSection from './Components/ValuesSection'
import { heroData, valuesData,testimonialData,hotels } from '../../Data/AboutSectionData';
import TestimonialSection from '../../Components/TestimonialSection';
import SunstarBrandsSection from './Components/SunstarBrandsSection';

const AboutUs = () => {
  return (
    <div className="font-sans ">
      <HeroSection
        title={heroData.title}
        highlightText={heroData.highlightText}
        subtitle={heroData.subtitle}
        description={heroData.description}
        imageSrc={heroData.imageSrc}
        tags={heroData.tags}
      />
      <ValuesSection
        title="Our Values Make Us Loved By Our Guests"
        values={valuesData}
      />
       <TestimonialSection
        title={testimonialData.title}
        testimonials={testimonialData.testimonials}
        backgroundImage={testimonialData.backgroundImage}
      />
      <SunstarBrandsSection hotels={hotels}/>
    </div>
  )
}

export default AboutUs
