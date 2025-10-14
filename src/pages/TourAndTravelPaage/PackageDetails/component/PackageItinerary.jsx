import React from 'react';
import { CalendarDays } from 'lucide-react';

const PackageItinerary = ({ packageDetails }) => {
    const { itinerary = [] } = packageDetails || {};

    return (
        <div className="bg-primary-green mx-auto py-6">
            <div className='content mx-auto'>

                <h2 className="text-mobile/h3 md:text-desktop/h3 font-semibold text-white mb-6">
                    Description
                </h2>

                <div className="flex  flex-col gap-6">
                    {itinerary.map((item, index) => (
                        <div
                            key={item._id || index}
                            className="bg-white flex flex-col gap-4 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-center justify-between ">
                                <h3 className="text-teal-600 font-semibold text-mobile/h5 md:text-desktop/h5">
                                    {item.day}
                                </h3>
                                <CalendarDays className="w-5 h-5 text-gray-500" />
                            </div>
                            <h4 className="text-gray-800 text-mobile/h5 md:text-desktop/h5/medium ">
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
