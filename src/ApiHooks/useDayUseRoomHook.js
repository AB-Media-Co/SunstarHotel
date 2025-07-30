import axiosInstance from '../services/axiosInstance';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const getDayUseRoomsByDate = async (date) => {
  const response = await axiosInstance.get('/api/ezee/day-use-rooms', {
    params: { date }
  });
  return response.data;
};

export const useDayUseRoomsByDate = (date) => {
  return useQuery({
    queryKey: ['dayUseRooms', date],
    queryFn: () => getDayUseRoomsByDate(date),
    enabled: !!date,
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      const message = error?.response?.data?.error || error.message;
      toast.error(`Error fetching day use rooms: ${message}`);
    }
  });
};


export const getMonthlyDayUseRooms = async ({ month, hotelCode }) => {
  const response = await axiosInstance.get('/api/ezee/monthly', {
    params: { month, hotelCode }
  });
  return response.data;
};

export const useMonthlyDayUseRooms = (month, hotelCode) => {
  return useQuery({
    queryKey: ['monthlyDayUseRooms', month, hotelCode],
    queryFn: () => getMonthlyDayUseRooms({ month, hotelCode }),
    enabled: !!month,
    staleTime: 10 * 60 * 1000,
    onError: (error) => {
      const message = error?.response?.data?.error || error.message;
      toast.error(`Error fetching monthly data: ${message}`);
    }
  });
};


export const updateDayUseAvailabilityAPI = async (data) => {
  const response = await axiosInstance.put('/api/ezee/update-availability', data);
  return response.data;
};

export const useUpdateDayUseAvailability = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDayUseAvailabilityAPI,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['dayUseRooms', variables.date]);
      queryClient.invalidateQueries(['monthlyDayUseRooms']);
      toast.success('Availability updated successfully');
    },
    onError: (error) => {
      const message = error?.response?.data?.error || error.message;
      toast.error(`Error updating availability: ${message}`);
    }
  });
};



export const bulkUpdateDayUseAvailabilityAPI = async (data) => {
  const response = await axiosInstance.post('/api/ezee/dayuse/bulk-update', data);
  return response.data;
};


export const useBulkUpdateDayUseAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkUpdateDayUseAvailabilityAPI,
    onSuccess: (_, variables) => {
      if (variables?.date) {
        queryClient.invalidateQueries(['dayUseRooms', variables.date]);
      }
      queryClient.invalidateQueries(['monthlyDayUseRooms']);
      toast.success('Bulk availability updated successfully');
    },
    onError: (error) => {
      const message = error?.response?.data?.error || error.message;
      toast.error(`Error updating bulk availability: ${message}`);
    }
  });
};
