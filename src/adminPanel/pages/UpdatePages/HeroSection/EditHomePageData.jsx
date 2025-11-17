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
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useUpdatePagesHook from '../../../../ApiHooks/useUpdatePagesHook';
import { uploadImagesAPIV2 } from '../../../../ApiHooks/useHotelHook2';
import ImageUpload from '../../../Components/ImageUpload';


const EMPTY_ITEM = { image: '', heading: '', description: '' };

const EditHomePageData = () => {
  const {
    heroSectionUpdate,
    updateHerosection,
    homePageDescription,
    updateHomepageDescriptionData,
    whatMakesUsShineData,
    upsertWhatMakesUsShine,
  } = useUpdatePagesHook();

  // ---------- Hero Section ----------
  const [heroFormData, setHeroFormData] = useState({
    heading: '',
    description: '',
    image: '',
  });
  const [heroLocalFile, setHeroLocalFile] = useState(null);
  const [heroPreview, setHeroPreview] = useState(''); // local small preview

  // ---------- Home Page Description ----------
  const [homepageFormData, setHomepageFormData] = useState({
    heading: '',
    description: '',
  });

  // ---------- What Makes Us Shine ----------
  const [shineMain, setShineMain] = useState({ heading: '', description: '' });
  const [shineItems, setShineItems] = useState([EMPTY_ITEM, EMPTY_ITEM, EMPTY_ITEM]);
  const [uploadingIndex, setUploadingIndex] = useState(null);

  // Modal
  const [openModal, setOpenModal] = useState(false);

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

  // Init Shine
  useEffect(() => {
    if (whatMakesUsShineData) {
      setShineMain({
        heading: whatMakesUsShineData.heading || '',
        description: whatMakesUsShineData.description || '',
      });
      if (Array.isArray(whatMakesUsShineData.items) && whatMakesUsShineData.items.length === 3) {
        setShineItems(
          whatMakesUsShineData.items.map((i) => ({
            image: i.image || '',
            heading: i.heading || '',
            description: i.description || '',
          }))
        );
      }
    }
  }, [whatMakesUsShineData]);

  // Cleanup hero object URL on unmount / change
  useEffect(() => {
    return () => {
      if (heroPreview) URL.revokeObjectURL(heroPreview);
    };
  }, [heroPreview]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    if (heroPreview) {
      try { URL.revokeObjectURL(heroPreview); } catch {}
    }
    setHeroLocalFile(null);
    setHeroPreview('');
    setUploadingIndex(null);
  };

  // Hero input
  const handleHeroInputChange = (e) => {
    const { name, value } = e.target;
    setHeroFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHeroFileChange = (file) => {
    if (!file) return;
    if (heroPreview) {
      try { URL.revokeObjectURL(heroPreview); } catch {}
    }
    const previewUrl = URL.createObjectURL(file);
    setHeroLocalFile(file);
    setHeroPreview(previewUrl);
  };

  // Home description input
  const handleHomepageInputChange = (e) => {
    const { name, value } = e.target;
    setHomepageFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Shine main input
  const handleShineMainChange = (e) => {
    const { name, value } = e.target;
    setShineMain((prev) => ({ ...prev, [name]: value }));
  };

  // Shine item field change
  const handleShineItemChange = (index, field, value) => {
    setShineItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  // Save Hero + Description
  const handleSaveBasic = async () => {
    try {
      let updatedHeroData = { ...heroFormData };
      if (heroLocalFile) {
        const res = await uploadImagesAPIV2([heroLocalFile]);
        const url = res?.url || res?.[0]?.url || res?.imageUrls?.[0] || '';
        if (url) updatedHeroData.image = url;
      }
      await updateHerosection({ heroSection: updatedHeroData });
      await updateHomepageDescriptionData({ homePageDescription: homepageFormData });
      setOpenModal(false);
    } catch (error) {
      console.error('Error updating basic content:', error);
    }
  };

  // Save What Makes Us Shine
  const handleSaveShine = async () => {
    try {
      const ok =
        shineMain.heading.trim() &&
        shineMain.description.trim() &&
        shineItems.length === 3 &&
        shineItems.every((i) => i.image && i.heading.trim() && i.description.trim());

      if (!ok) {
        console.warn('Please fill all shine fields and all 3 items');
        return;
      }

      await upsertWhatMakesUsShine({
        heading: shineMain.heading,
        description: shineMain.description,
        items: shineItems,
      });
      // Optionally close modal or show success
    } catch (e) {
      console.error('Saving Shine failed:', e);
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

            {/* Hero image uploader + tiny preview */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
              <Button variant="outlined" component="label">
                Upload Hero Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleHeroFileChange(e.target.files?.[0] || null)}
                />
              </Button>

              {/* Small preview priority: local > saved */}
              {(heroPreview || heroFormData.image) && (
                <Tooltip title="Preview" arrow>
                  <img
                    src={heroPreview || heroFormData.image}
                    alt="hero-preview"
                    style={{ height: 48, width: 80, objectFit: 'cover', borderRadius: 6, border: '1px solid #eee' }}
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </Tooltip>
              )}
            </Stack>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* ---------- HOME PAGE DESCRIPTION ---------- */}
          <Box sx={{ mb: 3 }}>
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

          {/* ---------- WHAT MAKES US SHINE ---------- */}
          <Box>
            <h1 className="text-desktop/h4 py-2">What Makes Us Shine</h1>

            {/* Main heading/desc */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Shine Main Heading"
                  name="heading"
                  fullWidth
                  value={shineMain.heading}
                  onChange={handleShineMainChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Shine Main Description"
                  name="description"
                  fullWidth
                  value={shineMain.description}
                  onChange={handleShineMainChange}
                />
              </Grid>
            </Grid>

            {/* 3 items */}
            <Grid container spacing={2}>
              {shineItems.map((item, idx) => (
                <Grid item xs={12} md={4} key={idx}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    {/* Main banner (existing saved image) */}
                    {item.image ? (
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.image}
                        alt={`shine-${idx}`}
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: 140,
                          bgcolor: 'action.hover',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'text.secondary',
                        }}
                      >
                        No Image
                      </Box>
                    )}

                    <CardContent>
                      <Stack spacing={1}>
                        {/* Reusable ImageUpload component */}
                        <ImageUpload
                          feature={item}
                          index={idx}
                          // setImageUpload receives boolean -> set uploading index for visual
                          setImageUpload={(isUploading) => setUploadingIndex(isUploading ? idx : null)}
                          // on change -> update shineItems state
                          handleFeatureChange={(field, value) => handleShineItemChange(idx, field, value)}
                        />

                        <TextField
                          label={`Item ${idx + 1} Heading`}
                          value={item.heading}
                          onChange={(e) => handleShineItemChange(idx, 'heading', e.target.value)}
                          fullWidth
                        />
                        <TextField
                          label={`Item ${idx + 1} Description`}
                          value={item.description}
                          onChange={(e) => handleShineItemChange(idx, 'description', e.target.value)}
                          fullWidth
                          multiline
                          rows={3}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
              <Button variant="contained" onClick={handleSaveShine}>
                Save “What Makes Us Shine”
              </Button>
            </Stack>
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
