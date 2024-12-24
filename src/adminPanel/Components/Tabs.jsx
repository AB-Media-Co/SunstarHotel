/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Tabs = ({ tabNames, tabContent }) => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState(tabNames[0]);
  const tabRefs = useRef([]);
  const contentRef = useRef(null);

  // Function to handle tab clicks
  const handleTabClick = (tabName, index) => {
    setActiveTab(tabName);
    gsap.to(tabRefs.current, {
      scale: 1,
      duration: 0.3,
    });
    gsap.to(tabRefs.current[index], {
      scale: 1.1,
      duration: 0.5,
    });
  };

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' }
      );
    }
  }, [activeTab]);

  return (
    <div className="w-full  mx-auto px-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        {tabNames.map((tab, index) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab, index)}
            ref={(el) => (tabRefs.current[index] = el)}
            className={`flex-1 py-3 text-center text-lg font-medium transition-all duration-500 ease-in-out 
                        ${activeTab === tab ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'} 
                        hover:text-blue-500`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        <div 
          ref={contentRef} 
          className="p-6 bg-white shadow-xl rounded-lg capitalize"
        >
          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
