import React, { useState, useEffect } from "react";
import axios from "axios";

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
      console.error("Error fetching hotel data:", error);
    }
  };

  const handleSelectChange = (event) => {
    const hotelId = event.target.value;
    const selectedHotel = hotels.find((hotel) => hotel.id === hotelId);
    setSelectedHotelId(hotelId);
    if (selectedHotel) {
      fetchHotelData(selectedHotel.id, selectedHotel.apiKey);
    }
  };

  return (
    <div>
      <label htmlFor="hotelDropdown">Select a Hotel:</label>
      <select id="hotelDropdown" value={selectedHotelId} onChange={handleSelectChange}>
        <option value="" disabled>
          -- Choose a Hotel --
        </option>
        {hotels.map((hotel) => (
          <option key={hotel.id} value={hotel.id}>
            {hotel.name}
          </option>
        ))}
      </select>

      {hotelData && (
        <div>
          <h3>{hotelData.Hotel_Name}</h3>
          <p><strong>City:</strong> {hotelData.City}</p>
          <p><strong>State:</strong> {hotelData.State}</p>
          <p><strong>Country:</strong> {hotelData.Country}</p>
          <p><strong>Description:</strong> <div dangerouslySetInnerHTML={{ __html: hotelData.Hotel_Description }} /></p>
          <p><strong>Facilities:</strong> <div dangerouslySetInnerHTML={{ __html: hotelData.Facilities_Attractions }} /></p>
          <p><strong>Booking Link:</strong> <a href={hotelData.BookingEngineURL} target="_blank" rel="noopener noreferrer">Book Now</a></p>
          <h4>Images:</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {hotelData.HotelImages?.map((image, index) => (
              <img key={index} src={image} alt={`Hotel Image ${index + 1}`} style={{ width: "150px", height: "100px", objectFit: "cover" }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDropdown;
