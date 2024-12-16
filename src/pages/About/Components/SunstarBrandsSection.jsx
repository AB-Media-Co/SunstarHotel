import CommonButton from "../../../Components/CommonButton";

/* eslint-disable react/prop-types */
const SunstarBrandsSection = ({ hotels }) => {
    return (
        <section className="py-12 px-4 sm:px-8   max-w-7xl mx-auto">
            <div  className="section">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Sunstar Brands</h2>
                <p className="text-gray-700 mb-10 font-semibold">
                    Revolutionizing the mid-market hotel space, one hotel at a time.
                </p>

            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {hotels?.map((hotel, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="relative w-full h-48">
                            <img
                                src={hotel.image}
                                alt={hotel.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="">
                            <div className="px-4 py-2">

                                <h3 className="text-lg font-bold text-gray-900 ">{hotel.name}</h3>
                                <div className="flex items-center text-sm text-gray-600 mb-4">
                                    <span className="text-yellow-500 mr-1">★</span>
                                    {hotel.rating} • {hotel.reviews}
                                </div>
                            </div>
                            <CommonButton className="bg-white pb-4" />


                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SunstarBrandsSection;
