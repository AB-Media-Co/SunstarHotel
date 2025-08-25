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
  MenuItem,          // ⬅️ NEW
  Typography         // ⬅️ NEW
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useUpdatePagesHook from '../../../../ApiHooks/useUpdatePagesHook';
import { uploadImagesAPIV2 } from '../../../../ApiHooks/useHotelHook2';

// ⬇️ Your provided uploader (kept separate file as is)
import ImageUpload from '../../../components/ImageUpload'; // <- adjust path to where you saved it

const EditHomePageData = () => {
  const {
    heroSectionUpdate,
    updateHerosection,
    homePageDescription,
    updateHomepageDescriptionData,

    // ⬇️ NEW: partners
    homePartners,
    saveHomePartners,
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

  // ---------- Home Partners (NEW) ----------
  const [partnersForm, setPartnersForm] = useState({
    heading: '',
    subheading: '',
    layout: 'grid', // grid | carousel
    logos: [],      // [{src, alt, link}]
  });


  const [heroPreview, setHeroPreview] = useState('');

  // Modal + image state
  const [openModal, setOpenModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [logoUploading, setLogoUploading] = useState({}); // {index: boolean}

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

  // Partners meta input
  const handlePartnersMetaChange = (e) => {
    const { name, value } = e.target;
    setPartnersForm((prev) => ({ ...prev, [name]: value }));
  };

  // Logos helpers
  const handleLogoChange = (index, field, value) => {
    setPartnersForm((prev) => {
      const next = [...prev.logos];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, logos: next };
    });
  };

  const addLogo = () => {
    setPartnersForm((prev) => ({
      ...prev,
      logos: [...prev.logos, { src: '', alt: '', link: '' }],
    }));
  };

  const removeLogo = (index) => {
    setPartnersForm((prev) => {
      const next = [...prev.logos];
      next.splice(index, 1);
      return { ...prev, logos: next };
    });
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

  // Save Partners
  const handleSavePartners = async () => {
    try {
      // Purge empty logos (no src)
      const clean = {
        heading: partnersForm.heading,
        subheading: partnersForm.subheading,
        layout: partnersForm.layout,
        logos: (partnersForm.logos || []).filter(l => l?.src && String(l.src).trim()),
      };
      await saveHomePartners(clean);
    } catch (err) {
      console.error('Error saving partners:', err);
    }
  };

  // Any logo uploading?
  const anyLogoUploading = Object.values(logoUploading).some(Boolean);

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

          <Divider sx={{ my: 3 }} />

          {/* ---------- HOME PARTNERS (NEW) ---------- */}
          <Box>
            <h1 className="text-desktop/h4 py-4">Home Partners</h1>

            <TextField
              label="Heading"
              name="heading"
              fullWidth
              value={partnersForm.heading}
              onChange={handlePartnersMetaChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Subheading"
              name="subheading"
              fullWidth
              value={partnersForm.subheading}
              onChange={handlePartnersMetaChange}
              sx={{ mb: 2 }}
            />

            <TextField
              select
              label="Layout"
              name="layout"
              fullWidth
              value={partnersForm.layout}
              onChange={handlePartnersMetaChange}
              sx={{ mb: 3 }}
            >
              <MenuItem value="grid">Grid</MenuItem>
              <MenuItem value="carousel">Carousel</MenuItem>
            </TextField>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1">Partner Logos</Typography>
              <Button onClick={addLogo} variant="outlined" size="small">
                + Add Logo
              </Button>
            </Box>

            {(partnersForm.logos || []).length === 0 && (
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                No logos yet. Click “+ Add Logo”.
              </Typography>
            )}

            {(partnersForm.logos || []).map((logo, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: 2,
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  mb: 2,
                }}
              >
                {/* ImageUpload sets src via its own "image" field */}
                <Box sx={{ gridColumn: '1 / span 1' }}>
                  <ImageUpload
                    feature={{ image: logo.src || '' }}
                    index={idx}
                    handleFeatureChange={(_, value) => handleLogoChange(idx, 'src', value)}
                    setImageUpload={(isUp) =>
                      setLogoUploading((prev) => ({ ...prev, [idx]: Boolean(isUp) }))
                    }
                  />

                  {/* ⬇️ NEW: tiny logo preview */}
                  <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption">Preview:</Typography>
                    {logo.src ? (
                      <Box
                        component="img"
                        src={logo.src}
                        alt={logo.alt || `Logo ${idx + 1}`}
                        sx={{
                          width: 56,
                          height: 36,
                          objectFit: 'contain',
                          borderRadius: 1,
                          border: '1px solid',
                          borderColor: 'divider',
                          backgroundColor: 'background.paper',
                        }}
                      />
                    ) : (
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        No logo
                      </Typography>
                    )}
                  </Box>
                </Box>


                <TextField
                  label="Alt Text"
                  value={logo.alt || ''}
                  onChange={(e) => handleLogoChange(idx, 'alt', e.target.value)}
                />
                <TextField
                  label="Link (optional)"
                  value={logo.link || ''}
                  onChange={(e) => handleLogoChange(idx, 'link', e.target.value)}
                />

                <Box sx={{ gridColumn: '1 / -1', textAlign: 'right' }}>
                  <Button
                    color="error"
                    variant="text"
                    size="small"
                    onClick={() => removeLogo(idx)}
                    disabled={!!logoUploading[idx]}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            ))}

            <Box sx={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                onClick={handleSavePartners}
                disabled={anyLogoUploading}
              >
                {anyLogoUploading ? 'Please wait…' : 'Save Partners'}
              </Button>
            </Box>
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
