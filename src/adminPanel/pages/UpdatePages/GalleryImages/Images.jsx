import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { uploadImagesAPIV2 } from "../../../../ApiHooks/useHotelHook2";
import useUpdatePagesHook from "../../../../ApiHooks/useUpdatePagesHook";
import MultipleImageUpload from "../../../Components/MultipleImageUpload";
import {
  Button,
  Modal,
  Box,
  Typography,
  DialogActions,
  Tabs,
  Tab,
  TextField,
  MenuItem,
} from "@mui/material";
import { Edit, Delete, Save } from "lucide-react";

const pathOptions = [
  { value: "default", label: "Default (Global)" },
  { value: "travelAgent", label: "Travel Agent" },
  { value: "career", label: "Career" },
];

const Images = () => {
  const { galleryImages, addGalleryImages } = useUpdatePagesHook();

  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [content, setContent] = useState([]);

  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [editingContent, setEditingContent] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#ffffff");

  // NEW: selected path (default / travelAgent / career)
  const [path, setPath] = useState("default");

  const predefinedColors = [
    "#4DB8B6",
    "#4DD0E2",
    "#C4C4C4",
    "#FDD304",
    "#F1B300",
    "#FFE566",
    "#FFE359",
    "#00E0FF",
    "#BDD9D8",
  ];

  // hydrate images/content for the selected path
  useEffect(() => {
    if (!galleryImages) return;

    const gridForPath =
      galleryImages?.[path] || // preferred path
      galleryImages?.default || // fallback to default
      galleryImages;            // legacy shape

    const imgs = Array.isArray(gridForPath?.images) ? gridForPath.images : [];
    const cnt = Array.isArray(gridForPath?.content) ? gridForPath.content : [];

    setImages(imgs);
    setContent(cnt);
  }, [galleryImages, path]);


  const handleImagesUpload = async (selectedFiles) => {
    if (selectedFiles.length === 0) {
      toast.error("No images selected");
      return;
    }
    setIsUploading(true);
    try {
      const data = await uploadImagesAPIV2(selectedFiles);
      const uploaded = Array.isArray(data) ? data : [data];
      const newImageUrls = uploaded[0].imageUrls || [];
      setImages((prev) => [...prev, ...newImageUrls]);
      toast.success("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Error uploading images");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImageUrl = (url) => {
    setImages((prev) => prev.filter((img) => img !== url));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetContentForm();
  };

  const handleTabChange = (_e, newValue) => {
    setActiveTab(newValue);
    resetContentForm();
  };

  const resetContentForm = () => {
    setEditingIndex(null);
    setEditingContent("");
    setSelectedColor("#ffffff");
  };

  const handleAddOrUpdateContent = () => {
    if (!editingContent.trim()) {
      toast.error("Please enter some content");
      return;
    }

    const newItem = { type: "div", content: editingContent, bg: selectedColor };

    if (editingIndex !== null) {
      setContent((prev) => prev.map((it, i) => (i === editingIndex ? newItem : it)));
      toast.success("Content updated successfully!");
    } else {
      setContent((prev) => [...prev, newItem]);
      toast.success("Content added successfully!");
    }

    resetContentForm();
  };

  const handleEditContent = (index) => {
    const item = content[index];
    setEditingIndex(index);
    setEditingContent(item.content || "");
    setSelectedColor(item.bg || "#ffffff");
  };

  const handleDeleteContent = (index) => {
    setContent((prev) => prev.filter((_, i) => i !== index));
    toast.success("Content deleted successfully!");
  };

  const handleSaveAll = async () => {
    try {
      const massonaryGrid = { images, content };
      const payload = { massonaryGrid, path }; // <-- include path

      await addGalleryImages(payload);
      toast.success(`Gallery updated for "${path}"!`);
      handleClose();
    } catch (error) {
      console.error("Error saving gallery:", error);
      toast.error("Failed to update gallery");
    }
  };

  return (
    <div>
      <div className="myGlobalButton" onClick={handleOpen}>
        Edit Gallery
      </div>

      <Modal open={open} onClose={handleClose} aria-labelledby="gallery-modal-title">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1400,
            height: 700,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflow: "auto",
          }}
        >
          {/* Header Row */}
          <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">
            <Typography variant="h5" id="gallery-modal-title">
              Edit Gallery
            </Typography>

            {/* Path selector */}
            <TextField
              select
              size="small"
              label="Path"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              sx={{ minWidth: 220 }}
              helperText="Choose grid scope (keeps data separate)"
            >
              {pathOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>

            <Button
              variant="contained"
              onClick={handleSaveAll}
              startIcon={<Save size={18} />}
              disabled={isUploading}
            >
              Save All Changes
            </Button>

          </div>

          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Upload Images" />
            <Tab label="Manage Content" />
          </Tabs>

          <div className="mt-4">
            {activeTab === 0 && (
              <div>
                <Typography variant="h6" className="mb-4">
                  Image Gallery ({path})
                </Typography>
                <MultipleImageUpload
                  onUploadSuccess={handleImagesUpload}
                  isUploading={isUploading}
                  imagesUrls={images}
                  onRemoveImageUrl={handleRemoveImageUrl}
                />
              </div>
            )}

            {activeTab === 1 && (
              <div>
                <Typography variant="h6" className="mb-4">
                  {editingIndex !== null ? "Edit Content" : "Add New Content"} ({path})
                </Typography>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      placeholder="Enter your content here..."
                    />

                    <div>
                      <Typography>Color</Typography>
                      <div className="flex gap-2 mt-2">
                        {predefinedColors.map((color) => (
                          <div
                            key={color}
                            className={`w-8 h-8 rounded-full cursor-pointer border-2 ${selectedColor === color ? "border-black" : "border-transparent"
                              }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setSelectedColor(color)}
                          />
                        ))}
                      </div>

                      <div className="mt-4 flex items-center gap-4">
                        <div className="w-24 h-24 rounded border" style={{ backgroundColor: selectedColor }} />
                        <div className="space-x-2">
                          <Button variant="contained" onClick={handleAddOrUpdateContent}>
                            {editingIndex !== null ? "Update" : "Add"}
                          </Button>
                          {editingIndex !== null && (
                            <Button variant="outlined" onClick={resetContentForm}>
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-l pl-4">
                    <Typography variant="h6" className="mb-4">
                      Existing Content
                    </Typography>
                    <div className="space-y-4">
                      {content.map((item, index) => (
                        <div
                          key={index}
                          className="p-4 rounded relative"
                          style={{ backgroundColor: item.bg }}
                        >
                          <p>{item.content}</p>
                          <div className="absolute top-2 right-2 flex gap-2">
                            <button
                              onClick={() => handleEditContent(index)}
                              className="p-1 hover:bg-black/10 rounded"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteContent(index)}
                              className="p-1 hover:bg-black/10 rounded"
                            >
                              <Delete size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Box>
      </Modal>
    </div>
  );
};

export default Images;
