/* eslint-disable react/prop-types */
// src/pages/EditRooms.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Autocomplete,
  Grid,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MultipleImageUpload from '../../Components/MultipleImageUpload';
import ImageUpload from '../../Components/ImageUpload';
import { uploadImagesAPIV2, useGetHotels } from '../../../ApiHooks/useHotelHook2';
import useUpdatePagesHook from '../../../ApiHooks/useUpdatePagesHook';

// Helper component for tab panels
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

const EditRoom = ({ room, roomTypes, onClose, onSave }) => {
  // Tab 0: Room Info, Tab 1: Upload Images, Tab 2: About Room
  const [activeTab, setActiveTab] = useState(0);

  // Form data for room details
  const [formData, setFormData] = useState({
    HotelCode: room.HotelCode || '',
    RoomTypeID: room.RoomTypeID || '',
    RoomName: room.RoomName || '',
    RoomDescription: room.RoomDescription || '',
    defaultRate: room.defaultRate || '',
    discountRate: room.discountRate || '',
    maxGuests: room.maxGuests || '',
    squareFeet: room.squareFeet || '',
    services: room.services ? room.services.join(', ') : '',
    available: room.available === 'no' ? false : true,
  });

  // About Room state with description and image (maps to schema: AboutRoom.description and AboutRoom.img)
  const [aboutRoom, setAboutRoom] = useState({
    description: room.AboutRoom?.description || '',
    image: room.AboutRoom?.img || '',
  });

  const [images, setImages] = useState(room.RoomImage || []);
  const [isUploading, setIsUploading] = useState(false);
  const { amenities } = useUpdatePagesHook();

  // Store multiple selected amenities as an array of objects.
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const { data: hotelsData } = useGetHotels();
  const availableHotels = hotelsData?.hotels?.filter((hotel) => hotel.hotelCode);

  useEffect(() => {
    if (amenities && room.Amenities) {
      // Assuming room.Amenities is an array of objects (each with value and label)
      const selected = amenities.filter((amenity) =>
        room.Amenities.some((a) => a.value === amenity.value)
      );
      setSelectedAmenities(selected);
    }
  }, [amenities, room.Amenities]);

  useEffect(() => {
    if (roomTypes && formData.RoomTypeID) {
      const selected = roomTypes.find((rt) => rt.RoomTypeID === formData.RoomTypeID);
      if (selected) {
        setFormData((prev) => ({
          ...prev,
          defaultRate: selected.defaultRate || selected.BaseRate || '',
        }));
      }
    }
  }, [formData.RoomTypeID, roomTypes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for the room availability checkbox.
  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, available: e.target.checked }));
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Handler for About Room changes (both description and image)
  const handleAboutChange = (field, value) => {
    setAboutRoom((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Convert comma-separated services string into an array
    const updatedServices = formData.services
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const updatedRoom = {
      ...room,
      ...formData,
      RoomImage: images,
      // Send the selected amenities array as is (each object includes value and label)
      Amenities: selectedAmenities,
      maxGuests: formData.maxGuests ? parseInt(formData.maxGuests) : undefined,
      squareFeet: formData.squareFeet ? parseInt(formData.squareFeet) : undefined,
      services: updatedServices,
      AboutRoom: {
        description: aboutRoom.description,
        img: aboutRoom.image,
      },
    };
    onSave(updatedRoom);
  };

  const handleImagesUpload = async (selectedFiles) => {
    if (selectedFiles.length === 0) {
      toast.error('No images selected');
      return;
    }
    setIsUploading(true);
    try {
      const data = await uploadImagesAPIV2(selectedFiles);
      const uploadedUrls = Array.isArray(data) ? data : [data];
      setImages((prev) => [...prev, ...uploadedUrls[0].imageUrls]);
      toast.success('Images uploaded successfully!');
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Error uploading images');
    }
    setIsUploading(false);
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" color="primary">
            {room._id ? 'Edit Room' : 'Add Room'}
          </Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          <Tab label="Room Info" />
          <Tab label="Upload Images" />
          <Tab label="About Room" />
        </Tabs>
        {/* Room Info Tab */}
        <TabPanel value={activeTab} index={0}>
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              {/* Hotel Code & Room Type */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="hotel-code-label">Hotel Code</InputLabel>
                  <Select
                    labelId="hotel-code-label"
                    id="HotelCode"
                    name="HotelCode"
                    value={formData.HotelCode}
                    label="Hotel Code"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="">
                      <em>Select Hotel</em>
                    </MenuItem>
                    {availableHotels &&
                      availableHotels.map((hotel) => (
                        <MenuItem key={hotel._id} value={String(hotel.hotelCode)}>
                          {hotel.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="room-type-label">Room Type</InputLabel>
                  <Select
                    labelId="room-type-label"
                    id="RoomTypeID"
                    name="RoomTypeID"
                    value={formData.RoomTypeID}
                    label="Room Type"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="">
                      <em>Select Room Type</em>
                    </MenuItem>
                    {roomTypes &&
                      roomTypes.map((rt) => (
                        <MenuItem key={rt.RoomTypeID} value={rt.RoomTypeID}>
                          {rt.RoomTypeID} - Rate: {rt.defaultRate || rt.BaseRate || 'N/A'}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* Room Name & Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Room Name"
                  name="RoomName"
                  value={formData.RoomName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Room Description"
                  name="RoomDescription"
                  value={formData.RoomDescription}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                />
              </Grid>
              {/* Extra Details: Max Guests, Square Feet, Services */}
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Max Guests"
                  name="maxGuests"
                  type="number"
                  value={formData.maxGuests}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Square Feet"
                  name="squareFeet"
                  type="number"
                  value={formData.squareFeet}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Services"
                  name="services"
                  value={formData.services}
                  onChange={handleInputChange}
                  helperText="Enter comma separated services (e.g., WiFi, TV, Room Service)"
                />
              </Grid>
              {/* Room Available Checkbox */}
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.available}
                      onChange={handleCheckboxChange}
                      name="available"
                      color="primary"
                    />
                  }
                  label="Room Available"
                />
              </Grid>
              {/* Amenities Multiselect */}
              <Grid item xs={12}>
              <Autocomplete
  multiple
  freeSolo
  options={amenities || []}
  value={selectedAmenities}
  onChange={(event, newValue) => {
    // Convert typed strings into { value, label } objects
    const transformed = newValue.map((item) => {
      if (typeof item === 'string') {
        return { value: item, label: item };
      }
      // If it's already an object (selected from the list), just return it
      return item;
    });
    setSelectedAmenities(transformed);
  }}
  getOptionLabel={(option) => option.label || ''}
  renderInput={(params) => (
    <TextField {...params} label="Amenities" placeholder="Select amenities" />
  )}
/>

              </Grid>
              {/* Rates */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Discount Rate"
                  name="discountRate"
                  type="number"
                  value={formData.discountRate}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Default Rate"
                  name="defaultRate"
                  type="number"
                  value={formData.defaultRate}
                  disabled
                />
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
        {/* Upload Images Tab */}
        <TabPanel value={activeTab} index={1}>
          <MultipleImageUpload
            imagesUrls={images}
            onUploadSuccess={handleImagesUpload}
            onRemoveImageUrl={(url) =>
              setImages((prev) => prev.filter((img) => img !== url))
            }
            isUploading={isUploading}
          />
        </TabPanel>
        {/* About Room Tab */}
        <TabPanel value={activeTab} index={2}>
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              {/* About Room Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="About Room Description"
                  name="aboutDescription"
                  value={aboutRoom.description}
                  onChange={(e) => handleAboutChange('description', e.target.value)}
                  multiline
                  rows={3}
                />
              </Grid>
              {/* About Room Image Upload */}
              <Grid item xs={12}>
                <ImageUpload
                  feature={aboutRoom}
                  handleFeatureChange={handleAboutChange}
                  setImageUpload={() => {}}
                  index={0}
                />
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRoom;
