import { useState, useEffect } from 'react';
import { Container, Box, Grid, FormControl, InputLabel, Select, MenuItem, TextField, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useGetHotels } from '../../../ApiHooks/useHotelHook2';
import { useRooms, useUpdateRoom } from '../../../ApiHooks/useRoomsHook';
import RoomCard from './RoomCard';
import EditRooms from './EditRooms';
import Loader from '../../../Components/Loader';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material'; // You need Button too

// Styled Components
const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(4),
  backgroundColor: '#fff',
  borderRadius: theme.shape.borderRadius,
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
  backgroundColor: '#fff',
  borderRadius: theme.shape.borderRadius,
}));

const HotelSelect = styled(FormControl)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}));

const DateTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}));

const RoomsGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const Rooms = () => {
  const [selectedHotel, setSelectedHotel] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [roomSaving, setIsRoomSaving] = useState(false);
  const navigate = useNavigate();

  const { data: hotels } = useGetHotels();
  const filteredHotels = hotels?.hotels?.filter((hotel) => hotel.hotelCode);

  useEffect(() => {
    if (!selectedHotel && filteredHotels && filteredHotels.length > 0) {
      const firstHotel = filteredHotels[0];
      setSelectedHotel(String(firstHotel.hotelCode));
      setAuthCode(firstHotel.authKey);
    }
  }, [filteredHotels, selectedHotel]);

  const today = new Date()?.toISOString()?.split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000)?.toISOString()?.split('T')[0];
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(tomorrow);

  const { data: rooms, isLoading: roomsLoading } = useRooms(
    selectedHotel,
    authCode,
    fromDate,
    toDate
  );
  const roomArray = Array?.isArray(rooms?.rooms) ? rooms?.rooms : rooms?.rooms;
  console.log('roomArray', roomArray);

  const apiDataRooms = rooms?.rateApiData?.RES_Response?.RoomInfo?.Source
    ? Array?.isArray(rooms?.rateApiData?.RES_Response?.RoomInfo?.Source)
      ? rooms?.rateApiData?.RES_Response?.RoomInfo?.Source
      : [rooms?.rateApiData?.RES_Response?.RoomInfo?.Source]
    : [];

  const [editingRoom, setEditingRoom] = useState(null);

  const updateRoomMutation = useUpdateRoom(selectedHotel, authCode, fromDate, toDate);

  const handleSaveRoom = (updatedRoom) => {
    setIsRoomSaving(true);
    if (updatedRoom._id) {
      updateRoomMutation.mutate(updatedRoom, {
        onSuccess: () => {
          setEditingRoom(null);
          setIsRoomSaving(false);
        },
        onError: (error) => {
          console.error('Error updating room:', error);
          setIsRoomSaving(false);
        },
      });
    } else {
      // Create a new room object
    }
  };

  const handleToggleShow = (roomId, newShowStatus) => {
    // Update the room's show status in the state
    const updatedRoom = Array.isArray(roomArray) && roomArray.length > 0
      ? roomArray.find((room) => room && room._id === roomId)
      : null;

    if (!updatedRoom) return; // Return early if room not found
    updatedRoom.show = newShowStatus;

    updateRoomMutation.mutate(updatedRoom); // Call mutation to update in database
  };

  // 👇 Add this style snippet at top
  const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.25rem',
    fontWeight: 600,
    // marginBottom: theme.spacing(2),
    // color: theme.palette.grey[800],
  }));


  return (
    <StyledContainer maxWidth="lg">
      <HeaderBox elevation={2}>
        <SectionTitle variant="h6">Room Configuration</SectionTitle>
        <div className='flex w-full justify-between'>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <HotelSelect>
                <InputLabel id="hotel-select-label">Select Hotel</InputLabel>
                <Select
                  labelId="hotel-select-label"
                  value={selectedHotel}
                  label="Select Hotel"
                  onChange={(e) => {
                    setSelectedHotel(e.target.value);
                    const selected = filteredHotels.find(h => String(h.hotelCode) === e.target.value);
                    if (selected) setAuthCode(selected.authKey);
                  }}
                >
                  {filteredHotels?.map((hotel) => (
                    <MenuItem key={hotel._id} value={String(hotel.hotelCode)}>
                      {hotel.name}
                    </MenuItem>
                  ))}
                </Select>
              </HotelSelect>
            </Grid>

            <Grid item xs={6} md={4}>
              <DateTextField
                label="From Date"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={6} md={4}>
              <DateTextField
                label="To Date"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>


          </Grid>

          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate('/admin/day-use-room')}
            >
              Switch to Day Use Room
            </Button>
          </Grid>
        </div>

      </HeaderBox>


      <Box>
        {roomsLoading ? (
          <div className='flex justify-center items-center mx-auto'>
            <img src="/images/Logo/spinner.svg" alt="" />
          </div>
        ) : (
          <RoomsGrid container spacing={1}>
            {roomArray?.map((room) => (
              <Grid item xs={12} sm={6} md={4} key={room._id}>
                <RoomCard
                  room={room}
                  onToggleShow={handleToggleShow}  // Pass the toggle handler
                  onEdit={() => setEditingRoom(room)}
                />
              </Grid>
            ))}
          </RoomsGrid>
        )}
      </Box>

      {editingRoom && (
        <EditRooms
          room={editingRoom}
          roomTypes={apiDataRooms}
          onClose={() => setEditingRoom(null)}
          onSave={handleSaveRoom}
          isEdit={!!editingRoom._id}
          roomSaving={roomSaving}
        />
      )}
    </StyledContainer>
  );
};

export default Rooms;
