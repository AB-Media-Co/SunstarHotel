import { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    Card,
    Grid,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import useUpdatePagesHook from '../../../../ApiHooks/useUpdatePagesHook';
import ImageUpload from '../../../Components/ImageUpload';

const ShineSectionUpdate = () => {
    const { shineSection, updateShineSection } = useUpdatePagesHook();
    const [open, setOpen] = useState(false);
    const [ImageUploads, setImageUpload] = useState(false);

    const [shineData, setShineData] = useState({
        heading: shineSection?.heading,
        description: shineSection?.description,
        features: shineSection?.features,
    });

    useEffect(() => {
        setShineData(shineSection);
    }, [shineSection]);

    const handleHeadingChange = (event) => {
        setShineData((prevState) => ({
            ...prevState,
            heading: event.target.value,
        }));
    };

    const handleDescriptionChange = (event) => {
        setShineData((prevState) => ({
            ...prevState,
            description: event.target.value,
        }));
    };

    const handleFeatureChange = (index, field, value) => {
        const updatedFeatures = [...shineData.features];
        updatedFeatures[index][field] = value;
        setShineData((prevState) => ({
            ...prevState,
            features: updatedFeatures,
        }));
    };

    const addFeature = () => {
        setShineData((prevState) => ({
            ...prevState,
            features: [
                ...prevState.features,
                { title: '', description: '', image: '' },
            ],
        }));
    };

    const removeFeature = (index) => {
        const updatedFeatures = shineData.features.filter((_, i) => i !== index);
        setShineData((prevState) => ({
            ...prevState,
            features: updatedFeatures,
        }));
    };

    const handleUpdateShine = async () => {
        // Ensure we have required data
        if (!shineData?.heading || !shineData?.description) {
            alert('Heading and description are required.');
            return;
        }

        if (!shineData?.features || shineData.features.length === 0) {
            alert('At least one feature is required.');
            return;
        }

        // Check main description word count
        const mainDescWords = shineData?.description?.trim().split(/\s+/).length || 0;
        
        // Check feature descriptions word count
        const hasLongDescription = shineData?.features?.some(feature => {
            const wordCount = feature?.description?.trim().split(/\s+/).length || 0;
            return wordCount > 130;
        });

        if (mainDescWords > 130 || hasLongDescription) {
            alert('Descriptions should not exceed 130 words');
            return;
        }

        try {
            // Allow any number of features - flexible
            const featuresToSend = shineData.features
                .filter(feature => feature.title || feature.description || feature.image)
                .map(feature => ({
                    title: feature.title || '',
                    description: feature.description || '',
                    image: feature.image || ''
                }));

            const payload = {
                heading: shineData.heading,
                description: shineData.description,
                features: featuresToSend
            };

            await updateShineSection(payload);
        } catch (error) {
            console.error('Error updating shine section:', error);
        }
    };

    return (
        <div>
            <div onClick={() => setOpen(true)} className='myGlobalButton'>
                Shine Section
            </div>
            

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>Shine Section</DialogTitle>
                <DialogContent dividers>
                    <div style={{ padding: 20 }}>
                        <TextField
                            label="Heading"
                            variant="outlined"
                            fullWidth
                            value={shineData?.heading}
                            onChange={handleHeadingChange}
                            style={{ marginBottom: 20 }}
                        />

                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={shineData?.description}
                            onChange={handleDescriptionChange}
                            style={{ marginBottom: 20 }}
                            helperText={`${shineData?.description?.trim().split(/\s+/).length || 0}/130 words`}
                            error={(shineData?.description?.trim().split(/\s+/).length || 0) > 130}
                        />

                        <Grid container spacing={3}>

                            {shineData?.features && shineData?.features.length > 0 ? (
                                shineData?.features.map((feature, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={feature._id}>
                                        <Card elevation={3} style={{ padding: 16, marginBottom: 20 }}>
                                            <IconButton
                                                color="error"
                                                onClick={() => removeFeature(index)}
                                                style={{ marginBottom: 10 }}
                                            >
                                                <Delete />
                                            </IconButton>

                                            <TextField
                                                label="Feature Title"
                                                variant="outlined"
                                                fullWidth
                                                value={feature.title}
                                                onChange={(e) =>
                                                    handleFeatureChange(index, 'title', e.target.value)
                                                }
                                                style={{ marginBottom: 10 }}
                                            />

                                            <TextField
                                                label="Feature Description"
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={3}
                                                value={feature.description}
                                                onChange={(e) =>
                                                    handleFeatureChange(index, 'description', e.target.value)
                                                }
                                                style={{ marginBottom: 10 }}
                                                helperText={`${feature.description.trim().split(/\s+/).length}/130 words`}
                                                error={feature.description.trim().split(/\s+/).length > 130}
                                            />

                                            <ImageUpload
                                                feature={feature}
                                                handleFeatureChange={(field, value) =>
                                                    handleFeatureChange(index, field, value)
                                                }
                                                setImageUpload={setImageUpload}
                                                index={index}
                                            />

                                            {feature.image && (
                                                <img
                                                    src={feature.image}
                                                    alt={`Feature ${index}`}
                                                    style={{ width: '100%', marginBottom: 10 }}
                                                />
                                            )}
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <Typography variant="body1" color="textSecondary">
                                    No features available.
                                </Typography>
                            )}
                        </Grid>

                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={addFeature}
                            style={{ marginTop: 20, marginRight: 10 }}
                        >
                            Add Feature
                        </Button>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleUpdateShine();
                            setOpen(false);
                        }}
                        color="primary"
                        disabled={ImageUploads}
                    >
                        Update Shine Section
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ShineSectionUpdate;