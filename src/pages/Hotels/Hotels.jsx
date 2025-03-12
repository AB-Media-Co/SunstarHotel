import Banner from "./Components/Banner";
import HotelCard from "./Components/HotelCard";
import RoomLayout from "./Components/RoomLayout";
import { OurClientsData, HotelPageImgGallery } from "../../Data/HotelRoomsData";
import TestimonialSection from "../../Components/TestimonialSection";
import BannerSection from "../../Components/BannerSection";
import ImageGallery from "../../Components/ImageGallery";
import FAQSection from "./Components/FAQsection";
import HotelImageCarousel from "./Components/HotelImageCarousel";
import Location from "./Components/Location";
import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { getSingleHotelWithCode } from "../../ApiHooks/useHotelHook2";
import Loader from "../../Components/Loader";
import { AmenitiesList2 } from "../../Components/AmenitiesList2";
import BottomRoomSticky from "../../Components/BottomRoomSticky";
import { Helmet } from "react-helmet";

const Hotels = () => { 
  const { hotelCode } = useParams();
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCalender, setOpenCalender] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
console.log("lll")
  const storedRoomsData = localStorage.getItem("roomsData");
  const roomsData = storedRoomsData && storedRoomsData !== "undefined"
    ? JSON.parse(storedRoomsData)
    : [];

  const filteredRooms = roomsData?.rooms?.filter((room) => room?.HotelCode === hotelCode);
console.log(filteredRooms)
  // Memoize the API call to prevent multiple calls
  useEffect(() => {
    if (hotelCode && loading) {
      const controller = new AbortController();
      fetchHotel(hotelCode, controller.signal);
      return () => controller.abort(); // Cleanup on unmount or hotelCode change
    }
  }, [hotelCode]);
  
  const fetchHotel = useMemo(() => {
    return async (code, signal) => {
      try {
        const data = await getSingleHotelWithCode(code, { signal });
        setHotelData(data?.hotel);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err);
      } finally {
        setLoading(false);
      }
    };
  }, []);
  useEffect(() => {
    const storedCheckIn = localStorage.getItem("checkInDate");
    const storedCheckOut = localStorage.getItem("checkOutDate");
    setInitialLoad(false);
    if (!storedCheckIn || !storedCheckOut) {
      setOpenCalender(true);
    }
  }, []);

  if (loading) {
    return <div><Loader /></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <div>
      <Helmet>
        <title>Hotels</title>
        <meta name="" content={``} />
        <meta name="" content={``} />
      </Helmet> 
      <Banner
        businessPlatformFeatures={hotelData?.images}
        openCalender={openCalender}
        setOpenCalender={setOpenCalender}
      />
      <HotelCard hotelData={hotelData} />
      <RoomLayout rooms={filteredRooms} />
      <AmenitiesList2 amenities={hotelData?.amenities} />
      <TestimonialSection
        Testimonials={hotelData?.testimonials}
        backgroundImage={OurClientsData.backgroundImage}
      />
      <Location address={hotelData?.location} city={hotelData?.cityLocation?.name} />
      {hotelData?.imageSections && <HotelImageCarousel data={hotelData?.imageSections} />}
      <BannerSection
        data={hotelData?.aboutUs}
        text='text-[26px] md:text-desktop/h2'
        imgClass="rounded-[20px] max-h-[350px]"
        textC="black"
        ptext=' text-[14px] md:text-[18px]'
        lineh='[60px]'
        bg='bg-primary-white'
        paddTop='0 items-start gap-10'
      />
      <div className="relative z-10 content">
        <ImageGallery breakpointColumnsObj={HotelPageImgGallery.breakpointColumnsObj} items={HotelPageImgGallery.items} />
      </div>
      <FAQSection faqs={hotelData?.faqs} />
      <img src="/images/HotelsSectionImg/Img.png" alt="" className="h-[130px] w-full" />
      {!openCalender && <BottomRoomSticky />}
    </div>
  );
};

export default Hotels;