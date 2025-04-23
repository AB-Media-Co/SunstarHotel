// components/AdminMetaPanel.jsx
import React, { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Box,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import {
    useGetMetas,
    useAddMeta,
    useUpdateMeta,
    useDeleteMeta,
} from '../../../ApiHooks/useMetaHook';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const SeoMeta = () => {
    // Predefined pages for SEO meta entries
    const predefinedPages = [
        'home',
        'whysunstar',
        'corporatebooking',
        'contactus',
        'hotels',
        'rooms',
        'privacy policy',
        'blogs',
        'T&C and Cancellation policies',
        'Privacy policies',
        'Loyalty Program',
        'Coorporate Events',
        'Social Events',
        'Wedding Pre Wedding Events',
        // 'Coorporat Events',
    ];

    // Fetch existing meta entries
    const { data: metas, isLoading, isError } = useGetMetas();
    const addMetaMutation = useAddMeta();
    const updateMetaMutation = useUpdateMeta();
    const deleteMetaMutation = useDeleteMeta();

    // State for form fields
    const [formData, setFormData] = useState({
        id: '',
        page: '',
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '', // Comma-separated string
    });

    // Filter available pages for the dropdown.
    // If editing, allow the current page plus pages that don't have an entry.
    // If creating, only allow pages that don't already have a meta entry.
    const availablePages =
        metas && Array.isArray(metas)
            ? formData.id
                ? predefinedPages.filter(
                    (page) =>
                        page === formData.page ||
                        !metas.some((meta) => meta.page.toLowerCase() === page.toLowerCase())
                )
                : predefinedPages.filter(
                    (page) =>
                        !metas.some((meta) => meta.page.toLowerCase() === page.toLowerCase())
                )
            : predefinedPages;

    // Fill form when editing an entry
    const handleEdit = (meta) => {
        setFormData({
            id: meta._id,
            page: meta.page,
            metaTitle: meta.metaTitle,
            metaDescription: meta.metaDescription,
            metaKeywords: meta.metaKeywords.join(', '),
        });
    };

    // Clear form fields
    const handleClear = () => {
        setFormData({
            id: '',
            page: '',
            metaTitle: '',
            metaDescription: '',
            metaKeywords: '',
        });
    };

    // Handle form submission for create/update
    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert comma-separated keywords to an array
        const keywordsArray = formData.metaKeywords
            .split(',')
            .map((kw) => kw.trim())
            .filter(Boolean);

        const payload = {
            page: formData.page,
            metaTitle: formData.metaTitle,
            metaDescription: formData.metaDescription,
            metaKeywords: keywordsArray,
        };

        if (formData.id) {
            // Update existing meta entry
            updateMetaMutation.mutate({ id: formData.id, updateData: payload });
        } else {
            // Create a new meta entry
            addMetaMutation.mutate(payload);
        }
        handleClear();
    };

    // Handle deletion of an entry
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this meta entry?')) {
            deleteMetaMutation.mutate(id);
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                SEO Meta Admin Panel
            </Typography>
            {availablePages.length === 0 ? (
                <div className='text-lg text-red-500 my-10'>
                    All predefined  have a meta entry Please Edit  them Now.
                </div>
            ) : (
                <Paper sx={{ p: 2, mb: 4 }}>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {/* Predefined Pages Dropdown */}
                            <FormControl fullWidth required>
                                <InputLabel id="page-label">Page</InputLabel>
                                <Select
                                    labelId="page-label"
                                    id="page"
                                    value={formData.page}
                                    label="Page"
                                    onChange={(e) =>
                                        setFormData({ ...formData, page: e.target.value })
                                    }
                                >
                                    {availablePages.map((page) => (
                                        <MenuItem key={page} value={page}>
                                            {page}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                label="Meta Title"
                                value={formData.metaTitle}
                                onChange={(e) =>
                                    setFormData({ ...formData, metaTitle: e.target.value })
                                }
                                required
                            />
                            <TextField
                                label="Meta Description"
                                value={formData.metaDescription}
                                onChange={(e) =>
                                    setFormData({ ...formData, metaDescription: e.target.value })
                                }
                                required
                                multiline
                                rows={3}
                            />
                            <TextField
                                label="Meta Keywords (comma separated)"
                                value={formData.metaKeywords}
                                onChange={(e) =>
                                    setFormData({ ...formData, metaKeywords: e.target.value })
                                }
                            />
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button type="submit" variant="contained" color="primary">
                                    {formData.id ? 'Update Meta' : 'Add Meta'}
                                </Button>
                                <Button variant="outlined" onClick={handleClear}>
                                    Clear
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Paper>
            )

            }

            <Paper sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Existing Meta Entries
                </Typography>
                {isLoading ? (
                    <Typography>Loading...</Typography>
                ) : isError ? (
                    <Typography color="error">Error loading meta entries.</Typography>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Page</TableCell>
                                <TableCell>Meta Title</TableCell>
                                <TableCell>Meta Description</TableCell>
                                <TableCell>Meta Keywords</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {metas &&
                                metas.map((meta) => (
                                    <TableRow key={meta._id} className='capitalize'>
                                        <TableCell >{meta.page}</TableCell>
                                        <TableCell>{meta.metaTitle}</TableCell>
                                        <TableCell>{meta.metaDescription}</TableCell>
                                        <TableCell>{meta.metaKeywords.join(', ')}</TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleEdit(meta)}
                                                sx={{ mr: 1 }}
                                            >
                                                <ModeEditIcon/>
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleDelete(meta._id)}
                                            >
                                                <DeleteIcon/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                )}
            </Paper>
        </Container>
    );
};

export default SeoMeta;
