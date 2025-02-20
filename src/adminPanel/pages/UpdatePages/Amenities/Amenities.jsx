/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
} from '@mui/material';
import useUpdatePagesHook from '../../../../ApiHooks/useUpdatePagesHook';
import toast from 'react-hot-toast';

const Amenities = () => {
  const { amenities, loading, error, addAmenity, updateAmenity, deleteAmenity } =
    useUpdatePagesHook();

  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ value: '', label: '' });
  const [mode, setMode] = useState('add'); // 'add' or 'edit'

  useEffect(() => {
    if (selectedAmenity && typeof selectedAmenity === 'object') {
      setFormData({ value: selectedAmenity.value, label: selectedAmenity.label });
      setMode('edit');
    } else if (selectedAmenity && typeof selectedAmenity === 'string') {
      setFormData({ value: selectedAmenity, label: '' });
      setMode('add');
    } else {
      setFormData({ value: '', label: '' });
      setMode('add');
    }
  }, [selectedAmenity]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedAmenity(null);
    setFormData({ value: '', label: '' });
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.value || !formData.label) {
      toast.error('Please provide both Value and Label.');
      return;
    }
    try {
      if (mode === 'add') {
        await addAmenity(formData);
      } else if (mode === 'edit') {
        await updateAmenity({ id: selectedAmenity._id, amenity: formData });
      }
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedAmenity && selectedAmenity._id) {
        await deleteAmenity(selectedAmenity._id);
        handleClose();
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className=''>
      <div  onClick={handleOpen} className='myGlobalButton'>
        Manage Amenities
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent dividers>
          {loading && <p>Loading amenities...</p>}
          {error && <p style={{ color: 'red' }}>{error.message}</p>}

          <Autocomplete
            options={amenities}
            getOptionLabel={(option) =>
              typeof option === 'object' ? option.value : option
            }
            value={selectedAmenity}
            onChange={(event, newValue) => {
              setSelectedAmenity(newValue);
            }}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search or Enter Amenity"
                margin="normal"
                fullWidth
              />
            )}
          />

          <TextField
            margin="normal"
            label="Value"
            fullWidth
            value={formData.value}
            onChange={(e) =>
              setFormData({ ...formData, value: e.target.value })
            }
          />

          <TextField
            margin="normal"
            label="Label"
            fullWidth
            value={formData.label}
            onChange={(e) =>
              setFormData({ ...formData, label: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          {mode === 'edit' && (
            <Button color="error" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="primary" onClick={handleSubmit}>
            {mode === 'add' ? 'Add' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Amenities;
