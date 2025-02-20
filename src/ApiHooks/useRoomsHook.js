import axiosInstance from '../services/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRooms = (hotelCode, authCode, fromDate, toDate) => {
    return useQuery({
      queryKey: ['rooms', hotelCode, authCode, fromDate, toDate],
      queryFn: async () => {
        const response = await axiosInstance.get('/api/ezee/syncedRooms', {
          params: { hotelCode, authCode, fromDate, toDate },
        });
        return response.data;
      },
      staleTime: 30000, // Data is fresh for 30 seconds
      refetchOnWindowFocus: false,
    });
  };


  export const useUpdateRoom = (hotelCode, authCode, fromDate, toDate) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (updatedRoom) => {
        const response = await axiosInstance.post('/api/ezee/rooms', updatedRoom, {
          params: { hotelCode, authCode, fromDate, toDate },
        });
        return response.data;
      },
      onSuccess: () => {
        // Invalidate the rooms query so that data is refetched after update.
        queryClient.invalidateQueries(['rooms', hotelCode, authCode, fromDate, toDate]);
      },
    });
  };