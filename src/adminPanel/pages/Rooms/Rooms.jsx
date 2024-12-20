import { useEffect } from "react";
import { useDeleteRoomById, useGetAllRooms } from "../../../ApiHooks/useHotelHook";
import { Section } from "../../Components/Card";
import { useState } from "react";
import { DeleteConfirmationModal } from "../../Components/DeletePopup";
import toast from "react-hot-toast";

export const Rooms = () => {
  const { data: rooms, isLoading, isError, error } = useGetAllRooms();
  const { mutate: deleteRoomById, } = useDeleteRoomById();

  const handleEdit = (roomId) => alert(`Edit room with ID: ${roomId}`);
  const handleAddRoom = () => alert('Add Room Clicked!');


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  console.log(selectedRoomId)

  // Disable scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => document.body.style.overflow = 'auto';
  }, [isModalOpen]);

  const handleDeleteClick = (roomId) => {
    setSelectedRoomId(roomId);
    setIsModalOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (selectedRoomId) {
      deleteRoomById(selectedRoomId, {
        onSuccess: () => {
          toast.success(`Hotel Deeleted Successfully`);
          setIsModalOpen(false);
          setSelectedRoomId(null);
        },
        onError: (error) => {
          toast.error(`Failed to delete hotel: ${error.message}`);
          setIsModalOpen(false);
        }
      });
    }
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedRoomId(null);
  };



  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return <>
    <Section
      title="Our Premium Rooms"
      data={rooms?.rooms}
      type="room"
      onEdit={handleEdit}
      onDelete={handleDeleteClick}
      onAdd={handleAddRoom} />;


    <DeleteConfirmationModal
      isOpen={isModalOpen}
      onConfirm={handleConfirmDelete}
      onCancel={handleCancelDelete}
    />
  </>

};
