import MultipleImageUpload from "../../../Components/MultipleImageUpload";

export const ImagesTab = ({ formData, isUploading, handleImagesUpload, handleRemoveImageUrl }) => (
    <div className="space-y-5">
      <MultipleImageUpload
        onUploadSuccess={handleImagesUpload}
        isUploading={isUploading}
        imagesUrls={formData.images}
        onRemoveImageUrl={handleRemoveImageUrl}
      />
    </div>
  );