import axiosInstance from '../services/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

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

export const useCreateRoom = (hotelCode, authCode, fromDate, toDate) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newRoom) => {
      const response = await axiosInstance.post('/api/ezee/rooms', newRoom, {
        params: { hotelCode, authCode, fromDate, toDate },
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the rooms query so that data is refetched after creation.
      queryClient.invalidateQueries(['rooms', hotelCode, authCode, fromDate, toDate]);
      toast.success("Room created successfully");
    },
    onError: (error) => {
      toast.error("Error creating room: " + error.message);
    },
  });
};

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
    onSuccess: () => {
      // Invalidate the rooms query so that data is refetched after update.
      queryClient.invalidateQueries(['rooms', hotelCode, authCode, fromDate, toDate]);
      toast.success("Room updated successfully");
    },
    onError: (error) => {
      toast.error("Error updating room: " + error.message);
    },
  });
};

export const getSingleRoomById = async (id) => {
  const response = await axiosInstance.get(`/api/ezee/room/${id}`);
  return response.data;
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (roomId) => {
      const response = await axiosInstance.delete(`/api/ezee/room/${roomId}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate queries with key starting with 'rooms'
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      toast.success("Room deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting room");
    },
  });
};
