import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import useUpdatePagesHook from "../../../../ApiHooks/useUpdatePagesHook";
import ImageUpload from "../../../Components/ImageUpload";

const CoorporateBooking = () => {
  const { CoorporateBooking, updtateCoorporateBooking } = useUpdatePagesHook();
  const [formData, setFormData] = useState({
    CoorporateBookingHeadContent: {
      title: "",
      description: "",
      image: "",
    },
    CoorporateBookingDescription: {
      title: "",
      description: "",
      image: "",
    },
  });

  const [headImageUploading, setHeadImageUploading] = useState(false);
  const [descImageUploading, setDescImageUploading] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (CoorporateBooking) {
      setFormData({
        CoorporateBookingHeadContent: {
          title: CoorporateBooking.CoorporateBookingHeadContent?.title || "",
          description:
            CoorporateBooking.CoorporateBookingHeadContent?.description || "",
          image: CoorporateBooking.CoorporateBookingHeadContent?.image || "",
        },
        CoorporateBookingDescription: {
          title:
            CoorporateBooking.CoorporateBookingDescription?.title || "",
          description:
            CoorporateBooking.CoorporateBookingDescription?.description ||
            "",
          image:
            CoorporateBooking.CoorporateBookingDescription?.image || "",
        },
      });
    }
  }, [CoorporateBooking]);

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleHeadFeatureChange = (field, value) => {
    handleInputChange("CoorporateBookingHeadContent", field, value);
  };

  const handleDescFeatureChange = (field, value) => {
    handleInputChange("CoorporateBookingDescription", field, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updtateCoorporateBooking(formData);
    setOpen(false);
  };

  return (
    <div>
      <div className="myGlobalButton" onClick={() => setOpen(true)}>
        Edit Corporate Booking
      </div>

      {/* Modal (Dialog) containing the form */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Edit Corporate Booking</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {/* Head Content Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Head Content
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={formData.CoorporateBookingHeadContent.title}
                    onChange={(e) =>
                      handleInputChange(
                        "CoorporateBookingHeadContent",
                        "title",
                        e.target.value
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* Image Upload for Head Content */}
                  <ImageUpload
                    feature={formData.CoorporateBookingHeadContent}
                    handleFeatureChange={handleHeadFeatureChange}
                    index={0}
                    setImageUpload={setHeadImageUploading}
                  />
                  {/* Small image preview */}
                  {formData.CoorporateBookingHeadContent.image && (
                    <Box mt={1}>
                      <img
                        src={formData.CoorporateBookingHeadContent.image}
                        alt="Preview"
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.CoorporateBookingHeadContent.description}
                    onChange={(e) =>
                      handleInputChange(
                        "CoorporateBookingHeadContent",
                        "description",
                        e.target.value
                      )
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Description Content Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Description Content
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={formData.CoorporateBookingDescription.title}
                    onChange={(e) =>
                      handleInputChange(
                        "CoorporateBookingDescription",
                        "title",
                        e.target.value
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* Image Upload for Description Content */}
                  <ImageUpload
                    feature={formData.CoorporateBookingDescription}
                    handleFeatureChange={handleDescFeatureChange}
                    index={1}
                    setImageUpload={setDescImageUploading}
                  />
                  {/* Small image preview */}
                  {formData.CoorporateBookingDescription.image && (
                    <Box mt={1}>
                      <img
                        src={formData.CoorporateBookingDescription.image}
                        alt="Preview"
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.CoorporateBookingDescription.description}
                    onChange={(e) =>
                      handleInputChange(
                        "CoorporateBookingDescription",
                        "description",
                        e.target.value
                      )
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            {headImageUploading || descImageUploading ? (
              <CircularProgress />
            ) : (
              <>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  Save Changes
                </Button>
              </>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CoorporateBooking;
