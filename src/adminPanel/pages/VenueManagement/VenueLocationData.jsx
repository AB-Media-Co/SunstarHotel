// components/VenueLocationData.jsx
import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, Search } from 'lucide-react';
import {
  useVenueLocations,
  useCreateVenueLocation,
  useUpdateVenueLocation,
  useDeleteVenueLocation,
} from '../../../ApiHooks/useVenueLocation.js';
import ImageUpload from '../../Components/ImageUpload'; // <- your uploader

const emptyForm = {
  name: '',
  description: '',
  imageUrl: '',
  mapUrl: '',
  website: '',
  phone: '',
  email: '',
  isActive: true,
  address: {
    line1: '',
    line2: '',
    area: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  },
};

export default function VenueLocationData() {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState('create'); // create | edit
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({ page: 1, limit: 10, search: '', active: 'true' });
  const [form, setForm] = useState(emptyForm);
  const [isImageUploading, setIsImageUploading] = useState(false); // <-- for disabling submit while upload

  const { data, isLoading, error } = useVenueLocations(filters);
  const createMutation = useCreateVenueLocation();
  const updateMutation = useUpdateVenueLocation();
  const deleteMutation = useDeleteVenueLocation();

  const items = data?.items ?? [];
  const pages = data?.pages ?? 1;

  const openCreate = () => {
    setMode('create');
    setSelected(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (row) => {
    setMode('edit');
    setSelected(row);
    setForm({
      name: row.name || '',
      description: row.description || '',
      imageUrl: row.imageUrl || '',
      mapUrl: row.mapUrl || '',
      website: row.website || '',
      phone: row.phone || '',
      email: row.email || '',
      isActive: row.isActive ?? true,
      address: {
        line1: row.address?.line1 || '',
        line2: row.address?.line2 || '',
        area: row.address?.area || '',
        city: row.address?.city || '',
        state: row.address?.state || '',
        postalCode: row.address?.postalCode || '',
        country: row.address?.country || 'India',
      },
    });
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
    setSelected(null);
    setForm(emptyForm);
    setIsImageUploading(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // minimal validation
    if (!form.name.trim()) return alert('Name is required');
    if (!form.address.city.trim()) return alert('City is required');
    if (!form.address.line1.trim()) return alert('Address line1 is required');

    if (isImageUploading) {
      alert('Please wait for image upload to complete');
      return;
    }

    if (mode === 'create') {
      createMutation.mutate(form, { onSuccess: onClose });
    } else {
      const idOrSlug = selected?._id || selected?.slug;
      updateMutation.mutate({ idOrSlug, updates: form }, { onSuccess: onClose });
    }
  };

  const onDelete = (row) => {
    if (window.confirm(`Delete "${row.name}"?`)) {
      deleteMutation.mutate(row._id || row.slug);
    }
  };

  const onFilterChange = (key, value) => {
    setFilters((p) => ({ ...p, [key]: value, page: 1 }));
  };

  const isSubmitting = isImageUploading || createMutation.isPending || updateMutation.isPending;

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">Failed to load venue locations: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Venue Location Data</h2>
          <p className="text-gray-600">{data?.total ?? 0} locations found</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Add Location
        </button>
      </div>

      {/* Search/Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              placeholder="Search name/city/area..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filters.active}
            onChange={(e) => onFilterChange('active', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">City</th>
                <th className="text-left px-4 py-3">Phone</th>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Active</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td className="px-4 py-6" colSpan={6}>Loading…</td></tr>
              ) : items.length === 0 ? (
                <tr><td className="px-4 py-6" colSpan={6}>No locations found</td></tr>
              ) : (
                items.map((row) => (
                  <tr key={row._id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="font-medium">{row.name}</div>
                      {row.address?.line1 && (
                        <div className="text-gray-500">{row.address.line1}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">{row.address?.city || '-'}</td>
                    <td className="px-4 py-3">{row.phone || '-'}</td>
                    <td className="px-4 py-3">{row.email || '-'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded ${
                        row.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {row.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => openEdit(row)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 border rounded mr-2 hover:bg-gray-50"
                      >
                        <Edit size={14} /> Edit
                      </button>
                      <button
                        onClick={() => onDelete(row)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 border rounded hover:bg-gray-50 text-red-600"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-center gap-2 p-4 border-t">
            <button
              onClick={() => setFilters((p) => ({ ...p, page: Math.max(1, p.page - 1) }))}
              disabled={filters.page === 1}
              className="px-3 py-1.5 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm">Page {filters.page} / {pages}</span>
            <button
              onClick={() => setFilters((p) => ({ ...p, page: Math.min(pages, p.page + 1) }))}
              disabled={filters.page === pages}
              className="px-3 py-1.5 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {mode === 'create' ? 'Add Venue Location' : 'Edit Venue Location'}
              </h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={22} />
              </button>
            </div>

            <form onSubmit={onSubmit} className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>

                {/* ✅ Image Upload (adapter: image <-> imageUrl) */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Venue Image</label>
                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <ImageUpload
                      feature={{ image: form.imageUrl }}                     // map current value
                      handleFeatureChange={(key, val) => {                   // map back to imageUrl
                        if (key === 'image') setForm((f) => ({ ...f, imageUrl: val }));
                      }}
                      setImageUpload={setIsImageUploading}                    // to disable submit while uploading
                      index={selected?._id || 'new'}
                    />

                    {/* Preview */}
                    {form.imageUrl && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Preview:</p>
                        <div className="relative inline-block">
                          <img
                            src={form.imageUrl}
                            alt="Venue preview"
                            className="w-full max-w-xs h-32 object-cover rounded-lg border shadow-sm"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                          <button
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, imageUrl: '' }))}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Address Line 1 *</label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    value={form.address.line1}
                    onChange={(e) => setForm((f) => ({ ...f, address: { ...f.address, line1: e.target.value } }))}
                    required
                  />
                </div>

             

                <div>
                  <label className="block text-sm font-medium mb-1">City *</label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    value={form.address.city}
                    onChange={(e) => setForm((f) => ({ ...f, address: { ...f.address, city: e.target.value } }))}
                    required
                  />
                </div>

             

                <div>
                  <label className="block text-sm font-medium mb-1">Postal Code</label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    value={form.address.postalCode}
                    onChange={(e) => setForm((f) => ({ ...f, address: { ...f.address, postalCode: e.target.value } }))}
                  />
                </div>

            

                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full border rounded px-3 py-2"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>


                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                    />
                    Active
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
