import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../services/axiosInstance';
import { useQuery,  useQueryClient } from '@tanstack/react-query';

// Hook for making the booking
export const useMakeBooking = (hotelCode, authKey, checkIn, checkOut, selectedRooms) => {
  return useMutation({
    mutationFn: async (guestDetails) => {
      // Prepare the BookingData as per eZee API requirements
      const roomData = {
        Room_Details: selectedRooms.reduce((acc, room, index) => {
          acc[`Room_${index + 1}`] = {
            Rateplan_Id: room.rateplanId || "",
            Ratetype_Id: room.RateTypeID || "",
            Roomtype_Id: room.RoomTypeID || "",
            baserate: room.price ? room.price.toString() : "0", // Convert to string as per API
            extradultrate: room.extraAdultRate ? room.extraAdultRate.toString() : "0",
            extrachildrate: room.extraChildRate ? room.extraChildRate.toString() : "0",
            number_adults: room.guestQty ? room.guestQty.toString() : "1",
            number_children: room.childrenQty ? room.childrenQty.toString() : "0",
            ExtraChild_Age: room.childrenQty > 0 ? (room.childAge || "0") : "", // Only needed if children present
            Title: guestDetails.title || "",
            First_Name: guestDetails.firstName || "", // Required field
            Last_Name: guestDetails.lastName || "", // Required field
            Gender: guestDetails.gender || "",
            SpecialRequest: guestDetails.specialRequest || ""
          };
          return acc;
        }, {}),
        check_in_date: checkIn, // Required field
        check_out_date: checkOut, // Required field
        Booking_Payment_Mode: guestDetails.paymentMethod || "",
        Email_Address: guestDetails.email || "", // Required field
        MobileNo: guestDetails.phoneNumber || "",
        Address: guestDetails.address || "",
        Country: guestDetails.country || "",
        City: guestDetails.city || "",
        Zipcode: guestDetails.zipcode || "",
      };

      const response = await axiosInstance.post('/api/booking', {
        roomData,
        hotelDetail: {
          hotelCode,
          authKey,
        },
      });

      return response.data;
    },
    onSuccess: (data) => {
      // Check for proper response structure based on eZee API
      if (data && data.ReservationNo) {
        toast.success(`Booking successful! Reservation #${data.ReservationNo}`);
        return data;
      } else {
        toast.error("Booking failed: " + (data.message || "Unknown error"));
        throw new Error(data.message || "Unknown error");
      }
    },
    onError: (error) => {
      console.error("Booking error:", error);
      toast.error("Error making booking: " + (error?.response?.data?.message || error.message));
      throw error;
    },
  });
};


// Get all bookings
export const useGetBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/newBooking/createBooking');
      return response.data;
    },
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false,
  });
};

// Create a new booking
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newBooking) => {
      const response = await axiosInstance.post('/api/newBooking/createBooking', newBooking);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      // toast.success('Booking created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create booking: ${error.response?.data?.message || error.message}`);
    },
  });
};

// Update an existing booking
export const useUpdateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ bookingId, updateData }) => {
      const response = await axiosInstance.put(`/api/newBooking/updateBooking/${bookingId}`, updateData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update booking: ${error.response?.data?.message || error.message}`);
    },
  });
};


