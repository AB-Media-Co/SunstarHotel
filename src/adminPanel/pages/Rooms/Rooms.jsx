import { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';
import { useGetHotels } from '../../../ApiHooks/useHotelHook2';
import { useRooms, useUpdateRoom, useCreateRoom } from '../../../ApiHooks/useRoomsHook';
import RoomCard from './RoomCard';
import EditRooms from './EditRooms';

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

const AddRoomButton = styled(Button)(({ theme }) => ({
  textAlign: 'right',
  marginTop: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    textAlign: 'left',
  },
}));

const RoomsGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const Rooms = () => {
  const [selectedHotel, setSelectedHotel] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [roomSaving, setIsRoomSaving] = useState(false);

  const { data: hotels } = useGetHotels();
  const filteredHotels = hotels?.hotels?.filter((hotel) => hotel.hotelCode);

  useEffect(() => {
    if (!selectedHotel && filteredHotels && filteredHotels.length > 0) {
      const firstHotel = filteredHotels[0];
      setSelectedHotel(String(firstHotel.hotelCode));
      setAuthCode(firstHotel.authKey);
    }
  }, [filteredHotels, selectedHotel]);

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(tomorrow);

  const { data: rooms, isLoading: roomsLoading } = useRooms(
    selectedHotel,
    authCode,
    fromDate,
    toDate
  );
  console.log('Full Rooms Response:', roomsLoading);
  const roomArray = Array.isArray(rooms?.rooms) ? rooms?.rooms : [];
  // Handle both array and single object cases for Source
  const apiDataRooms = rooms?.apiData?.RES_Response?.RoomInfo?.Source
    ? Array.isArray(rooms.apiData.RES_Response.RoomInfo.Source)
      ? rooms.apiData.RES_Response.RoomInfo.Source
      : [rooms.apiData.RES_Response.RoomInfo.Source] // Wrap single object in array
    : [];

  const [editingRoom, setEditingRoom] = useState(null);

  // Initialize both update and create hooks
  const updateRoomMutation = useUpdateRoom(selectedHotel, authCode, fromDate, toDate);
  const createRoomMutation = useCreateRoom(selectedHotel, authCode, fromDate, toDate);

  // The handleSaveRoom function now checks if the room has an _id
  // If it does, it calls the update endpoint; if not, it calls the create endpoint.
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
      createRoomMutation.mutate(updatedRoom, {
        onSuccess: () => {
          setEditingRoom(null);
          setIsRoomSaving(false);
        },
        onError: (error) => {
          console.error('Error creating room:', error);
          setIsRoomSaving(false);
        },
      });
    }
  };

  return (
    <StyledContainer maxWidth="lg">
      <HeaderBox>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <HotelSelect fullWidth>
                  <InputLabel id="hotel-select-label">Select Hotel</InputLabel>
                  <Select
                    labelId="hotel-select-label"
                    value={selectedHotel}
                    label="Select Hotel"
                    onChange={(e) => {
                      setSelectedHotel(e.target.value);
                      const selected = filteredHotels?.find(
                        (hotel) => String(hotel.hotelCode) === e.target.value
                      );
                      if (selected) {
                        setAuthCode(selected.authKey);
                      }
                    }}
                  >
                    {filteredHotels &&
                      filteredHotels.map((hotel) => (
                        <MenuItem key={hotel._id} value={String(hotel.hotelCode)}>
                          {hotel.name}
                        </MenuItem>
                      ))}
                  </Select>
                </HotelSelect>
              </Grid>
              <Grid item xs={6} sm={3}>
                <DateTextField
                  fullWidth
                  label="From"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <DateTextField
                  fullWidth
                  label="To"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <AddRoomButton
              variant="contained"
              disabled={!selectedHotel}
              onClick={() =>
                setEditingRoom({
                  RoomTypeID: '',
                  RateTypeID: '',
                  RoomName: '',
                  RoomDescription: '',
                  defaultRate: '',
                  discountRate: '',
                  Amenities: [],
                  RoomImage: [],
                  HotelCode: selectedHotel,
                  source: '',
                })
              }
            >
              Add Room
            </AddRoomButton>
          </Grid>
        </Grid>
      </HeaderBox>

      <Box>
        {roomsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <RoomsGrid container spacing={3}>
            {roomArray
              .filter((room) => room.HotelCode && room.HotelCode === selectedHotel)
              .map((room) => (
                <Grid item xs={12} sm={6} md={4} key={room._id}>
                  <RoomCard
                    room={room}
                    onEdit={() =>
                      setEditingRoom({
                        ...room,
                        HotelCode: room.HotelCode || selectedHotel,
                        source: room.source || '',
                      })
                    }
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
