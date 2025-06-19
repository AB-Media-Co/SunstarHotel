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
import { getSingleHotelWithCode } from "../../ApiHooks/useHotelHook2";
import Loader from "../../Components/Loader";
import { AmenitiesList2 } from "../../Components/AmenitiesList2";
import BottomRoomSticky from "../../Components/BottomRoomSticky";
import { Helmet } from "react-helmet";
import { useRooms } from "../../ApiHooks/useRoomsHook";
import { useGetMetas } from "../../ApiHooks/useMetaHook";
import { useCallback, useEffect, useState } from "react"; // Add useCallback

import {
  format,
} from "date-fns";

const Hotels = () => {
  const { hotelCode } = useParams();
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCalender, setOpenCalender] = useState(false);
  const { data: metas } = useGetMetas();

  const hotelsMeta = Array.isArray(metas)
    ? metas.find(meta => meta.page === "hotels")
    : null;


  const checkIn = localStorage.getItem("checkInDate");
  const checkOut = localStorage.getItem("checkOutDate");
  const shouldFetchRooms = checkIn && checkOut && hotelData?.hotelCode && hotelData?.authKey;

  const { data: roomsData, isLoading } = useRooms(
    shouldFetchRooms ? hotelData.hotelCode : null,
    shouldFetchRooms ? hotelData.authKey : null,
    shouldFetchRooms ? format(checkIn, "yyyy-MM-dd") : null,
    shouldFetchRooms ? format(checkOut, "yyyy-MM-dd") : null
  );

  if (roomsData) {
    localStorage.setItem("roomsData", JSON.stringify(roomsData));
  }

  const fetchHotel = useCallback(async (hotelCode, signal) => {
    try {
      const data = await getSingleHotelWithCode(hotelCode, { signal });
      setHotelData(data?.hotel);
    } catch (err) {
      if (err.name !== 'AbortError') setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hotelCode) {
      setLoading(true);
      const controller = new AbortController();
      fetchHotel(hotelCode, controller.signal);
      return () => controller.abort();
    }
  }, [hotelCode, fetchHotel]);


  useEffect(() => {
    const storedCheckIn = localStorage.getItem("checkInDate");
    const storedCheckOut = localStorage.getItem("checkOutDate");

    if (!storedCheckIn || !storedCheckOut) {
      setOpenCalender(true);
    }
  }, []);

  if (loading || isLoading) {
    return <div><Loader /></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <div className="bg-gray-100">
      <Helmet>
        <title>{hotelsMeta?.metaTitle || 'Hotels'}</title>
        <meta name="description" content={hotelsMeta?.metaDescription || ''} />
        <meta name="keywords" content={hotelsMeta?.metaKeywords?.join(', ') || ''} />
      </Helmet>
      <Banner
        businessPlatformFeatures={hotelData?.images}

      />
      <div className="flex flex-col gap-4 bg-white max-w-7xl  mx-auto">

        <HotelCard hotelData={hotelData} openCalender={openCalender}
          setOpenCalender={setOpenCalender} />
        <RoomLayout rooms={roomsData?.rooms} />
        <AmenitiesList2 amenities={hotelData?.amenities} />
        <div id="reviews">
          <TestimonialSection
            Testimonials={hotelData?.testimonials}
            backgroundImage={OurClientsData.backgroundImage}
          />
        </div>
        {hotelData?.imageSections && <HotelImageCarousel data={hotelData?.imageSections} />}
        <Location address={hotelData?.location} city={hotelData?.cityLocation?.name} />
        <BannerSection
          data={hotelData?.aboutUs}
          text='text-mobile/h3 md:text-desktop/h3'
          imgClass="rounded-[20px] max-h-[350px]"
          textC="black"
          ptext='text-mobile/body/2 md:text-desktop/body/1'
          lineh='[60px]'
          bg='bg-primary-white'
          paddTop='0 items-start gap-10'
        />
        <div className="relative z-10 content">
          <ImageGallery breakpointColumnsObj={HotelPageImgGallery.breakpointColumnsObj} items={HotelPageImgGallery.items} />
        </div>
        <FAQSection faqs={hotelData?.faqs} />
        <img src="/images/HotelsSectionImg/Img.png" alt="" className="md:block hidden w-full" />
        <img src="/images/HotelsSectionImg/img2.png" alt="" className="block md:hidden w-full " />
      </div>
      {!openCalender && <BottomRoomSticky />}
    </div>
  );
};

export default Hotels;