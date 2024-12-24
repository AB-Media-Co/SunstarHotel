import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteHotelById, useGetHotels } from "../../../ApiHooks/useHotelHook";
import { Section } from "../../Components/Card";
import { DeleteConfirmationModal } from "../../Components/DeletePopup";
import toast from "react-hot-toast";

export const AdminHotels = () => {
  const { data: hotels, isLoading, isError, error } = useGetHotels();
  const { mutate: deleteHotelById, } = useDeleteHotelById();

  const navigate = useNavigate();
  
  // State for modal visibility and hotelId to be deleted
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(null);

  // Disable scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => document.body.style.overflow = 'auto';
  }, [isModalOpen]);

  // Handle delete button click
  const handleDeleteClick = (hotelId) => {
    setSelectedHotelId(hotelId);
    setIsModalOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (selectedHotelId) {
      deleteHotelById(selectedHotelId, {
        onSuccess: () => {
          toast.success(`Hotel Deeleted Successfully`);
          setIsModalOpen(false);
          setSelectedHotelId(null);
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
    setSelectedHotelId(null);
  };

  const handleAddHotel = () => navigate('/admin/addHotels');

  const handleEdit = (hotelId) => {
    navigate(`/admin/edithotles/${hotelId}`);
  };

 

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <Section 
        title="Our Premium Hotels" 
        data={hotels?.hotels} 
        type="hotel" 
        onEdit={handleEdit} 
        onDelete={handleDeleteClick} 
        onAdd={handleAddHotel} 
      />
      
      <DeleteConfirmationModal
        isOpen={isModalOpen} 
        onConfirm={handleConfirmDelete} 
        onCancel={handleCancelDelete} 
      />
    </>
  );
};