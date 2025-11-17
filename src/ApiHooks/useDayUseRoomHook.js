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



export const bookDayUseSlotAPI = async (data) => {
  // data: { hotelCode, roomName, date, qty = 1, timeSlot = 'Full Day' }
  const response = await axiosInstance.post('/api/ezee/dayuse/book', data);
  return response.data;
};

export const useBookDayUseSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookDayUseSlotAPI,
    onSuccess: (_, variables) => {
      // variables should include: { date, ... }
      if (variables?.date) {
        queryClient.invalidateQueries(['dayUseRooms', variables.date]);
      }
      // monthly view may depend on the same date’s month; safe to invalidate all monthly
      queryClient.invalidateQueries(['monthlyDayUseRooms']);
      // toast.success('Booked successfully: availability decremented');
    },
    onError: (error) => {
      const message = error?.response?.data?.error || error.message;
      toast.error(`Booking failed: ${message}`);
    }
  });
};


export const cancelDayUseSlotAPI = async (data) => {
  // data: { hotelCode, roomName, date, qty = 1, timeSlot = 'Full Day' }
  const response = await axiosInstance.post('/api/ezee/dayuse/cancel', data);
  return response.data;
};

export const useCancelDayUseSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelDayUseSlotAPI,
    onSuccess: (_, variables) => {
      if (variables?.date) {
        queryClient.invalidateQueries(['dayUseRooms', variables.date]);
      }
      queryClient.invalidateQueries(['monthlyDayUseRooms']);
      toast.success('Cancelled successfully: availability incremented');
    },
    onError: (error) => {
      const message = error?.response?.data?.error || error.message;
      toast.error(`Cancellation failed: ${message}`);
    }
  });
};



// GET full content
export const getDayUseContent = async () => {
  const res = await axiosInstance.get('/api/ezee/dayuse/content');
  return res.data;
};

export const useGetDayUseContent = (opts = {}) => {
  return useQuery({
    queryKey: ['dayUseContent'],
    queryFn: getDayUseContent,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    onError: (error) => {
      const msg = error?.response?.data?.message || error?.message || 'Error fetching content';
      toast.error(msg);
    },
    ...opts,
  });
};

// BULK UPSERT full content
export const upsertDayUseContentAPI = async (data) => {
  // data: { hero?, descCard?, benefits?, tandc? }
  const res = await axiosInstance.put('/api/ezee/dayuse/content', data);
  return res.data;
};

export const useUpsertDayUseContent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: upsertDayUseContentAPI,
    onSuccess: () => {
      toast.success('Content saved');
      qc.invalidateQueries({ queryKey: ['dayUseContent'] });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || error?.message || 'Content save failed';
      toast.error(msg);
    },
  });
};

// PATCH hero
export const usePatchDayUseHero = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      // { heading?, description? }
      const res = await axiosInstance.patch('/api/ezee/dayuse/content/hero', payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Hero updated');
      qc.invalidateQueries({ queryKey: ['dayUseContent'] });
    },
    onError: (e) => toast.error(e?.response?.data?.message || e.message),
  });
};

// PATCH desc card
export const usePatchDayUseDescCard = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      // { heading?, description? }
      const res = await axiosInstance.patch('/api/ezee/dayuse/content/desc-card', payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Description card updated');
      qc.invalidateQueries({ queryKey: ['dayUseContent'] });
    },
    onError: (e) => toast.error(e?.response?.data?.message || e.message),
  });
};

// BENEFITS: add / update / delete
export const useAddDayUseBenefit = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ title }) => {
      const res = await axiosInstance.post('/api/ezee/dayuse/content/benefits', { title });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Benefit added');
      qc.invalidateQueries({ queryKey: ['dayUseContent'] });
    },
    onError: (e) => toast.error(e?.response?.data?.message || e.message),
  });
};

export const useUpdateDayUseBenefit = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ benefitId, title }) => {
      const res = await axiosInstance.put(`/api/ezee/dayuse/content/benefits/${benefitId}`, { title });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Benefit updated');
      qc.invalidateQueries({ queryKey: ['dayUseContent'] });
    },
    onError: (e) => toast.error(e?.response?.data?.message || e.message),
  });
};

export const useDeleteDayUseBenefit = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (benefitId) => {
      const res = await axiosInstance.delete(`/api/ezee/dayuse/content/benefits/${benefitId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Benefit deleted');
      qc.invalidateQueries({ queryKey: ['dayUseContent'] });
    },
    onError: (e) => toast.error(e?.response?.data?.message || e.message),
  });
};

// T&C: replace full points array
// T&C: replace full points array
export const useSetDayUseTerms = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ points }) => {
      // points: string[]
      const res = await axiosInstance.put('/api/ezee/dayuse/content/tandc', { points });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Terms updated');
      qc.invalidateQueries({ queryKey: ['dayUseContent'] });
    },
    onError: (e) => toast.error(e?.response?.data?.message || e.message),
  });
};

