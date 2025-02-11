/* eslint-disable react/prop-types */
import { Delete, Edit } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import Select from 'react-select';

const Card = ({ item, type, onEdit, onDelete }) => (
    <div
        key={item._id}
        className="bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative"
    >
        <div className="absolute top-3 right-3 flex gap-2 z-10">
            <button
                onClick={() => onEdit(item)}
                className="backdrop-blur-md bg-white/30 p-2 rounded-full shadow-lg hover:scale-110 hover:bg-blue-200 transition-all duration-300"
            >
                <Edit fontSize="small" className="text-blue-500" />
            </button>
            <button
                onClick={() => onDelete(item._id)}
                className="backdrop-blur-md bg-white/30 p-2 rounded-full shadow-lg hover:scale-110 hover:bg-red-200 transition-all duration-300"
            >
                <Delete fontSize="small" className="text-red-500" />
            </button>
        </div>

        <div className="relative">
            {item.discountedPrice && <span className="absolute top-3 left-0 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-r-full">SALE</span>}
            <img
                src={item.images?.[0] || 'https://via.placeholder.com/300'}
                alt={type === 'hotel' ? item.name : item.roomType}
                className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
            />
        </div>

        <div className="p-6">
            <h3 className="text-2xl font-extrabold text-gray-800 mb-2">{type === 'hotel' ? item.name : `${item.roomType} - Room ${item.roomNumber}`}</h3>
            <p className="text-sm text-gray-700 mb-2 line-clamp-2">{item.description}</p>
            <div className="flex items-center justify-between mb-2">
                <span className={`text-gray-500 text-sm ${item?.hotel?.name ? 'block' : 'hidden'}`}> {item?.hotel?.name ? item?.hotel?.name : ''}</span>
                <span className="text-yellow-500 text-sm">⭐ {item.rating || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
                {type === 'hotel' && (
                    <div className="text-sm font-medium text-gray-700">Rooms Available: <span className="font-bold text-green-600">{item.rooms?.length || 'No Rooms'}</span></div>
                )}
                <div className="flex items-center">
                    <span className="line-through text-red-500 text-sm">₹{item.price}</span>
                    <span className="text-green-600 font-bold text-lg ml-2">₹{item.discountedPrice || item.price}</span>
                </div>
            </div>
            <div className="mb-4">
                <span className="block font-bold text-gray-800">Amenities:</span>
                <ul className="flex flex-wrap mt-2">
                    {item?.amenities?.length ? item?.amenities?.map((amenity, index) => (
                        <li key={index} className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full m-1">
                            {amenity}
                        </li>
                    )) : <li>No amenities listed</li>}
                </ul>
            </div>
        </div>
    </div>
);

const AddNewCard = ({ onClick }) => (
    <div
        onClick={onClick}
        className="bg-white bg-opacity-80 h-[15rem] backdrop-blur-md shadow-xl rounded-xl flex flex-col items-center justify-center cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative"
    >
        <div className="flex flex-col items-center">
            <div className=" text-black p-6 rounded-full mb-2 shadow-xl hover:scale-110 transition-transform">
                <Add fontSize="large" /> Add
            </div>
        </div>
    </div>
);



export const RoomsSection = ({
    title,
    data,
    type,
    onEdit,
    onDelete,
    onAdd,
    showAddButton = true,
    isDropdownShow = false,
    hotels,
    handleSelectHotel,
    selectedHotel
}) => {
    // Flatten rooms and associate them with room type and rate plans
    const rooms = data?.flatMap((roomType) =>
        roomType.Rooms.map((room) => ({
            ...room,
            roomTypeName: roomType.Name,
            ratePlans: roomType.RatePlans,
            amenities: roomType.Amenities,
            images: roomType.Images,
        }))
    );

    return (
        <div className="p-6 pt-24 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">{title}</h2>
              
                {isDropdownShow && (
                    <div className="mb-6 max-w-md mx-auto">
                        <Select
                            options={hotels}
                            value={selectedHotel}
                            onChange={handleSelectHotel}
                            placeholder="Select a Hotel"
                            isClearable
                            className="text-gray-900"
                        />
                    </div>
                )}

                {/* Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {rooms?.map((room) => (
                        <div
                            key={room.RoomID}
                            className="bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative"
                        >
                            {/* Edit and Delete Buttons */}
                            <div className="absolute top-3 right-3 flex gap-2 z-10">
                                <button
                                    onClick={() => onEdit(room)}
                                    className="backdrop-blur-md bg-white/30 p-2 rounded-full shadow-lg hover:scale-110 hover:bg-blue-200 transition-all duration-300"
                                >
                                    <Edit fontSize="small" className="text-blue-500" />
                                </button>
                                <button
                                    onClick={() => onDelete(room.RoomID)}
                                    className="backdrop-blur-md bg-white/30 p-2 rounded-full shadow-lg hover:scale-110 hover:bg-red-200 transition-all duration-300"
                                >
                                    <Delete fontSize="small" className="text-red-500" />
                                </button>
                            </div>

                            {/* Room Image */}
                            <div className="relative">
                                <img
                                    src={room.images?.[0] || 'https://via.placeholder.com/300'}
                                    alt={room.roomTypeName}
                                    className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Room Details */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {room.roomTypeName} - Room {room.RoomName}
                                </h3>
                                <p className="text-sm text-gray-700 mb-2">
                                    {room.SoldOut ? "Sold Out" : "Available"}
                                </p>

                                {/* Rate Plans */}
                                <div className="mb-4">
                                    <span className="block font-bold text-gray-800">Rate Plans:</span>
                                    {room.ratePlans.length > 0 ? (
                                        room.ratePlans.map((plan) => (
                                            <p
                                                key={plan.RatePlanID}
                                                className="text-gray-700 text-sm mb-1"
                                            >
                                                {plan.Name} ({plan.RateType})
                                            </p>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm">No rate plans available</p>
                                    )}
                                </div>

                                {/* Amenities */}
                                <div className="mb-4">
                                    <span className="block font-bold text-gray-800">Amenities:</span>
                                    <ul className="flex flex-wrap mt-2">
                                        {room.amenities.length > 0 ? (
                                            room.amenities.map((amenity, index) => (
                                                <li
                                                    key={index}
                                                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full m-1"
                                                >
                                                    {amenity}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-gray-500 text-sm">No amenities listed</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add New Card */}
                    {showAddButton && (
                        <div
                            onClick={onAdd}
                            className="bg-white bg-opacity-80 h-[15rem] backdrop-blur-md shadow-xl rounded-xl flex flex-col items-center justify-center cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative"
                        >
                            <div className="flex flex-col items-center">
                                <div className="text-black p-6 rounded-full mb-2 shadow-xl hover:scale-110 transition-transform">
                                    <Add fontSize="large" /> Add
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};