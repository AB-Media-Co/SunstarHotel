import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../services/axiosInstance';

export const useOffersAndDeals = () => {
  return useQuery({
    queryKey: ['offersAndDeals'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/deals');
      return response.data;
    },
    staleTime: 30000, // Data is considered fresh for 30 seconds
    refetchOnWindowFocus: false,
  });
};

export const useCreateOfferAndDeal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newOfferDeal) => {
      const response = await axiosInstance.post('/api/deals', newOfferDeal);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['offersAndDeals']);
      toast.success('Offer/Deal created successfully');
    },
  });
};

export const useUpdateOfferAndDeal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const response = await axiosInstance.put(`/api/deals/${id}`, updatedData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['offersAndDeals']);
      toast.success('Offer/Deal updated successfully');
    },
  });
};

export const useDeleteOfferAndDeal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/api/deals/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['offersAndDeals']);
      toast.success('Offer/Deal deleted successfully');
    },
  });
};

export const getSingleOfferAndDealById = async (id) => {
  const response = await axiosInstance.get(`/api/deals/${id}`);
  return response.data;
};

export const useOfferCodesForHotel = () => {
  return useMutation({
    mutationFn: async (hotelId) => {
      const response = await axiosInstance.post('/api/deals/hotelOfferCodes', { hotelId });
      return response.data;
    },
    onSuccess: () => {
      // Optionally show toast or perform other actions
    },
  });
};

/**
 * Updated hook to include `checkInDate` along with hotelId, rate, and offerCode.
 * This supports the backend logic for last-minute/early-booker deals.
 */
export const useDiscountedRate = () => {
  return useMutation({
    mutationFn: async ({ hotelId, rate, offerCode, checkInDate }) => {
      const response = await axiosInstance.post('/api/deals/discountedRate', {
        hotelId,
        rate,
        offerCode,
        checkInDate, // Now required for eligibility checks on the backend
      });
      return response.data;
    },
  });
};

export const useSendOtp = () => {
  return useMutation({
    mutationFn: async (phone) => {
      const response = await axiosInstance.post('/api/deals/sendOtp', { phone });
      return response.data;
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async ({ phone, code }) => {
      const response = await axiosInstance.post('/api/deals/verifyOtp', { phone, code });
      return response.data;
    },
  });
};
