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
  getSingleHotelById
} from '../Api/hotel.js';

// Get Hotels
export const useGetHotels = () =>
  useQuery({
    queryKey: ['hotels'],
    queryFn: getHotelAPI
  });
// Add Hotel
export const useAddHotel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addHotelAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['hotels']);
    }
  });
};


// Update Hotel by ID
export const useUpdateHotelById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateHotelByIdAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['hotels']);
    }
  });
};

// Delete Hotel by ID
export const useDeleteHotelById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteHotelByIdAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['hotels']);
    }
  });
};

// Add Room to Hotel
export const useAddRoomToHotel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addRoomToHotelAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['rooms']);
    }
  });
};

// Get Room by ID
export const useGetRoomById = ({ hotelId, roomId }) =>
  useQuery({
    queryKey: ['room', hotelId, roomId],
    queryFn: () => getRoomByIdAPI({ hotelId, roomId })
  });

// Update Room by ID
export const useUpdateRoomById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRoomByIdAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['rooms']);
    }
  });
};

// Delete Room by ID
export const useDeleteRoomById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRoomByIdAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['rooms']);
    }
  });
};

// Get All Rooms
export const useGetAllRooms = () =>
  useQuery({
    queryKey: ['rooms'],
    queryFn: getAllRoomsAPI
  });


export const useGetSingleRoomById = ({roomId }) =>
  useQuery({
    queryKey: ['room', roomId],
    queryFn: () => getSingleRoomById({ roomId })
  });


export const useGetSingeHotelById = ({ hotelId }) =>
  useQuery({
    queryKey: ['hotels', hotelId],
    queryFn: () => getSingleHotelById({ hotelId })
  });
