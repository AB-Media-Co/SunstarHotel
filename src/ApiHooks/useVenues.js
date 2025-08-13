import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import toast from 'react-hot-toast';

/* --------------- Query Key Helpers --------------- */
export const venuesKeys = {
  all: ['venues'],
  list: (filters) => ['venues', 'list', filters],
  detail: (id) => ['venues', 'detail', id],
};

/* --------------- API Calls --------------- */
const fetchVenues = async (filters = {}) => {
  const { data } = await axiosInstance.get('/api/venues', { params: filters });
  return data; // { success, total, page, pages, data: [...] }
};

const fetchVenueById = async (id) => {
  const { data } = await axiosInstance.get(`/api/venues/${id}`);
  return data; // { success, data: {...} }
};

const createVenueReq = async (payload) => {
  // payload can be JSON or FormData (if you upload files elsewhere and send URL here)
  const { data } = await axiosInstance.post('/api/venues', payload);
  return data; // { success, data: {...} }
};

const updateVenueReq = async ({ id, updates }) => {
  const { data } = await axiosInstance.put(`/api/venues/${id}`, updates);
  return data; // { success, data: {...} }
};

const deleteVenueReq = async (id) => {
  const { data } = await axiosInstance.delete(`/api/venues/${id}`);
  return data; // { success, message }
};

/* --------------- Hooks --------------- */

/**
 * List venues with filters, pagination and sorting
 * filters example:
 * {
 *   page: 1, limit: 12,
 *   minPrice: 800, maxPrice: 1500,
 *   minCapacity: 100, maxCapacity: 300,
 *   minRating: 4,
 *   search: 'banquet',
 *   sort: '-pricePerPlate',
 *   isActive: true
 * }
 */
export const useVenues = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: venuesKeys.list(filters),
    queryFn: () => fetchVenues(filters),
    keepPreviousData: true,
    staleTime: 60_000,
    ...options,
  });
};

/** Get a single venue by id */
export const useVenue = (id, options = {}) => {
  return useQuery({
    queryKey: venuesKeys.detail(id),
    queryFn: () => fetchVenueById(id),
    enabled: !!id,
    staleTime: 60_000,
    ...options,
  });
};

/** Create a new venue */
export const useCreateVenue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVenueReq,
    onSuccess: (res) => {
      // invalidate list; set detail cache for snappy navigation
      queryClient.invalidateQueries({ queryKey: venuesKeys.all });
      if (res?.data?._id) {
        queryClient.setQueryData(venuesKeys.detail(res.data._id), res);
      }
      toast.success('Venue created successfully');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to create venue');
    },
  });
};

/** Update an existing venue */
export const useUpdateVenue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateVenueReq, // expects { id, updates }
    onSuccess: (res) => {
      const updated = res?.data;
      if (updated?._id) {
        // Update detail cache
        queryClient.setQueryData(venuesKeys.detail(updated._id), res);
      }
      // Refresh any lists that might include this venue
      queryClient.invalidateQueries({ queryKey: venuesKeys.all });
      toast.success('Venue updated successfully');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to update venue');
    },
  });
};

/** Delete a venue */
export const useDeleteVenue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVenueReq, // expects id
    onMutate: async (id) => {
      // Optimistic update: cancel outgoing fetches and snapshot
      await queryClient.cancelQueries({ queryKey: venuesKeys.all });
      const prevLists = queryClient.getQueriesData({ queryKey: venuesKeys.all });

      // Optimistically remove from any cached lists
      prevLists.forEach(([key, value]) => {
        if (!value?.data) return;
        const newPayload = {
          ...value,
          data: value.data.filter((v) => v._id !== id),
          total: Math.max(0, (value.total ?? 0) - 1),
        };
        queryClient.setQueryData(key, newPayload);
      });

      return { prevLists };
    },
    onError: (err, _id, ctx) => {
      // rollback on error
      ctx?.prevLists?.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });
      toast.error(err?.response?.data?.message || 'Failed to delete venue');
    },
    onSuccess: () => {
      toast.success('Venue deleted successfully');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: venuesKeys.all });
    },
  });
};
