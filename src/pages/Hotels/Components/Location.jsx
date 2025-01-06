/* eslint-disable react/prop-types */
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LaunchRounded } from "@mui/icons-material";

const Location = ({ locationData }) => {
    const { name, address, mapCoordinates, nearby } = locationData;

    const [activeTab, setActiveTab] = useState("attractions");

    // Tab positions for sliding border
    const tabPositions = {
        attractions: "translate-x-[35%]",
        // Restaurants: "translate-x-full",
        restaurants: "translate-x-[150%]",
    };

    const handleTabClick = (tabName) => {
        console.log(tabName)
        setActiveTab(tabName);
    };

    return (
        <div id="location" className="content mx-auto p-6 pb-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Location Of {name}</h2>
            <p className="text-gray-600 mb-6">{address}</p>



            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Left Section - Tabs and Nearby List */}
                <div className="col-span-2 space-y-4">
                    {/* Tabs */}
                    <div className="relative border-b-2">
                        <div className="flex justify-evenly items-center px-2">
                            {["attractions", "restaurants"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => handleTabClick(tab)}
                                    className={`relative px-4 py-2 capitalize font-medium transition-all ${activeTab === tab
                                        ? "text-[#006167] text-lg"
                                        : "text-gray-700 text-base"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        {/* Sliding Border */}
                        <div
                            className={`absolute bottom-0 left-0 w-1/3 h-0.5 bg-[#006167] transform transition-transform duration-300 ${tabPositions[activeTab]}`}
                        />
                    </div>

                    {/* Nearby List */}
                    <div className="flex flex-col  text-[#999999] justify-between pt-4">
                        {/* <h3 className="text-[32px] font-bold text-[#006167]">{activeTab}</h3> */}
                        <div className="flex flex-col w-full">
                            {nearby[activeTab]?.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between text-[24px] w-full items-center px-4 py-2 bg-white"
                                >
                                    <div className="text-black font-bold">
                                        📍 {item}

                                    </div>

                                    <button className="py-3 hover:text-[#006167] flex gap-2 items-center text-[18px]  font-semibold ">
                                        <span className="border-b-2 hover:border-b-[#006167]">
                                            View on Map
                                        </span>
                                        <LaunchRounded style={{ fontSize: "18px" }} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* View on Map Button */}
                </div>

                {/* Right Section - Map */}
                <div className="col-span-2">
                    <div className="relative h-96 w-full z-10  p-2 overflow-hidden ">
                        <div className="relative flex items-center mb-4  ">
                            <input
                                type="text"
                                placeholder="Search Area, Landmark Or Transit nearby"
                                className="w-full px-4 py-4 border shadow-lg rounded-md focus:outline-none"
                            />
                        </div>
                        <MapContainer
                            center={[mapCoordinates.lat, mapCoordinates.lng]}
                            zoom={13}
                            style={{"border-radius":"10px"}}
                            className="h-[250px] w-full rounded-lg"
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
            </div>
        </div>
    );
};

export default Location;


