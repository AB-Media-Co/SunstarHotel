import { CloseOutlined } from '@mui/icons-material';
import { ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Location = ({ address }) => {
    // Destructure the passed object
    const {
        hotelAddress,
        metro,
        airport,
        railwayStation,
        attractions,
        restaurants,
        activities,
        nightlife,
        city
    } = address || {};

    const zoom = 20;
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef({});
    const [groupedPlaces, setGroupedPlaces] = useState({});
    const [hotelLocation, setHotelLocation] = useState(null);
    const [mapUnlocked, setMapUnlocked] = useState(false);

    // Categories for left side and popup
    const leftCategories = ['Airport', 'Railway Station', 'Metro Station'];
    const popupCategories = ['Attractions', 'Restaurants', 'Nightlife', 'Activities'];

    // Icon mapping for popup view
    const popupIcons = {
        Attractions: '/images/MapIcons/Attraction.svg',
        Restaurants: '/images/MapIcons/Restaurents.svg',
        Nightlife: '/images/MapIcons/NightLife.svg',
        Activities: '/images/MapIcons/Activities.svg'
    };
    const leftIcons = {
        'Airport': '/images/MapIcons/Airport.svg',
        'Railway Station': '/images/MapIcons/Railway.svg',
        'Metro Station': '/images/MapIcons/Metro.svg',
    };


    const [showPopup, setShowPopup] = useState(false);
    const [activeTab, setActiveTab] = useState('Attractions');
    const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

    const popupMapContainerRef = useRef(null);
    const [popupMapInstance, setPopupMapInstance] = useState(null);
    const popupMarkerRef = useRef(null); // Ref for the popup marker

    useEffect(() => {
        setOpenAccordionIndex(null);
    }, [activeTab]);

    useEffect(() => {
        if (!window.google) {
            console.error('Google Maps JavaScript API not loaded.');
            return;
        }
        if (!hotelAddress) {
            console.error('Hotel address is missing.');
            return;
        }
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: hotelAddress }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const hotelLoc = results[0].geometry.location;
                setHotelLocation(hotelLoc);
                const map = new window.google.maps.Map(mapContainerRef.current, {
                    center: hotelLoc,
                    zoom,
                });
                mapInstanceRef.current = map;

                new window.google.maps.Marker({
                    position: hotelLoc,
                    map,
                    title: hotelAddress,
                });

                const categories = {
                    'Metro Station': metro,
                    'Airport': airport,
                    'Railway Station': railwayStation,
                    'Attractions': attractions,
                    'Restaurants': restaurants,
                    'Activities': activities,
                    'Nightlife': nightlife,
                };

                Object.entries(categories).forEach(([label, places]) => {
                    if (places && places.length > 0) {
                        Promise.all(
                            places.map((place) =>
                                new Promise((resolve) => {
                                    geocoder.geocode({ address: `${place.name}, New Delhi, India` }, (results, status) => {
                                        if (status === 'OK' && results[0]) {
                                            const placeLoc = results[0].geometry.location;
                                            const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                                                hotelLoc,
                                                placeLoc
                                            );
                                            const travelTime = Math.round(distance / 80);
                                            const enrichedPlace = { ...place, location: placeLoc, distance, travelTime, place_id: place.place_id || place.name };
                                            resolve(enrichedPlace);
                                        } else {
                                            console.error(`Geocode failed for ${place.name}: ${status}`);
                                            resolve({ ...place, location: null });
                                        }
                                    });
                                })
                            )
                        ).then((computedResults) => {
                            const validResults = computedResults.filter((res) => res.location);
                            validResults.sort((a, b) => a.distance - b.distance);
                            setGroupedPlaces((prev) => ({ ...prev, [label]: validResults }));
                            validResults.forEach((p) => createMarker(p, map));
                        });
                    } else {
                        setGroupedPlaces((prev) => ({ ...prev, [label]: [] }));
                    }
                });

            } else {
                console.error('Geocode was not successful for: ' + status);
            }
        });
    }, [hotelAddress, address, zoom]);

    // Initialize popup map when the popup is shown
    useEffect(() => {
        if (showPopup && window.google && popupMapContainerRef.current && !popupMapInstance) {
            const map = new window.google.maps.Map(popupMapContainerRef.current, {
                center: hotelLocation || { lat: 28.6139, lng: 77.2090 },
                zoom,
            });
            setPopupMapInstance(map);
        }
    }, [showPopup, hotelLocation, popupMapInstance]);

    // Helper to create markers on the map using the enriched location property
    const createMarker = (place, map) => {
        const marker = new window.google.maps.Marker({
            position: place.location, // use the enriched location
            map,
            title: place.name,
        });
        const infoWindow = new window.google.maps.InfoWindow({
            content: `<div>
                  <strong>${place.name}</strong><br/>
                  Distance: ${(place.distance / 1000).toFixed(2)} km<br/>
                  ${place.vicinity || ''}
                </div>`,
        });
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
        markersRef.current[place.place_id] = { marker, infoWindow };
    };

    // Smoothly pan the map to a target location
    const smoothPanTo = (map, target) => {
        let currentCenter = map.getCenter();
        let targetLat = target.lat();
        let targetLng = target.lng();
        let currentLat = currentCenter.lat();
        let currentLng = currentCenter.lng();
        const steps = 30;
        let step = 0;
        const deltaLat = (targetLat - currentLat) / steps;
        const deltaLng = (targetLng - currentLng) / steps;
        const interval = setInterval(() => {
            currentLat += deltaLat;
            currentLng += deltaLng;
            map.setCenter(new window.google.maps.LatLng(currentLat, currentLng));
            step++;
            if (step >= steps) {
                clearInterval(interval);
                map.setCenter(target);
            }
        }, 20);
    };

    // Function to pan the main map to the selected place and open its info window
    const viewOnMap = (place) => {
        setMapUnlocked(true);
        const { location, place_id, name } = place;
        const map = mapInstanceRef.current;
        if (map && location) {
            smoothPanTo(map, location);
            setTimeout(() => {
                map.setZoom(zoom);
            }, 600);
            // Open existing marker if available, or create one if missing
            if (markersRef.current[place_id]) {
                markersRef.current[place_id].infoWindow.open(map, markersRef.current[place_id].marker);
            } else {
                const marker = new window.google.maps.Marker({
                    position: location,
                    map,
                    title: name,
                });
                const infoWindow = new window.google.maps.InfoWindow({
                    content: `<div>
                      <strong>${name}</strong><br/>
                      Distance: ${(place.distance / 1000).toFixed(2)} km<br/>
                      ${place.vicinity || ''}<br/>
                      Travel Time: ${place.travelTime} min
                    </div>`,
                });
                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });
                markersRef.current[place_id] = { marker, infoWindow };
                infoWindow.open(map, marker);
            }
        }
    };

    // Update popup map to a selected location and add/update a marker (red dot)
    const viewPopupMapOnLocation = (place) => {
        if (popupMapInstance && place && place.location) {
            smoothPanTo(popupMapInstance, place.location);
            setTimeout(() => {
                popupMapInstance.setZoom(zoom);
            }, 600);
            if (!popupMarkerRef.current) {
                popupMarkerRef.current = new window.google.maps.Marker({
                    position: place.location,
                    map: popupMapInstance,
                    title: place.name,
                });
            } else {
                popupMarkerRef.current.setPosition(place.location);
            }
        }
    };

    // Pan back to the hotel location
    const viewHotelLocationOnMap = () => {
        setMapUnlocked(true);
        const map = mapInstanceRef.current;
        if (map && hotelLocation) {
            smoothPanTo(map, hotelLocation);
            setTimeout(() => {
                map.setZoom(zoom);
            }, 600);
        }
    };

    // Simple travel time calculation (distance in meters / 80 gives minutes)
    const calcTravelTime = (distance) => Math.round(distance / 80);

    // Framer Motion popup animation variants
    const popupVariants = {
        hidden: { y: '100%', opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15
            }
        },
        exit: {
            y: '100%',
            opacity: 0,
            transition: { type: 'spring', stiffness: 100, damping: 15 }
        }
    };

    return (
        <div className="content my-5">
            {/* Top Section */}
            <div className="w-full mb-5 flex flex-col gap-1">
                <h2 className="text-desktop/h3 font-bold mb-1">Location</h2>
                <p className="text-primary-gray text-desktop/h6/medium">{hotelAddress }</p>
                <a
                    onClick={viewHotelLocationOnMap}
                    className="my-2 underline items-center text-primary-green font-bold text-lg cursor-pointer flex gap-2"
                >
                    View Hotel Location <ExternalLink style={{ height: '16px' }} />
                </a>
            </div>

            <div className="flex justify-between flex-col-reverse md:flex-row gap-14">
                {/* Left Side */}
                <div style={{ overflowY: 'auto' }} className="md:w-[50%] flex flex-col-reverse md:flex-col gap-6 md:gap-0">
                    <div className="flex gap-4 flex-wrap md:flex-nowrap justify-between items-center">
                        {leftCategories.map(category => (
                            <div
                                key={category}
                                style={{ marginBottom: '20px' }}
                                className="flex flex-col w-full md:w-auto p-4 gap-2 border rounded-lg shadow-md justify-center items-center"
                            >
                                {groupedPlaces[category] && groupedPlaces[category].length > 0 ? (
                                    groupedPlaces[category].map(place => {
                                        const travelTime = calcTravelTime(place.distance);
                                        return (
                                            <div
                                                key={place.place_id}
                                                className="flex flex-col gap-2 p-6 justify-center items-center"
                                            >
                                                <img
                                                    src={leftIcons[category]}
                                                    alt={category}
                                                    className="w-16 h-16"
                                                />
                                                <h4 className="text-sm font-semibold text-gray-700">{category}</h4>
                                                <span className="text-xs text-gray-500">
                                                    {travelTime} Min away
                                                </span>
                                                <button
                                                    onClick={() => viewOnMap(place)}
                                                    className="text-primary-green font-medium text-lg hover:underline"
                                                >
                                                    View on Map
                                                </button>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-sm text-gray-500">No {category} found.</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {popupCategories.map(category => (
                            <div
                                key={category}
                                className="bg-white rounded-lg border p-4 shadow-md flex items-center justify-between"
                            >
                                <div className="flex flex-col gap-2">
                                    <h4 className="text-sm font-semibold text-gray-700">{category}</h4>
                                    <span className="text-xs text-gray-500">
                                        {(groupedPlaces[category] && groupedPlaces[category].length) || 0} Nearby
                                    </span>
                                    <button
                                        onClick={() => setShowPopup(true)}
                                        className="text-primary-green font-medium text-lg hover:underline mt-2"
                                    >
                                        View More
                                    </button>
                                </div>
                                <img src={popupIcons[category]} alt={category} className="w-14 h-14" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Main Map Container */}
                <div style={{ position: 'relative', height: '510px' }} className="md:w-[50%]">
                    <div
                        ref={mapContainerRef}
                        style={{
                            height: '100%',
                            width: '100%',
                            filter: mapUnlocked ? 'none' : 'blur(8px)',
                            transition: 'filter 0.3s ease'
                        }}
                        className="rounded-2xl shadow-lg"
                    ></div>
                    {!mapUnlocked && (
                        <div
                            onClick={() => setMapUnlocked(true)}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                cursor: 'pointer',
                                zIndex: 2,
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                color: '#333'
                            }}
                        >
                            <p className="bg-primary-green px-4 py-2 rounded-3xl text-white font-medium">
                                Click here to view on map
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {showPopup && (
                <AnimatePresence>
                    <motion.div
                        variants={popupVariants}
                        className="fixed inset-0 bg-primary-green flex justify-center items-start z-50 transition-transform duration-500 transform"
                    >
                        <button
                            className="absolute top-4 right-4 text-primary-white p-2 rounded"
                            onClick={() => setShowPopup(false)}
                        >
                            <CloseOutlined style={{ height: "40px", width: "40px" }} />
                        </button>
                        <motion.div
                            variants={popupVariants}
                            className="bg-white hotelSelection overflow-y-auto pb-20 w-full md:w-[1300px] h-full mt-16 rounded-t-[40px] shadow-lg"
                        >
                            <div className="sticky top-0 z-50 bg-white px-8 pt-4 border-b-2 border-gray-200">
                                <div className="flex justify-between max-w-4xl mx-auto">
                                    {popupCategories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setActiveTab(category)}
                                            className={`flex flex-col items-center px-4 py-2 transition-all duration-200 ${activeTab === category
                                                    ? 'border-b-2 border-primary-green text-primary-green font-medium'
                                                    : 'text-gray-600'
                                                }`}
                                        >
                                            <img
                                                src={popupIcons[category]}
                                                alt={category}
                                                className={`w-12 h-12 transition-transform duration-200 ${activeTab === category ? 'scale-110' : ''}`}
                                            />
                                            <span className="mt-1 text-sm">{category}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="px-8 mt-8">
                                <div className="flex flex-col lg:flex-row gap-8">
                                    <div className="w-full lg:w-[60%]">
                                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Nearby {activeTab}</h2>

                                        {groupedPlaces[activeTab] && groupedPlaces[activeTab].length > 0 ? (
                                            <div className="space-y-4 pr-4">
                                                {groupedPlaces[activeTab].map((place, index) => (
                                                    <div
                                                        key={place.place_id}
                                                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                                                    >
                                                        <div
                                                            className="flex flex-col sm:flex-row justify-between p-4 cursor-pointer"
                                                            onClick={() => setOpenAccordionIndex(openAccordionIndex === index ? null : index)}
                                                        >
                                                            <div className="flex items-center space-x-3">
                                                                <div className="bg-green-100 p-2 rounded-full">
                                                                    <img
                                                                        src={popupIcons[activeTab]}
                                                                        alt={activeTab}
                                                                        className="w-6 h-6 text-green-600"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-semibold text-gray-800">{place.name}</h3>
                                                                    {place.rating && (
                                                                        <div className="flex items-center mt-1">
                                                                            <div className="flex text-yellow-400">
                                                                                {Array(Math.floor(place.rating))
                                                                                    .fill()
                                                                                    .map((_, i) => (
                                                                                        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                                                        </svg>
                                                                                    ))}
                                                                                {place.rating % 1 !== 0 && (
                                                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                                                    </svg>
                                                                                )}
                                                                                <span className="ml-1 text-xs text-gray-600">{place.rating}</span>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-col sm:items-end mt-2 sm:mt-0">
                                                                <div className="flex items-center space-x-3">
                                                                    <div className="flex items-center text-gray-600">
                                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                        </svg>
                                                                        <span className="text-sm">{(place.distance / 1000).toFixed(2)} km</span>
                                                                    </div>

                                                                    <div className="flex items-center text-gray-600">
                                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                        </svg>
                                                                        <span className="text-sm">{calcTravelTime(place.distance)} min</span>
                                                                    </div>
                                                                </div>

                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        viewPopupMapOnLocation(place);
                                                                    }}
                                                                    className="mt-2 px-3 py-1 text-sm bg-primary-green text-white rounded-md transition-colors duration-200 flex items-center"
                                                                >
                                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                                                    </svg>
                                                                    View on Map
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {openAccordionIndex === index && (
                                                            <div className="bg-gray-50 p-4 border-t border-gray-100">
                                                                <p className="text-gray-600">{place.vicinity || 'No address available'}</p>
                                                                {place.opening_hours && (
                                                                    <p className="mt-2 text-sm">
                                                                        {place.opening_hours.open_now
                                                                            ? <span className="text-green-600">Open Now</span>
                                                                            : <span className="text-red-600">Closed</span>}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-8">
                                                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p className="mt-4 text-gray-600">No {activeTab} found in this area.</p>
                                                <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                                                    Expand Search Area
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Popup Map Section */}
                                    <div className="w-full lg:w-[40%] mt-6 lg:mt-0">
                                        <div className="sticky top-24">
                                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Map View</h2>
                                            <div
                                                ref={popupMapContainerRef}
                                                className="w-full h-[450px] rounded-lg overflow-hidden shadow-lg border border-gray-200"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
};

export default Location;
