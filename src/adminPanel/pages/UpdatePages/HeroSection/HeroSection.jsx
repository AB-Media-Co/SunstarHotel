import { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import useUpdatePagesHook from '../../../../ApiHooks/useUpdatePagesHook';
import { uploadImagesAPIV2 } from '../../../../ApiHooks/useHotelHook2';
import ImageUpload from '../../../Components/ImageUpload';

const HeroSection = () => {
    const { heroSectionUpdate, updateHerosection } = useUpdatePagesHook();
    const [formData, setFormData] = useState({
        heading: '',
        description: '',
        image: '',
    });
    const [openModal, setOpenModal] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [uploadResponse, setUploadResponse] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageUpload, setImageUpload] = useState(false);

    useEffect(() => {
        if (heroSectionUpdate) {
            setFormData({
                heading: heroSectionUpdate.heading || '',
                description: heroSectionUpdate.description || '',
                image: heroSectionUpdate.image || '',
            });
            // If there's an existing image, set it as the initial preview
            if (heroSectionUpdate.image) {
                setImagePreview(heroSectionUpdate.image);
            }
        }
    }, [heroSectionUpdate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleEditClick = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setImageFile(null);
        setUploadResponse(null);
        setImagePreview(null);
    };

    const handleSaveClick = async () => {
        try {
            if (imageFile) {
                const response = await uploadImagesAPIV2([imageFile]);
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    image: response.url, // Assuming the response contains the image URL
                }));
                setUploadResponse(response);
            }

            console.log({ heroSection: formData });
            updateHerosection({ heroSection: formData });
            setOpenModal(false);
        } catch (error) {
            console.error('Error updating hero section:', error);
        }
    };

    // Updates formData for any field change (including image)
    const handleFeatureChange = (field, value) => {
        console.log(field, value);
        setFormData((prevState) => ({
            ...prevState,
            [field]: value,
        }));

        // Update the image preview when the image URL changes in formData
        if (field === 'image') {
            setImagePreview(value);
        }
    };

    return (
        <Box>
            <div
                onClick={handleEditClick}
                className="myGlobalButton"
            >
                Edit Hero Section
            </div>

            {/* Modal for editing hero section */}
            <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
                <DialogTitle>Edit Hero Section</DialogTitle>
                <DialogContent>
                    <TextField
                        name="heading"
                        label="Heading"
                        value={formData.heading}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="description"
                        label="Description"
                        value={formData.description}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                    />

                    {/* Image Preview */}
                    {imagePreview && (
                        <Box mt={2} mb={2}>
                            <Typography variant="subtitle2">Image Preview:</Typography>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '150px',
                                    borderRadius: '8px',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                    )}

                    <ImageUpload
                        feature={formData}
                        handleFeatureChange={handleFeatureChange}
                        setImageUpload={setImageUpload}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveClick} variant="contained" disabled={imageUpload}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default HeroSection;
