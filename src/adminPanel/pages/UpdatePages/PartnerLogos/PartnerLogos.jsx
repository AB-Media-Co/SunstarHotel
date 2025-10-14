// src/pages/PartnerLogos.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import ImageUpload from '../../../Components/ImageUpload';
import {
  useAddPartner,
  useDeletePartner,
  useEditPartner,
  useGetPartners,
} from '../../../../ApiHooks/usePartnersHooks';

const PartnerLogos = () => {
  // open/close main popup
  const [openMain, setOpenMain] = useState(false);

  // list partners
  const { data: partners = [], isLoading, isError, refetch } = useGetPartners();

  // mutations
  const addPartner = useAddPartner();
  const editPartner = useEditPartner();
  const deletePartner = useDeletePartner();

  // local state for "add new"
  const [creating, setCreating] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [newPartner, setNewPartner] = useState({ image: '', description: '' });
  const [uploadingAdd, setUploadingAdd] = useState(false);

  // edit dialog state
  const [openEdit, setOpenEdit] = useState(false);
  const [current, setCurrent] = useState(null); // {_id, imageUrl, description}
  const [editModel, setEditModel] = useState({ image: '', description: '' });
  const [uploadingEdit, setUploadingEdit] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const resetCreate = () => {
    setNewPartner({ image: '', description: '' });
    setCreating(false);
  };

  const handleCreate = async () => {
    if (!newPartner.image?.trim() || !newPartner.description?.trim()) return;
    try {
      setCreateLoading(true);
      await addPartner.mutateAsync({
        imageUrl: newPartner.image.trim(),
        description: newPartner.description.trim(),
      });
      resetCreate();
      refetch();
    } catch (e) {
      console.error(e);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleOpenEdit = (p) => {
    setCurrent(p);
    setEditModel({ image: p.imageUrl || '', description: p.description || '' });
    setOpenEdit(true);
  };

  const handleSaveEdit = async () => {
    if (!current?._id) return;
    try {
      setEditLoading(true);
      await editPartner.mutateAsync({
        id: current._id,
        data: {
          imageUrl: editModel.image?.trim(),
          description: editModel.description?.trim(),
        },
      });
      setOpenEdit(false);
      setCurrent(null);
      refetch();
    } catch (e) {
      console.error(e);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePartner.mutateAsync(id);
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  // ImageUpload state handlers
  const handleCreateFieldChange = (field, value) =>
    setNewPartner((prev) => ({ ...prev, [field]: value }));

  const handleEditFieldChange = (field, value) =>
    setEditModel((prev) => ({ ...prev, [field]: value }));

  return (
    <Box>
      {/* This button opens the MAIN popup */}
      <div className="myGlobalButton" onClick={() => setOpenMain(true)}>
        Partner Logos
      </div>

      {/* MAIN POPUP: everything happens inside this dialog */}
      <Dialog open={openMain} onClose={() => setOpenMain(false)} fullWidth maxWidth="md">
        <DialogTitle>Partner Logos</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} mt={1}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Manage Partners
            </Typography>
            {!creating ? (
              <Button startIcon={<AddIcon />} variant="contained" onClick={() => setCreating(true)}>
                Add Partner
              </Button>
            ) : null}
          </Box>

          {/* Create / Add new card */}
          {creating && (
            <Card sx={{ mb: 3, p: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Add New Partner
                </Typography>

                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  minRows={2}
                  sx={{ mb: 2 }}
                  value={newPartner.description}
                  onChange={(e) => handleCreateFieldChange('description', e.target.value)}
                  disabled={createLoading || uploadingAdd}
                />

                <ImageUpload
                  feature={{ image: newPartner.image }}
                  handleFeatureChange={handleCreateFieldChange}
                  setImageUpload={setUploadingAdd}
                  index={0}
                />

                {newPartner.image ? (
                  <Box mt={2}>
                    <Typography variant="caption">Preview:</Typography>
                    <Box
                      component="img"
                      src={newPartner.image}
                      alt="preview"
                      sx={{
                        width: 160,
                        height: 90,
                        objectFit: 'cover',
                        border: '1px solid #ddd',
                        borderRadius: 1,
                      }}
                    />
                  </Box>
                ) : null}
              </CardContent>

              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button onClick={resetCreate} disabled={createLoading || uploadingAdd}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCreate}
                  disabled={
                    createLoading || uploadingAdd || !newPartner.image || !newPartner.description
                  }
                >
                  {createLoading ? <CircularProgress size={20} /> : 'Save'}
                </Button>
              </CardActions>
            </Card>
          )}

          {/* List */}
          {isLoading ? (
            <Box display="flex" alignItems="center" gap={1}>
              <CircularProgress size={22} />
              <Typography>Loading partners…</Typography>
            </Box>
          ) : isError ? (
            <Typography color="error">Failed to load partners</Typography>
          ) : partners.length === 0 ? (
            <Typography color="text.secondary">No partners added yet.</Typography>
          ) : (
            <Grid container spacing={2}>
              {partners.map((p, idx) => (
                <Grid item xs={12} sm={6} md={4} key={p._id || idx}>
                  <Card>
                    {p.imageUrl ? (
                      <CardMedia
                        component="img"
                        height="160"
                        image={p.imageUrl}
                        alt={p.description || 'Partner'}
                      />
                    ) : null}
                    <CardContent sx={{ minHeight: 80 }}>
                      <Typography variant="body2">{p.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button startIcon={<EditIcon />} onClick={() => handleOpenEdit(p)}>
                        Edit
                      </Button>
                      <Button
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => handleDelete(p._id)}
                        disabled={deletePartner.isPending}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenMain(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Nested Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Partner</DialogTitle>
        <DialogContent>
          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={2}
            sx={{ my: 2 }}
            value={editModel.description}
            onChange={(e) => handleEditFieldChange('description', e.target.value)}
            disabled={editLoading || uploadingEdit}
          />

          <ImageUpload
            feature={{ image: editModel.image }}
            handleFeatureChange={handleEditFieldChange}
            setImageUpload={setUploadingEdit}
            index={1}
          />

          {editModel.image ? (
            <Box mt={2}>
              <Typography variant="caption">Preview:</Typography>
              <Box
                component="img"
                src={editModel.image}
                alt="preview"
                sx={{ width: 160, height: 90, objectFit: 'cover', border: '1px solid #ddd', borderRadius: 1 }}
              />
            </Box>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} disabled={editLoading || uploadingEdit}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveEdit}
            disabled={editLoading || uploadingEdit || !editModel.description || !editModel.image}
          >
            {editLoading ? <CircularProgress size={22} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PartnerLogos;
