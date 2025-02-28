// src/components/HotelLocations.jsx
import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Grid,

  Card,
  CardContent,
  CardMedia,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  useGetLocations,
  useAddLocation,
  useUpdateLocation,
  useDeleteLocation
} from '../../../ApiHooks/useLocationHook';
import ImageUpload from '../../Components/ImageUpload';

// Helper function to truncate text to maxWords words.
const truncateText = (text, maxWords = 30) => {
  if (!text) return '';
  const words = text.split(' ');
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + ' ...';
};

export const HotelLocations = () => {
  const { data: locations, isLoading, isError, error } = useGetLocations();
  const addLocationMutation = useAddLocation();
  const updateLocationMutation = useUpdateLocation();
  const deleteLocationMutation = useDeleteLocation();


  // State for new location including image URL
  const [newLocation, setNewLocation] = useState({
    name: '',
    aboutus: { heading: '', paragraph: '' },
    image: ''
  });
  const [, setNewImageUploading] = useState(false);

  // State for editing a location
  const [editingLocation, setEditingLocation] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    aboutus: { heading: '', paragraph: '' },
    image: ''
  });
  const [, setEditImageUploading] = useState(false);

  // State to control the modals for add and edit
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  // --- New Location Handlers ---
  const handleNewLocationChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setNewLocation((prev) => ({ ...prev, name: value }));
    } else if (name === 'heading' || name === 'paragraph') {
      setNewLocation((prev) => ({
        ...prev,
        aboutus: { ...prev.aboutus, [name]: value }
      }));
    }
  };



  const handleNewLocationFeatureChange = (key, value) => {
    setNewLocation((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddLocation = (e) => {
    e.preventDefault();
    addLocationMutation.mutate(newLocation);
    setNewLocation({
      name: '',
      aboutus: { heading: '', paragraph: '' },
      hotels: [],
      image: ''
    });
    setOpenAddModal(false);
  };

  // --- Edit Location Handlers ---
  const handleEditClick = (location) => {
    setEditingLocation(location._id);
    setEditForm({
      name: location.name,
      aboutus: {
        heading: location.aboutus?.heading || '',
        paragraph: location.aboutus?.paragraph || ''
      },
      image: location.image || ''
    });
    setOpenEditModal(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setEditForm((prev) => ({ ...prev, name: value }));
    } else if (name === 'heading' || name === 'paragraph') {
      setEditForm((prev) => ({
        ...prev,
        aboutus: { ...prev.aboutus, [name]: value }
      }));
    }
  };


  const handleEditFeatureChange = (key, value) => {
    setEditForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdateLocation = (e) => {
    e.preventDefault();
    updateLocationMutation.mutate({ id: editingLocation, updateData: editForm });
    setOpenEditModal(false);
    setEditingLocation(null);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditingLocation(null);
  };

  // --- Delete Handler ---
  const handleDeleteLocation = (id) => {
    deleteLocationMutation.mutate(id);
  };

  return (
    <div className="container mx-auto mt-20 p-4">
      {/* Button to open Add Location Modal */}
      <div className="mb-6">
        <Button variant="contained" color="primary" onClick={() => setOpenAddModal(true)}>
          Add a Location
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          locations.map((location) => (
            <Card key={location._id} className="shadow-lg">
              {location.image && (
                <CardMedia
                  component="img"
                  height="140"
                  image={location.image}
                  alt={location.name}
                />
              )}
              <CardContent>
                <Typography variant="h6" component="div">
                  {location.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {location.aboutus?.heading}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {truncateText(location.aboutus?.paragraph, 10)}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Hotels: {location.hotels?.length} (
                  {location.hotels
                    .map((h) => (h?.name ? h.name : h))
                    .join(', ')}
                  )
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditClick(location)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteLocation(location._id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </div>

      <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)} fullWidth maxWidth="md">
        <DialogTitle>Add New Location</DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleAddLocation} className="space-y-4">

            <TextField
              label="Location Name"
              name="name"
              value={newLocation.name}
              onChange={handleNewLocationChange}
              fullWidth
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="About Us Heading"
                  name="heading"
                  value={newLocation.aboutus.heading}
                  onChange={handleNewLocationChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="About Us Paragraph"
                  name="paragraph"
                  value={newLocation.aboutus.paragraph}
                  onChange={handleNewLocationChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            {/* Image Upload for New Location */}
            <ImageUpload
              feature={newLocation}
              handleFeatureChange={handleNewLocationFeatureChange}
              setImageUpload={setNewImageUploading}
              index={0}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddModal(false)} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddLocation} variant="contained" color="primary">
            Add Location
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Location Modal */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal} fullWidth maxWidth="md">
        <DialogTitle>Edit Location</DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleUpdateLocation} className="space-y-4">
            
                <TextField
                  label="Location Name"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditFormChange}
                  fullWidth
                />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="About Us Heading"
                  name="heading"
                  value={editForm.aboutus.heading}
                  onChange={handleEditFormChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="About Us Paragraph"
                  name="paragraph"
                  value={editForm.aboutus.paragraph}
                  onChange={handleEditFormChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            {/* Image Upload for Edit Form */}
            <ImageUpload
              feature={editForm}
              handleFeatureChange={handleEditFeatureChange}
              setImageUpload={setEditImageUploading}
              index={0}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateLocation} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HotelLocations;
