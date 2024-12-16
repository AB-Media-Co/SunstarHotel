/* eslint-disable react/prop-types */
// Location.js
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";


const Location = ({ locationData }) => {
    const { name, address, mapCoordinates, nearby } = locationData;

    return (
        <div className="content mx-auto p-6 pb-20">
            <h2 className="text-xl font-semibold mb-4">Location Of {name}</h2>
            <p className="text-gray-600 mb-4">{address}</p>

            <hr className="my-4"/>
            <div className="relative flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search Area, Landmark Or Transit nearby"
                    className="w-full px-4 py-4 border shadow-lg  rounded-md focus:outline-none"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Map */}
                <div className="col-span-2">
                    <div className="relative h-96 w-full">
                        <MapContainer
                            center={[mapCoordinates.lat, mapCoordinates.lng]}
                            zoom={13}
                            className="h-full w-full rounded-lg"
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[mapCoordinates.lat, mapCoordinates.lng]}>
                                <Popup>{name}</Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>

                {/* Nearby List */}
                <div className="col-span-1 h-96 space-y-4">
                    {Object.keys(nearby).map((category) => (
                        <div
                            key={category}
                            className="border rounded-lg py-2  px-4 bg-[#006167] text-white "
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium capitalize">{category}</h3>
                                <button className="font-bold text-lg">▼</button>
                            </div>
                            <ul className="mt-2 space-y-1">
                                {nearby[category].map((item, index) => (
                                    <li key={index} className="text-sm">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Location;
