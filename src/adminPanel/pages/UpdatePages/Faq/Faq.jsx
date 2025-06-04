import { useEffect, useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAddMultipleFAQs, useGetFAQsByPage } from '../../../../ApiHooks/useFaqsHooks';

const Faq = () => {
  const [localFaqs, setLocalFaqs] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState('Day Stays Rooms'); // Default page to select

  const pages = [
    'Day Stays Rooms',
    'Events & Conference',
    'corporate-booking',
    // 'Social Events',
    // 'Wedding & Pre-Wedding',
  ]; // List of pages to be shown in the dropdown

  const { data: faqs, isLoading, error } = useGetFAQsByPage(selectedPage); // Fetch FAQs for the selected page
  const { mutate: addMultipleFAQs } = useAddMultipleFAQs(); // Hook for adding multiple FAQs

  useEffect(() => {
    if (faqs && Array.isArray(faqs)) {
      setLocalFaqs(faqs);
    }
  }, [faqs]);

  const handlePageChange = (e) => {
    setSelectedPage(e.target.value); // Set the page when changed from dropdown
  };

  const handleChange = (index, field, value) => {
    const updatedFaqs = [...localFaqs];
    updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
    setLocalFaqs(updatedFaqs);
  };

  const handleAddFaq = () => {
    setLocalFaqs([...localFaqs, { question: '', answer: '' }]);
  };

  const handleRemoveFaq = (index) => {
    setLocalFaqs(localFaqs.filter((_, i) => i !== index));
  };

  const handleBulkAdd = () => {
    const newFaqs = localFaqs.filter(faq => !faq._id);

    const cleanedFaqs = newFaqs.filter(faq => faq.question && faq.answer);

    if (cleanedFaqs.length > 0) {
      // Add the page info to each FAQ
      const faqsWithPage = cleanedFaqs.map(faq => ({ ...faq, page: selectedPage }));

      addMultipleFAQs(faqsWithPage); // Call the mutation
      setOpen(false); // Close modal
    } else {
      alert("Please add at least one new FAQ with a question and answer.");
    }

  };

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <div>
      <div className="myGlobalButton" onClick={handleOpenModal}>
        Manage FAQs
      </div>
      <Dialog open={open} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>Manage FAQs</DialogTitle>
        <DialogContent dividers>
          {/* Page Selection Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Choose Page</InputLabel>
            <Select
              value={selectedPage}
              onChange={handlePageChange}
              label="Choose Page"
            >
              {pages.map((page) => (
                <MenuItem key={page} value={page} className=''>
                  {page}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Display FAQs for the selected page */}
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {localFaqs.map((faq, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2, position: 'relative' }} elevation={3}>
              <IconButton
                onClick={() => handleRemoveFaq(index)}
                sx={{ position: 'absolute', top: 8, right: 8 }}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
              <TextField
                label="Question"
                fullWidth
                margin="normal"
                value={faq.question}
                onChange={(e) => handleChange(index, 'question', e.target.value)}
              />
              <TextField
                label="Answer"
                fullWidth
                margin="normal"
                value={faq.answer}
                onChange={(e) => handleChange(index, 'answer', e.target.value)}
              />
            </Paper>
          ))}
          <Button variant="outlined" onClick={handleAddFaq} sx={{ mr: 2 }}>
            Add FAQ
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button variant="contained" onClick={handleBulkAdd}>
            Add Multiple FAQs
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Faq;
