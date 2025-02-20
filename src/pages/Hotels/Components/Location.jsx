import { CloseOutlined } from '@mui/icons-material';
import { ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Location = ({address}) => {
    const zoom = 20;
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef({});
    const [groupedPlaces, setGroupedPlaces] = useState({});
    const [hotelLocation, setHotelLocation] = useState(null);
    const [mapUnlocked, setMapUnlocked] = useState(false);

    const leftCategories = ["Airport", "Railway Station", "Metro Station"];
    const popupCategories = ["Attractions", "Restaurants", "Nightlife", "Activities"];

    const popupIcons = {
        Attractions: '/images/MapIcons/Attraction.svg',
        Restaurants: '/images/MapIcons/Restaurents.svg',
        Nightlife: '/images/MapIcons/NightLife.svg',
        Activities: '/images/MapIcons/Activities.svg'
    };

    const [showPopup, setShowPopup] = useState(false);
    const [activeTab, setActiveTab] = useState("Attractions");
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
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const location = results[0].geometry.location;
                setHotelLocation(location);
                const map = new window.google.maps.Map(mapContainerRef.current, {
                    center: location,
                    zoom,
                });
                mapInstanceRef.current = map;
                new window.google.maps.Marker({
                    position: location,
                    map,
                    title: address,
                });
                const service = new window.google.maps.places.PlacesService(map);
                const placeTypes = [
                    { label: 'Airport', type: 'airport', icons: '/images/MapIcons/Airport.svg' },
                    { label: 'Railway Station', type: 'train_station', icons: '/images/MapIcons/Railway.svg' },
                    { label: 'Metro Station', type: 'subway_station', icons: '/images/MapIcons/Metro.svg' },
                    { label: 'Attractions', type: 'tourist_attraction', icons: '/images/MapIcons/Attraction.svg' },
                    { label: 'Restaurants', type: 'restaurant', icons: '/images/MapIcons/Reataurents.svg' },
                    { label: 'Nightlife', type: 'night_club', icons: '/images/MapIcons/NightLife.svg' },
                    { label: 'Activities', type: 'amusement_park', icons: '/images/MapIcons/Activities.svg' }
                ];
                placeTypes.forEach(({ label, type, icons }) => {
                    const request = {
                        location,
                        radius: type === 'airport' ? 50000 : 5000,
                        type,
                    };
                    service.nearbySearch(request, (results, status) => {
                        if (
                            status === window.google.maps.places.PlacesServiceStatus.OK &&
                            results
                        ) {
                            let computedResults = results.map(place => {
                                const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                                    location,
                                    place.geometry.location
                                );
                                return { ...place, distance, icons };
                            });
                            computedResults.sort((a, b) => a.distance - b.distance);
                            if (label === 'Airport') {
                                const airportResults = computedResults.filter(
                                    (p) => p.types && p.types.includes('airport')
                                );
                                const realAirports = airportResults.filter(p => {
                                    const name = p.name.toLowerCase();
                                    return (
                                        (name.includes('international airport') || name.includes('domestic airport')) &&
                                        !name.includes('service') &&
                                        !name.includes('academy') &&
                                        !name.includes('training') &&
                                        !name.includes('aviation services')
                                    );
                                });
                                const igiMainAirport = realAirports.find(p => {
                                    const name = p.name.toLowerCase();
                                    return (
                                        name.includes('indira gandhi') ||
                                        name.includes('igi airport') ||
                                        name.includes('delhi international airport')
                                    );
                                });
                                if (igiMainAirport) {
                                    setGroupedPlaces(prev => ({ ...prev, [label]: [igiMainAirport] }));
                                    createMarker(igiMainAirport, map);
                                } else if (realAirports.length > 0) {
                                    setGroupedPlaces(prev => ({ ...prev, [label]: [realAirports[0]] }));
                                    createMarker(realAirports[0], map);
                                } else if (airportResults.length > 0) {
                                    setGroupedPlaces(prev => ({ ...prev, [label]: [airportResults[0]] }));
                                    createMarker(airportResults[0], map);
                                } else {
                                    setGroupedPlaces(prev => ({ ...prev, [label]: [] }));
                                }
                            } else if (label === 'Metro Station' || label === 'Railway Station') {
                                const best = computedResults[0];
                                if (best) {
                                    setGroupedPlaces(prev => ({ ...prev, [label]: [best] }));
                                    createMarker(best, map);
                                } else {
                                    setGroupedPlaces(prev => ({ ...prev, [label]: [] }));
                                }
                            } else {
                                setGroupedPlaces(prev => ({ ...prev, [label]: computedResults }));
                                computedResults.forEach(place => createMarker(place, map));
                            }
                        } else {
                            console.error(`Nearby search for ${label} failed: ${status}`);
                            setGroupedPlaces(prev => ({ ...prev, [label]: [] }));
                        }
                    });
                });
            } else {
                console.error('Geocode was not successful for: ' + status);
            }
        });
    }, [address, zoom]);

    // Initialize popup map in the popup modal within the right column
    useEffect(() => {
        if (showPopup && window.google && popupMapContainerRef.current && !popupMapInstance) {
            const map = new window.google.maps.Map(popupMapContainerRef.current, {
                center: hotelLocation || { lat: 28.6139, lng: 77.2090 },
                zoom,
            });
            setPopupMapInstance(map);
        }
    }, [showPopup, hotelLocation, popupMapInstance]);

    const createMarker = (place, map) => {
        const marker = new window.google.maps.Marker({
            position: place.geometry.location,
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

    // Update main map from left side
    const viewOnMap = (place) => {
        setMapUnlocked(true);
        const { place_id, geometry: { location } } = place;
        const map = mapInstanceRef.current;
        if (map && markersRef.current[place_id]) {
            smoothPanTo(map, location);
            setTimeout(() => {
                map.setZoom(zoom);
            }, 600);
            markersRef.current[place.place_id].infoWindow.open(map, markersRef.current[place.place_id].marker);
        }
    };

    // Update popup map to a selected location and add/update a marker (red dot)
    const viewPopupMapOnLocation = (place) => {
        if (popupMapInstance && place && place.geometry) {
            smoothPanTo(popupMapInstance, place.geometry.location);
            setTimeout(() => {
                popupMapInstance.setZoom(zoom);
            }, 600);
            if (!popupMarkerRef.current) {
                popupMarkerRef.current = new window.google.maps.Marker({
                    position: place.geometry.location,
                    map: popupMapInstance,
                    title: place.name,
                });
            } else {
                popupMarkerRef.current.setPosition(place.geometry.location);
            }
        }
    };

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

    const calcTravelTime = (distance) => Math.round(distance / 80);

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
                <p className="text-primary-gray text-desktop/h6/medium">{address}</p>
                <a
                    onClick={viewHotelLocationOnMap}
                    className="my-2 underline items-center text-primary-green font-bold text-lg cursor-pointer flex gap-2"
                >
                    View Hotel Location <ExternalLink style={{ height: '16px' }} />
                </a>
            </div>

            <div className="flex justify-between gap-14">
                {/* Left Side */}
                <div style={{ width: '50%', overflowY: 'auto' }}>
                    <div className="flex gap-4 justify-between items-center">
                        {leftCategories.map(category => (
                            <div
                                key={category}
                                style={{ marginBottom: '20px' }}
                                className="flex flex-col p-4 gap-2 border rounded-lg shadow-md justify-center items-center"
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
                                                    src={place.icons}
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
                <div style={{ position: 'relative', height: '500px', width: '50%' }}>
                    <div
                        ref={mapContainerRef}
                        style={{
                            height: '100%',
                            width: '100%',
                            filter: mapUnlocked ? 'none' : 'blur(8px)',
                            transition: 'filter 0.3s ease'
                        }}
                        className="rounded-2xl  shadow-lg"
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

                    <motion.div variants={popupVariants}
                        className="fixed inset-0  bg-primary-green flex justify-center items-start z-50 transition-transform duration-500 transform">
                        <button
                            className="absolute top-4 right-4 text-primary-white p-2 rounded"
                            onClick={() => setShowPopup(false)}
                        >
                            <CloseOutlined style={{ height: "40px", width: "40px" }} />
                        </button>
                        <motion.div variants={popupVariants}
                            className="bg-white hotelSelection overflow-y-auto pb-20 w-full md:w-[1300px] h-full mt-16 rounded-t-[40px] shadow-lg">
                            <div className="sticky top-0 z-50 bg-white px-8 pt-4 border-b-2 border-gray-200">
                                <div className="flex justify-between max-w-4xl mx-auto">
                                    {popupCategories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setActiveTab(category)}
                                            className={`flex flex-col items-center px-4 py-2 transition-all duration-200  ${activeTab === category
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
                                                                                {Array(Math.floor(place.rating)).fill().map((_, i) => (
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

                                                        {/* Accordion Content (can be expanded with additional details) */}
                                                        {openAccordionIndex === index && (
                                                            <div className="bg-gray-50 p-4 border-t border-gray-100">
                                                                {/* Place details go here */}
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

                                    {/* Map Section */}
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
