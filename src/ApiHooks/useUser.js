import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../services/axiosInstance';

export const useGetUserByEmail = (email) => {
    return useQuery({
      queryKey: ['user-info', email],
      queryFn: async () => {
        if (!email || email.trim() === '') {
          // If email is empty, return default safe object
          return {
            id: null,
            isVerified: false,
            email: null,
            phone: null,
            firstName: null,
            lastName: null,
            role: null,
            loyalAgent: null,
            bookingDetails: []
          };
        }
  
        try {
          const response = await axiosInstance.get(`/api/user/get-user?email=${email}`);
          return response.data;
        } catch (error) {
          toast.error('Failed to fetch user info: ' + (error?.response?.data?.message || error.message));
          throw error;
        }
      },
      staleTime: 30000,
      refetchOnWindowFocus: false,
    });
  };

// ✅ Send OTP Hook
export const useSendOtp = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await axiosInstance.post('/api/user/send-otp', userData);
      return response.data;
    },
    onSuccess: () => {
      toast.success('OTP sent successfully');
    },
    onError: (error) => {
      toast.error('Failed to send OTP: ' + error?.response?.data?.message || error.message);
    },
  });
};

// ✅ Verify OTP Hook
export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async (verifyData) => {
      const response = await axiosInstance.post('/api/user/verify-otp', verifyData);
      return response.data;
    },
    onSuccess: () => {
      toast.success('OTP verified successfully');
    },
    onError: (error) => {
      toast.error('Failed to verify OTP: ' + error?.response?.data?.message || error.message);
    },
  });
};

// ✅ Add Booking Hook (Multiple bookings)
export const useAddBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, bookingData }) => {
      const response = await axiosInstance.post(`/api/user/add-booking/${userId}`, bookingData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
      toast.success('Booking added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add booking: ' + error?.response?.data?.message || error.message);
    },
  });
};

// ✅ (Optional) Fetch User Bookings by ID
export const useGetUserBookings = (userId) => {
  return useQuery({
    queryKey: ['user-bookings', userId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/user/${userId}`);
      return response.data;
    },
    enabled: !!userId,  // only run if userId is present
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
};



export const useCancelBooking = () => {
  return useMutation({
    mutationFn: async ({ hotelCode, apiKey, reservationNo }) => {
      try {
        const response = await axiosInstance.post("/api/user/cancelBooking", {
          hotelCode,
          apiKey,
          reservationNo
        });
        return response.data;
      } catch (error) {
        // Transform the error for better error handling
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || 
            error.response?.data?.error || 
            "Failed to cancel booking"
          );
        }
        throw error;
      }
    },

    onSuccess: () => {
      toast.success("Booking cancelled successfully");
    },

    onError: (error) => {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to cancel booking due to an unexpected error";
      toast.error(errorMessage);
      
      // Optionally log to error tracking service
      // logErrorToService(error);
    },

    // Optional: Reset mutation state after a delay
    onSettled: () => {
      // You could add any cleanup logic here
    }
  });
};
