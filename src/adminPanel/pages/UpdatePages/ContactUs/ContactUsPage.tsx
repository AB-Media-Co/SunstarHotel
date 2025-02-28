import React, { useState } from 'react';
import useUpdatePagesHook from '../../../../ApiHooks/useUpdatePagesHook';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Alert,
  Stack,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ContactUsPage = () => {
  const { ContactUsDetail, updateContactUs } = useUpdatePagesHook();

  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(ContactUsDetail?.phoneNumber || '');
  const [emailId, setEmailId] = useState(ContactUsDetail?.emailId || '');
  const [reservations, setReservations] = useState(
    ContactUsDetail?.OtherEnquieirs?.reservations || ''
  );
  const [corporateSales, setCorporateSales] = useState(
    ContactUsDetail?.OtherEnquieirs?.corporateSales || ''
  );
  const [traveAgentSales, setTraveAgentSales] = useState(
    ContactUsDetail?.OtherEnquieirs?.traveAgentSales || ''
  );
  const [marketing, setMarketing] = useState(
    ContactUsDetail?.OtherEnquieirs?.marketing || ''
  );
  const [careers, setCareers] = useState(
    ContactUsDetail?.OtherEnquieirs?.careers || ''
  );
  const [hotelDevelopment, setHotelDevelopment] = useState(
    ContactUsDetail?.OtherEnquieirs?.hotelDevelopment || ''
  );
  const [error, setError] = useState('');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpen = () => {
    setPhoneNumber(ContactUsDetail?.phoneNumber || '');
    setEmailId(ContactUsDetail?.emailId || '');
    setReservations(ContactUsDetail?.OtherEnquieirs?.reservations || '');
    setCorporateSales(ContactUsDetail?.OtherEnquieirs?.corporateSales || '');
    setTraveAgentSales(ContactUsDetail?.OtherEnquieirs?.traveAgentSales || '');
    setMarketing(ContactUsDetail?.OtherEnquieirs?.marketing || '');
    setCareers(ContactUsDetail?.OtherEnquieirs?.careers || '');
    setHotelDevelopment(ContactUsDetail?.OtherEnquieirs?.hotelDevelopment || '');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handleUpdate = () => {
    if (!phoneNumber || !emailId) {
      setError('Please fill in all required fields.');
      return;
    }

    const variables = {
      phoneNumber,
      emailId,
      OtherEnquieirs: 
        {
          reservations,
          corporateSales,
          traveAgentSales,
          marketing,
          careers,
          hotelDevelopment,
        },
      
    };
    updateContactUs(variables);
    setOpen(false);
  };

  return (
    <div>
      <div className="myGlobalButton" onClick={handleOpen}>
        Update Contact
      </div>

      <Dialog open={open} onClose={handleClose} fullScreen={fullScreen} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <Typography variant="h6">Update Contact Details</Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Stack spacing={2}>
            <TextField
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              fullWidth
              required
              type="email"
              helperText="Enter a valid email address (e.g., example@example.com)"
            />
            <TextField
              label="Reservations"
              value={reservations}
              onChange={(e) => setReservations(e.target.value)}
              fullWidth
            />
            <TextField
              label="Corporate Sales"
              value={corporateSales}
              onChange={(e) => setCorporateSales(e.target.value)}
              fullWidth
            />
            <TextField
              label="Travel Agent Sales"
              value={traveAgentSales}
              onChange={(e) => setTraveAgentSales(e.target.value)}
              fullWidth
            />
            <TextField
              label="Marketing"
              value={marketing}
              onChange={(e) => setMarketing(e.target.value)}
              fullWidth
            />
            <TextField
              label="Careers"
              value={careers}
              onChange={(e) => setCareers(e.target.value)}
              fullWidth
            />
            <TextField
              label="Hotel Development"
              value={hotelDevelopment}
              onChange={(e) => setHotelDevelopment(e.target.value)}
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContactUsPage;
