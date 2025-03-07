// import { useState } from 'react'
import { HomePageSection5cards, section1Data, section2HotelData } from '../../Data/HomePageData'
import Section1 from './Components/Section1'
import Section2Hotel from './Components/Section2Hotel'
import Section3 from './Components/Section3'
import Section4 from './Components/Section4'
import Section5 from './Components/Section5'
// import CityPagesOptions from '../Citypage/CityPagesOptions'
// import Section6Testimonials from './Components/Section6Testimonials'

const Home = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
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
    </div>
  )
}

export default Home
