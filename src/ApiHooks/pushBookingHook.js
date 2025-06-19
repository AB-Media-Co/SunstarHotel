import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../services/axiosInstance';

// Push Booking Hook
export const usePushBooking = () => {
//   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookingData) => {
      const response = await axiosInstance.post('/api/push-booking', bookingData);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Booking pushed successfully');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to push booking');
    }
  });
};


export const useGetMyBookings = ({ hotelCode, email, apiKey }) => {
  return useQuery({
    queryKey: ['my-bookings', hotelCode, email],
    queryFn: async () => {
      if (!hotelCode || !email || !apiKey) {
        return [];  // Return empty if any param missing
      }

      try {
        const response = await axiosInstance.get('/api/seemybookings', {
          params: {
            hotelCode,
            email,
            apiKey,
          },
        });

        return response.data;
      } catch (error) {
        toast.error('Failed to fetch bookings: ' + (error?.response?.data?.message || error.message));
        throw error;
      }
    },
    enabled: !!hotelCode && !!email && !!apiKey, // Only run if all params present
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
};