import { useEffect, useState } from 'react';
import {
    TextField,
    Typography,
    Button,
    Box,
    CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { uploadImagesAPIV2 } from '../../ApiHooks/useHotelHook2';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Input = styled('input')({
    display: 'none',
});

const ImageUpload = ({ feature, handleFeatureChange, setImageUpload, index }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    // Create unique ID for each upload input
    const inputId = `contained-button-file-${index}`;

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploadError(null);
        setIsUploading(true);

        try {
            const response = await uploadImagesAPIV2([file]);
            const imageUrl = response?.imageUrls[0];
            handleFeatureChange('image', imageUrl);
            setIsUploading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadError('Failed to upload image. Please try again.');
            setIsUploading(false);
            handleFeatureChange('image', '');
        }
    };

    useEffect(() => {
        setImageUpload(isUploading);
    }, [isUploading, setImageUpload]);

    return (
        <Box>
            <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                value={feature.image || ''}
                onChange={(e) => handleFeatureChange('image', e.target.value)}
                style={{ marginBottom: 10 }}
                disabled={isUploading}
            />

            <label htmlFor={inputId}>
                <Input
                    accept="image/*"
                    id={inputId}
                    type="file"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                />
                <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    disabled={isUploading}
                    style={{marginBottom: 10}}
                >
                    Upload Image
                </Button>
            </label>

            {isUploading && (
                <Box display="flex" alignItems="center" mt={1}>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    <Typography variant="body2" color="textSecondary">
                        Uploading...
                    </Typography>
                </Box>
            )}

            {uploadError && (
                <Typography variant="body2" color="error" mt={1}>
                    {uploadError}
                </Typography>
            )}
        </Box>
    );
};

export default ImageUpload;