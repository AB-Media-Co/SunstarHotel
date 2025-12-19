/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react';
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
  FormControlLabel,
  Checkbox,
  Paper,
  Divider,
  Chip,
  Stack,
  Tooltip,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  useTheme,
  useMediaQuery,
  Card,
  CardMedia,
  CardContent,
  Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BedIcon from '@mui/icons-material/Bed';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import GroupIcon from '@mui/icons-material/Group';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ImageIcon from '@mui/icons-material/Image';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PercentIcon from '@mui/icons-material/Percent';
import MultipleImageUpload from '../../Components/MultipleImageUpload';
import ImageUpload from '../../Components/ImageUpload';
import { uploadImagesAPIV2 } from '../../../ApiHooks/useHotelHook2';
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
    const transformed = newValue?.map((item) => {
      if (typeof item === 'string') {
        return { value: item, label: item };
      }
      return item;
    });
    setSelectedAmenities(transformed);
  }, []);

  return { selectedAmenities, handleAmenitiesChange, setSelectedAmenities };
};

const RoomInfoTab = ({ formData, isEdit, handleInputChange, handleCheckboxChange, amenities, selectedAmenities, handleAmenitiesChange }) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        overflowY: 'auto',
      },
    },
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 500 }}>
          Basic Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="room-type-label">Room Type</InputLabel>
              <Select
                labelId="room-type-label"
                id="RoomTypeID"
                name="RoomTypeID"
                value={formData.RoomTypeID || ''}
                label="Room Type"
                MenuProps={MenuProps}
                disabled
                sx={{ bgcolor: 'background.paper' }}
              >
                <MenuItem value="">
                  <em>Select Room Type</em>
                </MenuItem>
                <MenuItem value={formData.RoomTypeID}>
                  {formData?.RoomTypeID}
                </MenuItem>
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
              sx={{ bgcolor: 'background.paper' }}
              placeholder="Enter distinctive room name"
              required
              disabled
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper
        elevation={1}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          // transition: '0.2s ease',
          // '&:hover': {
          //   boxShadow: 3,
          //   borderColor: 'primary.main',
          // },
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: 'primary.main', fontWeight: 600, mb: 2 }}
        >
          Room Details
        </Typography>

        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Room Description"
            name="RoomDescription"
            value={formData.RoomDescription}
            onChange={handleInputChange}
            sx={{ bgcolor: 'background.default' }}
            placeholder="Describe the unique features and benefits of this room"
          />

          <TextField
            fullWidth
            type="number"
            label="Max Guests"
            name="maxGuests"
            value={formData.maxGuests}
            onChange={handleInputChange}
            placeholder="e.g., 2 guests"
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                  <GroupIcon color="primary" />
                </Box>
              ),
            }}
            sx={{ bgcolor: 'background.default' }}
          />

          <TextField
            fullWidth
            type="number"
            label="Room Size (sq ft)"
            name="squareFeet"
            value={formData.squareFeet}
            onChange={handleInputChange}
            placeholder="e.g., 450 sq ft"
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                  <SquareFootIcon color="primary" />
                </Box>
              ),
            }}
            sx={{ bgcolor: 'background.default' }}
          />
        </Box>
      </Paper>


      <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 500 }}>
          Amenities
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              freeSolo
              options={amenities || []}
              value={selectedAmenities}
              onChange={handleAmenitiesChange}
              getOptionLabel={(option) => option.label || ''}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Amenities"
                  placeholder="Select amenities"
                  sx={{ bgcolor: 'background.paper' }}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option.label}
                    {...getTagProps({ index })}
                    color="primary"
                    size="small"
                    sx={{ borderRadius: 1 }}
                  />
                ))
              }
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 500 }}>
          Pricing
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Default Rate"
              name="defaultRate"
              type="number"
              value={formData.defaultRate}
              onChange={handleInputChange}
              sx={{ bgcolor: 'background.paper', opacity: 0.8 }}
              InputProps={{
                startAdornment: <PriceChangeIcon color="action" sx={{ mr: 1 }} />,
              }}
              placeholder="Base price per night"
              disabled
              helperText="Auto-calculated (30-40% above Discount Rate)"
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
              sx={{ bgcolor: 'background.paper', opacity: 0.8 }}
              InputProps={{
                startAdornment: <PercentIcon color="action" sx={{ mr: 1 }} />,
              }}
              helperText="Managed by pricing system"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.available !== "no"}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label="Room is available for booking"
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

