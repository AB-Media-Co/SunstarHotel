// import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { HomePageSection5cards, section1Data, section2HotelData } from '../../Data/HomePageData'
import Section1 from './Components/Section1'
import Section2Hotel from './Components/Section2Hotel'
import Section3 from './Components/Section3'
import Section4 from './Components/Section4'
import Section5 from './Components/Section5'
import TestimonialSection from '../../Components/TestimonialSection'
import { testimonialData } from '../../Data/AboutSectionData'
import useUpdatePagesHook from '../../ApiHooks/useUpdatePagesHook'
// import CityPagesOptions from '../Citypage/CityPagesOptions'
// import Section6Testimonials from './Components/Section6Testimonials'

const Home = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const {  Testimonials } = useUpdatePagesHook();


  return (
    <div>
      <Helmet>
        <title>Sunstar</title>
        <meta name="" content={``} />
        <meta name="" content={``} />
      </Helmet>
      <Section1 section1Data={section1Data} />
      {/* <div className='cursor-pointer content' onClick={() => setIsModalOpen(true)}>
        CityOpen
      </div> */}
      {/* {isModalOpen && <CityPagesOptions isOpen={isModalOpen} />} */}

      <Section2Hotel section2HotelData={section2HotelData} />
      <Section3 />
      <Section4 />
      <Section5 cards={HomePageSection5cards} />
      {/* <Section6Testimonials testimonials={HomePagetestimonials}/> */}
      <TestimonialSection
        Testimonials={Testimonials}
        // backgroundImage={testimonialData.backgroundImage}
      />
    </div>
  )
}

export default Home
