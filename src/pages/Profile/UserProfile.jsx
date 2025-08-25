import React, { useEffect, useState } from 'react';
import { User, Star, Calendar, Phone, Mail, MapPin, FileText, MessageCircle, Shield, HelpCircle, Edit2, Save, X, Menu, ChevronDown } from 'lucide-react';
import { usePricing } from '../../Context/PricingContext';
import { useGetUserByEmail, useUpdateUserProfile } from '../../ApiHooks/useUser';
import Bookings from './Bookings';
import LoyaltyMain from './LoyaltyProgram/LoyaltyMain';
import { useLocation } from 'react-router-dom';
import AgentDashboard from './AgentDashboard';
import { useGetAgentByEmail } from '../../ApiHooks/useAgentHook';
import CorporateDashboard from './CorporateDashboard';

const UserProfile = () => {
  const location = useLocation();
  const initialTab = location.state?.tab ?? 'profile';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [editingField, setEditingField] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { setIsNavColor } = usePricing()

  const userInfo = localStorage.getItem('user_email');

  const { data: agentRec, isLoading: loadingAgent } = useGetAgentByEmail(userInfo);
  const isAgent = !!agentRec && agentRec?.role === 'agent';
  const isApproved = agentRec?.approved ?? false;

  const isCorporate = !!agentRec && agentRec?.role === 'corporate';
  const isCorpApproved = agentRec?.approved ?? false;

  const { data: userData } = useGetUserByEmail(userInfo);
  console.log(userData)
  const { mutate: updateUserProfile } = useUpdateUserProfile();

  useEffect(() => {
    setIsNavColor(true);

    return () => {
      setIsNavColor(false); // ✅ Reset when leaving the page
    };
  }, [setIsNavColor])

  const [profileData, setProfileData] = useState({
    legalName: '',
    email: '',
    mobile: '',
    dateOfBirth: '',
    gender: '',
    cityOfResidence: '',
  });

  useEffect(() => {
    if (userData?.data) {
      const { firstName, lastName, email, phone, dateOfBirth, gender, cityOfResidence } = userData.data;

      setProfileData({
        legalName: `${firstName || ''} ${lastName || ''}`.trim(),
        email: email || '',
        mobile: phone ? `+91 - ${phone}` : '',
        dateOfBirth: dateOfBirth || '',
        gender: gender || '',
        cityOfResidence: cityOfResidence || '',
      });
    }
  }, [userData]);

  const [tempData, setTempData] = useState({});

  // Define available tabs based on user permissions
  const getAvailableTabs = () => {
    const tabs = [
      { id: 'loyalty', label: 'Loyalty', icon: Star },
      { id: 'bookings', label: 'Bookings', icon: Calendar },
      { id: 'profile', label: 'Profile', icon: User },
    ];

    if (!loadingAgent && isAgent && isApproved) {
      tabs.push({ id: 'agent', label: 'Agent', icon: Shield });
    }

    if (!loadingAgent && isCorporate && isCorpApproved) {
      tabs.push({ id: 'corporate', label: 'Corporate', icon: Shield });
    }

    return tabs;
  };

  const availableTabs = getAvailableTabs();
  const currentTab = availableTabs.find(tab => tab.id === activeTab) || availableTabs[0];

  const handleEdit = (field) => {
    setEditingField(field);
    setTempData({ [field]: profileData[field] });
  };

  const handleSave = (field) => {
    const newValue = tempData[field];

    if (newValue === profileData[field] || newValue.trim() === '') {
      setEditingField(null);
      setTempData({});
      return;
    }

    const updatedField = { ...profileData, [field]: newValue };

    setProfileData(updatedField);
    setEditingField(null);
    setTempData({});

    updateUserProfile(updatedField);
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempData({});
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setDropdownOpen(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'loyalty':
        return (
          <LoyaltyMain onViewAll={() => setActiveTab('bookings')} />
        );

      case 'bookings':
        return <Bookings />;

      case 'corporate':
        if (loadingAgent) return <div className="p-4">Loading corporate data...</div>;
        if (!isCorporate) return <div className="p-4 text-red-600">Not authorized as Corporate.</div>;
        if (!isCorpApproved) return <div className="p-4">Your corporate account is pending approval.</div>;
        return <CorporateDashboard />;

      case 'agent':
        if (loadingAgent) return <div className="p-4">Loading agent data...</div>;
        if (!isAgent) return <div className="p-4 text-red-600">Not authorized as Agent.</div>;
        if (!isApproved) return <div className="p-4">Your agent account is pending approval.</div>;
        return <AgentDashboard />;
      case 'profile':
      default:
        return (
          <div className="space-y-6">
            {/* Legal Name */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Legal Name</h3>
                {editingField === 'legalName' ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={tempData.legalName || ''}
                      onChange={(e) => setTempData({ ...tempData, legalName: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 flex-1 min-w-0"
                    />
                    <button
                      onClick={() => handleSave('legalName')}
                      className="text-teal-500 hover:text-teal-600 p-1"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-500 hover:text-gray-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-800 break-words">{profileData.legalName}</p>
                )}
              </div>
              {editingField !== 'legalName' && (
                <button
                  onClick={() => handleEdit('legalName')}
                  className="text-teal-500 hover:text-teal-600 text-sm font-medium self-start sm:self-center"
                >
                  Edit
                </button>
              )}
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Email Address */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Email Address</h3>
                {editingField === 'email' ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="email"
                      value={tempData.email || ''}
                      onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 flex-1 min-w-0"
                    />
                    <button
                      onClick={() => handleSave('email')}
                      className="text-teal-500 hover:text-teal-600 p-1"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-500 hover:text-gray-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-800 break-words">{profileData.email}</p>
                )}
              </div>
              {editingField !== 'email' && (
                <button
                  onClick={() => handleEdit('email')}
                  className="text-teal-500 hover:text-teal-600 text-sm font-medium self-start sm:self-center"
                >
                  Edit
                </button>
              )}
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Mobile Number */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Mobile Number</h3>
                {editingField === 'mobile' ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="tel"
                      value={tempData.mobile || ''}
                      onChange={(e) => setTempData({ ...tempData, mobile: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 flex-1 min-w-0"
                    />
                    <button
                      onClick={() => handleSave('mobile')}
                      className="text-teal-500 hover:text-teal-600 p-1"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-500 hover:text-gray-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-800 break-words">{profileData.mobile}</p>
                )}
              </div>
              {editingField !== 'mobile' && (
                <button
                  onClick={() => handleEdit('mobile')}
                  className="text-teal-500 hover:text-teal-600 text-sm font-medium self-start sm:self-center"
                >
                  Edit
                </button>
              )}
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Date of Birth */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Date of Birth</h3>
                {editingField === 'dateOfBirth' ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="date"
                      value={tempData.dateOfBirth || ''}
                      onChange={(e) => setTempData({ ...tempData, dateOfBirth: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 flex-1 min-w-0"
                    />
                    <button
                      onClick={() => handleSave('dateOfBirth')}
                      className="text-teal-500 hover:text-teal-600 p-1"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-500 hover:text-gray-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <p className={`break-words ${profileData.dateOfBirth ? "text-gray-800" : "text-gray-400"}`}>
                    {profileData.dateOfBirth || "Date of Birth"}
                  </p>
                )}
              </div>
              {editingField !== 'dateOfBirth' && (
                <button
                  onClick={() => handleEdit('dateOfBirth')}
                  className="text-teal-500 hover:text-teal-600 text-sm font-medium self-start sm:self-center"
                >
                  Edit
                </button>
              )}
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Gender */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Gender</h3>
                {editingField === 'gender' ? (
                  <div className="flex items-center space-x-2">
                    <select
                      value={tempData.gender || ''}
                      onChange={(e) => setTempData({ ...tempData, gender: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 flex-1 min-w-0"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <button
                      onClick={() => handleSave('gender')}
                      className="text-teal-500 hover:text-teal-600 p-1"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-500 hover:text-gray-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <p className={`break-words ${profileData.gender ? "text-gray-800" : "text-gray-400"}`}>
                    {profileData.gender || "Gender"}
                  </p>
                )}
              </div>
              {editingField !== 'gender' && (
                <button
                  onClick={() => handleEdit('gender')}
                  className="text-teal-500 hover:text-teal-600 text-sm font-medium self-start sm:self-center"
                >
                  Edit
                </button>
              )}
            </div>

            <div className="border-t border-gray-200"></div>

            {/* City of Residence */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 mb-1">City of Residence</h3>
                {editingField === 'cityOfResidence' ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={tempData.cityOfResidence || ''}
                      onChange={(e) => setTempData({ ...tempData, cityOfResidence: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 flex-1 min-w-0"
                      placeholder="Enter your city"
                    />
                    <button
                      onClick={() => handleSave('cityOfResidence')}
                      className="text-teal-500 hover:text-teal-600 p-1"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-500 hover:text-gray-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <p className={`break-words ${profileData.cityOfResidence ? "text-gray-800" : "text-gray-400"}`}>
                    {profileData.cityOfResidence || "City of Residence"}
                  </p>
                )}
              </div>
              {editingField !== 'cityOfResidence' && (
                <button
                  onClick={() => handleEdit('cityOfResidence')}
                  className="text-teal-500 hover:text-teal-600 text-sm font-medium self-start sm:self-center"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        );
    }
  };

  const handleLogout = () => {
    // ✅ Clear localStorage
    localStorage.clear();

    // ✅ Clear sessionStorage
    sessionStorage.clear();

    // ✅ Clear all cookies
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    });

    // ✅ (Optional) Invalidate cache if using service workers
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach(name => caches.delete(name));
      });
    }

    // ✅ Redirect to homepage or login
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="content mt-16 sm:mt-20 mx-auto px-4 sm:px-6">
        {/* Mobile Dropdown */}
        <div className="lg:hidden mb-4 pt-6 mt-4">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-between w-full text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm border"
            >
              <div className="flex items-center space-x-2">
                <currentTab.icon className="w-5 h-5" />
                <span>{currentTab.label}</span>
              </div>
              <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {availableTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`w-full flex items-center space-x-2 px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-green text-white hover:bg-primary-green'
                        : 'text-gray-700'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-6 min-h-[calc(100vh-120px)]">
          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Left Sidebar */}
          <div className={`
            fixed lg:sticky lg:top-0 top-0 left-0 h-full lg:h-auto
            w-80 max-w-[90vw] bg-white lg:bg-transparent
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            z-50 lg:z-auto overflow-y-auto
          `}>
            <div className="p-4 lg:p-0 space-y-4">
              {/* Close button for mobile */}
              <div className="lg:hidden flex justify-end">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div>
                {/* Illustration */}
                <div className="hidden lg:block">
                  <img src="/images/loyalty-illustration.svg" alt="" className='mx-auto' />
                </div>

                {/* Account Details */}
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="p-4 border-b">
                    <h3 className="font-medium text-gray-800">Account Details</h3>
                    <p className="text-sm text-gray-500 truncate">{profileData.email}</p>
                  </div>

                  <div className="space-y-1">
                    {availableTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary-green text-white'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <tab.icon className="w-5 h-5" />
                        <span className={activeTab === tab.id ? 'font-medium' : ''}>{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Need Help Section */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-800 mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <a
                    href="mailto:booking@sunstarhospitality.com"
                    className="flex items-center space-x-2 text-primary-green hover:text-primary-green"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm break-all">booking@sunstarhospitality.com</span>
                  </a>
                  <a
                    href="tel:+91-9310831646"
                    className="flex items-center space-x-2 text-primary-green hover:text-primary-green"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">+91-91 9310831646</span>
                  </a>
                </div>
              </div>

              {/* Footer Links */}
              <div className="space-y-2 text-sm text-gray-600">
                <a href='/terms-conditions&cancellation' className="block hover:text-gray-800 transition-colors">
                  Cancellation Policy
                </a>
                <a href='/terms-conditions&cancellation' className="block hover:text-gray-800 transition-colors">
                  Terms & Conditions
                </a>
                <a href='/privacy-policies' className="block hover:text-gray-800 transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white my-6 hotelSelection rounded-lg p-4 sm:p-6 overflow-y-auto max-h-full">
            {renderTabContent()}

            {/* Bottom Section - Only show on profile tab */}
            {activeTab === 'profile' && (
              <div className="mt-12 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <HelpCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">Having trouble with your profile? Contact Support</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-primary-green hover:bg-primary-green text-white px-6 py-2 rounded-md text-sm font-medium transition-colors self-start sm:self-center"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;