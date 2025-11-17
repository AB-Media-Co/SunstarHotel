import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Box,
  Paper,
  IconButton,
  Chip,
  Switch,
  FormControlLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import {
  useGetAllEventPages,
  useGetEventPageBySlug,
  useCreateEventPage,
  useUpdateEventPage,
  useUpdateEventPageSection,
  useToggleEventPageStatus,
  useDeleteEventPage,
} from '../../../../ApiHooks/useEventPageHook';
import ImageUpload from '../../../Components/ImageUpload';

/* ============ Tab Panel Component ============ */
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`event-tabpanel-${index}`}
      aria-labelledby={`event-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

/* ============ Main Component ============ */
const ManageEventPages = () => {
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedPage, setSelectedPage] = useState('eventandconf');
  const [mode, setMode] = useState('view'); // 'view' | 'edit' | 'create'

  // Available page slugs
  const pageOptions = [
    { slug: 'eventandconf', name: 'Event and Conference (Parent)', type: 'parent' },
    { slug: 'socialevent', name: 'Social Events', type: 'child' },
    { slug: 'corporateevent', name: 'Corporate Events', type: 'child' },
    { slug: 'weddingprewedding', name: 'Wedding & Pre-Wedding', type: 'child' },
  ];

  // API Hooks
  const { data: allPages, isLoading: loadingAll } = useGetAllEventPages(false);
  const { data: pageData, isLoading: loadingPage, refetch } = useGetEventPageBySlug(selectedPage);
  const { mutate: createPage, isPending: creating } = useCreateEventPage();
  const { mutate: updatePage, isPending: updating } = useUpdateEventPage();
  const { mutate: updateSection, isPending: updatingSection } = useUpdateEventPageSection();
  const { mutate: toggleStatus, isPending: toggling } = useToggleEventPageStatus();
  const { mutate: deletePage, isPending: deleting } = useDeleteEventPage();

  // Form States
  const [formData, setFormData] = useState({
    pageSlug: '',
    pageName: '',
    pageType: 'parent',
    active: true,
    heroSection: { heading: '', subheading: '', description: '' },
    // Parent fields
    ourEvents: [],
    celebrationsSeamless: { title: '', description: '', benefits: [] },
    // Child fields
    descriptionText: '',
    celebrationTypes: { heading: '', description: '', types: [] },
    // Meta
    meta: { title: '', description: '', keywords: [], ogImage: '' },
  });

  // Track uploading state
  const [isImageUploading, setIsImageUploading] = useState(false);

  // Load data when page changes
  useEffect(() => {
    if (pageData?.data && mode === 'view') {
      setFormData({
        pageSlug: pageData.data.pageSlug || '',
        pageName: pageData.data.pageName || '',
        pageType: pageData.data.pageType || 'parent',
        active: pageData.data.active || false,
        heroSection: pageData.data.heroSection || { heading: '', subheading: '', description: '' },
        ourEvents: pageData.data.ourEvents || [],
        celebrationsSeamless: pageData.data.celebrationsSeamless || { title: '', description: '', benefits: [] },
        descriptionText: pageData.data.descriptionText || '',
        celebrationTypes: pageData.data.celebrationTypes || { heading: '', description: '', types: [] },
        meta: pageData.data.meta || { title: '', description: '', keywords: [], ogImage: '' },
      });
    }
  }, [pageData, mode]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setMode('view');
    setSelectedTab(0);
  };

  const handlePageChange = (e) => {
    setSelectedPage(e.target.value);
    setMode('view');
  };

  const handleSaveHeroSection = () => {
    updateSection(
      { slug: selectedPage, section: 'heroSection', sectionData: formData.heroSection },
      { onSuccess: () => refetch() }
    );
  };

  const handleSaveOurEvents = () => {
    if (formData.pageType === 'parent') {
      updateSection(
        { slug: selectedPage, section: 'ourEvents', sectionData: formData.ourEvents },
        { onSuccess: () => refetch() }
      );
    }
  };

  const handleSaveCelebrationsSeamless = () => {
    if (formData.pageType === 'parent') {
      updateSection(
        { slug: selectedPage, section: 'celebrationsSeamless', sectionData: formData.celebrationsSeamless },
        { onSuccess: () => refetch() }
      );
    }
  };

  const handleSaveDescription = () => {
    if (formData.pageType === 'child') {
      updateSection(
        { slug: selectedPage, section: 'descriptionText', sectionData: { value: formData.descriptionText } },
        { onSuccess: () => refetch() }
      );
    }
  };

  const handleSaveCelebrationTypes = () => {
    if (formData.pageType === 'child') {
      updateSection(
        { slug: selectedPage, section: 'celebrationTypes', sectionData: formData.celebrationTypes },
        { onSuccess: () => refetch() }
      );
    }
  };

  const handleToggleStatus = () => {
    toggleStatus(selectedPage, { onSuccess: () => refetch() });
  };

  // Add/Remove functions for arrays
  const addOurEvent = () => {
    setFormData((prev) => ({
      ...prev,
      ourEvents: [...prev.ourEvents, { image: '', title: '', description: '' }],
    }));
  };

  const removeOurEvent = (index) => {
    setFormData((prev) => ({
      ...prev,
      ourEvents: prev.ourEvents.filter((_, i) => i !== index),
    }));
  };

  const updateOurEvent = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      ourEvents: prev.ourEvents.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addCelebrationType = () => {
    setFormData((prev) => ({
      ...prev,
      celebrationTypes: {
        ...prev.celebrationTypes,
        types: [...prev.celebrationTypes.types, { image: '', title: '' }],
      },
    }));
  };

  const removeCelebrationType = (index) => {
    setFormData((prev) => ({
      ...prev,
      celebrationTypes: {
        ...prev.celebrationTypes,
        types: prev.celebrationTypes.types.filter((_, i) => i !== index),
      },
    }));
  };

  const updateCelebrationType = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      celebrationTypes: {
        ...prev.celebrationTypes,
        types: prev.celebrationTypes.types.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  // Add/Remove functions for Celebrations Seamless Benefits
  const addBenefit = () => {
    setFormData((prev) => ({
      ...prev,
      celebrationsSeamless: {
        ...prev.celebrationsSeamless,
        benefits: [...prev.celebrationsSeamless.benefits, { title: '', description: '' }],
      },
    }));
  };

  const removeBenefit = (index) => {
    setFormData((prev) => ({
      ...prev,
      celebrationsSeamless: {
        ...prev.celebrationsSeamless,
        benefits: prev.celebrationsSeamless.benefits.filter((_, i) => i !== index),
      },
    }));
  };

  const updateBenefit = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      celebrationsSeamless: {
        ...prev.celebrationsSeamless,
        benefits: prev.celebrationsSeamless.benefits.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const currentPageType = pageOptions.find((p) => p.slug === selectedPage)?.type || 'parent';

  return (
    <div>
      <button className="myGlobalButton" onClick={handleOpen}>
        Event & Conference Pages
      </button>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', pb: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <span>Manage Event & Conference Pages</span>
            {pageData?.data && (
              <Chip
                label={pageData.data.active ? 'Active' : 'Inactive'}
                color={pageData.data.active ? 'success' : 'default'}
                size="small"
              />
            )}
          </Box>
        </DialogTitle>

        <DialogContent dividers sx={{ minHeight: '500px' }}>
          {/* Page Selector */}
          <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
            <InputLabel>Select Page</InputLabel>
            <Select value={selectedPage} onChange={handlePageChange} label="Select Page">
              {pageOptions.map((page) => (
                <MenuItem key={page.slug} value={page.slug}>
                  {page.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {loadingPage ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
              <CircularProgress />
            </Box>
          ) : !pageData?.data ? (
            <Alert severity="info">
              This page doesn't exist yet. Content will be created when you save.
            </Alert>
          ) : (
            <>
              {/* Status Toggle */}
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={pageData.data.active}
                      onChange={handleToggleStatus}
                      disabled={toggling}
                    />
                  }
                  label={pageData.data.active ? 'Page is Active' : 'Page is Inactive'}
                />
              </Box>

              {/* Tabs */}
              <Tabs value={selectedTab} onChange={(e, v) => setSelectedTab(v)} sx={{ mb: 2 }}>
                <Tab label="Hero Section" />
                {currentPageType === 'parent' && <Tab label="Our Events" />}
                {currentPageType === 'parent' && <Tab label="Celebrations Seamless" />}
                {currentPageType === 'child' && <Tab label="Description" />}
                {currentPageType === 'child' && <Tab label="Celebration Types" />}
                {/* <Tab label="Meta Tags" /> */}
              </Tabs>

              {/* Hero Section Tab */}
              <TabPanel value={selectedTab} index={0}>
                <Paper elevation={2} sx={{ p: 3 }}>
                  <TextField
                    fullWidth
                    label="Heading"
                    margin="normal"
                    value={formData.heroSection.heading}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        heroSection: { ...prev.heroSection, heading: e.target.value },
                      }))
                    }
                  />
                  <TextField
                    fullWidth
                    label="Subheading"
                    margin="normal"
                    value={formData.heroSection.subheading}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        heroSection: { ...prev.heroSection, subheading: e.target.value },
                      }))
                    }
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    margin="normal"
                    multiline
                    rows={3}
                    value={formData.heroSection.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        heroSection: { ...prev.heroSection, description: e.target.value },
                      }))
                    }
                  />
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveHeroSection}
                    disabled={updatingSection}
                    sx={{ mt: 2 }}
                  >
                    Save Hero Section
                  </Button>
                </Paper>
              </TabPanel>

              {/* Our Events Tab (Parent Only) */}
              {currentPageType === 'parent' && (
                <TabPanel value={selectedTab} index={1}>
                  <Box mb={2}>
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={addOurEvent}>
                      Add Event
                    </Button>
                  </Box>
                  {formData.ourEvents.map((event, index) => (
                    <Paper key={index} elevation={2} sx={{ p: 2, mb: 2, position: 'relative' }}>
                      <IconButton
                        onClick={() => removeOurEvent(index)}
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <ImageUpload
                        feature={event}
                        handleFeatureChange={(field, value) => updateOurEvent(index, field, value)}
                        setImageUpload={setIsImageUploading}
                        index={`our-event-${index}`}
                      />
                      <TextField
                        fullWidth
                        label="Title"
                        margin="normal"
                        value={event.title}
                        onChange={(e) => updateOurEvent(index, 'title', e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Description"
                        margin="normal"
                        multiline
                        rows={2}
                        value={event.description}
                        onChange={(e) => updateOurEvent(index, 'description', e.target.value)}
                      />
                    </Paper>
                  ))}
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveOurEvents}
                    disabled={updatingSection || isImageUploading}
                    sx={{ mt: 2 }}
                  >
                    {isImageUploading ? 'Uploading Image...' : 'Save Our Events'}
                  </Button>
                </TabPanel>
              )}

              {/* Celebrations Seamless Tab (Parent Only) */}
              {currentPageType === 'parent' && (
                <TabPanel value={selectedTab} index={2}>
                  <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
                    <TextField
                      fullWidth
                      label="Title"
                      margin="normal"
                      value={formData.celebrationsSeamless.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          celebrationsSeamless: { ...prev.celebrationsSeamless, title: e.target.value },
                        }))
                      }
                    />
                    <TextField
                      fullWidth
                      label="Description"
                      margin="normal"
                      multiline
                      rows={4}
                      value={formData.celebrationsSeamless.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          celebrationsSeamless: {
                            ...prev.celebrationsSeamless,
                            description: e.target.value,
                          },
                        }))
                      }
                    />
                  </Paper>

                  {/* Benefits Section */}
                  <Box mb={2}>
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={addBenefit}>
                      Add Benefit
                    </Button>
                  </Box>

                  {formData.celebrationsSeamless.benefits?.map((benefit, index) => (
                    <Paper key={index} elevation={2} sx={{ p: 2, mb: 2, position: 'relative' }}>
                      <IconButton
                        onClick={() => removeBenefit(index)}
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <TextField
                        fullWidth
                        label="Benefit Title"
                        margin="normal"
                        value={benefit.title}
                        onChange={(e) => updateBenefit(index, 'title', e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Benefit Description"
                        margin="normal"
                        multiline
                        rows={2}
                        value={benefit.description}
                        onChange={(e) => updateBenefit(index, 'description', e.target.value)}
                      />
                    </Paper>
                  ))}

                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveCelebrationsSeamless}
                    disabled={updatingSection}
                    sx={{ mt: 2 }}
                  >
                    Save Celebrations Seamless
                  </Button>
                </TabPanel>
              )}

              {/* Description Tab (Child Only) */}
              {currentPageType === 'child' && (
                <TabPanel value={selectedTab} index={1}>
                  <Paper elevation={2} sx={{ p: 3 }}>
                    <TextField
                      fullWidth
                      label="Description Text"
                      margin="normal"
                      multiline
                      rows={6}
                      value={formData.descriptionText}
                      onChange={(e) => setFormData((prev) => ({ ...prev, descriptionText: e.target.value }))}
                      helperText="Main paragraph text for this page"
                    />
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={handleSaveDescription}
                      disabled={updatingSection}
                      sx={{ mt: 2 }}
                    >
                      Save Description
                    </Button>
                  </Paper>
                </TabPanel>
              )}

              {/* Celebration Types Tab (Child Only) */}
              {currentPageType === 'child' && (
                <TabPanel value={selectedTab} index={2}>
                  <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
                    <TextField
                      fullWidth
                      label="Section Heading"
                      margin="normal"
                      value={formData.celebrationTypes.heading}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          celebrationTypes: { ...prev.celebrationTypes, heading: e.target.value },
                        }))
                      }
                    />
                    <TextField
                      fullWidth
                      label="Section Description"
                      margin="normal"
                      multiline
                      rows={2}
                      value={formData.celebrationTypes.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          celebrationTypes: { ...prev.celebrationTypes, description: e.target.value },
                        }))
                      }
                    />
                  </Paper>

                  <Box mb={2}>
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={addCelebrationType}>
                      Add Celebration Type
                    </Button>
                  </Box>

                  {formData.celebrationTypes.types.map((type, index) => (
                    <Paper key={index} elevation={2} sx={{ p: 2, mb: 2, position: 'relative' }}>
                      <IconButton
                        onClick={() => removeCelebrationType(index)}
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <ImageUpload
                        feature={type}
                        handleFeatureChange={(field, value) => updateCelebrationType(index, field, value)}
                        setImageUpload={setIsImageUploading}
                        index={`celebration-type-${index}`}
                      />
                      <TextField
                        fullWidth
                        label="Title"
                        margin="normal"
                        value={type.title}
                        onChange={(e) => updateCelebrationType(index, 'title', e.target.value)}
                      />
                    </Paper>
                  ))}

                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveCelebrationTypes}
                    disabled={updatingSection || isImageUploading}
                    sx={{ mt: 2 }}
                  >
                    {isImageUploading ? 'Uploading Image...' : 'Save Celebration Types'}
                  </Button>
                </TabPanel>
              )}

              {/* Meta Tags Tab */}
              <TabPanel value={selectedTab} index={currentPageType === 'parent' ? 3 : 3}>
                <Paper elevation={2} sx={{ p: 3 }}>
                  <TextField
                    fullWidth
                    label="Meta Title"
                    margin="normal"
                    value={formData.meta.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        meta: { ...prev.meta, title: e.target.value },
                      }))
                    }
                  />
                  <TextField
                    fullWidth
                    label="Meta Description"
                    margin="normal"
                    multiline
                    rows={2}
                    value={formData.meta.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        meta: { ...prev.meta, description: e.target.value },
                      }))
                    }
                  />
                  <Box mt={2}>
                    <ImageUpload
                      feature={{ image: formData.meta.ogImage }}
                      handleFeatureChange={(field, value) =>
                        setFormData((prev) => ({
                          ...prev,
                          meta: { ...prev.meta, ogImage: value },
                        }))
                      }
                      setImageUpload={setIsImageUploading}
                      index="meta-og-image"
                    />
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={() =>
                      updateSection(
                        { slug: selectedPage, section: 'meta', sectionData: formData.meta },
                        { onSuccess: () => refetch() }
                      )
                    }
                    disabled={updatingSection}
                    sx={{ mt: 2 }}
                  >
                    Save Meta Tags
                  </Button>
                </Paper>
              </TabPanel>
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageEventPages;
