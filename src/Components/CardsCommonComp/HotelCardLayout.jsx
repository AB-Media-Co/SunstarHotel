/* eslint-disable react/prop-types */
import CommonButton from "../CommonButton";

const HotelCard = ({
    hotel,
    btnClass = 'bg-white hover:bg-yellow-400 w-[150px] hover:shadow-2xl hover:rounded-lg rounded-lg transition ease-in-out duration-300 mt-0',
}) => {
    return (
        <div className="border border-gray-200 animation-on-scroll rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-md transition-shadow duration-200">
            <div className="relative w-full h-48">
                <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div>
                <div className="px-4 py-2 flex flex-col justify-center items-center">
                    <h3 className="text-mobile/h5 md:text-desktop/h5 font-bold text-gray-900">
                        {hotel.name}
                    </h3>
                    <div className="flex items-center text-mobile/body/2 md:text-desktop/body/2 text-gray-600 mb-4">
                        <span className="text-yellow-500 mr-1">★</span>
                        {hotel.rating} • {hotel.reviews}
                    </div>
                </div>
                <CommonButton className={`${btnClass}`} />
            </div>
        </div>
    );
};

export default HotelCard;
