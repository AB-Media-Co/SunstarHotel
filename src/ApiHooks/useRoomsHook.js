import axiosInstance from '../services/axiosInstance';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

/**
 * Hook for fetching rooms (abortable + cache-friendly)
 * - Adds `enabled` guard so the query only runs with full params
 * - Supports React Query's abort via `signal`
 * - Reasonable caching defaults; can be overridden via `options`
 */
export const useRooms = (
  hotelCode,
  authCode,
  fromDate,
  toDate,
  options = {}
) => {
  const enabled =
    Boolean(hotelCode && authCode && fromDate && toDate) &&
    (options.enabled ?? true);

  return useQuery({
    queryKey: ['rooms', hotelCode, authCode, fromDate, toDate],
    enabled,
    queryFn: async ({ signal }) => {
      try {
        const response = await axiosInstance.get('/api/ezee/syncedRooms', {
          params: { hotelCode, authCode, fromDate, toDate },
          signal, // <-- AbortController support
        });
        // console.log(response.data);
        return response.data;
      } catch (error) {
        // Allow React Query to handle the error pathway and onError
        throw error;
      }
    },
    staleTime: options.staleTime ?? 1000 * 60 * 5, // 5 min
    gcTime: options.gcTime ?? 1000 * 60 * 30,      // 30 min
    refetchOnWindowFocus: options.refetchOnWindowFocus ?? false,
    keepPreviousData: options.keepPreviousData ?? true,
    retry: options.retry ?? 1,
    onError: (error) => {
      // Keep your toast behavior
      // eslint-disable-next-line no-console
      console.log(error);
      toast.error(
        'Error fetching rooms: ' + (error?.response?.data?.error || error.message)
      );
    },
  });
};

// Hook for updating a room (unchanged, just small key tweak)
export const useUpdateRoom = (hotelCode, authCode, fromDate, toDate) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedRoom) => {
      if (!updatedRoom._id) {
        throw new Error('Room ID (_id) is required for updating a room');
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
      // Invalidate the exact key (matches useRooms)
      queryClient.invalidateQueries({
        queryKey: ['rooms', hotelCode, authCode, fromDate, toDate],
      });
      toast.success('Room updated successfully');
    },
    onError: (error) => {
      toast.error(
        'Error updating room: ' + (error?.response?.data?.error || error.message)
      );
    },
  });
};

// Fetch single room by ID (kept as-is)
export const getSingleRoomById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/ezee/room/${id}`);
    return response.data;
  } catch (error) {
    toast.error(
      'Error fetching room: ' + (error?.response?.data?.error || error.message)
    );
    throw error;
  }
};

export const useMonthlyRates = (hotelCode, authCode, month, options = {}) => {
  const enabled =
    Boolean(hotelCode && authCode && month) && (options.enabled ?? true);

  return useQuery({
    queryKey: ['monthlyRates', hotelCode, authCode, month],
    enabled,
    queryFn: async () => {
      try {
        const response = await axiosInstance.get('/api/ezee/monthly-rates', {
          params: { hotelCode, authCode, month },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    staleTime: options.staleTime ?? 1000 * 60 * 30,
    gcTime: options.gcTime ?? 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
