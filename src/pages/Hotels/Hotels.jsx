import Banner from "./Components/Banner"
import HotelCard from "./Components/HotelCard"
import RoomLayout from "./Components/RoomLayout"
import { rooms, Amenities, OurClientsData, locationData, businessPlatformFeatures, AbouSunstartGrand, HotelPageImgGallery, faqs } from "../../Data/HotelRoomsData";
import AmenitiesList from "../../Components/AmenitiesList";
import TestimonialSection from "../../Components/TestimonialSection";
import BannerSection from "../../Components/BannerSection";
import ImageGallery from "../../Components/ImageGallery"
import FAQSection from "./Components/FAQsection";
import MapGoogle from "./Components/MapGoogle";
import HotelImageCarousel from "./Components/HotelImageCarousel";

const Hotels = () => {
  return (
    <div>
      <Banner businessPlatformFeatures={businessPlatformFeatures} />
      <HotelCard />
      <RoomLayout rooms={rooms} />
      <AmenitiesList
        title={Amenities.title}
        subtitle={Amenities.subtitle}
        amenities={Amenities.List}
      />

      <TestimonialSection
        title={OurClientsData.title}
        testimonials={OurClientsData.testimonials}
        backgroundImage={OurClientsData.backgroundImage}
      />
      {/* <PropertyPolicies propertyData={propertyData} /> */}
      {/* <Location locationData={locationData} /> */}
      <MapGoogle locationData={locationData} />
      {/* <Carousel
        features={businessPlatformFeatures}
        height="h-[600px]"
        buttonColor="#FDC114"
        iconSize="h-6 w-6"
        NavClass='relative left-[0] bottom-[45px]'
        className='hidden'
        autoPlay={true}
      /> */}
      <HotelImageCarousel />

      <BannerSection data={AbouSunstartGrand} text='text-[26px] md:text-desktop/h2' imgClass="rounded-[20px] h-[350px]" textC="black"
        ptext=' text-[14px] md:text-[18px]' lineh='[60px]' bg='bg-white' paddTop='0 items-start gap-10' />

      <div className="relative z-10 content">
        <ImageGallery breakpointColumnsObj={HotelPageImgGallery.breakpointColumnsObj} items={HotelPageImgGallery.items} />
      </div>

      <FAQSection faqs={faqs} />
      <img src="/images/HotelsSectionImg/Img.png" alt="" className="h-[130px] w-full" />


    </div>
  )
}

export default Hotels;
