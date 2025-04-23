import  { useState } from 'react';
import {
    Button,
    List,
    ListItem,
    ListItemText,
    Dialog,
    DialogActions,
    DialogContent,
    TextField,
    IconButton,
    Typography,
    Box,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import useUpdatePagesHook from '../../../../ApiHooks/useUpdatePagesHook';

const ManageLocation = () => {
    const {
        locations,
        addLocation,
        updateLocation,
        deleteLocation,
    } = useUpdatePagesHook();

    const [openDialog, setOpenDialog] = useState(false);
    const [locationName, setLocationName] = useState('');
    const [locationId, setLocationId] = useState(null);

    const handleOpenDialog = (id = null, name = '') => {
        setLocationId(id);
        setLocationName(name);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setLocationId(null);
        setLocationName('');
        setOpenDialog(false);
    };

    const handleSaveLocation = async () => {
        if (locationName.trim()) {
            if (locationId) {
                await updateLocation({ id: locationId, location: { name: locationName } });
            } else {
                await addLocation({ name: locationName });
            }
            handleCloseDialog();
        }
    };

    const handleDeleteLocation = async (id) => {
        try {
            await deleteLocation(id);  // Delete the location by ID
        } catch (error) {
            console.error('Error deleting location:', error);  // Log any errors
        }
    };


    return (
        <div>           
           <div onClick={()=>handleOpenDialog()} className='myGlobalButton'>
                Add Location
            </div>

            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogContent>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            {locationId ? 'Edit Location' : 'Add New Location'}
                        </Typography>
                        <TextField
                            label="Location Name"
                            value={locationName}
                            onChange={(e) => setLocationName(e.target.value)}
                            fullWidth
                            variant="outlined"
                            autoFocus
                            disabled={locationId ? false : false} // Enable the TextField for both adding and editing
                            sx={{ mb: 2 }}
                        />
                    </Box>

                    {!locationId && (
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Select a location to edit or delete:
                            </Typography>
                            <List>
                                {locations.map((location) => (
                                    <ListItem key={location._id} secondaryAction={
                                        <Box>
                                            <IconButton edge="end" color="primary" onClick={() => handleOpenDialog(location._id, location.name)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton edge="end" color="secondary" onClick={() => handleDeleteLocation(location._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    }>
                                        <ListItemText primary={location.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    )}
                </DialogContent>

                <DialogActions>

                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveLocation} color="primary">
                        {locationId ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ManageLocation;