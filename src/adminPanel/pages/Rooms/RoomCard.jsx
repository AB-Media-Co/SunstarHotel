import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import { Switch } from '@mui/material';
import { keyframes } from '@mui/system';
import { styled } from '@mui/material/styles';
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
  let timer;

  if (showOverlay) {
    timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setShowOverlay(false);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    return () => clearInterval(timer);
  }, [showOverlay]);

  const handleToggleChange = () => {
    setIsChecked(!isChecked);
    setShowOverlay(true);
    setCountdown(5);
    onToggleShow(room._id, !isChecked);
  };

  const truncateDescription = (description, limit = 15) => {
    if (!description) return '';
    const words = description.split(' ');
    if (words.length <= limit) return description;
    return words.slice(0, limit).join(' ') + '...';
  };
  

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        width: '300px', // Adjust width for card size
        margin: '10px', // Space between cards
      }}
    >
      {/* Toggle Button to Control Room Visibility */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Show Room:
        </Typography>
        <Switch checked={isChecked} onChange={handleToggleChange} />
      </Box>

      {showOverlay && (
        <OverlayContainer>
          <Loader />
          <Typography variant="h6" sx={{ mb: 1 }}>
            {isChecked ? 'Showing Room' : 'Hiding Room'}
          </Typography>
          <Typography variant="body1">
            Please wait {countdown} seconds...
          </Typography>
        </OverlayContainer>
      )}

      {/* Image Section */}
      <Box sx={{ height: 180, backgroundColor: 'grey.300' }}>
        {room.RoomImage && room.RoomImage.length > 0 ? (
          <CardMedia
            component="img"
            image={room.RoomImage[0]}
            alt={room.RoomName}
            sx={{
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'grey.300',
            }}
          >
            <Typography variant="caption" color="text.secondary">
              No Image
            </Typography>
          </Box>
        )}
      </Box>

      {/* Card Content */}
      <CardContent sx={{ flexGrow: 1, padding: 2 }}>
        <Typography gutterBottom variant="h6" component="div">
          {room.RoomName || 'Unknown Room'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {truncateDescription(room.RoomDescription, 15)}
        </Typography>

        {/* Extra Room Details */}
        <Box sx={{ mt: 2 }}>
          {room.maxGuests && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <PeopleAltIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">Max Guests: {room.maxGuests}</Typography>
            </Box>
          )}
          {room.squareFeet && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <SquareFootIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">Square Feet: {room.squareFeet}</Typography>
            </Box>
          )}
          {room.services && room.services.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <RoomServiceIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                Services: {room.services.join(', ')}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>

      {/* Card Actions (Price and Edit Button) */}
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
            ₹ {room.defaultRate}
          </Typography>
          <Typography variant="subtitle1" color="success.main">
            ₹ {room.discountRate}
          </Typography>
        </Box>
        <Box>
          <Button size="small" variant="contained" onClick={() => onEdit(room)}>
            Edit
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

const RoomCardList = ({ room, onEdit, onToggleShow }) => {
  console.log(room)
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
     
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
