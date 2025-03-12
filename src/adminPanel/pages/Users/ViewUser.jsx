/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable no-unsafe-optional-chaining */
import { useNavigate } from 'react-router-dom';
import { useDeleteAdminProfile, useEditAdminProfile } from '../../../ApiHooks/useAdminHooks'; // Adjust path
import Loader from '../../../Components/Loader';
import { useAdminContext } from '../../utils/AdminContext';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ViewUser = () => {
  const { adminProfile, profileLoading, profileError } = useAdminContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const { mutate: editProfile, isLoading: isEditingProfile } = useEditAdminProfile();
  const { mutate: deleteProfile, isLoading: isDeletingProfile } = useDeleteAdminProfile();
  const navigate = useNavigate();

  if (profileLoading) return <Loader />;
  if (profileError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h2 className="text-2xl font-semibold text-red-600 mb-2">Error Loading Profile</h2>
        <p className="text-gray-600">{profileError.message || 'Something went wrong. Please try again later.'}</p>
      </div>
    );
  }
  if (!adminProfile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Profile Not Found</h2>
        <p className="text-gray-600">Please check if the user exists or refresh the page.</p>
      </div>
    );
  }

  const { name, email, phone, role, gender, age, allowedCities, allowedHotels, createdAt, updatedAt } = adminProfile.data;

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setFormData({ name, email, phone, gender, age, allowedCities: allowedCities.join(','), allowedHotels: allowedHotels.join(',') });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedData = {
      ...formData,
      allowedCities: formData.allowedCities ? formData.allowedCities.split(',').map((city) => city.trim()) : [],
      allowedHotels: formData.allowedHotels ? formData.allowedHotels.split(',').map((hotel) => hotel.trim()) : [],
    };
    editProfile(updatedData, {
      onSuccess: () => {
        toast.success('Profile updated successfully');
        setIsEditing(false);
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to update profile');
      },
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      deleteProfile(null, {
        onSuccess: () => {
          toast.success('Profile deleted successfully');
          localStorage.removeItem('token');
          navigate('/admin/login');
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to delete profile');
        },
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-16 bg-gray-50 px-4">
      <div className="w-full max-w-2xl relative flex flex-col bg-white rounded-lg shadow-md border border-gray-200">
        <div className="bg-gray-100 px-8 py-6 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-4xl font-semibold text-gray-700">
            {name[0].toUpperCase()}
          </div>
          <h2 className="text-2xl font-semibold mt-4 text-gray-800">{name}</h2>
          <p className="text-sm font-medium text-gray-500 capitalize">{role}</p>
        </div>

        <div className="p-8 flex flex-col w-full gap-6 bg-gray-50">
          {isEditing ? (
            <>
              <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
              <InputField label="Email" name="email" value={formData.email} onChange={handleChange} />
              <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
              <InputField label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
              <InputField label="Age" name="age" value={formData.age} onChange={handleChange} type="number" />
              <InputField label="Allowed Cities (comma-separated)" name="allowedCities" value={formData.allowedCities} onChange={handleChange} />
              <InputField label="Allowed Hotels (comma-separated)" name="allowedHotels" value={formData.allowedHotels} onChange={handleChange} />
            </>
          ) : (
            <>
              <InfoRow label="Name" value={name} />
              <InfoRow label="Email" value={email} />
              <InfoRow label="Phone" value={phone} />
              <InfoRow label="Gender" value={gender} />
              <InfoRow label="Age" value={age} />
              <InfoRow label="Role" value={role} />
              <InfoRow label="Allowed Cities" value={allowedCities.join(', ') || 'None'} />
              <InfoRow label="Allowed Hotels" value={allowedHotels.join(', ') || 'None'} />
              <InfoRow label="Created At" value={new Date(createdAt).toLocaleDateString()} />
              <InfoRow label="Updated At" value={new Date(updatedAt).toLocaleDateString()} />
            </>
          )}
        </div>

        <div className="flex absolute right-0 justify-end p-6 gap-4 bg-gray-100">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isEditingProfile}
                className={`p-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center ${isEditingProfile ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <SaveIcon fontSize="small" />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 flex items-center"
              >
                <CancelIcon fontSize="small" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={toggleEdit}
                className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
              >
                <EditIcon fontSize="small" />
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeletingProfile}
                className={`px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center ${isDeletingProfile ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <DeleteIcon fontSize="small" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = 'text' }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-500 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between w-full items-center border-b last:border-0 pb-2">
    <span className="text-sm font-medium text-gray-500">{label}:</span>
    <span className="text-sm text-gray-800">{value}</span>
  </div>
);

export default ViewUser;