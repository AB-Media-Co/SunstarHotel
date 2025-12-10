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
import { useAddMultipleFAQs, useGetFAQsByPage, useDeleteFAQ } from '../../../../ApiHooks/useFaqsHooks';

const Faq = () => {
  const [localFaqs, setLocalFaqs] = useState([]);
  const [deletedFaqIds, setDeletedFaqIds] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState('Day Stays Rooms'); // Default page to select

  const pages = [
    'Day Stays Rooms',
    'Events & Conference',
    'corporate-booking',
    'Career',
    'Travel Agent'
    // 'Wedding & Pre-Wedding',
  ]; // List of pages to be shown in the dropdown

  const { data: faqs, isLoading, error } = useGetFAQsByPage(selectedPage); // Fetch FAQs for the selected page
  const { mutate: addMultipleFAQs } = useAddMultipleFAQs(); // Hook for adding multiple FAQs
  const { mutate: deleteFAQ } = useDeleteFAQ();

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
    const faqToRemove = localFaqs[index];
    if (faqToRemove._id) {
      setDeletedFaqIds(ids => [...ids, faqToRemove._id]);
    }
    setLocalFaqs(faqs => faqs.filter((_, i) => i !== index));
  };
  const handleBulkAdd = () => {
    // 1) brand-new FAQs
    const newFaqsToAdd = localFaqs
      .filter(faq => !faq._id && faq.question && faq.answer)
      .map(faq => ({ ...faq, page: selectedPage }));

    // 2) if nothing to add AND nothing to delete → alert
    if (newFaqsToAdd.length === 0 && deletedFaqIds.length === 0) {
      alert("Please add at least one new FAQ with a question and answer.");
      return;
    }

    // 3) add new FAQs
    if (newFaqsToAdd.length > 0) {
      addMultipleFAQs(newFaqsToAdd);
    }

    // 4) delete removed FAQs
    deletedFaqIds.forEach(id => deleteFAQ(id));

    // 5) reset and close modal
    setDeletedFaqIds([]);
    setOpen(false);
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
          {!isLoading && !error && localFaqs.length === 0 && (
            <p className="text-gray-500 text-center my-4">No FAQ found. Click "Add FAQ" to create one.</p>
          )}
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
