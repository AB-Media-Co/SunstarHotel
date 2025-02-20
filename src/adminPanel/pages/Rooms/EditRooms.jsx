/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MultipleImageUpload from '../../Components/MultipleImageUpload';
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
  const [activeTab, setActiveTab] = useState(0); // 0 = Room Info, 1 = Upload Images
  
  // Initialize formData with HotelCode along with other room fields
  const [formData, setFormData] = useState({
    HotelCode: room.HotelCode || '', // New field for Hotel Code
    RoomTypeID: room.RoomTypeID || '',
    RoomName: room.RoomName || '',
    RoomDescription: room.RoomDescription || '',
    defaultRate: room.defaultRate || '',
    discountRate: room.discountRate || '',
  });
  
  const [images, setImages] = useState(room.RoomImage || []);
  const [isUploading, setIsUploading] = useState(false);
  const { amenities } = useUpdatePagesHook();
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const { data: hotelsData } = useGetHotels();
  const availableHotels = hotelsData?.hotels?.filter(hotel => hotel.hotelCode);

  useEffect(() => {
    if (amenities && room.Amenities) {
      const selected = amenities.filter(amenity => room.Amenities.includes(amenity.value));
      setSelectedAmenities(selected);
    }
  }, [amenities, room.Amenities]);

  useEffect(() => {
    if (roomTypes && formData.RoomTypeID) {
      const selected = roomTypes.find(rt => rt.RoomTypeID === formData.RoomTypeID);
      if (selected) {
        setFormData(prev => ({
          ...prev,
          defaultRate: selected.defaultRate || selected.BaseRate || '',
        }));
      }
    }
  }, [formData.RoomTypeID, roomTypes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSave = () => {
    const updatedAmenities = selectedAmenities.map(item => item.value);
    const updatedRoom = {
      ...room,
      ...formData,
      RoomImage: images,
      Amenities: updatedAmenities,
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
      setImages(prev => [...prev, ...uploadedUrls[0].imageUrls]);
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
        </Tabs>
        <TabPanel value={activeTab} index={0}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            {/* Hotel Code Dropdown */}
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
                  availableHotels.map(hotel => (
                    <MenuItem key={hotel._id} value={String(hotel.hotelCode)}>
                      {hotel.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {/* Room Type Dropdown */}
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
                  roomTypes.map(rt => (
                    <MenuItem key={rt.RoomTypeID} value={rt.RoomTypeID}>
                      {rt.RoomTypeID} - Rate: {rt.defaultRate || rt.BaseRate || 'N/A'}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Room Name"
              name="RoomName"
              value={formData.RoomName}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Room Description"
              name="RoomDescription"
              value={formData.RoomDescription}
              onChange={handleInputChange}
            />
          
            {/* Multi-select dropdown for amenities */}
            <Autocomplete
              multiple
              options={amenities || []}
              value={selectedAmenities}
              onChange={(event, newValue) => {
                setSelectedAmenities(newValue);
              }}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="Amenities" placeholder="Select amenities" />
              )}
            />
            <TextField
              fullWidth
              label="Discount Rate"
              name="discountRate"
              type="number"
              value={formData.discountRate}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Default Rate"
              name="defaultRate"
              type="number"
              value={formData.defaultRate}
              disabled
            />
          </Box>
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <MultipleImageUpload
            imagesUrls={images}
            onUploadSuccess={handleImagesUpload}
            onRemoveImageUrl={(url) =>
              setImages(prev => prev.filter(img => img !== url))
            }
            isUploading={isUploading}
          />
        </TabPanel>
      </DialogContent>
      <DialogActions>
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
