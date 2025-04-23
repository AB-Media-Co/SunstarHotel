/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  useDeleteUserProfileById,
  useEditUserProfileById,
  useChangePassword
} from '../../../ApiHooks/useAdminHooks'; // Adjust path as needed
import { useAdminContext } from '../../utils/AdminContext';

const AllUsers = () => {
  const { allUsers, isUsersLoading, usersError } = useAdminContext();
  const navigate = useNavigate();
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [changingPasswordUser, setChangingPasswordUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  const { mutate: editUser, isLoading: isEditing } = useEditUserProfileById();
  const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUserProfileById();
  const { mutate: changePassword, isLoading: isChangingPassword } = useChangePassword();

  if (isUsersLoading) {
    return <div className="text-center text-xl text-gray-500">Loading...</div>;
  }

  if (usersError) {
    return (
      <div className="text-center text-red-500">
        {usersError.message || 'Error loading users'}
      </div>
    );
  }

  const handleEditClick = (user) => {
    setEditingUser(user._id);
    setEditFormData({
      ...user,
      allowedCities: user.allowedCities.join(','),
      allowedHotels: user.allowedHotels.join(','),
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedData = {
      ...editFormData,
      allowedCities: editFormData.allowedCities
        ? editFormData.allowedCities.split(',').map((city) => city.trim())
        : [],
      allowedHotels: editFormData.allowedHotels
        ? editFormData.allowedHotels.split(',').map((hotel) => hotel.trim())
        : [],
    };
    editUser(
      { id: editingUser, updatedData },
      {
        onSuccess: () => {
          toast.success('User updated successfully');
          setEditingUser(null);
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to update user');
        },
      }
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id, {
        onSuccess: () => {
          toast.success('User deleted successfully');
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to delete user');
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-10 mx-auto p-6 pt-28 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold">All Users</h1>
        <button
          className="py-2 px-4 rounded-lg shadow-md transition-all duration-300 bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => navigate('/admin/create_user')}
        >
          Create User
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-md bg-white mt-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Allowed Cities
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Allowed Hotels
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.data?.map((user) => (
              <React.Fragment key={user._id}>
                <tr className="border-t hover:bg-[#ffff] transition duration-200">
                  {editingUser === user._id ? (
                    <>
                      <td className="px-6 py-4 text-sm">
                        <input
                          name="username"
                          value={editFormData.username}
                          onChange={handleEditChange}
                          className="border px-2 py-1 rounded-md"
                          disabled={isEditing}
                        />
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <input
                          name="phone"
                          value={editFormData.phone}
                          onChange={handleEditChange}
                          className="border px-2 py-1 rounded-md"
                          disabled={isEditing}
                        />
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <input
                          name="email"
                          value={editFormData.email}
                          onChange={handleEditChange}
                          className="border px-2 py-1 rounded-md"
                          disabled={isEditing}
                        />
                      </td>
                      <td className="px-6 py-4 text-sm capitalize">
                        <select
                          name="role"
                          value={editFormData.role}
                          onChange={handleEditChange}
                          className="border px-2 py-1 rounded-md"
                          disabled={isEditing}
                        >
                          <option value="superadmin">SuperAdmin</option>
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                          <option value="contentManager">Content Manager</option>
                          <option value="cityManager">City Manager</option>
                          <option value="hotelManager">Hotel Manager</option>
                          <option value="digitalMarketer">Digital Marketer</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <input
                          name="allowedCities"
                          value={editFormData.allowedCities}
                          onChange={handleEditChange}
                          className="border px-2 py-1 rounded-md"
                          disabled={isEditing}
                        />
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <input
                          name="allowedHotels"
                          value={editFormData.allowedHotels}
                          onChange={handleEditChange}
                          className="border px-2 py-1 rounded-md"
                          disabled={isEditing}
                        />
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm flex gap-2">
                        <button
                          onClick={handleSave}
                          className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 disabled:bg-green-400"
                          disabled={isEditing}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingUser(null)}
                          className="bg-gray-500 text-white px-4 py-1 rounded-md hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 capitalize text-sm font-medium text-gray-700">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-sm capitalize text-gray-700">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {user.allowedCities.join(', ') || 'None'}
                      </td>
                      <td className="px-6 py-4 capitalize text-sm text-gray-700">
                        {user.allowedHotels
                          .map((hotel) => hotel?.name)
                          .join(', ') || 'None'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm flex gap-2">
                        {/* Inline editing option (if needed) */}
                        {/* <button
                          onClick={() => handleEditClick(user)}
                          className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                        >
                          Edit
                        </button> */}
                        <button
                          onClick={() => setChangingPasswordUser(user._id)}
                          className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600"
                          disabled={isChangingPassword}
                        >
                          Change Password
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 disabled:bg-red-400"
                          disabled={isDeleting}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
                {/* Inline Change Password Row */}
                {changingPasswordUser === user._id && (
                  <tr className="bg-gray-100">
                    <td colSpan={8} className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                        {/* Current Password */}
                        <div className="flex flex-col gap-1 relative">
                          <label className="text-sm font-medium text-gray-700">Current Password</label>
                          <input
                            type={editFormData.showCurrent ? 'text' : 'password'}
                            placeholder="Enter current password"
                            value={editFormData.currentPassword || ''}
                            onChange={(e) =>
                              setEditFormData({ ...editFormData, currentPassword: e.target.value })
                            }
                            className="border border-gray-300 px-3 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isChangingPassword}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-500 hover:text-gray-800 text-sm"
                            onClick={() =>
                              setEditFormData({
                                ...editFormData,
                                showCurrent: !editFormData.showCurrent,
                              })
                            }
                          >
                            {editFormData.showCurrent ? 'Hide' : 'Show'}
                          </button>
                        </div>

                        {/* New Password */}
                        <div className="flex flex-col gap-1 relative">
                          <label className="text-sm font-medium text-gray-700">New Password</label>
                          <input
                            type={editFormData.showNew ? 'text' : 'password'}
                            placeholder="Enter new password"
                            value={editFormData.newPassword || ''}
                            onChange={(e) =>
                              setEditFormData({ ...editFormData, newPassword: e.target.value })
                            }
                            className="border border-gray-300 px-3 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isChangingPassword}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-500 hover:text-gray-800 text-sm"
                            onClick={() =>
                              setEditFormData({
                                ...editFormData,
                                showNew: !editFormData.showNew,
                              })
                            }
                          >
                            {editFormData.showNew ? 'Hide' : 'Show'}
                          </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-6 md:mt-0">
                          <button
                            onClick={() =>
                              changePassword(
                                {
                                  currentPassword: editFormData.currentPassword,
                                  newPassword: editFormData.newPassword,
                                },
                                {
                                  onSuccess: () => {
                                    toast.success('Password changed successfully');
                                    setChangingPasswordUser(null);
                                    setEditFormData({});
                                  },
                                  onError: (error) => {
                                    toast.error(error.message || 'Failed to change password');
                                  },
                                }
                              )
                            }
                            disabled={isChangingPassword}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-green-400"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setChangingPasswordUser(null);
                              setEditFormData({});
                            }}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}


              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
