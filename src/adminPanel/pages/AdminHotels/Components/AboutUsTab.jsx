/* eslint-disable react/prop-types */
import ImageUpload from "../../../Components/ImageUpload";

export const AboutUsTab = ({ formData, handleAboutUsChange, handleAboutUsFeatureChange }) => (
    <div className="space-y-5">
      <div>
        <label className="block text-gray-700 font-medium mb-1">About Us Description:</label>
        <textarea
          name="description"
          value={formData.aboutUs.description}
          onChange={handleAboutUsChange}
          placeholder="Enter about us description"
          className="w-full md:h-[180px] border rounded-md p-3 focus:ring focus:ring-blue-200"
        ></textarea>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">About Us Image:</label>
        <ImageUpload
          feature={formData.aboutUs}
          handleFeatureChange={handleAboutUsFeatureChange}
          setImageUpload={() => {}}
          index={0}
        />
      </div>
    </div>
  );