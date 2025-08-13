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

  // Initialize state with a default object structure
  const [offerings, setOfferings] = useState({ heading: '', offers: [] });

  // Use useEffect to populate the state when offeringSection is available
  useEffect(() => {
    if (offeringSection) {
      setOfferings(offeringSection);
    }
  }, [offeringSection]);

  const addOffering = () => {
    setOfferings((prev) => ({
      ...prev,
      offers: [...prev.offers, { title: '', description: '', image: '' }]
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
      const updatedOffers = [...prev.offers]; // Copy the offers array
      updatedOffers[index] = { ...updatedOffers[index], [field]: value }; // Update the specific offering
      return { ...prev, offers: updatedOffers }; // Return the updated state
    });
  };

  // Handler to update the heading
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
        const updatedData = await updateOfferingSection({ whatWeOffers: offerings });
        setSuccess('Offerings updated successfully!');
        // Optionally update local state with the returned data.
        setOfferings(updatedData.whatWeOffers);
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

  // Handlers for modal open/close
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
            <Typography variant="h5" gutterBottom>
              What We Offers Section
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
