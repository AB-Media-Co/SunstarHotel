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
    CoorporateBookingHeadContent: { title: "", description: "", image: "" },
    CoorporateBookingDescription: { title: "", description: "", image: "" },
    BusinessPlatformSection: [],
    BenefitsSection: [], // <-- NEW
  });

  const [headImageUploading, setHeadImageUploading] = useState(false);
  const [descImageUploading, setDescImageUploading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (CoorporateBooking) {
      setFormData({
        CoorporateBookingHeadContent: {
          title: CoorporateBooking.CoorporateBookingHeadContent?.title || "",
          description: CoorporateBooking.CoorporateBookingHeadContent?.description || "",
          image: CoorporateBooking.CoorporateBookingHeadContent?.image || "",
        },
        CoorporateBookingDescription: {
          title: CoorporateBooking.CoorporateBookingDescription?.title || "",
          description: CoorporateBooking.CoorporateBookingDescription?.description || "",
          image: CoorporateBooking.CoorporateBookingDescription?.image || "",
        },
        BusinessPlatformSection: CoorporateBooking.BusinessPlatformSection || [],
        BenefitsSection: CoorporateBooking.BenefitsSection || [], // <-- NEW
      });
    }
  }, [CoorporateBooking]);

  // generic handler (head/desc)
  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };
  const handleHeadFeatureChange = (field, value) =>
    handleInputChange("CoorporateBookingHeadContent", field, value);
  const handleDescFeatureChange = (field, value) =>
    handleInputChange("CoorporateBookingDescription", field, value);

  // Business Platform handlers
  const handleBusinessPlatformChange = (index, field, value) => {
    setFormData((prev) => {
      const arr = [...prev.BusinessPlatformSection];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, BusinessPlatformSection: arr };
    });
  };
  const addBusinessPlatformSection = () => {
    setFormData((prev) =>
      prev.BusinessPlatformSection.length >= 4
        ? prev
        : {
            ...prev,
            BusinessPlatformSection: [
              ...prev.BusinessPlatformSection,
              { title: "", description: "" },
            ],
          }
    );
  };
  const removeBusinessPlatformSection = (index) => {
    setFormData((prev) => ({
      ...prev,
      BusinessPlatformSection: prev.BusinessPlatformSection.filter((_, i) => i !== index),
    }));
  };

  // ✅ Benefits handlers (NEW)
  const handleBenefitChange = (index, field, value) => {
    setFormData((prev) => {
      const arr = [...prev.BenefitsSection];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, BenefitsSection: arr };
    });
  };
  const addBenefit = () => {
    setFormData((prev) =>
      prev.BenefitsSection.length >= 6
        ? prev
        : { ...prev, BenefitsSection: [...prev.BenefitsSection, { title: "", description: "" }] }
    );
  };
  const removeBenefit = (index) => {
    setFormData((prev) => ({
      ...prev,
      BenefitsSection: prev.BenefitsSection.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // will now include BenefitsSection too
    updtateCoorporateBooking(formData);
    setOpen(false);
  };

  return (
    <div>
      <div className="myGlobalButton" onClick={() => setOpen(true)}>
        Corporate Booking Page
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Corporate Booking</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {/* Head */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom>Head Content</Typography>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <TextField
                    label="Title"
                    fullWidth
                    value={formData.CoorporateBookingHeadContent.title}
                    onChange={(e) => handleInputChange("CoorporateBookingHeadContent","title",e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <ImageUpload
                    feature={formData.CoorporateBookingHeadContent}
                    handleFeatureChange={handleHeadFeatureChange}
                    index={0}
                    setImageUpload={setHeadImageUploading}
                  />
                  {formData.CoorporateBookingHeadContent.image && (
                    <Box mt={1}>
                      <img
                        src={formData.CoorporateBookingHeadContent.image}
                        alt="Preview"
                        style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
                      />
                    </Box>
                  )}
                </Grid>
                <Grid item>
                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.CoorporateBookingHeadContent.description}
                    onChange={(e) => handleInputChange("CoorporateBookingHeadContent","description",e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Description */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom>Description Content</Typography>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <TextField
                    label="Title"
                    fullWidth
                    value={formData.CoorporateBookingDescription.title}
                    onChange={(e) => handleInputChange("CoorporateBookingDescription","title",e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <ImageUpload
                    feature={formData.CoorporateBookingDescription}
                    handleFeatureChange={handleDescFeatureChange}
                    index={1}
                    setImageUpload={setDescImageUploading}
                  />
                  {formData.CoorporateBookingDescription.image && (
                    <Box mt={1}>
                      <img
                        src={formData.CoorporateBookingDescription.image}
                        alt="Preview"
                        style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
                      />
                    </Box>
                  )}
                </Grid>
                <Grid item>
                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.CoorporateBookingDescription.description}
                    onChange={(e) => handleInputChange("CoorporateBookingDescription","description",e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Business Platform */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom>Business Platform Section</Typography>
              {formData.BusinessPlatformSection.map((platform, index) => (
                <Box key={index} sx={{ mb: 2, border: "1px solid #ccc", borderRadius: 1, p: 2 }}>
                  <Grid container spacing={2} direction="column">
                    <Grid item>
                      <TextField
                        label="Title"
                        fullWidth
                        value={platform.title}
                        onChange={(e) => handleBusinessPlatformChange(index, "title", e.target.value)}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        label="Description"
                        fullWidth
                        value={platform.description}
                        onChange={(e) => handleBusinessPlatformChange(index, "description", e.target.value)}
                      />
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => removeBusinessPlatformSection(index)} color="error">
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

            {/* ✅ Benefits Section */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" gutterBottom>Benefits Section</Typography>
              {formData.BenefitsSection.map((benefit, index) => (
                <Box key={index} sx={{ mb: 2, border: "1px solid #ccc", borderRadius: 1, p: 2 }}>
                  <Grid container spacing={2} direction="column">
                    <Grid item>
                      <TextField
                        label="Title"
                        fullWidth
                        value={benefit.title}
                        onChange={(e) => handleBenefitChange(index, "title", e.target.value)}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        label="Description"
                        fullWidth
                        multiline
                        minRows={2}
                        value={benefit.description}
                        onChange={(e) => handleBenefitChange(index, "description", e.target.value)}
                      />
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => removeBenefit(index)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Button
                variant="outlined"
                onClick={addBenefit}
                disabled={formData.BenefitsSection.length >= 6}
              >
                Add Benefit
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
