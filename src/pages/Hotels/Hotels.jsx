import Banner from "./Components/Banner"
import HotelCard from "./Components/HotelCard"
import RoomLayout from "./Components/RoomLayout"
import { rooms, Amenities, OurClientsData,  HotelPageImgGallery, faqs } from "../../Data/HotelRoomsData";
import AmenitiesList from "../../Components/AmenitiesList";
import TestimonialSection from "../../Components/TestimonialSection";
import BannerSection from "../../Components/BannerSection";
import ImageGallery from "../../Components/ImageGallery"
import FAQSection from "./Components/FAQsection";
// import MapGoogle from "./Components/MapGoogle";
import HotelImageCarousel from "./Components/HotelImageCarousel";
import Location from "./Components/Location";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleHotelWithCode } from "../../ApiHooks/useHotelHook2";
import Loader from "../../Components/Loader";
import { AmenitiesList2 } from "../../Components/AmenitiesList2";
import useUpdatePagesHook from "../../ApiHooks/useUpdatePagesHook";

const Hotels = () => {
  const { hotelCode } = useParams();
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { amenities } = useUpdatePagesHook();


  useEffect(() => {
    if (hotelCode) {
      const fetchHotel = async () => {
        try {
          const data = await getSingleHotelWithCode(hotelCode);
          setHotelData(data?.hotel);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchHotel();
    }
  }, [hotelCode]);

  if (loading) {
    return <div><Loader/></div>; 
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  console.log(hotelData)



  return (
    <div>
      <Banner businessPlatformFeatures={hotelData?.images} />
      <HotelCard hotelData={hotelData} />
      <RoomLayout rooms={rooms} />
      {/* <AmenitiesList
        title={Amenities.title}
        subtitle={Amenities.subtitle}
        amenities={Amenities.List}
      /> */}

      <AmenitiesList2 amenities={amenities}/>

      <TestimonialSection
        title={OurClientsData.title}
        testimonials={OurClientsData.testimonials}
        backgroundImage={OurClientsData.backgroundImage}
      />
      {/* <PropertyPolicies propertyData={propertyData} /> */}
      <Location address={hotelData?.name+ " " + hotelData?.location} />
      {/* <MapGoogle locationData={locationData} /> */}
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

      <BannerSection data={hotelData} text='text-[26px] md:text-desktop/h2' imgClass="rounded-[20px] h-[350px]" textC="black"
        ptext=' text-[14px] md:text-[18px]' lineh='[60px]' bg='bg-primary-white' paddTop='0 items-start gap-10' />

      <div className="relative z-10 content">
        <ImageGallery breakpointColumnsObj={HotelPageImgGallery.breakpointColumnsObj} items={HotelPageImgGallery.items} />
      </div>

      <FAQSection faqs={faqs} />
      <img src="/images/HotelsSectionImg/Img.png" alt="" className="h-[130px] w-full" />


    </div>
  )
}

export default Hotels;
