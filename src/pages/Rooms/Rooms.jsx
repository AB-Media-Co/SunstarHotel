import { useParams } from "react-router-dom"
import CommonFAQSection from "../../Components/CommonFAQSection"
import RoomLayout from "../Hotels/Components/RoomLayout"
import RoomPriceSection from "./Components/RoomPriceSection"
import RoomsBanner from "./Components/RoomsBanner"
import RoomsDescription from "./Components/RoomsDescription"
import { useEffect, useState } from "react"
import { getSingleRoomById } from "../../ApiHooks/useRoomsHook"
import { AmenitiesList2 } from "../../Components/AmenitiesList2";
import { getSingleHotelWithCode } from "../../ApiHooks/useHotelHook2"
import Loader from "../../Components/Loader"
import BottomRoomSticky from "../../Components/BottomRoomSticky"
import { Helmet } from "react-helmet"
import { useGetMetas } from "../../ApiHooks/useMetaHook"
import { usePricing } from "../../Context/PricingContext"
import CheckInOutInfo from "./Components/CheckInOutInfo"

const Rooms = () => {
  const { data: metas } = useGetMetas();
  const id = useParams()

  const [roomData, setroomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setEditAddPricing } = usePricing();


  const [hotelInfo, setHotelInfo] = useState(null);
  console.log(hotelInfo)
  useEffect(() => {
    const storedData = localStorage.getItem("hotelInfo");
    console.log(storedData)
    if (storedData) {
      setHotelInfo(JSON.parse(storedData));
    }
  }, []);

  // const { checkIn, checkOut } = hotelInfo;
  const [otherRoomData, setOtherRoomData] = useState(null);
  useEffect(() => {
    if (id) {
      const fetchRooms = async () => {
        try {
          const data = await getSingleRoomById(id?.id);
          setroomData(data);
          setEditAddPricing(true)
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchRooms();
    }
  }, [id]);


  useEffect(() => {
    if (roomData) {
      const fetchOtherRooms = async () => {
        try {
          const data = await getSingleHotelWithCode(roomData?.HotelCode);
          setOtherRoomData(data?.hotel);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchOtherRooms();
    }
  }, [otherRoomData?.HotelCode, roomData]);



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <Loader fullScreen={false} size="md" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const roomsMeta = Array.isArray(metas)
    ? metas.find(meta => meta.page === "rooms")
    : null;
  return (
    <div className="bg-gray-100">
      <Helmet>
        <title>{roomsMeta?.metaTitle || 'Rooms & Suites - Sunstar Hotels'}</title>
        <meta name="description" content={roomsMeta?.metaDescription || ''} />
        <meta name="keywords" content={roomsMeta?.metaKeywords?.join(', ') || ''} />
      </Helmet>
      <RoomsBanner businessPlatformFeatures={roomData} hotelDetail={otherRoomData} />
      <div className="flex flex-col gap-4  -mt-6 rounded-t-lg relative bg-white max-w-7xl  mx-auto">

        <RoomPriceSection roomData={roomData} hotelDetail={otherRoomData} />
        {/* <hr className="content h-[2px] bg-gray-400" /> */}
        <AmenitiesList2 amenities={roomData?.Amenities} />
        {/* <RoomsDescription roomData={roomData} /> */}

        {/* <hr className="mb-10 content h-[2px] bg-gray-400" /> */}

        {/* <RoomLayout rooms={otherRoomData?.rooms} title='Other Room' /> */}

        <hr className="mt-10 content h-[2px] bg-gray-400" />
        <CheckInOutInfo checkIn={hotelInfo?.checkIn} checkOut={hotelInfo?.checkOut} />
        <CommonFAQSection
          faqs={otherRoomData?.faqs}
          subtitle="You need to come at least once in your life"
          bgColor="bg-white"
        />
      </div>

      <BottomRoomSticky />



    </div>
  )
}

export default Rooms
