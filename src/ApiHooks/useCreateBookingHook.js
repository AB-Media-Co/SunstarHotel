import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../services/axiosInstance';

// Hook for making the booking
export const useMakeBooking = (hotelCode, authKey, checkIn, checkOut, selectedRooms) => {
  return useMutation({
    mutationFn: async (guestDetails) => {
      // Prepare the room data to send in the API request
      const roomData = {
        Room_Details: selectedRooms.reduce((acc, room, index) => {
          acc[`Room_${index + 1}`] = {
            Rateplan_Id: room.rateplanId || "",
            Ratetype_Id: room.RateTypeID || "",
            Roomtype_Id: room.RoomTypeID || "",
            baserate: room.price || "",
            extradultrate: room.extraAdultRate || "",
            extrachildrate: room.extraChildRate || "",
            number_adults: room.guestQty || 1,
            number_children: room.childrenQty || 0,
            ExtraChild_Age: room.childAge || "",
            Title: guestDetails.title || "",
            First_Name: guestDetails.firstName || "",
            Last_Name: guestDetails.lastName || "",
            Gender: guestDetails.gender || "",
            SpecialRequest: guestDetails.specialRequest || ""
          };
          return acc;
        }, {}),
        check_in_date: checkIn,
        check_out_date: checkOut,
        Booking_Payment_Mode: guestDetails.paymentMethod,
        Email_Address: guestDetails.email || "",
        MobileNo: guestDetails.phoneNumber || "",
      };

      // Make the API request to your backend
      const apiUrl = `/api/booking`; // Use your backend API route
      const response = await axiosInstance.post(apiUrl, {
        roomData,
        hotelDetail: {
          hotelCode,
          authKey,
        },
      });

      return response.data; // Return the response data from the backend
    },
    onSuccess: (data) => {
      // Handle success (you can show success toast or perform other actions here)
      if (data.success) {
        toast.success("Booking successful!");
      } else {
        toast.error("Booking failed: " + (data.message || "Unknown error"));
      }
    },
    onError: (error) => {
      // Handle error (you can show error toast here)
      toast.error("Error making booking: " + (error?.response?.data?.error || error.message));
    },
  });
};
