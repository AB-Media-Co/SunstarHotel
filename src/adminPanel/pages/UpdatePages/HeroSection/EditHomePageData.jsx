import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
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


const EditHomePageData = () => {
  const {
    heroSectionUpdate,
    updateHerosection,
    homePageDescription,
    updateHomepageDescriptionData,


  } = useUpdatePagesHook();

  // ---------- Hero Section ----------
  const [heroFormData, setHeroFormData] = useState({
    heading: '',
    description: '',
    image: '',
  });

  // ---------- Home Page Description ----------
  const [homepageFormData, setHomepageFormData] = useState({
    heading: '',
    description: '',
  });



  // Modal + image state
  const [openModal, setOpenModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // Init Hero
  useEffect(() => {
    if (heroSectionUpdate) {
      setHeroFormData({
        heading: heroSectionUpdate.heading || '',
        description: heroSectionUpdate.description || '',
        image: heroSectionUpdate.image || '',
      });
    }
  }, [heroSectionUpdate]);

  // Init Home Description
  useEffect(() => {
    if (homePageDescription) {
      setHomepageFormData({
        heading: homePageDescription.heading || '',
        description: homePageDescription.description || '',
      });
    }
  }, [homePageDescription]);



  // Hero input
  const handleHeroInputChange = (e) => {
    const { name, value } = e.target;
    setHeroFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Description input
  const handleHomepageInputChange = (e) => {
    const { name, value } = e.target;
    setHomepageFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => {
    setOpenModal(false);
    setImageFile(null);
  };

  // Save Hero + Description
  const handleSaveBasic = async () => {
    try {
      // Optional: if you want to support hero image upload here
      let updatedHeroData = { ...heroFormData };
      if (imageFile) {
        const response = await uploadImagesAPIV2([imageFile]);
        updatedHeroData.image = response.url; // ensure your upload API returns { url }
      }
      await updateHerosection({ heroSection: updatedHeroData });
      await updateHomepageDescriptionData({ homePageDescription: homepageFormData });
      setOpenModal(false);
    } catch (error) {
      console.error('Error updating basic content:', error);
    }
  };


  return (
    <div>
      <div
        onClick={handleOpenModal}
        className="h-[150px] max-w-md bg-white rounded-xl text-center shadow-lg hover:shadow-xl cursor-pointer font-semibold p-10 text-2xl"
      >
        Home Page Data
      </div>

      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="md">
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Home Page Data
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{ position: 'absolute', right: 8, top: 8, color: (t) => t.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {/* ---------- HERO ---------- */}
          <Box sx={{ mb: 3 }}>
            <h1 className="text-desktop/h4 p">Hero Section Data</h1>

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
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* ---------- HOME PAGE DESCRIPTION ---------- */}
          <Box>
            <h1 className="text-desktop/h4 py-4">Home Page Description</h1>

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
          <Button onClick={handleSaveBasic} variant="contained">
            Save Hero & Description
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditHomePageData;
