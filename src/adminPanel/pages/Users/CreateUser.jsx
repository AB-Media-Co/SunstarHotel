import { useState } from 'react';
import { useAdminRegister } from '../../../ApiHooks/useAdminHooks';
import { useGetHotels } from '../../../ApiHooks/useHotelHook2';
import toast from 'react-hot-toast';
import {
  Container, Box, Grid, TextField, Select, MenuItem, FormControl,
  InputLabel, Button, Typography, Divider, CircularProgress,
  Paper, Stepper, Step, StepLabel, Card, CardContent, Avatar,
  Chip, Tooltip, IconButton
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import BadgeIcon from '@mui/icons-material/Badge';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const CreateUser = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
    role: '',
    password: '',
    allowedCities: '',
    allowedHotels: [],
  });

  const { data: hotels } = useGetHotels();
  const { mutate: register, isLoading } = useAdminRegister();

  const steps = ['Basic Information', 'Personal Details', 'Role & Security', 'Access Control'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'allowedHotels') {
      setFormData({ ...formData, [name]: typeof value === 'string' ? value.split(',') : value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      allowedCities: formData.allowedCities ? formData.allowedCities.split(',').map((city) => city.trim()) : [],
      allowedHotels: formData.allowedHotels || [],
    };

    register(submissionData, {
      onSuccess: () => {
        toast.success('User created successfully');
        setFormData({
          username: '',
          email: '',
          phone: '',
          gender: '',
          age: '',
          role: '',
          password: '',
          allowedCities: '',
          allowedHotels: [],
        });
        setActiveStep(0);
      },
      onError: (error) => {
        toast.error(error.message || 'User creation failed');
      },
    });
  };

  const renderBasicInfo = () => (
    <Card elevation={0} sx={{ p: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            <ContactMailIcon />
          </Avatar>
          <Typography variant="h6">Basic Information</Typography>
        </Box>

        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
          required
          disabled={isLoading}
          variant="outlined"
          sx={{ mb: 3 }}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              disabled={isLoading}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              disabled={isLoading}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderPersonalDetails = () => (
    <Card elevation={0} sx={{ p: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
            <BadgeIcon />
          </Avatar>
          <Typography variant="h6">Personal Details</Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                label="Gender"
                required
                disabled={isLoading}
              >
                <MenuItem value="" disabled>Select gender</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              label="Age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              required
              disabled={isLoading}
              variant="outlined"
              InputProps={{
                inputProps: { min: 18, max: 100 }
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderRoleAndSecurity = () => (
    <Card elevation={0} sx={{ p: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ bgcolor: 'error.main', mr: 2 }}>
            <VpnKeyIcon />
          </Avatar>
          <Typography variant="h6">Role & Security</Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Role"
                required
                disabled={isLoading}
              >
                <MenuItem value="" disabled>Select role</MenuItem>
                <MenuItem value="superadmin">SuperAdmin</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="contentManager">Content Manager</MenuItem>
                <MenuItem value="cityManager">City Manager</MenuItem>
                <MenuItem value="hotelManager">Hotel Manager</MenuItem>
                <MenuItem value="digitalMarketer">Digital Marketer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              disabled={isLoading}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderAccessControl = () => (
    <Card elevation={0} sx={{ p: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
            <LocationCityIcon />
          </Avatar>
          <Typography variant="h6">Access Control</Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Allowed Cities"
              name="allowedCities"
              value={formData.allowedCities}
              onChange={handleChange}
              placeholder="e.g., city1, city2"
              disabled={isLoading}
              variant="outlined"
              helperText="Enter cities separated by commas"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Allowed Hotels</InputLabel>
              <Select
                multiple
                name="allowedHotels"
                value={formData.allowedHotels}
                onChange={handleChange}
                label="Allowed Hotels"
                disabled={isLoading}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => {
                      const hotel = Array.isArray(hotels?.hotels)
                        ? hotels.hotels.find(h => h._id === value)
                        : null;
                      return (
                        <Chip
                          key={value}
                          label={hotel?.name || value}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      );
                    })}
                  </Box>
                )}
              >
                {hotels?.hotels?.map((hotel) => (
                  <MenuItem key={hotel._id} value={hotel._id}>
                    {hotel.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderBasicInfo();
      case 1:
        return renderPersonalDetails();
      case 2:
        return renderRoleAndSecurity();
      case 3:
        return renderAccessControl();
      default:
        return 'Unknown step';
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 0:
        return formData.username && formData.email && formData.phone;
      case 1:
        return formData.gender && formData.age;
      case 2:
        return formData.role && formData.password;
      case 3:
        return true; // Optional fields
      default:
        return false;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 15, mb: 5, minHeight: '80vh' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <PersonAddIcon fontSize="large" sx={{ color: 'primary.main', mr: 2 }} />
          <Typography variant="h4" component="h1" color="primary.main" fontWeight="500">
            Create New User
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          {getStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              disabled={activeStep === 0 || isLoading}
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={isLoading || !isStepValid(activeStep)}
                endIcon={isLoading ? <CircularProgress size={20} /> : <CheckCircleIcon />}
              >
                {isLoading ? 'Creating...' : 'Create User'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!isStepValid(activeStep)}
                endIcon={<ArrowForwardIcon />}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateUser;