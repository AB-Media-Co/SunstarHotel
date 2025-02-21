import { useParams } from "react-router-dom"
import AmenitiesList from "../../Components/AmenitiesList"
import TestimonialSection from "../../Components/TestimonialSection"
import { OtherRooms } from "../../Data/RoomsData"
import FAQSection from "../Hotels/Components/FAQsection"
import RoomLayout from "../Hotels/Components/RoomLayout"
import RoomPriceSection from "./Components/RoomPriceSection"
import RoomsBanner from "./Components/RoomsBanner"
import RoomsDescription from "./Components/RoomsDescription"
import { useEffect, useState } from "react"
import { getSingleRoomById } from "../../ApiHooks/useRoomsHook"
import { Loader } from "lucide-react"
import { AmenitiesList2 } from "../../Components/AmenitiesList2";
import { getSingleHotelWithCode } from "../../ApiHooks/useHotelHook2"

const Rooms = () => {
  const id = useParams()

  const [roomData, setroomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [otherRoomData, setOtherRoomData] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchRooms = async () => {
        try {
          const data = await getSingleRoomById(id?.id);
          setroomData(data);
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
    return <div><Loader /></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <RoomsBanner businessPlatformFeatures={roomData} hotelDetail={otherRoomData} />
      <RoomPriceSection roomData={roomData} />
      <hr className="content h-[2px] bg-gray-400" />
      <RoomsDescription roomData={roomData} />

      <AmenitiesList2 amenities={roomData?.Amenities} />
      <hr className="mb-10 content h-[2px] bg-gray-400" />

      <RoomLayout rooms={otherRoomData?.rooms} title='Other Room' />

      <hr className="mt-10 content h-[2px] bg-gray-400" />
      <FAQSection />



    </div>
  )
}

export default Rooms
