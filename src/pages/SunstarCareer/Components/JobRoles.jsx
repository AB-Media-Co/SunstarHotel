"use client"
import { useState, useEffect } from "react"
import { useJobPosts, useJobPostById } from "../../../ApiHooks/useJobPostHooks"
import { ArrowRight } from "lucide-react"

const JobRoles = () => {
    const { data: jobs = [], isLoading } = useJobPosts()
    const [selectedJobId, setSelectedJobId] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")

    // Set the first job as default selected
    useEffect(() => {
        if (!selectedJobId && jobs.length > 0) {
            setSelectedJobId(jobs[0]._id)
        }
    }, [jobs, selectedJobId])

    const { data: selectedJob } = useJobPostById(selectedJobId)


  
    return (
        <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen">
            {/* Search Bar */}
            <div className="mb-8">
                <div className="relative ">
                    <input
                        type="text"
                        placeholder="Search Open roles"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pr-12 h-12 text-lg border-b-2 border-primary-green rounded-none border-t-0 border-l-0 border-r-0 bg-transparent focus:border-blue-600 focus:ring-0 focus:outline-none"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-green  rounded-full h-8 w-8 flex items-center justify-center text-white">
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Job Listings */}
                <div className="space-y-4">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        jobs.map((job) => (
                            <div
                                key={job._id}
                                onClick={() => setSelectedJobId(job._id)}
                                className={`cursor-pointer transition-all duration-200 hover:shadow-md border rounded-lg p-4 ${selectedJobId === job._id
                                        ? "border-2 border-primary-green bg-blue-50"
                                        : "border border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                <h3
                                    className={`text-lg font-semibold ${selectedJobId === job._id ? "text-primary-green" : "text-gray-900"
                                        }`}
                                >
                                    {job.jobTitle}
                                </h3>

                                <div className="flex gap-2 mt-2">
                                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 text-sm rounded">Mid-Level</span>
                                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 text-sm rounded">{job.location}</span>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mt-2 line-clamp-2">{job.description}</p>

                            </div>
                        ))
                    )}
                </div>

                {/* Job Details */}
                <div className="lg:sticky lg:top-6">
                    {selectedJob ? (
                        <div className="border border-gray-200 rounded-lg bg-white p-6 space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{selectedJob.jobTitle}</h3>
                                <div className="flex gap-2 mt-3">
                                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 text-sm rounded">Mid-Level</span>
                                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 text-sm rounded">{selectedJob.location}</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Primary Responsibility:</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{selectedJob.description}</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Job Specification:</h3>
                                <ul className="space-y-1">
                                    <li className="text-gray-600 text-sm flex items-start">
                                        <span className="text-gray-400 mr-2 mt-1">•</span>
                                        <span className="leading-relaxed">Strong interpersonal and communication skills</span>
                                    </li>
                                    <li className="text-gray-600 text-sm flex items-start">
                                        <span className="text-gray-400 mr-2 mt-1">•</span>
                                        <span className="leading-relaxed">Ability to remain calm and professional under pressure</span>
                                    </li>
                                    <li className="text-gray-600 text-sm flex items-start">
                                        <span className="text-gray-400 mr-2 mt-1">•</span>
                                        <span className="leading-relaxed">
                                            Proficiency in using hotel management software (e.g., Opera, IDS, PMS)
                                        </span>
                                    </li>
                                    <li className="text-gray-600 text-sm flex items-start">
                                        <span className="text-gray-400 mr-2 mt-1">•</span>
                                        <span className="leading-relaxed">
                                            Knowledge of customer service principles and hospitality standards
                                        </span>
                                    </li>
                                    <li className="text-gray-600 text-sm flex items-start">
                                        <span className="text-gray-400 mr-2 mt-1">•</span>
                                        <span className="leading-relaxed">
                                            Ability to handle guest complaints and resolve issues effectively
                                        </span>
                                    </li>
                                    <li className="text-gray-600 text-sm flex items-start">
                                        <span className="text-gray-400 mr-2 mt-1">•</span>
                                        <span className="leading-relaxed">Fluency in English (additional languages are a plus)</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Employment Type:</h3>
                                <p className="text-gray-600 text-sm">{selectedJob.jobType || "Full-time"}</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Salary:</h3>
                                <p className="text-gray-600 text-sm">
                                    {selectedJob.salary || "Commensurate with experience and skills"}
                                </p>
                            </div>

                            {selectedJob.experienceRequired && (
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Experience Required:</h3>
                                    <p className="text-gray-600 text-sm">{selectedJob.experienceDetails || "Minimum 3 Years"}</p>
                                </div>
                            )}

                            <div className="pt-4">
                                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-full">
                                    Submit Enquiry
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-500 text-center border rounded-lg p-6">
                            <p>Select a job to view details.</p>
                        </div>
                    )}
                </div>

                
            </div>
        </div>
    )
}

export default JobRoles
