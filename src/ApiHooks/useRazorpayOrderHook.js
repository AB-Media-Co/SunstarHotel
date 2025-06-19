import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../services/axiosInstance';

// ✅ Create Razorpay Order Hook
export const useCreateRazorpayOrder = () => {
  return useMutation({
    mutationFn: async (orderData) => {
      const response = await axiosInstance.post('/api/payments/create', orderData);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Order created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create order: ' + (error?.response?.data?.message || error.message));
    },
  });
};

// ✅ Verify Razorpay Payment Hook
export const useVerifyRazorpayPayment = () => {
  return useMutation({
    mutationFn: async (verifyData) => {
      const response = await axiosInstance.post('/api/payments/verify', verifyData);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Payment verified successfully');
    },
    onError: (error) => {
      toast.error('Payment verification failed: ' + (error?.response?.data?.message || error.message));
    },
  });
};
