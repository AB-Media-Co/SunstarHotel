import { useLocation } from 'react-router-dom';
import HotelForm from './HotelForm';
const EditHotel = () => {
  const location = useLocation();

  // Try to get hotel data from route state first
  const initialDataFromState = location.state?.hotel;

  // Determine the hotel data to use
  const hotelData = initialDataFromState 

  return <HotelForm initialData={hotelData} />;
};

export default EditHotel;
