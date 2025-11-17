/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
  Card, CardMedia, CardContent, CardActions,
  Typography, Button, Box, Switch
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import HotelIcon from '@mui/icons-material/Hotel';
import Loader from '../../../Components/Loader';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const OverlayContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9))',
  backdropFilter: 'blur(5px)',
  color: 'white',
  zIndex: 9999,
  animation: `${fadeIn} 0.3s ease-in-out`,
}));

const RoomCard = ({ room, onEdit, onToggleShow }) => {
  const [isChecked, setIsChecked] = useState(room.show);
  const [showOverlay, setShowOverlay] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer;
    if (showOverlay) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setShowOverlay(false);
            clearInterval(timer);
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showOverlay]);

  const handleToggleChange = () => {
    setIsChecked(!isChecked);
    setShowOverlay(true);
    setCountdown(5);
    onToggleShow(room._id, !isChecked);
  };

  const truncateDescription = (desc, limit = 15) => {
    if (!desc) return '';
    const words = desc.split(' ');
    return words.length <= limit ? desc : words.slice(0, limit).join(' ') + '...';
  };

  return (
    <Card sx={{
      width: 320,
      margin: 2,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 3,
      boxShadow: 4,
      overflow: 'hidden',
      transition: 'transform 0.3s ease',
      '&:hover': { transform: 'scale(1.02)' }
    }}>
      {/* Toggle Visibility */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
        <Typography variant="body2">Show Room:</Typography>
        <Switch checked={isChecked} onChange={handleToggleChange} />
      </Box>

      {showOverlay && (
        <OverlayContainer>
          <Loader fullScreen={false} size="sm" />
          <Typography variant="h6" sx={{ mb: 1 }}>
            {isChecked ? 'Showing Room' : 'Hiding Room'}
          </Typography>
          <Typography variant="body1">Please wait {countdown} seconds...</Typography>
        </OverlayContainer>
      )}

      {/* Image */}
      <Box sx={{ height: 180, backgroundColor: 'grey.200' }}>
        {room.RoomImage?.[0] ? (
          <CardMedia
            component="img"
            image={room.RoomImage[0]}
            alt={room.RoomName}
            sx={{ height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Box sx={{
            height: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', backgroundColor: 'grey.300'
          }}>
            <Typography variant="caption">No Image Available</Typography>
          </Box>
        )}
      </Box>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          {room.RoomName || 'Unnamed Room'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {truncateDescription(room.RoomDescription)}
        </Typography>

        {/* Room Info */}
        <Box sx={{ mt: 2, display: 'grid', gap: 1 }}>
          {room.maxGuests && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PeopleAltIcon sx={{ fontSize: 18, mr: 0.5 }} />
              <Typography variant="body2">Max Guests: {room.maxGuests}</Typography>
            </Box>
          )}
          {room.squareFeet && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SquareFootIcon sx={{ fontSize: 18, mr: 0.5 }} />
              <Typography variant="body2">Area: {room.squareFeet} sq.ft</Typography>
            </Box>
          )}
          {room.Availability !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HotelIcon sx={{ fontSize: 18, mr: 0.5 }} />
              <Typography variant="body2">Available Rooms: {room.Availability}</Typography>
            </Box>
          )}
          {room.services?.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RoomServiceIcon sx={{ fontSize: 18, mr: 0.5 }} />
              <Typography variant="body2">Services: {room.services.join(', ')}</Typography>
            </Box>
          )}
        </Box>
      </CardContent>

      {/* Footer */}
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Box>
          {room.defaultRate && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'line-through' }}
            >
              ₹ {room.defaultRate}
            </Typography>
          )}
          <Typography variant="subtitle1" color="success.main" fontWeight={600}>
            ₹ {room.discountRate}
          </Typography>
        </Box>
        <Button variant="outlined" onClick={() => onEdit(room)}>Edit</Button>
      </CardActions>
    </Card>
  );
};

const RoomCardList = ({ room, onEdit, onToggleShow }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      // px: 2,
      // py: 4
    }}>
      <RoomCard
        key={room._id}
        room={room}
        onEdit={onEdit}
        onToggleShow={onToggleShow}
      />
    </Box>
  );
};

export default RoomCardList;
