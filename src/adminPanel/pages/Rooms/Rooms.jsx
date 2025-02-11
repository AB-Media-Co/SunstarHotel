import { useEffect } from "react";
import { useDeleteRoomById, useGetRoomDetailsEzee } from "../../../ApiHooks/useHotelHook";
import { useState } from "react";
import { DeleteConfirmationModal } from "../../Components/DeletePopup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Components/Loader";
import { RoomsSection } from "./RoomsSection";
import RoomData from "./RoomData";

const hotels = [
  { value: '14494', label: 'Hotel Sunstar Residency', authId: '164638176786a1a258-c6ea-11ec-9' },
  { value: '14492', label: 'Hotel Sunstar Grand', authId: '431032638481c78c0e-cd20-11ec-9' },
  { value: '15282', label: 'Hotel Sunstar Heights', authId: '520246986786a91364-c6ea-11ec-9' },
  { value: '14493', label: 'Hotel Sunstar Heritage', authId: '107320434586afe643-c6ea-11ec-9' },
  { value: '14495', label: 'Hotel Sunshine', authId: '77963264823686bfcb-d038-11ec-9' },
  { value: '14496', label: 'The Suncourt Hotel Yatri', authId: '43431464258699abee-c6ea-11ec-9' },
];


export const Rooms = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  console.log(selectedRoomId, selectedHotel);

  const navigate = useNavigate();

  const { data: rooms, isLoading } = useGetRoomDetailsEzee(
    selectedHotel?.value,
    selectedHotel?.authId

  );

  console.log(rooms)
  const { mutate: deleteRoomById } = useDeleteRoomById();

  useEffect(() => {
    const defaultHotel = hotels[0]; // Default hotel set karo
    setSelectedHotel(defaultHotel);
  }, []);

  useEffect(() => {
    // Disable scrolling when modal is open
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);


  const handleSelectHotel = (selectedOption) => {
    setSelectedHotel(selectedOption);
    console.log(`Hotel ID: ${selectedOption.value}, Authentication ID: ${selectedOption.authId}`);
  };

  const handleEdit = (roomId) => {
    navigate(`/admin/editRooms/${roomId}`);
  };

  const handleAddRoom = () => {
    navigate('/admin/addRooms');
  };

  const handleDeleteClick = (roomId) => {
    setSelectedRoomId(roomId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedRoomId) {
      deleteRoomById(selectedRoomId, {
        onSuccess: () => {
          toast.success(`Room Deleted Successfully`);
          setIsModalOpen(false);
          setSelectedRoomId(null);
        },
        onError: (error) => {
          toast.error(`Failed to delete Room: ${error.message}`);
          setIsModalOpen(false);
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedRoomId(null);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {/* <RoomsSection
            title="Our Premium Rooms"
            data={rooms?.ezeeResponse?.RoomInfo}
            type="room"
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onAdd={handleAddRoom}
            isDropdownShow={true}
            hotels={hotels}
            handleSelectHotel={handleSelectHotel}
            selectedHotel={selectedHotel} 

          /> */}
          <RoomData
            data={rooms?.ezeeResponse?.RoomInfo}

          />

          <DeleteConfirmationModal
            isOpen={isModalOpen}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        </div>
      )}
    </>
  );
};
