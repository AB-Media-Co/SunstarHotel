import { useMutation, useQuery, useQueries } from '@tanstack/react-query';
import { useGetHotels } from './useHotelHook2';
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
    onSuccess: (res) => {
      console.log(res)
      if (res.success) {
        toast.success(res.message);
      }
    },
    onError: (error) => {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Failed to push booking');
    }
  });
};


// Fetch ALL bookings for a user across all hotels
export const useFetchAllBookings = (email) => {
  const { data: hotelsData, isLoading: hotelsLoading, error: hotelsError } = useGetHotels();

  const bookingQueries = useQueries({
    queries: (hotelsData?.hotels || []).map((hotel) => ({
      queryKey: ['my-bookings', hotel.hotelCode, email],
      queryFn: async () => {
        if (!hotel.hotelCode || !email || !hotel.authKey) {
          return { BookingList: [], hotelInfo: hotel };
        }
        try {
          const response = await axiosInstance.get('/api/seemybookings', {
            params: {
              hotelCode: hotel.hotelCode,
              email,
              apiKey: hotel.authKey,
            },
          });
          return {
            ...response.data,
            hotelInfo: hotel,
            BookingList: (response.data.BookingList || []).map(booking => ({
              ...booking,
              hotelInfo: hotel
            }))
          };
        } catch (error) {
          console.error(`Failed to fetch bookings for ${hotel.name}:`, error);
          return { BookingList: [], hotelInfo: hotel };
        }
      },
      enabled: !!hotel.hotelCode && !!email && !!hotel.authKey,
      staleTime: 30000,
      refetchOnWindowFocus: false,
    }))
  });

  const allBookings = bookingQueries.reduce((acc, query) => {
    if (query.data?.BookingList) {
      acc.push(...query.data.BookingList);
    }
    return acc;
  }, []);

  const isLoading = hotelsLoading || bookingQueries.some(query => query.isLoading);
  const error = hotelsError || bookingQueries.some(query => query.error);
  const refetch = () => bookingQueries.forEach(query => query.refetch());

  return { allBookings, isLoading, error, refetch };
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