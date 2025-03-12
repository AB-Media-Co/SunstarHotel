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
  DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
    <Box sx={{ p: 6, mt: 10, minHeight: '100vh' }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700 }}>
        Deals &amp; Offers
      </Typography>
      <Grid container spacing={4}>
        {/* Create Deal Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h5" align="center" gutterBottom sx={{ mb: 3 }}>
              Create New Deal
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* Basic fields */}
              <TextField
                label="Deal Name"
                name="name"
                value={newDeal.name}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
                variant="outlined"
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
                    label="Discount Percent"
                    name="discountPercent"
                    type="number"
                    value={newDeal.discountPercent}
                    onChange={handleInputChange}
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
                    label="Start Date (Optional)"
                    name="startDate"
                    type="date"
                    value={newDeal.startDate}
                    onChange={handleInputChange}
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
                    value={newDeal.endDate}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>

              {/* Visibility */}
              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <FormLabel component="legend">
                  Who will be able to see this promotion?
                </FormLabel>
                <RadioGroup
                  name="visibility"
                  value={newDeal.visibility}
                  onChange={handleInputChange}
                  row
                >
                  <FormControlLabel value="everyone" control={<Radio />} label="Everyone" />
                  <FormControlLabel value="secret" control={<Radio />} label="Secret (Members Only)" />
                </RadioGroup>
              </FormControl>

              {/* Days of Week */}
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
                          checked={newDeal.daysOfWeek.includes(day)}
                          onChange={handleDaysOfWeekChange}
                          value={day}
                        />
                      }
                      label={day}
                    />
                  ))}
                </FormGroup>
              </Box>

              {/* Platform */}
              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <FormLabel component="legend">Platform (Mobile Rate)</FormLabel>
                <RadioGroup
                  name="platform"
                  value={newDeal.platform}
                  onChange={handleInputChange}
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

              {/* Bookable period */}
              <Box sx={{ mt: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Bookable period
                </Typography>

                {/* Deal Type: lastMinute or earlyBooker or standard */}
                <FormControl component="fieldset" sx={{ mb: 2 }}>
                  <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
                    How far in advance do customers need to book this promotion?
                  </FormLabel>
                  <RadioGroup
                    row
                    name="dealType"
                    value={newDeal.dealType}
                    onChange={handleInputChange}
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

                {/* If lastMinute, show maxAdvance + bookingRestrictionUnit */}
                {newDeal.dealType === 'lastMinute' && (
                  <>
                    <FormControl component="fieldset" sx={{ mb: 2 }}>
                      <FormLabel component="legend">
                        Select Days or Hours
                      </FormLabel>
                      <RadioGroup
                        row
                        name="bookingRestrictionUnit"
                        value={newDeal.bookingRestrictionUnit}
                        onChange={handleInputChange}
                      >
                        <FormControlLabel value="days" control={<Radio />} label="Days or fewer" />
                        <FormControlLabel value="hours" control={<Radio />} label="Hours or fewer" />
                      </RadioGroup>
                    </FormControl>
                    <TextField
                      label="Maximum Advance (e.g., 3 for '3 days or fewer')"
                      name="maxAdvance"
                      type="number"
                      value={newDeal.maxAdvance}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                  </>
                )}

                {/* If earlyBooker, show minAdvance */}
                {newDeal.dealType === 'earlyBooker' && (
                  <TextField
                    label="Minimum Advance (e.g., 30 for '30 days or more')"
                    name="minAdvance"
                    type="number"
                    value={newDeal.minAdvance}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                )}

                {/* Do you want to limit this promotion to certain hours? */}
                <Box sx={{ mt: 2 }}>
                  <FormLabel component="legend" sx={{ fontWeight: 'bold', display: 'block' }}>
                    Do you want to limit this promotion to certain hours?
                  </FormLabel>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="limitPromotionToHours"
                        checked={newDeal.limitPromotionToHours}
                        onChange={handleInputChange}
                      />
                    }
                    label={newDeal.limitPromotionToHours ? 'Yes' : 'No'}
                  />
                </Box>
                {newDeal.limitPromotionToHours && (
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                      <TextField
                        label="Start Hour (0-23)"
                        name="startHour"
                        type="number"
                        value={newDeal.startHour}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="End Hour (0-23)"
                        name="endHour"
                        type="number"
                        value={newDeal.endHour}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                )}
              </Box>

              {/* Apply to All Hotels */}
              <FormControlLabel
                control={
                  <Checkbox
                    name="applyToAllHotels"
                    checked={newDeal.applyToAllHotels}
                    onChange={handleInputChange}
                  />
                }
                label="Apply to All Hotels"
                sx={{ mt: 2 }}
              />
              {!newDeal.applyToAllHotels && (
                <>
                  {hotelsLoading && <Typography>Loading hotels...</Typography>}
                  {hotelsError && <Typography color="error">Error fetching hotels.</Typography>}
                  {hotels && hotels.length > 0 && (
                    <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                      <InputLabel id="hotel-select-label">Select Hotel</InputLabel>
                      <Select
                        labelId="hotel-select-label"
                        id="hotel-select"
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
                </>
              )}
              <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3 }}>
                Create Deal
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* Deals List */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h5" align="center" gutterBottom sx={{ mb: 3 }}>
              Existing Deals
            </Typography>
            {dealsLoading && <Typography>Loading deals...</Typography>}
            {dealsError && <Typography color="error">Error fetching deals.</Typography>}
            {filteredDeals.length > 0 ? (
              filteredDeals.map((deal) => (
                <Paper
                  key={deal._id}
                  elevation={2}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.02)' },
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {deal.name}
                    </Typography>
                    <Typography variant="body1">{deal.description}</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {deal.discountPercent}% off
                    </Typography>
                    <Typography variant="body2">
                      Offer Code: {deal.offerCode || 'N/A'}
                    </Typography>
                    {deal.startDate && deal.endDate && (
                      <Typography variant="body2">
                        Availability: {new Date(deal.startDate).toLocaleDateString()} - {new Date(deal.endDate).toLocaleDateString()}
                      </Typography>
                    )}
                    <Typography variant="body2">
                      Visibility: {deal.visibility === 'secret' ? 'Secret' : 'Everyone'}
                    </Typography>
                    <Typography variant="body2">
                      Days: {deal.daysOfWeek ? deal.daysOfWeek.join(', ') : 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                      Platform: {deal.platform === 'mobileOnly' ? 'Mobile Only' : 'Mobile & Web'}
                    </Typography>
                    <Typography variant="body2">
                      Applies to: {deal.applyToAllHotels ? 'All Hotels' : deal.hotels.map((h) => h.name).join(', ')}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton color="primary" onClick={() => handleEditClick(deal)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(deal._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Paper>
              ))
            ) : (
              <Typography align="center">No deals available for the selected hotel.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Edit Deal Modal */}
      {editingDeal && (
        <Dialog open={openEditModal} onClose={handleEditCancel} fullWidth maxWidth="md">
          <DialogTitle>Edit Deal</DialogTitle>
          <DialogContent>
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

              {/* Bookable period for editing */}
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

                {/* If lastMinute, show maxAdvance + bookingRestrictionUnit */}
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

                {/* If earlyBooker, show minAdvance */}
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

              {/* Apply to All Hotels */}
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
          <DialogActions>
            <Button onClick={handleEditCancel} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleEditSubmit} variant="contained" color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default DealsOffers;