import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useUpdatePagesHook from '../../../../ApiHooks/useUpdatePagesHook';
import { uploadImagesAPIV2 } from '../../../../ApiHooks/useHotelHook2';
import ImageUpload from '../../../Components/ImageUpload';

const EditHomePageData = () => {
  const {
    heroSectionUpdate,
    updateHerosection,
    homePageDescription,
    updateHomepageDescriptionData,
  } = useUpdatePagesHook();

  // State for Hero Section
  const [heroFormData, setHeroFormData] = useState({
    heading: '',
    description: '',
    image: '',
  });
  // State for Home Page Description
  const [homepageFormData, setHomepageFormData] = useState({
    heading: '',
    description: '',
  });
  // Modal state
  const [openModal, setOpenModal] = useState(false);
  // States for image handling (for Hero Section)
  const [imageFile, setImageFile] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUpload, setImageUpload] = useState(false);

  // Initialize hero section data
  useEffect(() => {
    if (heroSectionUpdate) {
      setHeroFormData({
        heading: heroSectionUpdate.heading || '',
        description: heroSectionUpdate.description || '',
        image: heroSectionUpdate.image || '',
      });
      if (heroSectionUpdate.image) {
        setImagePreview(heroSectionUpdate.image);
      }
    }
  }, [heroSectionUpdate]);

  // Initialize homepage description data
  useEffect(() => {
    if (homePageDescription) {
      setHomepageFormData({
        heading: homePageDescription.heading || '',
        description: homePageDescription.description || '',
      });
    }
  }, [homePageDescription]);

  // Handle input change for Hero Section
  const handleHeroInputChange = (e) => {
    const { name, value } = e.target;
    setHeroFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input change for Home Page Description
  const handleHomepageInputChange = (e) => {
    const { name, value } = e.target;
    setHomepageFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for image updates from the ImageUpload component
  const handleFeatureChange = (field, value) => {
    setHeroFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (field === 'image') {
      setImagePreview(value);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // Reset image-related state if needed
    setImageFile(null);
    setUploadResponse(null);
  };

  // Combined save handler
  const handleSaveClick = async () => {
    try {
      // If a new image file is selected, upload it first
      let updatedHeroData = { ...heroFormData };
      if (imageFile) {
        const response = await uploadImagesAPIV2([imageFile]);
        updatedHeroData.image = response.url; // Assuming response contains a url property
        setUploadResponse(response);
      }

      // Call both APIs
      await updateHerosection({ heroSection: updatedHeroData });
      await updateHomepageDescriptionData({ homePageDescription: homepageFormData });
      setOpenModal(false);
    } catch (error) {
      console.error('Error updating content:', error);
    }
  };

  return (
    <div>
      <div onClick={handleOpenModal} className='h-[150px] max-w-md bg-white rounded-xl text-center shadow-lg hover:shadow-xl cursor-pointer font-semibold p-10 text-2xl'>
        Home Page Data
      </div>

      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle sx={{ m: 0, p: 2 }}>
          
          Home Page Data

          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {/* Hero Section Inputs */}
          <Box sx={{ mb: 3 }}>
       


            <h1 className='text-desktop/h4 p'> Hero Section Data</h1>

            <TextField
              name="heading"
              label="Hero Heading"
              value={heroFormData.heading}
              onChange={handleHeroInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="description"
              label="Hero Description"
              value={heroFormData.description}
              onChange={handleHeroInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />

            {/* Image Preview & Upload */}
            {imagePreview && (
              <Box sx={{ mt: 2, mb: 2, textAlign: 'start', }}>
                <Typography variant="subtitle2" gutterBottom>
                  Image Preview:
                </Typography>
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Preview"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: 150,
                    borderRadius: 2,
                    objectFit: 'cover',
                    border: '1px solid #ccc',
                  }}
                />
              </Box>
            )}
            <ImageUpload
              feature={heroFormData}
              handleFeatureChange={handleFeatureChange}
              setImageUpload={setImageUpload}
              setImageFile={setImageFile} // pass this if your ImageUpload component accepts it
            />
          </Box>

          <Divider />

          {/* Home Page Description Inputs */}
          <Box >
            {/* <Typography variant="h6" gutterBottom>
              
            </Typography> */}
            <h1 className='text-desktop/h4 py-4'> Home Page Description</h1>

            <TextField
              label="Home Page Heading"
              variant="outlined"
              name="heading"
              fullWidth
              value={homepageFormData.heading}
              onChange={handleHomepageInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Home Page Description"
              variant="outlined"
              name="description"
              fullWidth
              multiline
              rows={4}
              value={homepageFormData.description}
              onChange={handleHomepageInputChange}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseModal} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSaveClick} variant="contained" disabled={imageUpload}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditHomePageData;
