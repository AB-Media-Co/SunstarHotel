/* eslint-disable react/prop-types */
import { useState } from 'react';

const RoomData = ({ data }) => {
    // Extract room information from the data object
    const roomTypes = data?.RoomTypes?.RoomType || [];
    const rateTypes = data?.RateTypes?.RateType || [];
    const ratePlans = data?.RatePlans?.RatePlan || [];

    // Hotel dropdown data
    const hotels = [
        { value: '14494', label: 'Hotel Sunstar Residency', authId: '164638176786a1a258-c6ea-11ec-9' },
        { value: '14492', label: 'Hotel Sunstar Grand', authId: '431032638481c78c0e-cd20-11ec-9' },
        { value: '15282', label: 'Hotel Sunstar Heights', authId: '520246986786a91364-c6ea-11ec-9' },
        { value: '14493', label: 'Hotel Sunstar Heritage', authId: '107320434586afe643-c6ea-11ec-9' },
        { value: '14495', label: 'Hotel Sunshine', authId: '77963264823686bfcb-d038-11ec-9' },
        { value: '14496', label: 'The Suncourt Hotel Yatri', authId: '43431464258699abee-c6ea-11ec-9' },
    ];

    // State to manage the selected hotel
    const [selectedHotel, setSelectedHotel] = useState(hotels[0]);

    return (
        <div className="container mx-auto p-4 pt-24">

            <div>
                <h3 className="text-xl font-semibold mb-2">Select Hotel</h3>
                <select
                    value={selectedHotel.value}
                    onChange={(e) => {
                        const selected = hotels.find((hotel) => hotel.value === e.target.value);
                        setSelectedHotel(selected);
                    }}
                    className="w-full border border-gray-300 rounded-md p-2"
                >
                    {hotels.map((hotel) => (
                        <option key={hotel.value} value={hotel.value}>
                            {hotel.label}
                        </option>
                    ))}
                </select>
                <p className="mt-2 text-gray-600">Selected Hotel: {selectedHotel.label}</p>
            </div>


            <h2 className="text-2xl font-bold my-4">Room Information</h2>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Room Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {roomTypes.map((roomType, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-4">
                            <h4 className="text-lg font-semibold">{roomType.Name}</h4>
                            <ul className="list-disc list-inside mt-2">
                                {roomType.Rooms.map((room, roomIndex) => (
                                    <li key={roomIndex} className="text-gray-600">{room.RoomName}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Rate Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rateTypes.map((rateType, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-4">
                            <h4 className="text-lg font-semibold">{rateType.Name}</h4>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Rate Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ratePlans.map((ratePlan, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-4">
                            <h4 className="text-lg font-semibold">{ratePlan.Name}</h4>
                            <ul className="list-disc list-inside mt-2">
                                <li className="text-gray-600">Room Type: {ratePlan.RoomType}</li>
                                <li className="text-gray-600">Rate Type: {ratePlan.RateType}</li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default RoomData;



/* eslint-disable react/prop-types */
// import React, { useState } from 'react';

// const RoomData = ({ data }) => {
//   // Extract room information from the data object
//   const roomTypes = data?.RoomTypes?.RoomType || [];
//   const rateTypes = data?.RateTypes?.RateType || [];
//   const ratePlans = data?.RatePlans?.RatePlan || [];

//   // Hotel dropdown data
//   const hotels = [
//     { value: '14494', label: 'Hotel Sunstar Residency', authId: '164638176786a1a258-c6ea-11ec-9' },
//     { value: '14492', label: 'Hotel Sunstar Grand', authId: '431032638481c78c0e-cd20-11ec-9' },
//     { value: '15282', label: 'Hotel Sunstar Heights', authId: '520246986786a91364-c6ea-11ec-9' },
//     { value: '14493', label: 'Hotel Sunstar Heritage', authId: '107320434586afe643-c6ea-11ec-9' },
//     { value: '14495', label: 'Hotel Sunshine', authId: '77963264823686bfcb-d038-11ec-9' },
//     { value: '14496', label: 'The Suncourt Hotel Yatri', authId: '43431464258699abee-c6ea-11ec-9' },
//   ];

//   // State to manage the selected hotel
//   const [selectedHotel, setSelectedHotel] = useState(hotels[0]);

//   // State to manage room data
//   const [rooms, setRooms] = useState(roomTypes.flatMap(roomType => roomType.Rooms));
//   const [editingRoom, setEditingRoom] = useState(null);
//   const [newRoom, setNewRoom] = useState({
//     RoomName: '',
//     amenities: '',
//     images: '',
//     price: '',
//     discountedPrice: '',
//     soldOut: false,
//     testimonials: '',
//   });

//   const handleAddRoom = () => {
//     setEditingRoom(null);
//     setNewRoom({
//       RoomName: '',
//       amenities: '',
//       images: '',
//       price: '',
//       discountedPrice: '',
//       soldOut: false,
//       testimonials: '',
//     });
//   };

//   const handleEditRoom = (room) => {
//     setEditingRoom(room);
//     setNewRoom({
//       RoomName: room.RoomName,
//       amenities: room.amenities || '',
//       images: room.images || '',
//       price: room.price || '',
//       discountedPrice: room.discountedPrice || '',
//       soldOut: room.soldOut || false,
//       testimonials: room.testimonials || '',
//     });
//   };

//   const handleSaveRoom = () => {
//     if (editingRoom) {
//       const updatedRooms = rooms.map(room =>
//         room.RoomID === editingRoom.RoomID ? { ...room, ...newRoom } : room
//       );
//       setRooms(updatedRooms);
//       setEditingRoom(null);
//     } else {
//       const newRoomWithId = { ...newRoom, RoomID: Date.now().toString() };
//       setRooms([...rooms, newRoomWithId]);
//     }
//     setNewRoom({
//       RoomName: '',
//       amenities: '',
//       images: '',
//       price: '',
//       discountedPrice: '',
//       soldOut: false,
//       testimonials: '',
//     });
//   };

//   const handleDeleteRoom = (roomID) => {
//     setRooms(rooms.filter(room => room.RoomID !== roomID));
//   };

//   return (
//     <div className="container mx-auto p-4 pt-24">
//       <div>
//         <h3 className="text-xl font-semibold mb-2">Select Hotel</h3>
//         <select
//           value={selectedHotel.value}
//           onChange={(e) => {
//             const selected = hotels.find((hotel) => hotel.value === e.target.value);
//             setSelectedHotel(selected);
//           }}
//           className="w-full border border-gray-300 rounded-md p-2"
//         >
//           {hotels.map((hotel) => (
//             <option key={hotel.value} value={hotel.value}>
//               {hotel.label}
//             </option>
//           ))}
//         </select>
//         <p className="mt-2 text-gray-600">Selected Hotel: {selectedHotel.label}</p>
//       </div>

//       <h2 className="text-2xl font-bold my-4">Room Information</h2>

//       <div className="mb-8">
//         <h3 className="text-xl font-semibold mb-2">Room Types</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {rooms.map((room) => (
//             <div key={room.RoomID} className="bg-white shadow-md rounded-lg p-4">
//               <h4 className="text-lg font-semibold">{room.RoomName}</h4>
//               <ul className="list-disc list-inside mt-2">
//                 <li className="text-gray-600">Amenities: {room.amenities}</li>
//                 <li className="text-gray-600">Images: {room.images}</li>
//                 <li className="text-gray-600">Price: {room.price}</li>
//                 <li className="text-gray-600">Discounted Price: {room.discountedPrice}</li>
//                 <li className="text-gray-600">Sold Out: {room.soldOut ? 'Yes' : 'No'}</li>
//                 <li className="text-gray-600">Testimonials: {room.testimonials}</li>
//               </ul>
//               <div className="mt-4">
//                 <button
//                   onClick={() => handleEditRoom(room)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteRoom(room.RoomID)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-md"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="mb-8">
//         <h3 className="text-xl font-semibold mb-2">{editingRoom ? 'Edit Room' : 'Add Room'}</h3>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleSaveRoom();
//           }}
//           className="bg-white shadow-md rounded-lg p-4"
//         >
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomName">
//               Room Name
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="roomName"
//               type="text"
//               value={newRoom.RoomName}
//               onChange={(e) => setNewRoom({ ...newRoom, RoomName: e.target.value })}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amenities">
//               Amenities
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="amenities"
//               type="text"
//               value={newRoom.amenities}
//               onChange={(e) => setNewRoom({ ...newRoom, amenities: e.target.value })}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
//               Images
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="images"
//               type="text"
//               value={newRoom.images}
//               onChange={(e) => setNewRoom({ ...newRoom, images: e.target.value })}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
//               Price
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="price"
//               type="text"
//               value={newRoom.price}
//               onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discountedPrice">
//               Discounted Price
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="discountedPrice"
//               type="text"
//               value={newRoom.discountedPrice}
//               onChange={(e) => setNewRoom({ ...newRoom, discountedPrice: e.target.value })}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="soldOut">
//               Sold Out
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="soldOut"
//               type="checkbox"
//               checked={newRoom.soldOut}
//               onChange={(e) => setNewRoom({ ...newRoom, soldOut: e.target.checked })}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testimonials">
//               Testimonials
//             </label>
//             <textarea
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="testimonials"
//               value={newRoom.testimonials}
//               onChange={(e) => setNewRoom({ ...newRoom, testimonials: e.target.value })}
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
//           >
//             {editingRoom ? 'Update Room' : 'Add Room'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RoomData;