import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import toast from 'react-hot-toast'
const submitEnquiry = async (enquiryData) => {
  const response = await axiosInstance.post('/api/enquiries', enquiryData);
  return response.data;
};

export const useEnquiryForm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitEnquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
      toast.success("Enquiry submitted successfully")
    },
  });
};

const submitHotelEnquiry = async (enquiryData) => {
  const response = await axiosInstance.post('/api/enquiries/hotelData', enquiryData);
  return response.data;
};

export const useHotelEnquiryForm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitHotelEnquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotelEnquiries'] });
      toast.success("Boooking submitted successfully")
    },
  });
};


export const useUserBookings = (email, phone) => {
  return useQuery({
    queryKey: ['user-bookings', email, phone],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/enquiries/hotel-booking', {
        params: { email, phone },
      });
      console.log(response)
      return response.data?.data || []; // assuming API returns { data: [...] }
    },
    enabled: !!email && !!phone, // will only fetch when both are provided
    staleTime: 60000, // 1 min caching
    refetchOnWindowFocus: false,
  });
};