/* eslint-disable react/prop-types */
import { useState } from 'react';
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
import { Switch } from '@mui/material'; // Import Switch component

const RoomCard = ({ room, onEdit, onToggleShow }) => {
  const [isChecked, setIsChecked] = useState(room.show); // Track the 'show' state of the room
  
  const truncateDescription = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length <= wordLimit
      ? text
      : words.slice(0, wordLimit).join(' ') + '...';
  };

  const handleToggleChange = () => {
    setIsChecked(!isChecked);  // Toggle the local state
    onToggleShow(room._id, !isChecked);  // Call the parent handler to update the 'show' property in DB
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Toggle Button to Control Room Visibility */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Show Room:
        </Typography>
        <Switch checked={isChecked} onChange={handleToggleChange} />
      </Box>

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

export default RoomCard;
