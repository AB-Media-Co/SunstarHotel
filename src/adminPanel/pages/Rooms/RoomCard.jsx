// src/pages/RoomCard.jsx
import React from 'react';
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

const RoomCard = ({ room, onEdit }) => {
  const truncateDescription = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length <= wordLimit
      ? text
      : words.slice(0, wordLimit).join(' ') + '...';
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        m: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'transform 0.3s',
        '&:hover': { transform: 'scale(1.03)' },
      }}
    >
      {room.RoomImage && room.RoomImage.length > 0 ? (
        <CardMedia
          component="img"
          height="180"
          image={room.RoomImage[0]}
          alt={room.RoomName}
        />
      ) : (
        <Box
          sx={{
            height: 180,
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
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {room.RoomName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {truncateDescription(room.RoomDescription, 15)}
        </Typography>

        {/* Extra Room Details */}
        <Box sx={{ mt: 1 }}>
          {room.maxGuests && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <PeopleAltIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">Max Guests: {room.maxGuests}</Typography>
            </Box>
          )}
          {room.squareFeet && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <SquareFootIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                Square Feet: {room.squareFeet}
              </Typography>
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
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textDecoration: 'line-through' }}
          >
            ₹ {room.defaultRate}
          </Typography>
          <Typography variant="subtitle1" color="success.main">
            ₹ {room.discountRate}
          </Typography>
        </Box>
        <Button size="small" variant="contained" onClick={() => onEdit(room)}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default RoomCard;
