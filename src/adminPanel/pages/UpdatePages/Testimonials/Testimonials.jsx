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
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useBulkCreateTestimonials, useCreateTestimonial, useDeleteTestimonial, useGetTestimonials, useUpdateTestimonial } from '../../../../ApiHooks/useTestimonialHook';
import toast from 'react-hot-toast';

const pages = [
  '',
  'tour&travel',
  'corporate-booking',
  // 'Social Events',
  // 'Wedding & Pre-Wedding',
];

const Testimonials = () => {
  const [selectedPage, setSelectedPage] = useState('');
  const { data: apiTestimonials = [], isLoading, error } = useGetTestimonials({ page: selectedPage });
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const bulkCreateTestimonials = useBulkCreateTestimonials();
  const deleteTestimonial = useDeleteTestimonial();

  const [editingData, setEditingData] = useState({ clientHeading: '', clients: [] });
  const [deletedIds, setDeletedIds] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    // initialize editingData whenever page or apiTestimonials change
    setEditingData({
      clientHeading: '',              // or pull from a separate field if you store per-page heading
      clients: apiTestimonials.map(t => ({
        _id: t._id,
        name: t.name,
        location: t.location,
        heading: t.heading,
        description: t.description
      }))
    });
    setDeletedIds([]);
  }, [apiTestimonials]);

  const handlePageChange = e => {
    setSelectedPage(e.target.value);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleClientChange = (index, field, value) => {
    const clients = [...editingData.clients];
    clients[index] = { ...clients[index], [field]: value };
    setEditingData({ ...editingData, clients });
  };

  const handleAddClient = () => {
    setEditingData({
      ...editingData,
      clients: [
        ...editingData.clients,
        { name: '', location: '', heading: '', description: '' }
      ]
    });
  };

  const handleDeleteClient = index => {
    const toDelete = editingData.clients[index];
    if (toDelete._id) {
      setDeletedIds(ids => [...ids, toDelete._id]);
    }
    setEditingData({
      ...editingData,
      clients: editingData.clients.filter((_, i) => i !== index)
    });
  };

  const handleSaveChanges = () => {

    const tooLong = editingData.clients.some(c =>
      c.description.trim().split(/\s+/).length > 50
    );
    if (tooLong) {
      toast.error('Each description must be 50 words or fewer.');
      return;
    }
    // 1) updates
    editingData.clients
      .filter(c => c._id)
      .forEach(c => {
        updateTestimonial.mutate({
          id: c._id,
          updateData: {
            name: c.name,
            location: c.location,
            heading: c.heading,
            description: c.description,
            page: selectedPage
          }
        });
      });

    // 2) new creations
    const newClients = editingData.clients
      .filter(c => !c._id)
      .map(c => ({
        name: c.name,
        location: c.location,
        heading: c.heading,
        description: c.description,
        page: selectedPage
      }));
    if (newClients.length) {
      bulkCreateTestimonials.mutate(newClients);
    }

    // 3) deletions
    deletedIds.forEach(id => deleteTestimonial.mutate(id));

    setOpenModal(false);
    toast.success('Testimonials saved successfully');

  };

  return (
    <div>


      <div className="myGlobalButton" onClick={handleOpenModal}>
        Edit Testimonials
      </div>

      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="md">
        <DialogTitle>Edit Testimonials for “{selectedPage || 'Default'}”</DialogTitle>


        <DialogContent dividers>



          <FormControl fullWidth margin="normal">
            <InputLabel>Choose Page</InputLabel>
            <Select
              labelId="page-select-label"
              value={selectedPage}
              label="Choose Page"
              onChange={handlePageChange}
              displayEmpty                          // ← show even when value is ""
              renderValue={val =>
                val === '' ? 'Default Testimonials' : val
              }
            >
              {pages.map(pg => (
                <MenuItem key={pg} value={pg}>
                  {pg === '' ? 'Default Testimonials' : pg}
                </MenuItem>
              ))}
            </Select>
          </FormControl>




          {editingData.clients.map((client, idx) => (
            <Paper key={client._id || idx} sx={{ p: 2, mb: 2 }}>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Name"
                  value={client.name}
                  onChange={e => handleClientChange(idx, 'name', e.target.value)}
                />
                <TextField
                  label="Location"
                  value={client.location}
                  onChange={e => handleClientChange(idx, 'location', e.target.value)}
                />
                <TextField
                  label="Heading"
                  value={client.heading}
                  onChange={e => handleClientChange(idx, 'heading', e.target.value)}
                />
                <TextField
                  label="Description"
                  multiline
                  rows={3}
                  value={client.description}
                  onChange={e => handleClientChange(idx, 'description', e.target.value)}
                  helperText={`${client.description.trim().split(/\s+/).length}/50 words`}
                  error={client.description.trim().split(/\s+/).length > 50}
                />
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDeleteClient(idx)}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          ))}

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddClient}
          >
            Add Testimonial
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Testimonials;
