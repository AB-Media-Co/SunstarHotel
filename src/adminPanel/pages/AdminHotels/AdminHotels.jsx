import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteHotelById, useGetHotels } from "../../../ApiHooks/useHotelHook";
import { DeleteConfirmationModal } from "../../Components/DeletePopup";
import toast from "react-hot-toast";
import { Section } from "./HotelsSection";

export const AdminHotels = () => {
  const { data: hotels, isLoading, isError, error } = useGetHotels();
  const { mutate: deleteHotelById } = useDeleteHotelById();

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => document.body.style.overflow = 'auto';
  }, [isModalOpen]);

  const handleDeleteClick = (hotelId) => {
    setSelectedHotelId(hotelId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedHotelId) {
      deleteHotelById(selectedHotelId, {
        onSuccess: () => {
          toast.success(`Hotel Deleted Successfully`);
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

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedHotelId(null);
  };

  const handleAddHotel = () => navigate('/admin/addHotels');

  const handleEdit = (item) => {
    navigate(`/admin/edithotels/${item?.hotelID}`, { state: { hotelData: item } });
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
        showAddButton={false}
      />

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};