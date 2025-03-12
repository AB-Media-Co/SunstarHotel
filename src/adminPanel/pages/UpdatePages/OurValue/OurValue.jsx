
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import useUpdatePagesHook from '../../../../ApiHooks/useUpdatePagesHook';

const OurValueModal = ({ open, handleClose, initialData, onSave }) => {
  const [heading, setHeading] = useState('');
  const [valueData, setValueData] = useState([]);
  const [heroSectionDescription, setHeroSectionDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setHeading(initialData.heading || '');
      setValueData(initialData.valueData || []);
      setHeroSectionDescription(initialData.heroSectionDescription || '');
    }
  }, [initialData]);

  const handleHeadingChange = (e) => {
    setHeading(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setHeroSectionDescription(e.target.value);
  };

  const handleValueChange = (index, field, value) => {
    const newValueData = [...valueData];
    newValueData[index] = { ...newValueData[index], [field]: value };
    setValueData(newValueData);
  };

  const handleAddValue = () => {
    const newItem = { title: '', description: '' };
    setValueData([...valueData, newItem]);
  };

  const handleRemoveValue = (index) => {
    const newValueData = valueData.filter((_, idx) => idx !== index);
    setValueData(newValueData);
  };

  const handleSaveChanges = () => {
    // Check hero section description word count
    const heroWordCount = heroSectionDescription.trim().split(/\s+/).length;
    
    // Check value descriptions word count
    const hasLongValueDesc = valueData.some(item => {
      const wordCount = item.description.trim().split(/\s+/).length;
      return wordCount > 50;
    });

    if (heroWordCount > 80 || hasLongValueDesc) {
      alert('Hero section description should not exceed 80 words and value descriptions should not exceed 50 words');
      return;
    }

    const updatedData = { heading, valueData, heroSectionDescription };
    onSave(updatedData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Why Sunstar Page</DialogTitle>
      <DialogContent dividers>
        <Box sx={{}}>
          <h1 className='text-desktop/h4 py-6'>Hero Section Description</h1>

          <TextField
            label="Hero Section Description"
            variant="outlined"
            fullWidth
            value={heroSectionDescription}
            onChange={handleDescriptionChange}
            sx={{ mb: 3 }}
            helperText={`${heroSectionDescription.trim().split(/\s+/).length}/80 words`}
            error={heroSectionDescription.trim().split(/\s+/).length > 80}
          />
          <h1 className='text-desktop/h4 pb-10'>Our Value Section</h1>
          <TextField
            label="Heading"
            variant="outlined"
            fullWidth
            value={heading}
            onChange={handleHeadingChange}
            sx={{ mb: 3 }}
          />

          {valueData.map((item, index) => (
            <Paper key={item._id || index} sx={{ p: 2, mb: 2 }}>
              <Box display="flex" alignItems="center">
                <TextField
                  label="Title"
                  variant="outlined"
                  value={item.title}
                  onChange={(e) => handleValueChange(index, 'title', e.target.value)}
                  sx={{ mr: 2, flex: 1 }}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  value={item.description}
                  onChange={(e) => handleValueChange(index, 'description', e.target.value)}
                  sx={{ mr: 2, flex: 2 }}
                  helperText={`${item.description.trim().split(/\s+/).length}/50 words`}
                  error={item.description.trim().split(/\s+/).length > 50}
                />
                <IconButton
                  color="error"
                  onClick={() => handleRemoveValue(index)}
                  aria-label="delete"
                >
                  <Delete />
                </IconButton>
              </Box>
            </Paper>
          ))}

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddValue}
            sx={{ mb: 3 }}
          >
            Add Value
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" color="secondary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const OurValue = () => {
  const { whysunstarValue, updateWhySunstarValueection } = useUpdatePagesHook();
  const [modalOpen, setModalOpen] = useState(false);
  const [localData, setLocalData] = useState(null);

  useEffect(() => {
    if (whysunstarValue) {
      setLocalData(whysunstarValue);
    }
  }, [whysunstarValue]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSave = (updatedData) => {
    console.log('Updated Value Section Data:', updatedData);
    updateWhySunstarValueection(updatedData);
    setLocalData(updatedData);
  };

  return (
    <div >

      <div className='myGlobalButton' onClick={handleOpenModal}>
        Why Sunstar Page
      </div>

      {localData && (
        <OurValueModal
          open={modalOpen}
          handleClose={handleCloseModal}
          initialData={localData}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default OurValue;