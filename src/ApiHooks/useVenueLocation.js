import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../services/axiosInstance';

// ✅ Fetch all venue locations
export const useVenueLocations = () => {
  return useQuery({
    queryKey: ['venueLocations'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/venue-locations');
      return response.data;
    },
    staleTime: 30000, // data is fresh for 30s
    refetchOnWindowFocus: false,
  });
};

// ✅ Create new venue location
export const useCreateVenueLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newVenueLocation) => {
      const response = await axiosInstance.post('/api/venue-locations', newVenueLocation);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['venueLocations']);
      toast.success('Venue location created successfully');
    },
  });
};

// ✅ Update venue location
export const useUpdateVenueLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ idOrSlug, updatedData }) => {
      const response = await axiosInstance.patch(
        `/api/venue-locations/${idOrSlug}`,
        updatedData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['venueLocations']);
      toast.success('Venue location updated successfully');
    },
  });
};

// ✅ Delete venue location
export const useDeleteVenueLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (idOrSlug) => {
      const response = await axiosInstance.delete(`/api/venue-locations/${idOrSlug}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['venueLocations']);
      toast.success('Venue location deleted successfully');
    },
  });
};

// ✅ Get a single venue location by ID or slug (utility function, not a hook)
export const getSingleVenueLocation = async (idOrSlug) => {
  const response = await axiosInstance.get(`/api/venue-locations/${idOrSlug}`);
  return response.data;
};
