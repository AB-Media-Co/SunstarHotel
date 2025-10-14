/* eslint-disable react/prop-types */

const PackageInclusionBlock = ({ packageDetails }) => {
    const { inclusions = [], exclusions = [] } = packageDetails || {};

    return (
        <div className=" py-8 ">
            <div className='content'>


                <h2 className="text-mobile/h3 md:text-desktop/h3 font-semibold text-gray-900 mb-6">
                    What Is Included / Not Included
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Includes */}
                    <div>
                        <h3 className="text-mobile/h5 md:text-desktop/h5 font-semibold text-gray-800 mb-3">Includes</h3>
                        <ul className="space-y-2 list-disc list-inside text-mobile/body/2 md:text-desktop/body/1 text-gray-700">
                            {inclusions.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Not Includes */}
                    <div>
                        <h3 className="text-mobile/h5 md:text-desktop/h5 font-semibold text-gray-800 mb-3">Not Includes</h3>
                        <ul className="space-y-2 list-disc list-inside text-mobile/body/2 md:text-desktop/body/1 text-gray-700">
                            {exclusions.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageInclusionBlock;
