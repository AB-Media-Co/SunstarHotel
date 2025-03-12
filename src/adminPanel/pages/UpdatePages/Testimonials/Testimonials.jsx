import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import useUpdatePagesHook from '../../../../ApiHooks/useUpdatePagesHook';

const Testimonials = () => {
  // Get API testimonials data and update function from the custom hook
  const { Testimonials: apiTestimonials, updateTestimonials } = useUpdatePagesHook();
  
  // Store the fetched testimonials data
  const [testimonialData, setTestimonialData] = useState(null);
  // Local state to hold editable data inside the modal
  const [editingData, setEditingData] = useState(null);
  // Controls modal visibility
  const [openModal, setOpenModal] = useState(false);

  // When API data is loaded, update local state
  useEffect(() => {
    if (apiTestimonials) {
      setTestimonialData(apiTestimonials);
    }
  }, [apiTestimonials]);

  // Open the modal and initialize the editing data with the current testimonialData
  const handleOpenModal = () => {
    setEditingData(testimonialData);
    setOpenModal(true);
  };

  // Close the modal (discard changes if not saved)
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Handle changes for the main client heading
  const handleHeadingChange = (e) => {
    setEditingData({ ...editingData, clientHeading: e.target.value });
  };

  // Handle changes for each client's field
  const handleClientChange = (index, field, value) => {
    const newClients = [...editingData.clients];
    newClients[index] = { ...newClients[index], [field]: value };
    setEditingData({ ...editingData, clients: newClients });
  };

  // Add a new testimonial client
  const handleAddClient = () => {
    const newClient = { name: '', location: '', heading: '', description: '' };
    setEditingData({
      ...editingData,
      clients: [...editingData.clients, newClient],
    });
  };

  // Delete a testimonial client
  const handleDeleteClient = (index) => {
    const newClients = editingData.clients.filter((_, i) => i !== index);
    setEditingData({ ...editingData, clients: newClients });
  };

  // Save the changes: update local state and call the update API function
  const handleSaveChanges = () => {
    // Check descriptions word count
    const hasLongDescription = editingData.clients.some(client => {
      const wordCount = client.description.trim().split(/\s+/).length;
      return wordCount > 50;
    });

    if (hasLongDescription) {
      alert('Testimonial descriptions should not exceed 50 words');
      return;
    }

    setTestimonialData(editingData);
    updateTestimonials({ TestimonialData: editingData });
    setOpenModal(false);
  };

  return (
    <div>
      {/* <Typography variant="h4" gutterBottom>
        Testimonials
      </Typography> */}

      {/* A button that opens the modal for full editing */}
      <div className='myGlobalButton' onClick={handleOpenModal}>
        Edit Testimonials
      </div>

      {/* <Box sx={{ mt: 3 }}>
        <Typography variant="h6">{testimonialData?.clientHeading}</Typography>
        {testimonialData?.clients.map((client, index) => (
          <Paper key={client._id || index} sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1">{client.name}</Typography>
            <Typography variant="body2">Location: {client.location}</Typography>
            <Typography variant="body2">Heading: {client.heading}</Typography>
            <Typography variant="body2">Description: {client.description}</Typography>
          </Paper>
        ))}
      </Box> */}

      {/* Modal for editing testimonials */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="md">
        <DialogTitle>Edit Testimonials</DialogTitle>
        <DialogContent dividers>
          {editingData && (
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField
                label="Client Heading"
                variant="outlined"
                fullWidth
                value={editingData.clientHeading}
                onChange={handleHeadingChange}
              />
              {editingData.clients.map((client, index) => (
                <Paper key={client._id || index} sx={{ p: 2 }}>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                      label="Name"
                      variant="outlined"
                      value={client.name}
                      onChange={(e) => handleClientChange(index, 'name', e.target.value)}
                    />
                    <TextField
                      label="Location"
                      variant="outlined"
                      value={client.location}
                      onChange={(e) => handleClientChange(index, 'location', e.target.value)}
                    />
                    <TextField
                      label="Heading"
                      variant="outlined"
                      value={client.heading}
                      onChange={(e) => handleClientChange(index, 'heading', e.target.value)}
                    />
                    <TextField
                      label="Description"
                      variant="outlined"
                      multiline
                      rows={3}
                      value={client.description}
                      onChange={(e) => handleClientChange(index, 'description', e.target.value)}
                      helperText={`${client.description.trim().split(/\s+/).length}/50 words`}
                      error={client.description.trim().split(/\s+/).length > 50}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleDeleteClient(index)}
                    >
                      Delete Client
                    </Button>
                  </Box>
                </Paper>
              ))}
              <Button variant="contained" startIcon={<Add />} onClick={handleAddClient}>
                Add Client
              </Button>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Testimonials;