const UploadImagesTab = ({ images, onUploadSuccess, onRemoveImageUrl, isUploading }) => {
  return (
    <Box>
      <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 500 }}>
          Room Images
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Upload high-quality images that showcase your room. We recommend at least 3 images from different angles.
        </Typography>

        {isUploading && (
          <Box sx={{ width: '100%', mb: 2 }}>
            <LinearProgress />
          </Box>
        )}

        <MultipleImageUpload
          imagesUrls={images}
          onUploadSuccess={onUploadSuccess}
          onRemoveImageUrl={onRemoveImageUrl}
          isUploading={isUploading}
        />

        {images.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Current Images ({images.length})
            </Typography>
            <Grid container spacing={2}>
              {images.map((url, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <Card sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={url}
                      alt={`Room image ${index + 1}`}
                      sx={{ objectFit: 'cover' }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.95)',
                        },
                      }}
                      onClick={() => onRemoveImageUrl(url)}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

const AboutRoomTab = ({ aboutRoom, handleAboutChange }) => {
  return (
    <Box component="form" noValidate autoComplete="off">
      <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 500 }}>
          About This Room
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Provide detailed information about what makes this room special. This will be displayed prominently on booking pages.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="About Room Description"
              name="aboutDescription"
              value={aboutRoom.description}
              onChange={(e) => handleAboutChange('description', e.target.value)}
              multiline
              rows={4}
              sx={{ bgcolor: 'background.paper' }}
              placeholder="Describe unique features, views, or experiences guests can expect"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Featured Image
            </Typography>
            <Box sx={{ p: 2, border: '1px dashed', borderColor: 'divider', borderRadius: 1 }}>
              <ImageUpload
                feature={aboutRoom}
                handleFeatureChange={handleAboutChange}
                setImageUpload={() => { }}
                index={0}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

const EditRoom = ({ room, roomTypes, roomSaving, onClose, onSave, isEdit }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [images, setImages] = useState(room.RoomImage || []);
  const [isUploading, setIsUploading] = useState(false);
  const { amenities } = useUpdatePagesHook();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    HotelCode: room.HotelCode || '',
    RoomTypeID: room.RoomTypeID && room.RateTypeID ? `${room.RoomTypeID}` : '',
    RateTypeID: room.RateTypeID || '',
    RoomName: room.RoomName || '',
    RoomDescription: room.RoomDescription || '',
    defaultRate: room.defaultRate || '',
    discountRate: room.discountRate || '',
    maxGuests: room.maxGuests || '',
    squareFeet: room.squareFeet || '',
    services: room.services ? room.services.join(', ') : '',
    available: room.available === 'no' ? false : true,
    source: room.source || 'PMS',
  });

  const [aboutRoom, setAboutRoom] = useState({
    description: room.AboutRoom?.description || '',
    image: room.AboutRoom?.img || '',
  });

  const { selectedAmenities, handleAmenitiesChange } = useAmenities(amenities, room.Amenities);

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
      ?.split(',')
      ?.map((s) => s.trim())
      ?.filter((s) => s.length > 0);

    const updatedRoom = {
      ...room,
      ...formData,
      RoomImage: images,
      Amenities: selectedAmenities,
      maxGuests: formData.maxGuests ? parseInt(formData.maxGuests) : undefined,
      squareFeet: formData.squareFeet ? parseInt(formData.squareFeet) : undefined,
      services: updatedServices,
      defaultRate: formData.defaultRate ? parseFloat(formData.defaultRate) : undefined,
      discountRate: formData.discountRate ? parseFloat(formData.discountRate) : undefined,
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

  const validateForm = () => {
    const requiredFields = ['RoomName', 'RoomDescription', 'defaultRate'];
    return requiredFields.every(field => formData[field]);
  };

  // Mobile view uses a stepper instead of tabs
  const renderMobileView = () => (
    <>
      <Box sx={{ mb: 2 }}>
        <Stepper activeStep={activeTab} orientation="vertical">
          <Step>
            <StepLabel>Room Info</StepLabel>
            <StepContent>
              <RoomInfoTab
                formData={formData}
                handleInputChange={handleInputChange}
                handleCheckboxChange={handleCheckboxChange}
                roomTypes={roomTypes}
                amenities={amenities}
                selectedAmenities={selectedAmenities}
                handleAmenitiesChange={handleAmenitiesChange}
                isEdit={isEdit}
              />
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => setActiveTab(1)}
                  sx={{ mr: 1 }}
                >
                  Continue
                </Button>
                <Button onClick={onClose} variant="text">
                  Cancel
                </Button>
              </Box>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Upload Images</StepLabel>
            <StepContent>
              <UploadImagesTab
                images={images}
                onUploadSuccess={handleImagesUpload}
                onRemoveImageUrl={handleRemoveImageUrl}
                isUploading={isUploading}
              />
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => setActiveTab(2)}
                  sx={{ mr: 1 }}
                >
                  Continue
                </Button>
                <Button onClick={() => setActiveTab(0)} variant="text">
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>About Room</StepLabel>
            <StepContent>
              <AboutRoomTab
                aboutRoom={aboutRoom}
                handleAboutChange={handleAboutChange}
              />
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={roomSaving || !validateForm()}
                  sx={{ mr: 1 }}
                >
                  {roomSaving ? 'Saving...' : 'Save Room'}
                </Button>
                <Button onClick={() => setActiveTab(1)} variant="text">
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        </Stepper>
      </Box>
    </>
  );

  // Desktop view uses tabs
  const renderDesktopView = () => (
    <>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          mb: 2,
          '& .MuiTab-root': {
            borderBottom: 1,
            borderColor: 'divider',
          },
          '& .Mui-selected': {
            fontWeight: 'bold',
          }
        }}
      >
        <Tab
          label="Room Info"
          icon={<BedIcon />}
          iconPosition="start"
        />
        <Tab
          label="Upload Images"
          icon={<ImageIcon />}
          iconPosition="start"
        />
        <Tab
          label="About Room"
          icon={<CheckCircleOutlineIcon />}
          iconPosition="start"
        />
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
          isEdit={isEdit}
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
    </>
  );

  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: 'hidden'
        }
      }}
      fullScreen={isMobile}
    >
      <DialogTitle sx={{
        m: 0,
        p: 3,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
      }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: 'background.paper', color: 'primary.main', mr: 2 }}>
              <BedIcon />
            </Avatar>
            <Typography variant="h5" fontWeight="medium">
              {room._id ? 'Edit Room' : 'Add Room'}
            </Typography>
          </Box>
          <IconButton onClick={onClose} aria-label="close" sx={{ color: 'primary.contrastText' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ p: isMobile ? 2 : 3, bgcolor: 'background.default' }}>
        {isMobile ? renderMobileView() : renderDesktopView()}
      </DialogContent>

      {!isMobile && (
        <DialogActions sx={{ px: 3, py: 2, bgcolor: 'background.paper' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Box>
              <Button
                onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
                disabled={activeTab === 0}
                sx={{ ml: 1 }}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setActiveTab(Math.min(2, activeTab + 1))}
                disabled={activeTab === 2}
                sx={{ ml: 1 }}
              >
                Next
              </Button>
            </Box>
            <Box>
              <Button onClick={onClose} variant="outlined" color="secondary">
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                disabled={roomSaving || !validateForm()}
                sx={{ ml: 2 }}
              >
                {roomSaving ? 'Saving...' : 'Save Room'}
              </Button>
            </Box>
          </Box>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default EditRoom;