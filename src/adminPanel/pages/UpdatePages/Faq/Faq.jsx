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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useUpdatePagesHook from '../../../../ApiHooks/useUpdatePagesHook';

const Faq = () => {
  const { faqs, updateFaq } = useUpdatePagesHook();
  const [localFaqs, setLocalFaqs] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (faqs && Array.isArray(faqs)) {
      setLocalFaqs(faqs);
    }
  }, [faqs]);

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

  const handleUpdate = async () => {
    try {
      await updateFaq({ faqs: localFaqs });
      setOpen(false);
    } catch (error) {
      console.error('Error updating FAQs:', error);
    }
  };

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <div>
      <div className="myGlobalButton" onClick={handleOpenModal}>
        FAQs
      </div>
      <Dialog open={open} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>Manage FAQs</DialogTitle>
        <DialogContent dividers>
          {localFaqs.map((faq, index) => (
            <Paper
              key={index}
              sx={{ p: 2, mb: 2, position: 'relative' }}
              elevation={3}
            >
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
                onChange={(e) =>
                  handleChange(index, 'question', e.target.value)
                }
              />
              <TextField
                label="Answer"
                fullWidth
                margin="normal"
                value={faq.answer}
                onChange={(e) =>
                  handleChange(index, 'answer', e.target.value)
                }
              />
            </Paper>
          ))}
          <Button variant="outlined" onClick={handleAddFaq} sx={{ mr: 2 }}>
            Add FAQ
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update FAQs
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Faq;
