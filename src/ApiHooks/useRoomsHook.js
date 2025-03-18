import axiosInstance from '../services/axiosInstance';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Hook for fetching rooms
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
    onError: (error) => {
      toast.error("Error fetching rooms: " + error?.response?.data?.error || error.message);
    },
  });
};

// Hook for updating a room
export const useUpdateRoom = (hotelCode, authCode, fromDate, toDate) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedRoom) => {
      // Ensure the updatedRoom object has an _id property for the URL.
      if (!updatedRoom._id) {
        throw new Error("Room ID (_id) is required for updating a room");
      }
      const response = await axiosInstance.put(
        `/api/ezee/rooms/${updatedRoom._id}`,
        updatedRoom,
        {
          params: { hotelCode, authCode, fromDate, toDate },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate the rooms query so that data is refetched after update.
      queryClient.invalidateQueries(['rooms', hotelCode, authCode, fromDate, toDate]);
      toast.success("Room updated successfully");
    },
    onError: (error) => {
      toast.error("Error updating room: " + error?.response?.data?.error || error.message);
    },
  });
};

// Fetch single room by ID
export const getSingleRoomById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/ezee/room/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching room: " + error?.response?.data?.error || error.message);
    throw error; // Rethrow the error to let the calling code handle it
  }
};

