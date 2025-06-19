import React from 'react';
import { CalendarDays } from 'lucide-react';

const PackageItinerary = ({ packageDetails }) => {
    const { itinerary = [] } = packageDetails || {};

    return (
        <div className="bg-primary-green mx-auto p-6">
            <div className='content mx-auto'>

                <h2 className="text-mobile/h3 md:text-desktop/h3 font-semibold text-white mb-6">
                    Description
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {itinerary.map((item, index) => (
                        <div
                            key={item._id || index}
                            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-teal-600 font-semibold text-mobile/h5 md:text-desktop/h5">
                                    {item.day}
                                </h3>
                                <CalendarDays className="w-5 h-5 text-gray-500" />
                            </div>
                            <h4 className="text-gray-800 font-medium mb-1 text-mobile/body/2 md:text-desktop/body/1">
                                {item.title}
                            </h4>
                            <p className="text-gray-600 text-mobile/body/2 md:text-desktop/body/1">
                                {item.details}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PackageItinerary;
