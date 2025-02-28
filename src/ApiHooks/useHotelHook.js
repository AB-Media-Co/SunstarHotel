import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addHotelAPI,
  getHotelAPI,
  updateHotelByIdAPI,
  deleteHotelByIdAPI,
  addRoomToHotelAPI,
  getRoomByIdAPI,
  updateRoomByIdAPI,
  deleteRoomByIdAPI,
  getAllRoomsAPI,
  getSingleRoomById,
  getSingleHotelById,
  uploadImagesAPI,
  getSingleHotelByEzee,
  updateHotelByIdEzee,
  getAllRoomsEzee
} from '../Api/hotel.js';

export const useGetHotels = () =>
  useQuery({
    queryKey: ['hotels'],
    queryFn: getHotelAPI
  });

export const useAddHotel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addHotelAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['hotels']);
    }
  });
};


export const useDeleteHotelById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteHotelByIdAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['hotels']);
    }
  });
};

export const useAddRoomToHotel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addRoomToHotelAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['rooms']);
    }
  });
};

export const useGetRoomById = (roomId) =>
  useQuery({
    queryKey: ['room', roomId],
    queryFn: () => getRoomByIdAPI(roomId)
  });

export const useUpdateRoomById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRoomByIdAPI,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['room', variables.roomId]);
      queryClient.invalidateQueries(['rooms']);
    },
    onError: (error) => {
      console.error('Room Update Error:', error);
    }
  });
};

export const useDeleteRoomById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRoomByIdAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['rooms']);
    }
  });
};
export const useUpdateHotelById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateHotelByIdAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['hotels']);
    }
  });
};

export const useGetAllRooms = () =>
  useQuery({
    queryKey: ['rooms'],
    queryFn: getAllRoomsAPI
  });


export const useGetSingleRoomById = ({ roomId }) =>
  useQuery({
    queryKey: ['room', roomId],
    queryFn: () => getSingleRoomById({ roomId })
  });


export const useGetSingeHotelById = (hotelId) =>
  useQuery({
    queryKey: ['hotels', hotelId],
    queryFn: () => getSingleHotelById(hotelId)
  });



export const useUploadHotelImages = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadImagesAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['hotels']);
      queryClient.invalidateQueries(['hotelsEzee']);
    },
    onError: (error) => {
      console.error('Image Upload Error:', error);
    },
  });
};

// ezeee datta
export const useGetSingleHotelByEzee = (HotelCode, APIKey) =>
  useQuery({
    queryKey: ['hotelsEzee', HotelCode],
    queryFn: () => getSingleHotelByEzee(HotelCode, APIKey),
    enabled: !!HotelCode && !!APIKey, // Run only when both HotelCode and APIKey are available
    onError: (error) => {
      console.error('Error fetching hotel:', error.message); // Handle errors
    },
  });

export const useUpdateHotelByEzee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateHotelByIdEzee,
    onSuccess: () => {
      queryClient.invalidateQueries(['hotels']);
    }
  });
};


export const useGetRoomDetailsEzee = (HotelCode, AuthCode ) =>
  useQuery({
    queryKey: ['RoomsEzee', HotelCode],
    queryFn: () => getAllRoomsEzee({ HotelCode, AuthCode  }), // Pass as an object
    enabled: !!HotelCode && !!AuthCode , // Run only when both HotelCode and APIKey are available
    onError: (error) => {
      console.error('Error fetching Rooms:', error.message); // Handle errors
    },
  });
