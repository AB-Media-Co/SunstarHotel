import Banner from "./Components/Banner"
import HotelCard from "./Components/HotelCard"
import RoomLayout from "./Components/RoomLayout"
import {  OurClientsData,  HotelPageImgGallery } from "../../Data/HotelRoomsData";
import TestimonialSection from "../../Components/TestimonialSection";
import BannerSection from "../../Components/BannerSection";
import ImageGallery from "../../Components/ImageGallery"
import FAQSection from "./Components/FAQsection";
import HotelImageCarousel from "./Components/HotelImageCarousel";
import Location from "./Components/Location";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleHotelWithCode } from "../../ApiHooks/useHotelHook2";
import Loader from "../../Components/Loader";
import { AmenitiesList2 } from "../../Components/AmenitiesList2";
import BottomRoomSticky from "../../Components/BottomRoomSticky";

const Hotels = () => {
  const { hotelCode } = useParams();
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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
      <RoomLayout rooms={hotelData?.rooms} />
      {/* <AmenitiesList
        title={Amenities.title}
        subtitle={Amenities.subtitle}
        amenities={Amenities.List}
      /> */}

      <AmenitiesList2 amenities={hotelData?.amenities}/>

      <TestimonialSection
       Testimonials  = {hotelData?.testimonials}
        backgroundImage={OurClientsData.backgroundImage}
      />
      {/* <PropertyPolicies propertyData={propertyData} /> */}
      <Location address={hotelData?.location} />


      <HotelImageCarousel data={hotelData?.imageSections} />

      <BannerSection data={hotelData?.aboutUs} text='text-[26px] md:text-desktop/h2' imgClass="rounded-[20px] h-[350px]" textC="black"
        ptext=' text-[14px] md:text-[18px]' lineh='[60px]' bg='bg-primary-white' paddTop='0 items-start gap-10' />

      <div className="relative z-10 content">
        <ImageGallery breakpointColumnsObj={HotelPageImgGallery.breakpointColumnsObj} items={HotelPageImgGallery.items} />
      </div>

      <FAQSection  faqs={hotelData?.faqs}/>
      <img src="/images/HotelsSectionImg/Img.png" alt="" className="h-[130px] w-full" />

      <BottomRoomSticky/>


    </div>
  )
}

export default Hotels;
