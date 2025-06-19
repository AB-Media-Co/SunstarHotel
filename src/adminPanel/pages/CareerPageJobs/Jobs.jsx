"use client"
import { useState } from "react";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Briefcase, 
  Sun, 
  Moon, 
  RotateCcw,
  Edit3,
  Trash2,
  Plus,
  Calendar,
  Award
} from "lucide-react";

import {
    useJobPosts,
    useCreateJobPost,
    useUpdateJobPost,
    useDeleteJobPost,
  } from "../../../ApiHooks/useJobPostHooks";
  
  

const initialForm = {
  jobTitle: "",
  salary: "",
  location: "",
  workingHours: "",
  jobType: "Full-Time",
  description: "",
  experienceRequired: false,
  experienceDetails: "",
  shift: "Day",
};

const Jobs = () => {
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const { data: jobs = [], isLoading } = useJobPosts();
  const { mutate: createJob } = useCreateJobPost();
  const { mutate: updateJob } = useUpdateJobPost();
  const { mutate: deleteJob } = useDeleteJobPost();

  const handleSubmit = () => {
    if (editingId) {
      updateJob({ ...form, _id: editingId });
    } else {
      createJob(form);
    }
    setForm(initialForm);
    setEditingId(null);
  };

  const handleEdit = (job) => {
    setForm(job);
    setEditingId(job._id);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this job?")) {
      deleteJob(id);
    }
  };

  const getJobTypeColor = (type) => {
    const colors = {
      'Full-Time': 'bg-green-100 text-green-800 border-green-200',
      'Part-Time': 'bg-blue-100 text-blue-800 border-blue-200',
      'Internship': 'bg-purple-100 text-purple-800 border-purple-200',
      'Contract': 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getShiftIcon = (shift) => {
    switch(shift) {
      case 'Day': return <Sun className="w-4 h-4" />;
      case 'Night': return <Moon className="w-4 h-4" />;
      case 'Rotational': return <RotateCcw className="w-4 h-4" />;
      default: return <Sun className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Job Postings
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Manage and create opportunities for talent
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 mb-12 border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {editingId ? "Edit Job Posting" : "Create New Job"}
            </h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Job Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior Software Engineer"
                  value={form.jobTitle}
                  onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Salary Range
                </label>
                <input
                  type="text"
                  placeholder="e.g. $80,000 - $120,000"
                  value={form.salary}
                  onChange={(e) => setForm({ ...form, salary: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. San Francisco, CA or Remote"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Working Hours
                </label>
                <input
                  type="text"
                  placeholder="e.g. 40 hours/week"
                  value={form.workingHours}
                  onChange={(e) => setForm({ ...form, workingHours: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Job Type</label>
                <select
                  value={form.jobType}
                  onChange={(e) => setForm({ ...form, jobType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                >
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Shift</label>
                <select
                  value={form.shift}
                  onChange={(e) => setForm({ ...form, shift: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                >
                  <option>Day</option>
                  <option>Night</option>
                  <option>Rotational</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Job Description</label>
              <textarea
                placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm resize-none"
              />
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="experience"
                  checked={form.experienceRequired}
                  onChange={(e) =>
                    setForm({ ...form, experienceRequired: e.target.checked })
                  }
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="experience" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Experience Required
                </label>
              </div>
              
              {form.experienceRequired && (
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="e.g. 3+ years in React/Vue.js"
                    value={form.experienceDetails}
                    onChange={(e) =>
                      setForm({ ...form, experienceDetails: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {editingId ? "Update Job Posting" : "Create Job Posting"}
            </button>
          </div>
        </div>

        {/* Job List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading amazing opportunities...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Current Openings</h2>
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {job.jobTitle}
                    </h3>
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getJobTypeColor(job.jobType)}`}>
                        {job.jobType}
                      </span>
                      <div className="flex items-center gap-1 text-gray-600">
                        {getShiftIcon(job.shift)}
                        <span className="text-xs font-medium">{job.shift} Shift</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(job)}
                      className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {job.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">{job.workingHours}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium">Apply Now</span>
                  </div>
                </div>

                {job.experienceRequired && (
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-orange-700">
                      <Award className="w-4 h-4" />
                      <span className="text-sm font-semibold">
                        Experience Required: {job.experienceDetails}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;