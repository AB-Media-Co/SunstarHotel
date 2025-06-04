import { useState, useRef } from 'react';
import { Mail as EmailIcon, Phone as PhoneIcon, Upload as FileUploadIcon } from 'lucide-react';

export default function SunstarCareersFormComponent() {
    const [formData, setFormData] = useState({
        fullName: '',
        currentCity: '',
        department: '',
        currentPosition: '',
        applyingPosition: '',
        email: '',
        mobileNo: '',
        resume: null
    });
    
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Check file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('File size exceeds 2MB limit');
                return;
            }
            
            setFormData(prevState => ({
                ...prevState,
                resume: file
            }));
            setFileName(file.name);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Log all form data including the file
        console.log('Form submitted:', {
            ...formData,
            resume: formData.resume ? {
                name: formData.resume.name,
                type: formData.resume.type,
                size: `${(formData.resume.size / 1024).toFixed(2)} KB`
            } : null
        });
        
        // In a real application, you would use FormData to handle file uploads
        const submitFormData = new FormData();
        for (const key in formData) {
            if (formData[key] !== null) {
                submitFormData.append(key, formData[key]);
            }
        }
        
        // Log the FormData object that would be sent to the server
        console.log('FormData created for submission');
        
        // Show success message
        alert('Thank you for your submission!');

        // Reset form
        setFormData({
            fullName: '',
            currentCity: '',
            department: '',
            currentPosition: '',
            applyingPosition: '',
            email: '',
            mobileNo: '',
            resume: null
        });
        setFileName('');
    };

    return (
        <div className="bg-primary-green">
            <p className="pt-28 pb-8 font-bold text-5xl text-white content">Join the Team</p>

            <div className="content bg-white rounded-2xl mx-auto py-12 flex flex-col md:flex-row gap-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {/* Form Section */}
                <div className="w-full px-4 md:w-2/3">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-700"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Current City */}
                            <div>
                                <label htmlFor="currentCity" className="block text-sm font-medium text-gray-400 mb-1">Current City</label>
                                <input
                                    type="text"
                                    id="currentCity"
                                    name="currentCity"
                                    value={formData.currentCity}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-700"
                                    required
                                />
                            </div>

                            {/* Department */}
                            <div>
                                <label htmlFor="department" className="block text-sm font-medium text-gray-400 mb-1">Department</label>
                                <input
                                    type="text"
                                    id="department"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-700"
                                    required
                                />
                            </div>
                        </div>

                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Current Position */}
                            <div>
                                <label htmlFor="currentPosition" className="block text-sm font-medium text-gray-400 mb-1">Current Position</label>
                                <input
                                    type="text"
                                    id="currentPosition"
                                    name="currentPosition"
                                    value={formData.currentPosition}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-700"
                                    required
                                />
                            </div>

                            {/* Applying For Which Position */}
                            <div>
                                <label htmlFor="applyingPosition" className="block text-sm font-medium text-gray-400 mb-1">Applying For Which Position</label>
                                <input
                                    type="text"
                                    id="applyingPosition"
                                    name="applyingPosition"
                                    value={formData.applyingPosition}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-700"
                                    required
                                />
                            </div>
                        </div>

                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-700"
                                    required
                                />
                            </div>

                            {/* Mobile No. */}
                            <div>
                                <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-400 mb-1">Mobile No.</label>
                                <input
                                    type="tel"
                                    id="mobileNo"
                                    name="mobileNo"
                                    value={formData.mobileNo}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-700"
                                    required
                                />
                            </div>
                        </div>

                        {/* Resume Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Upload resume, up to 2MB:</label>
                            <div className="flex items-start gap-4">
                                <div 
                                    onClick={triggerFileInput}
                                    className="border border-dashed border-gray-300 rounded-lg p-4 w-32 h-24 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
                                >
                                    <FileUploadIcon size={20} className="text-gray-400 mb-1" />
                                    <p className="text-xs text-gray-400 text-center">Upload file.<br />PDF, DOC,<br />DOCX</p>
                                </div>
                                
                                {fileName && (
                                    <div className="flex-1 flex items-center">
                                        <span className="text-sm text-gray-600 truncate max-w-full">{fileName}</span>
                                    </div>
                                )}
                                
                                <input
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept=".pdf,.doc,.docx"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end mt-8">
                            <button
                                type="submit"
                                className="bg-primary-yellow text-white font-medium py-3 px-8 rounded-lg hover:bg-opacity-90 transition shadow-md"
                            >
                                Submit Enquiry
                            </button>
                        </div>
                    </form>
                </div>

                {/* Help Section */}
                <div className="w-full px-4 md:w-1/3">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-2xl text-gray-500 font-medium mb-8">Need Help?</h3>
                        <p className="text-sm text-gray-400 mb-6">Contact our HR team with any questions about careers at Sunstar Hotels.</p>

                        <div className="space-y-6">
                            {/* Email Contact */}
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                    <EmailIcon size={16} className="text-primary-yellow" />
                                </div>
                                <a href="mailto:hr@sunstarhotels.com" className="text-primary-yellow font-medium">
                                    hr@sunstarhotels.com
                                </a>
                            </div>

                            {/* Phone Contact */}
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                    <PhoneIcon size={16} className="text-primary-yellow" />
                                </div>
                                <a href="tel:+914122560" className="text-primary-yellow font-medium">
                                    +91 11 4122 5601
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}