import { useLocation } from 'react-router-dom';
import HotelForm from './HotelForm';
const EditHotel = () => {
  const location = useLocation();
  const initialDataFromState = location.state?.hotel;
  console.log('Initial data from state:', initialDataFromState);
  const hotelData = initialDataFromState 
  return <HotelForm initialData={hotelData} />;
};

export default EditHotel;
