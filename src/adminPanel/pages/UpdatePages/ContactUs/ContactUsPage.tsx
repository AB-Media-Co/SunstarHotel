import React, { useState } from 'react';
import useUpdatePagesHook from '../../../../ApiHooks/useUpdatePagesHook';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';

const ContactUsPage = () => {
  const { ContactUsDetail, updateContactUs } = useUpdatePagesHook();
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(ContactUsDetail?.phoneNumber || '');
  const [emailId, setEmailId] = useState(ContactUsDetail?.emailId || '');

  const handleOpen = () => {
    setPhoneNumber(ContactUsDetail?.phoneNumber || '');
    setEmailId(ContactUsDetail?.emailId || '');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    const variables = { phoneNumber, emailId };
    updateContactUs(variables);
    setOpen(false);

  
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <div className="myGlobalButton" onClick={handleOpen}>
        Update Contact
      </div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Contact Details
          </Typography>
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ContactUsPage;
