import Banner from "./Components/Banner";
import HotelCard from "./Components/HotelCard";
import RoomLayout from "./Components/RoomLayout";
import { OurClientsData, HotelPageImgGallery } from "../../Data/HotelRoomsData";
import BannerSection from "../../Components/BannerSection";
import ImageGallery from "../../Components/ImageGallery";
import CommonFAQSection from "../../Components/CommonFAQSection";
import HotelImageCarousel from "./Components/HotelImageCarousel";
import Location from "./Components/Location";
import { useLocation, useParams } from "react-router-dom";
import { getSingleHotelWithCode } from "../../ApiHooks/useHotelHook2";
import Loader from "../../Components/Loader";
import { AmenitiesList2 } from "../../Components/AmenitiesList2";
import BottomRoomSticky from "../../Components/BottomRoomSticky";
import { Helmet } from "react-helmet";
import { useRooms } from "../../ApiHooks/useRoomsHook";
import { useCallback, useEffect, useState } from "react"; // Add useCallback
import { extractHotelCode } from "../../utils/urlHelper";

import {
  format,
} from "date-fns";
import RoomsCard from "../../Components/RoomsCard";

import HotelTestimonial from "./Components/HotelTestimonial";

const Hotels = () => {
  const { hotelCode: hotelCodeParam } = useParams();
  const { state } = useLocation();

  // Extract hotelCode from URL (handles both old and new format)
  const hotelCode = extractHotelCode(hotelCodeParam);

  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCalender, setOpenCalender] = useState(false);


  const checkIn = localStorage.getItem("checkInDate");
  const checkOut = localStorage.getItem("checkOutDate");
  const shouldFetchRooms = checkIn && checkOut && hotelData?.hotelCode && hotelData?.authKey;

  const { data: roomsData, isLoading } = useRooms(
    shouldFetchRooms ? hotelData.hotelCode : state?.hotelData?.hotelCode,
    shouldFetchRooms ? hotelData.authKey : state?.hotelData?.authKey,
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-">
        <Loader fullScreen={false} size="md" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // console.log("Hotel Data:", hotelData);
  const rooms = roomsData?.rooms
  // console.log("rooms Data:", rooms);

  return (
    <div className="bg-gray-100">
      <Helmet>
        <title>{hotelData?.meta?.title || 'Hotels'}</title>
        <meta name="description" content={hotelData?.meta?.description || ''} />
        <meta name="keywords" content={hotelData?.meta?.keywords?.join(', ') || ''} />
      </Helmet>
      <Banner
        businessPlatformFeatures={hotelData?.images}
      />
      <div className="flex flex-col gap-4 bg-white max-w-7xl  mx-auto">

        <HotelCard hotelData={hotelData} openCalender={openCalender}
          setOpenCalender={setOpenCalender} />
        {/* <RoomLayout rooms={roomsData?.rooms} /> */}

        <div id="rooms" className="content py-6 px-4">
          <h1 className="text-mobile/h3 md:text-desktop/h3 font-bold mb-6">Rooms</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {rooms?.filter(room => room.show)?.length > 0 ?
              (
                <>
                  {rooms?.filter(room => room.show)?.map((room, index) => (
                    <div key={index}
                      data-aos="fade-up"
                      data-aos-delay={index * 100} >
                      <RoomsCard key={room._id} room={room} />
                    </div>
                  ))}
                </>

              )
              : (<>No data Available</>)

            }
          </div>
        </div>
        <AmenitiesList2 amenities={hotelData?.amenities} />
        <div id="reviews">

          {/* <TestimonialSection
            Testimonials={hotelData?.testimonials}
            backgroundImage={OurClientsData.backgroundImage}
          /> */}
          <HotelTestimonial
            apiTestimonials={hotelData?.testimonials}
            backgroundImage={OurClientsData.backgroundImage}
          />
        </div>
        {hotelData?.imageSections && <HotelImageCarousel data={hotelData?.imageSections} />}
        <Location hotelData={hotelData} address={hotelData?.location} city={hotelData?.cityLocation?.name} />
        <BannerSection
          data={hotelData?.aboutUs}
          text='text-mobile/h3 md:text-desktop/h3'
          imgClass="rounded-[20px] max-h-[350px]"
          textC="black"
          ptext='text-mobile/small/body md:text-desktop/body/1'
          lineh='[60px]'
          bg='bg-primary-white'
          paddTop='0 items-start gap-10'

        />





        <div className="relative z-10 content">
          <ImageGallery breakpointColumnsObj={HotelPageImgGallery.breakpointColumnsObj} items={HotelPageImgGallery.items} />
        </div>
        <CommonFAQSection
          faqs={hotelData?.faqs}
          subtitle="You need to come at least once in your life"
          bgColor="bg-white"
        />
        <img src="/images/HotelsSectionImg/Img.png" alt="" className="md:block hidden w-full" />
        <img src="/images/HotelsSectionImg/img2.png" alt="" className="block md:hidden w-full " />
      </div>
      {!openCalender && <BottomRoomSticky />}
    </div>
  );
};

export default Hotels;