import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { uploadImagesAPIV2 } from "../../../../ApiHooks/useHotelHook2";
import useUpdatePagesHook from "../../../../ApiHooks/useUpdatePagesHook";
import MultipleImageUpload from '../../../Components/MultipleImageUpload';
import {
  Button,
  Modal,
  Box,
  Typography,
  DialogActions,
  Tabs,
  Tab,
  TextField,
  Slider,
} from "@mui/material";
import { Edit, Delete, Save } from "lucide-react";

const Images = () => {
  const { galleryImages, addGalleryImages } = useUpdatePagesHook();
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [content, setContent] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  
  const [editingContent, setEditingContent] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);


  useEffect(() => {
    if ( galleryImages) {
      if (galleryImages.images) {
        setImages(galleryImages.images.map((img) => img));
      } else if (Array.isArray(galleryImages)) {
        setImages(galleryImages);
      }
      if (galleryImages.content) {
        setContent(galleryImages.content);
      }
    }
  }, [galleryImages]);

  const handleImagesUpload = async (selectedFiles) => {
    if (selectedFiles.length === 0) {
      toast.error("No images selected");
      return;
    }
    setIsUploading(true);
    try {
      const data = await uploadImagesAPIV2(selectedFiles);
      const uploadedUrls = Array.isArray(data) ? data : [data];
      // Assuming your API returns an object with imageUrls as an array.
      const newImageUrls = uploadedUrls[0].imageUrls;
      setImages((prev) => [...prev, ...newImageUrls]);
      toast.success("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Error uploading images");
    }
    setIsUploading(false);
  };

  const handleRemoveImageUrl = (url) => {
    setImages((prev) => prev.filter((img) => img !== url));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetContentForm();
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    resetContentForm();
  };

  const resetContentForm = () => {
    setEditingIndex(null);
    setEditingContent('');
    setHue(0);
    setSaturation(100);
    setLightness(50);
  };

  const getCurrentColor = () => {
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const handleAddOrUpdateContent = () => {
    if (!editingContent.trim()) {
      toast.error("Please enter some content");
      return;
    }

    const newItem = {
      type: "div",
      content: editingContent,
      bg: getCurrentColor(),
    };

    if (editingIndex !== null) {
      setContent((prev) =>
        prev.map((item, index) => (index === editingIndex ? newItem : item))
      );
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
    setEditingContent(item.content);
    // Optionally, convert the bg color back into HSL values if needed.
    setHue(0);
    setSaturation(100);
    setLightness(50);
  };

  const handleDeleteContent = (index) => {
    setContent((prev) => prev.filter((_, i) => i !== index));
    toast.success("Content deleted successfully!");
  };

  const handleSaveAll = async () => {
    try {
      // Create the payload matching the backend schema.
      const massonaryGrid = {
        images: images,     // Array of image URL strings
        content: content,   // Array of grid items
      };
      const payload = { massonaryGrid };
  
      console.log(payload); // Check the payload in the console
      await addGalleryImages(payload);
      toast.success("Gallery updated successfully!");
      handleClose();
    } catch (error) {
      console.error("Error saving gallery:", error);
      toast.error("Failed to update gallery");
    }
  };
  
  

  return (
    <div className="">
      <div className="myGlobalButton" onClick={handleOpen}>
        Edit Gallery
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="gallery-modal-title"
      >
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
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h5" id="gallery-modal-title">
              Edit Gallery
            </Typography>
            <Button
              variant="contained"
              onClick={handleSaveAll}
              startIcon={<Save size={18} />}
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
                  Image Gallery
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
                  {editingIndex !== null ? "Edit Content" : "Add New Content"}
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
                      <div className="space-y-2">
                        <div>
                          <Typography variant="caption">Hue</Typography>
                          <Slider
                            value={hue}
                            onChange={(e, value) => setHue(value)}
                            min={0}
                            max={360}
                          />
                        </div>
                        <div>
                          <Typography variant="caption">Saturation</Typography>
                          <Slider
                            value={saturation}
                            onChange={(e, value) => setSaturation(value)}
                            min={0}
                            max={100}
                          />
                        </div>
                        <div>
                          <Typography variant="caption">Lightness</Typography>
                          <Slider
                            value={lightness}
                            onChange={(e, value) => setLightness(value)}
                            min={0}
                            max={100}
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-4">
                        <div
                          className="w-24 h-24 rounded border"
                          style={{ backgroundColor: getCurrentColor() }}
                        />
                        <div className="space-x-2">
                          <Button
                            variant="contained"
                            onClick={handleAddOrUpdateContent}
                          >
                            {editingIndex !== null ? "Update" : "Add"}
                          </Button>
                          {editingIndex !== null && (
                            <Button
                              variant="outlined"
                              onClick={resetContentForm}
                            >
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
                          className={`p-4 rounded relative ${item.bg}`}
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
