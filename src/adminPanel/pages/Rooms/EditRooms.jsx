/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

const useAmenities = (amenities, roomAmenities) => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    if (amenities && roomAmenities) {
      const selected = amenities.filter((amenity) =>
        roomAmenities.some((a) => a.value === amenity.value)
      );
      setSelectedAmenities(selected);
    }
  }, [amenities, roomAmenities]);

  const handleAmenitiesChange = useCallback((event, newValue) => {
    const transformed = newValue.map((item) => {
      if (typeof item === 'string') {
        return { value: item, label: item };
      }
      return item;
    });
    setSelectedAmenities(transformed);
  }, []);

  return { selectedAmenities, handleAmenitiesChange, setSelectedAmenities };
};

const useHotelSelection = (hotelsData, setFormData) => {
  const availableHotels = useMemo(() => {
    return hotelsData?.hotels?.filter((hotel) => hotel.hotelCode) || [];
  }, [hotelsData]);

  const handleHotelChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [setFormData]
  );

  return { availableHotels, handleHotelChange };
};

const RoomInfoTab = ({ formData, handleInputChange, handleCheckboxChange, roomTypes, amenities, selectedAmenities, handleAmenitiesChange, availableHotels, handleHotelChange }) => {
  useEffect(() => {
    if (roomTypes && formData.RoomTypeID) {
      const selected = roomTypes.find((rt) => rt.RoomTypeID === formData.RoomTypeID);
      if (selected) {
        handleInputChange({
          target: {
            name: 'discountRate',
            value: selected.defaultRate || selected.BaseRate || '',
          },
        });
      }
    }
  }, [formData.RoomTypeID, roomTypes, handleInputChange]);

  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid container spacing={2}>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Hotel Name"
            name="HotelName"
            value={formData.HotelName || 'Hotel Name'}
            disabled
          />
        </Grid> */}
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Max Guests"
            name="maxGuests"
            type="number"
            value={formData.maxGuests}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Square Feet"
            name="squareFeet"
            type="number"
            value={formData.squareFeet}
            onChange={handleInputChange}
          />
        </Grid>
        {/* <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Services"
            name="services"
            value={formData.services}
            onChange={handleInputChange}
            helperText="Enter comma separated services (e.g., WiFi, TV, Room Service)"
          />
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={formData.available}
                onChange={handleCheckboxChange}
                name="available"
                color="primary"
              />
            )}
            label="Room Available"
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            freeSolo
            options={amenities || []}
            value={selectedAmenities}
            onChange={handleAmenitiesChange}
            getOptionLabel={(option) => option.label || ''}
            renderInput={(params) => (
              <TextField {...params} label="Amenities" placeholder="Select amenities" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Discount Rate"
            name="discountRate"
            type="number"
            value={formData.discountRate}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Default Rate"
            name="defaultRate"
            type="number"
            value={formData.defaultRate}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const UploadImagesTab = ({ images, onUploadSuccess, onRemoveImageUrl, isUploading }) => {
  return (
    <MultipleImageUpload
      imagesUrls={images}
      onUploadSuccess={onUploadSuccess}
      onRemoveImageUrl={onRemoveImageUrl}
      isUploading={isUploading}
    />
  );
};

const AboutRoomTab = ({ aboutRoom, handleAboutChange }) => {
  return (
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
            setImageUpload={() => { }}
            index={0}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const EditRoom = ({ room, roomTypes, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [images, setImages] = useState(room.RoomImage || []);
  const [isUploading, setIsUploading] = useState(false);
  const { amenities } = useUpdatePagesHook();
  const { data: hotelsData } = useGetHotels();

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

  const [aboutRoom, setAboutRoom] = useState({
    description: room.AboutRoom?.description || '',
    image: room.AboutRoom?.img || '',
  });

  const { selectedAmenities, handleAmenitiesChange } = useAmenities(amenities, room.Amenities);
  const { availableHotels, handleHotelChange } = useHotelSelection(hotelsData, setFormData);

  const handleTabChange = useCallback((event, newValue) => {
    setActiveTab(newValue);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleCheckboxChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, available: e.target.checked }));
  }, []);

  const handleAboutChange = useCallback((field, value) => {
    setAboutRoom((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(() => {
    const updatedServices = formData.services
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const updatedRoom = {
      ...room,
      ...formData,
      RoomImage: images,
      Amenities: selectedAmenities,
      maxGuests: formData.maxGuests ? parseInt(formData.maxGuests) : undefined,
      squareFeet: formData.squareFeet ? parseInt(formData.squareFeet) : undefined,
      services: updatedServices,
      defaultRate: formData.defaultRate ? parseFloat(formData.defaultRate) : undefined,
      AboutRoom: {
        description: aboutRoom.description,
        img: aboutRoom.image,
      },
    };

    onSave(updatedRoom);
  }, [room, formData, images, selectedAmenities, aboutRoom, onSave]);

  const handleImagesUpload = useCallback(async (selectedFiles) => {
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
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleRemoveImageUrl = useCallback((url) => {
    setImages((prev) => prev.filter((img) => img !== url));
  }, []);

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

        <TabPanel value={activeTab} index={0}>
          <RoomInfoTab
            formData={formData}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            roomTypes={roomTypes}
            amenities={amenities}
            selectedAmenities={selectedAmenities}
            handleAmenitiesChange={handleAmenitiesChange}
            availableHotels={availableHotels}
            handleHotelChange={handleHotelChange}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <UploadImagesTab
            images={images}
            onUploadSuccess={handleImagesUpload}
            onRemoveImageUrl={handleRemoveImageUrl}
            isUploading={isUploading}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <AboutRoomTab
            aboutRoom={aboutRoom}
            handleAboutChange={handleAboutChange}
          />
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
