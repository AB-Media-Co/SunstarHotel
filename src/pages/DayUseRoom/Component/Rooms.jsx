import { useEffect, useState } from "react";
import { useDayUseRooms, useRooms } from "../../../ApiHooks/useRoomsHook";
import Loader from "../../../Components/Loader";
import DayUseRoomCards from "./DayUseRoomCards";

const Rooms = () => {

    const { data } = useDayUseRooms();

    const [selectedHotel, setSelectedHotel] = useState('');
    const [authCode, setAuthCode] = useState('');


    useEffect(() => {

        setSelectedHotel(data?.data[0]?.hotel?.hotelCode);
        setAuthCode(data?.data[0]?.hotel?.authKey);
    }, [data?.data]);

    const { data: rooms, isLoading: roomsLoading } = useRooms(
        selectedHotel,
        authCode
    );

    { roomsLoading && <div><Loader /></div> }

    return (
        <div className="bg-primary-green">
            <div className="content py-10">

                <div className="mb-10 flex flex-col text-white gap-4">
                    <h1 className="text-mobile/h3 md:text-desktop/h3 font-bold text-white ">Book A Day Use Hotel</h1>
                    <p className="text-mobile/body/2 md:text-desktop/body/1 capitalize">{rooms?.rooms?.filter(room => room.show)?.length} Rooms In <span className="capitalize text-[#FDD304]">{data?.data[0]?.hotel?.name}</span>  </p>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {rooms?.rooms?.filter(room => room.show)?.length > 0 ?
                        (
                            <>
                                {rooms?.rooms?.filter(room => room.show)?.map((room, index) => (
                                    <div key={index}
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100} >
                                        <DayUseRoomCards key={room._id} room={room} />
                                    </div>
                                ))}
                            </>

                        )
                        : (<>No data Available</>)

                    }

                </div>
            </div>

        </div>
    )
}

export default Rooms
