import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import useUpdatePagesHook from '../../../../ApiHooks/useUpdatePagesHook';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageUpload from '../../../Components/ImageUpload';

const WhatWeOffering = () => {
  const [open, setOpen] = useState(false);
  const { offeringSection, updateOfferingSection } = useUpdatePagesHook();
  const [imageUploading, setImageUploading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedPage, setSelectedPage] = useState('home');

  const [offerings, setOfferings] = useState({ heading: '', offers: [] });

  const pages = [
    { value: 'home', label: 'Home Page' },
    { value: 'whySunstar', label: 'Why Sunstar' },
    { value: 'corporate', label: 'Corporate' },
    // { value: 'travelAgent', label: 'Travel Agent' },
    { value: 'comeShineWithUs', label: 'Come Shine With Us' }
  ];

  useEffect(() => {
    if (offeringSection) {
      // If offeringSection is the new object structure, pick the selected page
      // If it's the old array/object structure (legacy), fallback to it for 'home' or handle migration
      const pageData = offeringSection[selectedPage] || { heading: '', offers: [] };

      const withLink = {
        ...pageData,
        offers: (pageData.offers || []).map(o => ({
          title: o.title || '',
          description: o.description || '',
          image: o.image || '',
          link: o.link || '',
          buttonText: o.buttonText || ''
        }))
      };
      setOfferings(withLink);
    }
  }, [offeringSection, selectedPage]);

  const addOffering = () => {
    setOfferings((prev) => ({
      ...prev,
      offers: [...prev.offers, { title: '', description: '', image: '', link: '', buttonText: '' }]
    }));
  };

  const removeOffering = (index) => {
    setOfferings((prev) => ({
      ...prev,
      offers: prev.offers.filter((_, i) => i !== index)
    }));
  };

  const handleFieldChange = (index, field, value) => {
    setOfferings((prev) => {
      const updatedOffers = [...prev.offers];
      updatedOffers[index] = { ...updatedOffers[index], [field]: value };
      return { ...prev, offers: updatedOffers };
    });
  };

  const handleHeadingChange = (event) => {
    setOfferings({ ...offerings, heading: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);
    setSuccess(null);

    // Check word count for each offering
    const hasLongDescription = offerings.offers.some(offering => {
      const wordCount = offering.description.trim().split(/\s+/).length;
      return wordCount > 60;
    });

    if (hasLongDescription) {
      setError('Description should not exceed 60 words');
      setSubmitLoading(false);
      return;
    }

    try {
      if (updateOfferingSection) {
        // Pass the selected page along with the data
        const updatedData = await updateOfferingSection({ whatWeOffers: offerings, page: selectedPage });
        setSuccess('Offerings updated successfully!');
        // Update local state with the response for the specific page
        // Note: The hook invalidates queries, so offeringSection will update automatically via useEffect
      } else {
        setSuccess('Offerings updated successfully! (dummy)');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to update offerings.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* This button opens the modal */}
      <div onClick={handleOpen} className="myGlobalButton">
        What We Offers Section
      </div>

      {/* Wrap the entire dialog content in a form */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>What We Offers Section</DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 3, mt: 1 }}>
              <FormControl fullWidth>
                <InputLabel>Select Page</InputLabel>
                <Select
                  value={selectedPage}
                  label="Select Page"
                  onChange={(e) => setSelectedPage(e.target.value)}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.value} value={page.value}>
                      {page.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Typography variant="h5" gutterBottom>
              Edit Content for: {pages.find(p => p.value === selectedPage)?.label}
            </Typography>
            <TextField
              label="Heading"
              variant="outlined"
              fullWidth
              value={offerings.heading || ''} // Controlled component: Use value and onChange
              onChange={handleHeadingChange} // Attach the onChange handler
              sx={{ mb: 3 }}
            />

            {offerings?.offers?.map((offering, index) => (
              <Box
                key={`${index}`}
                sx={{
                  mb: 4,
                  p: 2,
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  position: 'relative',
                }}
              >
                <Typography variant="h6">Offering {index + 1}</Typography>

                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={offering.title}
                  onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                />

                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  value={offering.description}
                  onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                  helperText={`${offering.description.trim().split(/\s+/).length}/60 words`}
                  error={offering.description.trim().split(/\s+/).length > 60}
                />

                <TextField
                  label="Link (optional)"
                  placeholder="https://example.com/your-service"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={offering.link || ''}
                  onChange={(e) => handleFieldChange(index, 'link', e.target.value)}
                />

                <TextField
                  label="Button Text (optional)"
                  placeholder="e.g. Read More, Book Now"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={offering.buttonText || ''}
                  onChange={(e) => handleFieldChange(index, 'buttonText', e.target.value)}
                />

                {/* Image preview */}
                {offering.image && (
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ mr: 1 }}>
                      Image Preview:
                    </Typography>
                    <Box
                      component="img"
                      src={offering.image}
                      alt={`Offering ${index + 1} preview`}
                      sx={{
                        width: 100,
                        height: 60,
                        objectFit: 'cover',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        marginBottom: '20px',
                      }}
                    />
                  </Box>
                )}

                {/* ImageUpload component: updates the offering's image field */}
                <ImageUpload
                  feature={offering}
                  handleFeatureChange={(field, value) => handleFieldChange(index, field, value)}
                  setImageUpload={setImageUploading}
                  index={index} // Pass the index here
                />

                {/* Remove button */}
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => removeOffering(index)}
                  sx={{ mt: 1 }}
                >
                  Remove Offering
                </Button>
              </Box>
            ))}

            {/* Button to add a new offering */}
            <Button variant="outlined" onClick={addOffering} sx={{ mt: 2 }}>
              Add New Offering
            </Button>

            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography variant="body2" color="primary" sx={{ mt: 2 }}>
                {success}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Box sx={{ mt: 2, mr: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleClose} color="primary" sx={{ mx: 4 }}>
                Close
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitLoading || imageUploading}
              >
                {submitLoading ? <CircularProgress size={24} /> : 'Update Offerings'}
              </Button>
            </Box>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default WhatWeOffering;
