/* eslint-disable react/prop-types */
import { Delete, Edit } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import { useGetHotels } from "../../../ApiHooks/useHotelHook2";

const Card = ({ item, type, onEdit, onDelete }) => {
  
    return (
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
          {item.discountedPrice && (
            <span className="absolute top-3 left-0 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-r-full">
              SALE
            </span>
          )}
          <img
            src={item.images?.[0] || 'https://via.placeholder.com/300'}
            alt={type === 'hotel' ? item.name : item.roomType}
            className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
  
        <div className="p-6">
          <h3 className="text-2xl font-extrabold text-gray-800 mb-2">
            {type === 'hotel' ? item.name : `${item.roomType} - Room ${item.roomNumber}`}
          </h3>
          <p className="text-sm text-gray-700 mb-2 line-clamp-2">{item.description}</p>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-gray-500 text-sm ${item?.hotel?.name ? 'block' : 'hidden'}`}>
              {item?.hotel?.name ? item?.hotel?.name : ''}
            </span>
            <span className="text-gray-500 text-sm">📍 {item.location || item.hotel?.location || 'N/A'}</span>
            <span className="text-yellow-500 text-sm">⭐ {item.rating || 'N/A'}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            {type === 'hotel' && (
              <div className="text-sm font-medium text-gray-700">
                Rooms Available: <span className="font-bold text-green-600">{item.rooms?.length || 'No Rooms'}</span>
              </div>
            )}
            <div className="flex items-center">
              <span className="line-through text-red-500 text-sm">₹{item.price}</span>
              <span className="text-green-600 font-bold text-lg ml-2">
                ₹{item.discountedPrice || item.price}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <span className="block font-bold text-gray-800">Amenities:</span>
            <ul className="flex flex-wrap mt-2">
              {item?.amenities?.length
                ? item?.amenities?.map((amenity, index) => (
                    <li
                      key={index}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full m-1"
                    >
                      {amenity}
                    </li>
                  ))
                : <li>No amenities listed</li>}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default Card;
  

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

export const Section = ({
    title,
    type,
    onEdit,
    onDelete,
    onAdd,
    showAddButton = true,
  }) => {
    const { data: hotels, isLoading, isError, error } = useGetHotels();
  
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
  
    return (
      <div className="p-6 pt-24 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">{title}</h2>
  
          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {hotels?.hotels?.map((item) => (
              <Card key={item._id} item={item} type={type} onEdit={onEdit} onDelete={onDelete} />
            ))}
            {showAddButton && <AddNewCard onClick={onAdd} />}
          </div>
        </div>
      </div>
    );
  };