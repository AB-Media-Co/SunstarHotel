import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Grid,
  Box,
  Radio,
  RadioGroup,
  FormLabel,
  FormGroup,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
  Card,
  CardContent,
  CardActions,
  Stack,
  Alert,
  Collapse,
  InputAdornment
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DevicesIcon from '@mui/icons-material/Devices';
import HotelIcon from '@mui/icons-material/Hotel';
import PercentIcon from '@mui/icons-material/Percent';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useGetHotels } from '../../../ApiHooks/useHotelHook2';
import { 
  useCreateOfferAndDeal, 
  useOffersAndDeals, 
  useDeleteOfferAndDeal, 
  useUpdateOfferAndDeal 
} from '../../../ApiHooks/useOffersAndDealsHook';

const DAYS_LIST = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const DealsOffers = () => {
  const { data: offershotels, isLoading: hotelsLoading, error: hotelsError } = useGetHotels();
  const hotels = offershotels?.hotels;
  
  const { data: deals, isLoading: dealsLoading, error: dealsError } = useOffersAndDeals();

  const deleteDealMutation = useDeleteOfferAndDeal();
  const updateDealMutation = useUpdateOfferAndDeal();
  const createDealMutation = useCreateOfferAndDeal();

  const [selectedHotel, setSelectedHotel] = useState('');
  const [expandedAdvanced, setExpandedAdvanced] = useState(false);
  const [newDeal, setNewDeal] = useState({
    name: '',
    description: '',
    discountPercent: 0,
    offerCode: '',
    applyToAllHotels: false,
    hotels: [],
    startDate: '',
    endDate: '',
    visibility: 'everyone',
    daysOfWeek: [...DAYS_LIST],
    platform: 'mobileAndWeb',
    dealType: 'standard',
    bookingRestrictionUnit: 'none',
    minAdvance: '',
    maxAdvance: '',
    limitPromotionToHours: false,
    startHour: '',
    endHour: ''
  });

  const [editingDeal, setEditingDeal] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleHotelChange = (event) => {
    setSelectedHotel(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewDeal((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleDaysOfWeekChange = (event) => {
    const { value, checked } = event.target;
    setNewDeal((prev) => {
      let updatedDays = [...prev.daysOfWeek];
      if (checked) {
        if (!updatedDays.includes(value)) {
          updatedDays.push(value);
        }
      } else {
        updatedDays = updatedDays.filter((day) => day !== value);
      }
      return { ...prev, daysOfWeek: updatedDays };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let dealData = { ...newDeal };
    if (!newDeal.applyToAllHotels && selectedHotel) {
      dealData.hotels = [selectedHotel];
    }
    createDealMutation.mutate(dealData);

    setNewDeal({
      name: '',
      description: '',
      discountPercent: 0,
      offerCode: '',
      applyToAllHotels: false,
      hotels: [],
      startDate: '',
      endDate: '',
      visibility: 'everyone',
      daysOfWeek: [...DAYS_LIST],
      platform: 'mobileAndWeb',
      dealType: 'standard',
      bookingRestrictionUnit: 'none',
      minAdvance: '',
      maxAdvance: '',
      limitPromotionToHours: false,
      startHour: '',
      endHour: ''
    });
    setSelectedHotel('');
    setExpandedAdvanced(false);
  };

  const handleEditClick = (deal) => {
    setEditingDeal(deal);
    setOpenEditModal(true);
  };

  const handleEditInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditingDeal((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditDaysOfWeekChange = (event) => {
    const { value, checked } = event.target;
    setEditingDeal((prev) => {
      let updatedDays = [...(prev.daysOfWeek || [])];
      if (checked) {
        if (!updatedDays.includes(value)) {
          updatedDays.push(value);
        }
      } else {
        updatedDays = updatedDays.filter((day) => day !== value);
      }
      return { ...prev, daysOfWeek: updatedDays };
    });
  };

  const handleEditHotelChange = (event) => {
    setEditingDeal((prev) => ({
      ...prev,
      hotels: [event.target.value]
    }));
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    updateDealMutation.mutate({ id: editingDeal._id, updatedData: editingDeal });
    setEditingDeal(null);
    setOpenEditModal(false);
  };

  const handleEditCancel = () => {
    setEditingDeal(null);
    setOpenEditModal(false);
  };

  const handleDelete = (id) => {
    deleteDealMutation.mutate(id);
  };

  const dealsArray = Array.isArray(deals) ? deals : [];
  const filteredDeals = selectedHotel
    ? dealsArray.filter((deal) => {
        return (
          deal?.applyToAllHotels ||
          (deal?.hotels && deal?.hotels.some((h) => h?._id === selectedHotel))
        );
      })
    : dealsArray;

  return (
    <Box sx={{ 
      p: 4, 
      mt: 8, 
      minHeight: '100vh',
      background: '',
    }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800,
              color: 'Black',
              mb: 1,
              // textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Deals & Offers Management
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 300 }}>
            Create and manage promotional deals for your hotels
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Create Deal Form */}
          <Grid item xs={12} lg={5}>
            <Paper 
              elevation={8} 
              sx={{ 
                p: 4, 
                borderRadius: 3,
                background: 'white',
                position: 'sticky',
                top: 20
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LocalOfferIcon sx={{ fontSize: 32, color: '#667eea', mr: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                  Create New Deal
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 3 }} />
              
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Deal Name"
                  name="name"
                  value={newDeal.name}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalOfferIcon sx={{ color: '#667eea' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  label="Description"
                  name="description"
                  value={newDeal.description}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  margin="normal"
                  multiline
                  rows={3}
                  variant="outlined"
                />
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Discount %"
                      name="discountPercent"
                      type="number"
                      value={newDeal.discountPercent}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PercentIcon sx={{ color: '#667eea' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Offer Code"
                      name="offerCode"
                      value={newDeal.offerCode}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Start Date"
                      name="startDate"
                      type="date"
                      value={newDeal.startDate}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarTodayIcon sx={{ color: '#667eea' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="End Date"
                      name="endDate"
                      type="date"
                      value={newDeal.endDate}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarTodayIcon sx={{ color: '#667eea' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3, p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" sx={{ fontWeight: 600, color: '#333' }}>
                      <VisibilityIcon sx={{ fontSize: 18, mr: 1, verticalAlign: 'middle' }} />
                      Visibility
                    </FormLabel>
                    <RadioGroup
                      name="visibility"
                      value={newDeal.visibility}
                      onChange={handleInputChange}
                      row
                      sx={{ mt: 1 }}
                    >
                      <FormControlLabel value="everyone" control={<Radio />} label="Everyone" />
                      <FormControlLabel value="secret" control={<Radio />} label="Members Only" />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <Box sx={{ mt: 3, p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
                    Days of Week
                  </Typography>
                  <FormGroup row>
                    {DAYS_LIST.map((day) => (
                      <FormControlLabel
                        key={day}
                        control={
                          <Checkbox
                            checked={newDeal.daysOfWeek.includes(day)}
                            onChange={handleDaysOfWeekChange}
                            value={day}
                            sx={{
                              '&.Mui-checked': {
                                color: '#667eea',
                              },
                            }}
                          />
                        }
                        label={day}
                      />
                    ))}
                  </FormGroup>
                </Box>

                <Box sx={{ mt: 3, p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" sx={{ fontWeight: 600, color: '#333' }}>
                      <DevicesIcon sx={{ fontSize: 18, mr: 1, verticalAlign: 'middle' }} />
                      Platform
                    </FormLabel>
                    <RadioGroup
                      name="platform"
                      value={newDeal.platform}
                      onChange={handleInputChange}
                      row
                      sx={{ mt: 1 }}
                    >
                      <FormControlLabel value="mobileAndWeb" control={<Radio />} label="Mobile & Web" />
                      <FormControlLabel value="mobileOnly" control={<Radio />} label="Mobile Only" />
                    </RadioGroup>
                  </FormControl>
                </Box>

                {/* Advanced Settings Collapsible */}
                <Box sx={{ mt: 3 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => setExpandedAdvanced(!expandedAdvanced)}
                    endIcon={expandedAdvanced ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    sx={{ 
                      borderColor: '#667eea',
                      color: '#667eea',
                      '&:hover': {
                        borderColor: '#764ba2',
                        bgcolor: 'rgba(102, 126, 234, 0.04)'
                      }
                    }}
                  >
                    Advanced Booking Settings
                  </Button>
                  <Collapse in={expandedAdvanced}>
                    <Box sx={{ mt: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                      <FormControl component="fieldset" sx={{ mb: 2 }}>
                        <FormLabel component="legend" sx={{ fontWeight: 600 }}>
                          Booking Window
                        </FormLabel>
                        <RadioGroup
                          row
                          name="dealType"
                          value={newDeal.dealType}
                          onChange={handleInputChange}
                        >
                          <FormControlLabel value="lastMinute" control={<Radio />} label="Last Minute" />
                          <FormControlLabel value="earlyBooker" control={<Radio />} label="Early Booker" />
                          <FormControlLabel value="standard" control={<Radio />} label="No Restriction" />
                        </RadioGroup>
                      </FormControl>

                      {newDeal.dealType === 'lastMinute' && (
                        <>
                          <FormControl component="fieldset" sx={{ mb: 2 }}>
                            <FormLabel component="legend">Unit</FormLabel>
                            <RadioGroup
                              row
                              name="bookingRestrictionUnit"
                              value={newDeal.bookingRestrictionUnit}
                              onChange={handleInputChange}
                            >
                              <FormControlLabel value="days" control={<Radio />} label="Days" />
                              <FormControlLabel value="hours" control={<Radio />} label="Hours" />
                            </RadioGroup>
                          </FormControl>
                          <TextField
                            label="Maximum Advance"
                            name="maxAdvance"
                            type="number"
                            value={newDeal.maxAdvance}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            size="small"
                          />
                        </>
                      )}

                      {newDeal.dealType === 'earlyBooker' && (
                        <TextField
                          label="Minimum Advance (days)"
                          name="minAdvance"
                          type="number"
                          value={newDeal.minAdvance}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                          size="small"
                        />
                      )}

                      <FormControlLabel
                        control={
                          <Checkbox
                            name="limitPromotionToHours"
                            checked={newDeal.limitPromotionToHours}
                            onChange={handleInputChange}
                          />
                        }
                        label="Limit to specific hours"
                        sx={{ mt: 2 }}
                      />
                      
                      {newDeal.limitPromotionToHours && (
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                          <Grid item xs={6}>
                            <TextField
                              label="Start Hour"
                              name="startHour"
                              type="number"
                              value={newDeal.startHour}
                              onChange={handleInputChange}
                              fullWidth
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              label="End Hour"
                              name="endHour"
                              type="number"
                              value={newDeal.endHour}
                              onChange={handleInputChange}
                              fullWidth
                              size="small"
                            />
                          </Grid>
                        </Grid>
                      )}
                    </Box>
                  </Collapse>
                </Box>

                <Box sx={{ mt: 3, p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="applyToAllHotels"
                        checked={newDeal.applyToAllHotels}
                        onChange={handleInputChange}
                        sx={{
                          '&.Mui-checked': {
                            color: '#667eea',
                          },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <HotelIcon sx={{ mr: 1, color: '#667eea' }} />
                        <Typography sx={{ fontWeight: 600 }}>Apply to All Hotels</Typography>
                      </Box>
                    }
                  />
                  
                  {!newDeal.applyToAllHotels && hotels && hotels.length > 0 && (
                    <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                      <InputLabel>Select Hotel</InputLabel>
                      <Select
                        value={selectedHotel}
                        label="Select Hotel"
                        onChange={handleHotelChange}
                      >
                        {hotels.map((hotel) => (
                          <MenuItem key={hotel._id} value={hotel._id}>
                            {hotel.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Box>
                
                <Button 
                  variant="contained" 
                  type="submit" 
                  fullWidth 
                  size="large"
                  sx={{ 
                    mt: 4,
                    py: 1.5,
                    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(102, 126, 234, 0.6)',
                    }
                  }}
                >
                  Create Deal
                </Button>
              </form>
            </Paper>
          </Grid>

          {/* Deals List */}
          <Grid item xs={12} lg={7}>
            <Paper 
              elevation={8} 
              sx={{ 
                p: 4, 
                borderRadius: 3,
                background: 'white',
                minHeight: 600
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalOfferIcon sx={{ fontSize: 32, color: '#667eea', mr: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                    Active Deals ({filteredDeals.length})
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ mb: 3 }} />
              
              {dealsLoading && (
                <Alert severity="info" sx={{ mb: 2 }}>Loading deals...</Alert>
              )}
              
              {dealsError && (
                <Alert severity="error" sx={{ mb: 2 }}>Error fetching deals</Alert>
              )}
              
              {filteredDeals.length > 0 ? (
                <Stack spacing={3}>
                  {filteredDeals.map((deal) => (
                    <Card 
                      key={deal._id}
                      elevation={3}
                      sx={{
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        border: '1px solid #e0e0e0',
                        '&:hover': { 
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                          borderColor: '#667eea'
                        },
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#333', mb: 1 }}>
                              {deal.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              {deal.description}
                            </Typography>
                          </Box>
                          <Chip 
                            label={`${deal.discountPercent}% OFF`}
                            color="primary"
                            sx={{ 
                              fontWeight: 700,
                              fontSize: '0.9rem',
                              background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                            }}
                          />
                        </Box>

                        <Stack spacing={1}>
                          {deal.offerCode && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocalOfferIcon sx={{ fontSize: 16, mr: 1, color: '#667eea' }} />
                              <Typography variant="body2">
                                <strong>Code:</strong> {deal.offerCode}
                              </Typography>
                            </Box>
                          )}
                          
                          {deal.startDate && deal.endDate && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarTodayIcon sx={{ fontSize: 16, mr: 1, color: '#667eea' }} />
                              <Typography variant="body2">
                                {new Date(deal.startDate).toLocaleDateString()} - {new Date(deal.endDate).toLocaleDateString()}
                              </Typography>
                            </Box>
                          )}
                          
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <VisibilityIcon sx={{ fontSize: 16, mr: 1, color: '#667eea' }} />
                            <Typography variant="body2">
                              {deal.visibility === 'secret' ? 'Members Only' : 'Public'}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <DevicesIcon sx={{ fontSize: 16, mr: 1, color: '#667eea' }} />
                            <Typography variant="body2">
                              {deal.platform === 'mobileOnly' ? 'Mobile Only' : 'Mobile & Web'}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <HotelIcon sx={{ fontSize: 16, mr: 1, color: '#667eea' }} />
                            <Typography variant="body2">
                              {deal.applyToAllHotels ? 'All Hotels' : deal.hotels.map((h) => h.name).join(', ')}
                            </Typography>
                          </Box>

                          {deal.daysOfWeek && deal.daysOfWeek.length > 0 && (
                            <Box sx={{ mt: 1 }}>
                              <Stack direction="row" spacing={0.5} flexWrap="wrap">
                                {deal.daysOfWeek.map((day) => (
                                  <Chip 
                                    key={day} 
                                    label={day} 
                                    size="small" 
                                    variant="outlined"
                                    sx={{ 
                                      borderColor: '#667eea',
                                      color: '#667eea'
                                    }}
                                  />
                                ))}
                              </Stack>
                            </Box>
                          )}
                        </Stack>
                      </CardContent>
                      
                      <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                        <IconButton 
                          color="primary" 
                          onClick={() => handleEditClick(deal)}
                          sx={{ 
                            '&:hover': { 
                              bgcolor: 'rgba(102, 126, 234, 0.1)' 
                            } 
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          color="error" 
                          onClick={() => handleDelete(deal._id)}
                          sx={{ 
                            '&:hover': { 
                              bgcolor: 'rgba(244, 67, 54, 0.1)' 
                            } 
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  ))}
                </Stack>
              ) : (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <LocalOfferIcon sx={{ fontSize: 80, color: '#e0e0e0', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    No deals available
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Create your first deal to get started
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Edit Deal Modal - keeping original structure */}
      {editingDeal && (
        <Dialog open={openEditModal} onClose={handleEditCancel} fullWidth maxWidth="md">
          <DialogTitle sx={{ background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)', color: 'white', fontWeight: 700 }}>
            Edit Deal
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                label="Deal Name"
                name="name"
                value={editingDeal.name}
                onChange={handleEditInputChange}
                fullWidth
                required
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Description"
                name="description"
                value={editingDeal.description}
                onChange={handleEditInputChange}
                fullWidth
                required
                margin="normal"
                multiline
                rows={3}
                variant="outlined"
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Discount Percent"
                    name="discountPercent"
                    type="number"
                    value={editingDeal.discountPercent}
                    onChange={handleEditInputChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Offer Code"
                    name="offerCode"
                    value={editingDeal.offerCode}
                    onChange={handleEditInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Start Date (Optional)"
                    name="startDate"
                    type="date"
                    value={editingDeal.startDate ? editingDeal.startDate.substring(0, 10) : ''}
                    onChange={handleEditInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="End Date (Optional)"
                    name="endDate"
                    type="date"
                    value={editingDeal.endDate ? editingDeal.endDate.substring(0, 10) : ''}
                    onChange={handleEditInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <FormLabel component="legend">Who will be able to see this promotion?</FormLabel>
                <RadioGroup
                  name="visibility"
                  value={editingDeal.visibility}
                  onChange={handleEditInputChange}
                  row
                >
                  <FormControlLabel value="everyone" control={<Radio />} label="Everyone" />
                  <FormControlLabel value="secret" control={<Radio />} label="Secret (Members Only)" />
                </RadioGroup>
              </FormControl>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Which day(s) of the week would you like to include?
                </Typography>
                <FormGroup row>
                  {DAYS_LIST.map((day) => (
                    <FormControlLabel
                      key={day}
                      control={
                        <Checkbox
                          checked={editingDeal.daysOfWeek?.includes(day)}
                          onChange={handleEditDaysOfWeekChange}
                          value={day}
                        />
                      }
                      label={day}
                    />
                  ))}
                </FormGroup>
              </Box>
              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <FormLabel component="legend">Platform (Mobile Rate)</FormLabel>
                <RadioGroup
                  name="platform"
                  value={editingDeal.platform}
                  onChange={handleEditInputChange}
                  row
                >
                  <FormControlLabel
                    value="mobileAndWeb"
                    control={<Radio />}
                    label="Mobile & Web"
                  />
                  <FormControlLabel
                    value="mobileOnly"
                    control={<Radio />}
                    label="Mobile Only"
                  />
                </RadioGroup>
              </FormControl>

              <Box sx={{ mt: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Bookable period
                </Typography>
                <FormControl component="fieldset" sx={{ mb: 2 }}>
                  <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
                    How far in advance do customers need to book this promotion?
                  </FormLabel>
                  <RadioGroup
                    row
                    name="dealType"
                    value={editingDeal.dealType || 'standard'}
                    onChange={handleEditInputChange}
                  >
                    <FormControlLabel
                      value="lastMinute"
                      control={<Radio />}
                      label="Last Minute (days/hours or fewer)"
                    />
                    <FormControlLabel
                      value="earlyBooker"
                      control={<Radio />}
                      label="Early Booker (days or more)"
                    />
                    <FormControlLabel
                      value="standard"
                      control={<Radio />}
                      label="No Restriction"
                    />
                  </RadioGroup>
                </FormControl>

                {editingDeal.dealType === 'lastMinute' && (
                  <>
                    <FormControl component="fieldset" sx={{ mb: 2 }}>
                      <FormLabel component="legend">
                        Select Days or Hours
                      </FormLabel>
                      <RadioGroup
                        row
                        name="bookingRestrictionUnit"
                        value={editingDeal.bookingRestrictionUnit || 'none'}
                        onChange={handleEditInputChange}
                      >
                        <FormControlLabel value="days" control={<Radio />} label="Days or fewer" />
                        <FormControlLabel value="hours" control={<Radio />} label="Hours or fewer" />
                        <FormControlLabel value="none" control={<Radio />} label="None" />
                      </RadioGroup>
                    </FormControl>
                    <TextField
                      label="Maximum Advance"
                      name="maxAdvance"
                      type="number"
                      value={editingDeal.maxAdvance || ''}
                      onChange={handleEditInputChange}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                  </>
                )}

                {editingDeal.dealType === 'earlyBooker' && (
                  <TextField
                    label="Minimum Advance"
                    name="minAdvance"
                    type="number"
                    value={editingDeal.minAdvance || ''}
                    onChange={handleEditInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                )}

                <Box sx={{ mt: 2 }}>
                  <FormLabel component="legend" sx={{ fontWeight: 'bold', display: 'block' }}>
                    Do you want to limit this promotion to certain hours?
                  </FormLabel>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="limitPromotionToHours"
                        checked={editingDeal.limitPromotionToHours || false}
                        onChange={handleEditInputChange}
                      />
                    }
                    label={editingDeal.limitPromotionToHours ? 'Yes' : 'No'}
                  />
                </Box>
                {editingDeal.limitPromotionToHours && (
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                      <TextField
                        label="Start Hour (0-23)"
                        name="startHour"
                        type="number"
                        value={editingDeal.startHour || ''}
                        onChange={handleEditInputChange}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="End Hour (0-23)"
                        name="endHour"
                        type="number"
                        value={editingDeal.endHour || ''}
                        onChange={handleEditInputChange}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                )}
              </Box>

              <FormControlLabel
                control={
                  <Checkbox
                    name="applyToAllHotels"
                    checked={editingDeal.applyToAllHotels || false}
                    onChange={handleEditInputChange}
                  />
                }
                label="Apply to All Hotels"
                sx={{ mt: 2 }}
              />
              {!editingDeal.applyToAllHotels && hotels && hotels.length > 0 && (
                <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                  <InputLabel id="edit-hotel-select-label">Select Hotel</InputLabel>
                  <Select
                    labelId="edit-hotel-select-label"
                    id="edit-hotel-select"
                    value={editingDeal.hotels?.[0] || ''}
                    label="Select Hotel"
                    onChange={handleEditHotelChange}
                  >
                    {hotels.map((hotel) => (
                      <MenuItem key={hotel._id} value={hotel._id}>
                        {hotel.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleEditCancel} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button 
              onClick={handleEditSubmit} 
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                fontWeight: 600,
                px: 3
              }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default DealsOffers;