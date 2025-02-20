import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import useUpdatePagesHook from "../../../../ApiHooks/useUpdatePagesHook";

const HomePageDescription = () => {
  const { homePageDescription, updateHomepageDescriptionData } = useUpdatePagesHook();

  const [formData, setFormData] = useState({
    heading: "",
    description: "",
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (homePageDescription) {
      setFormData({
        heading: homePageDescription.heading || "",
        description: homePageDescription.description || "",
      });
    }
  }, [homePageDescription]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateHomepageDescriptionData({homePageDescription:formData});
    setOpen(false);
  };

  return (
    <div >
      <div className="myGlobalButton" onClick={() => setOpen(true)}>
        Edit Home Page Description
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Home Page Description</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Heading"
              variant="outlined"
              name="heading"
              fullWidth
              value={formData.heading}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HomePageDescription;
