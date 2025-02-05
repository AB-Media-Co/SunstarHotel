import HeroSection from './Components/HeroSection'
import ValuesSection from './Components/ValuesSection'
import { heroData, valuesData, testimonialData, hotels, AboutUsSection5cards } from '../../Data/AboutSectionData';
import TestimonialSection from '../../Components/TestimonialSection';
import SunstarBrandsSection from './Components/SunstarBrandsSection';
import ShineSection from './Components/ShineSection';
import CompnayCards from './Components/CompnayCards';

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
      <ShineSection />
      <CompnayCards cards={AboutUsSection5cards} />
      <TestimonialSection
        title={testimonialData.title}
        testimonials={testimonialData.testimonials}
        backgroundImage={testimonialData.backgroundImage}
        
      />
      <SunstarBrandsSection hotels={hotels} />
    </div> 
  )
}

export default AboutUs
