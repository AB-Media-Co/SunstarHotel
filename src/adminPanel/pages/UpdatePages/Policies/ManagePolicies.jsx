import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useGetPolicy, useUpdatePolicy } from '../../../../ApiHooks/usePolicies';

const ManagePolicies = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('terms-conditions');
  const { data, isLoading, error } = useGetPolicy(activeTab);
  const [content, setContent] = useState('');
  const updatePolicy = useUpdatePolicy();

  
  useEffect(() => {
    if (data?.content) {
      setContent(data.content);
    } else {
      setContent('');
    }
  }, [data]);

  const handleSave = () => {
    updatePolicy.mutate({ type: activeTab, content });
  };

  return (
    <>
      <button
        className="myGlobalButton"
        onClick={() => setIsOpen(true)}
      >
        Manage Policies
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[90vw] max-w-3xl rounded-lg p-6 shadow-lg">
            <div className="flex border-b mb-4 items-center">
              <button
                onClick={() => setActiveTab('terms-conditions')}
                className={`px-4 py-2 font-semibold ${
                  activeTab === 'terms-conditions' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
                }`}
              >
                Terms & Conditions
              </button>
              <button
                onClick={() => setActiveTab('privacy-policy')}
                className={`ml-4 px-4 py-2 font-semibold ${
                  activeTab === 'privacy-policy' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
                }`}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto text-red-600 font-bold text-xl hover:text-red-800"
                aria-label="Close Modal"
              >
                &times;
              </button>
            </div>

            {isLoading && <p>Loading content...</p>}
            {error && <p className="text-red-600">Error loading content.</p>}

            {!isLoading && !error && (
              <>
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link', 'clean']
                    ],
                  }}
                  formats={[
                    'header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link'
                  ]}
                  style={{ maxHeight: '300px', marginBottom: '20px', overflow:"auto" }}
                />

                <button
                  onClick={handleSave}
                  disabled={updatePolicy.isLoading}
                  className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
                >
                  {updatePolicy.isLoading ? 'Saving...' : 'Save'}
                </button>

                {updatePolicy.isError && <p className="text-red-600 mt-2">Failed to save. Please try again.</p>}
                {updatePolicy.isSuccess && <p className="text-green-600 mt-2">Saved successfully!</p>}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ManagePolicies;
