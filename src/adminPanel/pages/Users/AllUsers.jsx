/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../utils/AdminContext";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDeleteUserProfileById, useEditUserProfileById } from "../../../ApiHooks/useAdminHooks";

const AllUsers = () => {
    const { allUsers, isUsersLoading, usersError } = useAdminContext();
    // console.log(allUsers,"alll")
    const navigate = useNavigate();

    const [editingUser, setEditingUser] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const { mutate: editUser, isLoading: isEditing } = useEditUserProfileById();
    const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUserProfileById();

    if (isUsersLoading) {
        return <div className="text-center text-xl text-gray-500">Loading...</div>;
    }

    if (usersError) {
        return <div className="text-center text-red-500">{usersError}</div>;
    }

    const handleEditClick = (user) => {
        setEditingUser(user.id);
        setEditFormData({ ...user });
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        editUser(
            { id: editingUser, updatedData: editFormData },
            {
                onSuccess: (data) => {
                    toast.success(data.message);
                    setEditingUser(null);
                }
            }
        );
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            deleteUser(id, {
                onSuccess: () => {
                    toast.success("User deleted successfully!");
                }
            });
        }
    };

    return (
        <div className="flex flex-col gap-10 mx-auto p-6 pt-28 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-extrabold">All Users</h1>
                <button
                    className="py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                    onClick={() => navigate("/admin/create_user")}
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
                                Created At
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                Updated At
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers?.data?.map((user) => (
                            <tr
                                key={user.id}
                                className="border-t hover:bg-[#ffff] transition duration-200"
                            >
                                {editingUser === user.id ? (
                                    <>
                                        <td className="px-6 py-4 text-sm">
                                            <input
                                                name="username"
                                                value={editFormData.username}
                                                onChange={handleEditChange}
                                                className="border px-2 py-1 rounded-md"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <input
                                                name="phone"
                                                value={editFormData.phone}
                                                onChange={handleEditChange}
                                                className="border px-2 py-1 rounded-md"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <input
                                                name="email"
                                                value={editFormData.email}
                                                onChange={handleEditChange}
                                                className="border px-2 py-1 rounded-md"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-sm capitalize">
                                            <select
                                                name="role"
                                                value={editFormData.role}
                                                onChange={handleEditChange}
                                                className="border px-2 py-1 rounded-md"
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="editor">Editor</option>
                                                <option value="viewer">Viewer</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            {new Date(user.updatedAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm flex gap-2">
                                            <button
                                                onClick={handleSave}
                                                className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
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
                                        <td className="px-6 py-4 text-sm font-medium text-gray-700">
                                            {user.username}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {user.phone}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 text-sm capitalize text-gray-700">
                                            {user.role}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {new Date(user.updatedAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm flex gap-2">
                                            <button
                                                onClick={() => handleEditClick(user)}
                                                className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                                                disabled={isDeleting}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
