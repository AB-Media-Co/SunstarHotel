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
    enabled: !!email && email.trim() !== '', // ✅ Only run query when email exists
    staleTime: 10000, // ✅ Reduced from 30s to 10s for fresher data
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
      toast.error(error?.response?.data?.message || error.message);
    },
  });
};

// ✅ Check Email Verification Status by Email
export const useCheckEmailVerification = (email) => {
  return useQuery({
    queryKey: ['check-email-verification', email],
    queryFn: async () => {
      if (!email || email.trim() === '') {
        return { verified: false };
      }

      try {
        const response = await axiosInstance.get(`/api/user/check-verification?email=${email}`);
        return response.data;
      } catch (error) {
        toast.error('Verification check failed: ' + (error?.response?.data?.message || error.message));
        throw error;
      }
    },
    enabled: !!email,
    staleTime: 30000,
    refetchOnWindowFocus: false,
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

// ✅ Update User Profile Hook
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updateData) => {
      const response = await axiosInstance.put('/api/user/update-profile', updateData);
      return response.data;
    },
    onSuccess: (data, variables) => {
      toast.success('Profile updated successfully');

      // Invalidate the user info query to refetch updated data
      if (variables?.email) {
        queryClient.invalidateQueries({ queryKey: ['user-info', variables.email] });
      }
    },
    onError: (error) => {
      toast.error('Failed to update profile: ' + (error?.response?.data?.message || error.message));
    }
  });
};




// ✅ Apply for Job (send form + resume)
export const useApplyForJob = () => {
  return useMutation({
    mutationFn: async (payload) => {
      // payload = { name, appliedFor, phoneNumber, emailId, gender, submittedAt, resume, adminEmail? }
      const fd = new FormData();
      fd.append("name", payload.name ?? "");
      fd.append("appliedFor", payload.appliedFor ?? "");
      fd.append("phoneNumber", payload.phoneNumber ?? "");
      fd.append("emailId", payload.emailId ?? "");
      fd.append("gender", payload.gender ?? "");
      fd.append("submittedAt", payload.submittedAt ?? new Date().toISOString());
      if (payload.adminEmail) fd.append("adminEmail", payload.adminEmail);
      if (payload.resume instanceof File) {
        fd.append("resume", payload.resume, payload.resume.name);
      } else {
        throw new Error("Resume file is required");
      }

      const { data } = await axiosInstance.post(
        "/api/user/jobs/apply",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return data;
    },

    onSuccess: () => {
      toast.success("Application submitted. Check your email!");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message || "Failed to apply");
    },
  });
};
