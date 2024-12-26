/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "./Calendar";

const hotels = [
    { name: "Hotel Sunstar Residency", id: "14494", apiKey: "164638176786a1a258-c6ea-11ec-9" },
    { name: "Hotel Sunstar Grand", id: "14492", apiKey: "431032638481c78c0e-cd20-11ec-9" },
    { name: "Hotel Sunstar Heights", id: "15282", apiKey: "520246986786a91364-c6ea-11ec-9" },
    { name: "Hotel Sunstar Heritage", id: "14493", apiKey: "107320434586afe643-c6ea-11ec-9" },
    { name: "Hotel Sunshine", id: "14495", apiKey: "77963264823686bfcb-d038-11ec-9" },
    { name: "The Suncourt Hotel Yatri", id: "14496", apiKey: "43431464258699abee-c6ea-11ec-9" },
];

const HotelDropdown = () => {
    const [selectedHotelId, setSelectedHotelId] = useState("");
    const [hotelData, setHotelData] = useState(null);
    const [roomData, setRoomData] = useState(null);

    const [rateTypes, setRateTypes] = useState(null);

    const [ratePlans, setRatePlans] = useState(null);

    const [roomAvailablity, setRoomAvailablity] = useState(null);
    console.log(roomAvailablity)
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [openCalender, setOpenCalender] = useState(false);

    const fetchHotelData = async (hotelId, apiKey) => {
        try {
            const response = await axios.get(
                `https://cors-anywhere.herokuapp.com/https://live.ipms247.com/booking/reservation_api/listing.php`,
                {
                    params: {
                        request_type: "HotelList",
                        HotelCode: hotelId,
                        APIKey: apiKey,
                        language: "en",
                    },
                }
            );
            setHotelData(response.data[0]);
        } catch (error) {
            console.error("Error fetching hotel data:", error.message);
        }
    };

    const fetchRoomData = async (hotelId, apiKey) => {
        try {
            const response = await axios.post(
                `https://cors-anywhere.herokuapp.com/https://live.ipms247.com/pmsinterface/pms_connectivity.php`,
                {
                    RES_Request: {
                        Request_Type: "RoomInfo",
                        NeedPhysicalRooms: 1,
                        Authentication: {
                            HotelCode: hotelId,
                            AuthCode: apiKey,
                        },
                    },
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            setRoomData(response.data.RoomInfo.RoomTypes.RoomType || []);
            setRatePlans(response.data.RoomInfo.RatePlans.RatePlan || []);
            setRateTypes(response.data?.RoomInfo?.RateTypes.RateType || []);

        } catch (error) {
            console.error("Error fetching room data:", error.message);
        }
    };


    const fetchRoomAvailabliity = async (hotelId, apiKey) => {
        if (!checkIn || !checkOut) return; // Ensure both dates are selected

        try {
            const response = await axios.post(
                `https://cors-anywhere.herokuapp.com/https://live.ipms247.com/index.php/page/service.kioskconnectivity`,
                {
                    RES_Request: {
                        Request_Type: "RoomAvailability",
                        Authentication: {
                            HotelCode: hotelId,
                            AuthCode: apiKey,
                        },
                        RoomData: {
                            from_date: checkIn, // Ensure the date format is correct
                            to_date: checkOut,
                        },
                    },
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            // setRatePlans(response.data.RoomInfo.RatePlans.RatePlan || []);
            setRoomAvailablity(response.data?.Success)
        } catch (error) {
            console.error("Error fetching room availability:", error.message);
        }
    };

    const handleSelectChange = (event) => {
        const hotelId = event.target.value;
        const selectedHotel = hotels.find((hotel) => hotel.id === hotelId);
        setSelectedHotelId(hotelId);
        if (selectedHotel) {
            fetchHotelData(selectedHotel.id, selectedHotel.apiKey);
            fetchRoomData(selectedHotel.id, selectedHotel.apiKey);
            fetchRoomAvailabliity(selectedHotel.id, selectedHotel.apiKey);
        }
    };

    useEffect(() => {
        if (selectedHotelId && checkIn && checkOut) {
            const selectedHotel = hotels.find((hotel) => hotel.id === selectedHotelId);
            if (selectedHotel) {
                fetchRoomAvailabliity(selectedHotel.id, selectedHotel.apiKey);
            }
        }
    }, [checkIn, checkOut, selectedHotelId]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-10">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                    <label
                        htmlFor="hotelDropdown"
                        className="block text-xl font-semibold text-gray-700 mb-4"
                    >
                        Select a Hotel:
                    </label>
                    <select
                        id="hotelDropdown"
                        value={selectedHotelId}
                        onChange={handleSelectChange}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                    >
                        <option value="" disabled>
                            -- Choose a Hotel --
                        </option>
                        {hotels.map((hotel) => (
                            <option key={hotel.id} value={hotel.id}>
                                {hotel.name}
                            </option>
                        ))}
                    </select>

                    <button onClick={() => setOpenCalender(true)}>
                        SelectDate
                    </button>
                    {openCalender &&
                        <Calendar setCheckInDate={setCheckIn} setCheckOutDate={setCheckOut} setOpenCalender={setOpenCalender} />

                     }
                </div>

                {hotelData && (
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">{hotelData.Hotel_Name}</h3>
                        <p className="text-gray-700 mb-2"><strong>City:</strong> {hotelData.City}</p>
                        <p className="text-gray-700 mb-2"><strong>State:</strong> {hotelData.State}</p>
                        <p className="text-gray-700 mb-2"><strong>Country:</strong> {hotelData.Country}</p>
                        <p className="text-gray-700 mb-4"><strong>Description:</strong></p>
                        <div className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: hotelData.Hotel_Description }} />
                        <p className="text-gray-700 mb-4"><strong>Facilities:</strong></p>
                        <div className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: hotelData.Facilities_Attractions }} />
                        <p className="text-gray-700 mb-6">
                            <strong>Booking Link:</strong>{" "}
                            <a
                                href={hotelData.BookingEngineURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline hover:text-blue-800"
                            >
                                Book Now
                            </a>
                        </p>
                        <h4 className="text-xl font-semibold text-gray-800 mb-4">Images:</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                            {hotelData.HotelImages?.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Hotel Image ${index + 1}`}
                                    className="rounded-lg shadow-md hover:shadow-xl"
                                />
                            ))}
                        </div>
                    </div>
                )}


                {roomAvailablity ? (
                    <div>
                        {roomAvailablity?.RoomList?.map((availableRoom) => (
                            <div key={availableRoom.RoomtypeID} className="p-6">
                                <div className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg">
                                    {availableRoom.RoomtypeName}
                                </div>

                                <h1 className="text-[28px] py-8">Inside Rooms</h1>
                                {availableRoom?.RoomData
                                    ?.map((rooms) => (
                                        <div key={rooms.RoomID} className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg">
                                            <span>{rooms.RoomName}</span>
                                        </div>
                                    ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    roomData && (
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Room Information</h2>

                            <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm hover:shadow-md">
                                <h5 className="text-xl font-semibold text-gray-800 mb-4">Room Types</h5>

                                <div className="mt-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {roomData.map((plan) => (
                                            <div key={plan.RatePlanID} >
                                                <div className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg">
                                                    <span>{plan.Name}</span> - Rate Type: {plan.RateType}
                                                </div>

                                                <h1 className="text-[28px] py-8">Inside Rooms</h1>
                                                {plan?.Rooms?.map((rooms) => (
                                                    <div key={rooms.RoomID} className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg">
                                                        <span>{rooms.RoomName}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {rateTypes && ratePlans && (
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Rate Types and Plans</h2>
                                        {rateTypes.map((rateType) => (
                                            <div key={rateType.RateTypeID} className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm hover:shadow-md">
                                                <h4 className="text-xl font-semibold text-gray-800 mb-4">{rateType.Name}</h4>
                                                <div className="">
                                                    {ratePlans
                                                        .filter((ratePlan) => ratePlan.RateType === rateType.Name)
                                                        .map((matchingRatePlan) => (
                                                            <div key={matchingRatePlan.RatePlanID} className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg">
                                                                <p><strong>Plan Name:</strong> {matchingRatePlan.Name}</p>
                                                                <p><strong>Rate Type:</strong> {matchingRatePlan.RateType}</p>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </div>
                    )
                )}

            </div>
        </div>
    );
};

export default HotelDropdown;
