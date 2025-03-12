import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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
    BusinessPlatformSection: [],
  });

  const [headImageUploading, setHeadImageUploading] = useState(false);
  const [descImageUploading, setDescImageUploading] = useState(false);
  const [open, setOpen] = useState(false);

  // Load initial data from API (including BusinessPlatformSection)
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
            CoorporateBooking.CoorporateBookingDescription?.description || "",
          image:
            CoorporateBooking.CoorporateBookingDescription?.image || "",
        },
        BusinessPlatformSection:
          CoorporateBooking.BusinessPlatformSection || [],
      });
    }
  }, [CoorporateBooking]);

  // Generic handler for Head & Description sections
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

  // Business Platform Section handlers
  const handleBusinessPlatformChange = (index, field, value) => {
    const updatedBusinessPlatforms = formData.BusinessPlatformSection.map(
      (item, idx) => {
        if (idx === index) {
          return { ...item, [field]: value };
        }
        return item;
      }
    );
    setFormData((prev) => ({
      ...prev,
      BusinessPlatformSection: updatedBusinessPlatforms,
    }));
  };

  const addBusinessPlatformSection = () => {
    if (formData.BusinessPlatformSection.length < 4) {
      setFormData((prev) => ({
        ...prev,
        BusinessPlatformSection: [
          ...prev.BusinessPlatformSection,
          { title: "", description: "" },
        ],
      }));
    }
  };

  const removeBusinessPlatformSection = (index) => {
    const updatedBusinessPlatforms = formData.BusinessPlatformSection.filter(
      (_, idx) => idx !== index
    );
    setFormData((prev) => ({
      ...prev,
      BusinessPlatformSection: updatedBusinessPlatforms,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send entire formData (including the BusinessPlatformSection) to the API
    updtateCoorporateBooking(formData);
    setOpen(false);
  };

  return (
    <div>
      <div className="myGlobalButton" onClick={() => setOpen(true)}>
        Corporate Booking Page
      </div>

      {/* Modal (Dialog) containing the form */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Corporate Booking</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {/* Head Content Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom>
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
              <Typography variant="h5" gutterBottom>
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

            {/* Business Platform Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                Business Platform Section
              </Typography>
              {/* Display already added items (if any) as editable fields */}
              {formData.BusinessPlatformSection.map((platform, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    border: "1px solid #ccc",
                    borderRadius: 1,
                    p: 2,
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={5}>
                      <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={platform.title}
                        onChange={(e) =>
                          handleBusinessPlatformChange(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        value={platform.description}
                        onChange={(e) =>
                          handleBusinessPlatformChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <IconButton
                        onClick={() => removeBusinessPlatformSection(index)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Button
                variant="outlined"
                onClick={addBusinessPlatformSection}
                disabled={formData.BusinessPlatformSection.length >= 4}
              >
                Add Business Platform
              </Button>
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
