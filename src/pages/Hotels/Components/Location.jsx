import { CloseOutlined } from '@mui/icons-material';
import { ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';




// eslint-disable-next-line react/prop-types
const Location = ({ address, hotelData }) => {
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
    const popupMarkerRef = useRef(null);

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
        geocoder.geocode({ address: hotelData?.name + ', ' + hotelAddress }, (results, status) => {
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
                                            const travelTime = Math.round((distance * 1.4) / 500); // Estimate driving time (30km/h + road factor)
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
            position: place.location,
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
                      Drive Time: ${place.travelTime} min
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
            smoothPanTo(map, 'HOTEL SUNSTAR GRAND, 7A/17, W.E.A. Channa Market, Karol Bagh, New Delhi-5');
            setTimeout(() => {
                map.setZoom(zoom);
            }, 600);
        }
    };

    // Estimate driving time (distance * 1.4 for road factor / 500 m/min for 30km/h avg speed)
    const calcTravelTime = (distance) => Math.round((distance * 1.4) / 500);

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


    const renderMobileTransportationCards = () => {
        const leftCategories = ['Airport', 'Railway Station', 'Metro Station'];
        const leftIcons = {
            'Airport': '/images/MapIcons/Airport.svg',
            'Railway Station': '/images/MapIcons/Railway.svg',
            'Metro Station': '/images/MapIcons/Metro.svg',
        };

        return (
            <div className="space-y-4 mb-6">
                {leftCategories.map(category => {
                    const places = groupedPlaces[category] || [];
                    const nearestPlace = places.length > 0 ? places[0] : null;
                    const travelTime = nearestPlace ? calcTravelTime(nearestPlace.distance) : 0;

                    return (
                        <div
                            key={category}
                            className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold text-gray-800 mb-1">
                                        {category}
                                    </h3>
                                    <div className='flex items-center gap-2 mb-2'>

                                        <p className="text-sm text-gray-500 ">
                                            {places.length} Nearby
                                        </p>
                                        {nearestPlace && (
                                            <p className="text-xs text-gray-400">
                                                ( {travelTime} Min Drive)
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => {
                                            // You can add popup logic here or scroll to map
                                            if (nearestPlace) {
                                                viewOnMap(nearestPlace);
                                            }
                                        }}
                                        className="text-primary-green flex hover:text-green-600 text-sm font-medium hover:underline transition-colors duration-200"
                                    >
                                        View On Map
                                    </button>
                                </div>

                                <div className="flex-shrink-0 ml-4">
                                    <img
                                        src={leftIcons[category]}
                                        alt={category}
                                        className="w-12 h-12"
                                    />
                                </div>
                            </div>




                        </div>
                    );
                })}
            </div>
        );
    };


    return (
        <div className="content my-5" id='location'>
            {/* Top Section */}
            <div className="w-full mb-5 flex flex-col gap-1">
                <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold mb-1">Location</h2>
                <p className="text-primary-gray text-mobile/body/2 md:text-desktop/body/1">{hotelAddress}</p>
                <a
                    onClick={viewHotelLocationOnMap}
                    className="my-2 underline items-center text-primary-green font-bold text-base lg:text-lg cursor-pointer flex gap-2"
                >
                    View Hotel Location <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5" />
                </a>
            </div>

            <div className="flex justify-between flex-col-reverse xl:flex-row gap-6 lg:gap-14">
                {/* Left Side */}
                <div className="xl:w-[50%] flex flex-col-reverse xl:flex-col gap-6 xl:gap-0 overflow-y-auto">
                    {/* Transportation Cards */}
                    <div className="block xl:hidden">
                        {renderMobileTransportationCards()}
                    </div>
                    <div className="hidden xl:flex flex-col sm:flex-row gap-4 xl:flex-nowrap justify-between items-stretch xl:items-center">
                        {leftCategories.map(category => (
                            <div
                                key={category}
                                className="flex flex-col w-full xl:w-auto p-3 sm:p-4 gap-2 border rounded-lg shadow-md justify-center items-center mb-0 xl:mb-5"
                            >
                                {groupedPlaces[category] && groupedPlaces[category].length > 0 ? (
                                    groupedPlaces[category].map(place => {
                                        const travelTime = calcTravelTime(place.distance);
                                        return (
                                            <div
                                                key={place.place_id}
                                                className="flex flex-col gap-2 p-3 sm:p-4 lg:p-3 justify-center items-center"
                                            >
                                                <img
                                                    src={leftIcons[category]}
                                                    alt={category}
                                                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
                                                />
                                                <h4 className="text-xs sm:text-sm font-semibold text-gray-700 text-center">
                                                    {category}
                                                </h4>
                                                <span className="text-xs text-gray-500">
                                                    {travelTime} Min Drive
                                                </span>
                                                <button
                                                    onClick={() => viewOnMap(place)}
                                                    className="text-primary-green font-medium text-sm lg:text-lg hover:underline text-center"
                                                >
                                                    View on Map
                                                </button>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="flex flex-col gap-2 p-3 sm:p-4 lg:p-6 justify-center items-center">
                                        <img
                                            src={leftIcons[category]}
                                            alt={category}
                                            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 opacity-50"
                                        />
                                        <h4 className="text-xs sm:text-sm font-semibold text-gray-700 text-center">
                                            {category}
                                        </h4>
                                        <p className="text-xs text-gray-500 text-center">Not found</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Category Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {popupCategories.map(category => (
                            <div
                                key={category}
                                className="bg-white rounded-lg border p-4 shadow-md flex items-center justify-between"
                            >
                                <div className="flex flex-col gap-2 flex-1">
                                    <h4 className="text-sm lg:text-base font-semibold text-gray-700">{category}</h4>
                                    <span className="text-xs text-gray-500">
                                        {(groupedPlaces[category] && groupedPlaces[category].length) || 0} Nearby
                                    </span>
                                    <button
                                        onClick={() => {
                                            setActiveTab(category);
                                            setShowPopup(true);
                                        }}
                                        className="text-primary-green font-medium text-sm lg:text-lg hover:underline mt-2 text-left"
                                    >
                                        View More
                                    </button>
                                </div>
                                <img
                                    src={popupIcons[category]}
                                    alt={category}
                                    className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 ml-2"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Main Map Container */}
                <div className="xl:w-[50%] relative">
                    <div className="h-64 sm:h-80 lg:h-96 xl:h-[510px] w-full">
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
                                className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 cursor-pointer z-10 rounded-2xl"
                            >
                                <p className="bg-primary-green px-3 py-2 sm:px-4 sm:py-2 rounded-3xl text-white font-medium text-sm sm:text-base text-center">
                                    Click here to view on map
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Popup Modal */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={popupVariants}
                        className="fixed inset-0 bg-primary-green flex justify-center items-start z-50"
                    >
                        <button
                            className="absolute top-4 right-4 text-primary-white p-2 rounded z-50"
                            onClick={() => setShowPopup(false)}
                        >
                            <CloseOutlined className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
                        </button>

                        <motion.div
                            variants={popupVariants}
                            className="bg-white overflow-y-auto pb-20 w-full max-w-7xl h-full mt-12 sm:mt-16 rounded-t-[20px] sm:rounded-t-[40px] shadow-lg"
                        >
                            {/* Sticky Tab Navigation */}
                            <div className="sticky top-0 z-40 bg-white px-4 sm:px-8 pt-4 border-b-2 border-gray-200">
                                <div className="flex justify-between max-w-4xl mx-auto overflow-x-auto scrollbar-hide">
                                    {popupCategories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setActiveTab(category)}
                                            className={`flex flex-col items-center px-2 sm:px-4 py-2 transition-all duration-200 flex-shrink-0 ${activeTab === category
                                                ? 'border-b-2 border-primary-green text-primary-green font-medium'
                                                : 'text-gray-600'
                                                }`}
                                        >
                                            <img
                                                src={popupIcons[category]}
                                                alt={category}
                                                className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 transition-transform duration-200 ${activeTab === category ? 'scale-110' : ''
                                                    }`}
                                            />
                                            <span className="mt-1 text-xs sm:text-sm whitespace-nowrap">{category}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="px-4 sm:px-8 mt-6 sm:mt-8">
                                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                                    {/* Places List */}
                                    <div className="w-full lg:w-[60%]">
                                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
                                            Nearby {activeTab}
                                        </h2>

                                        {groupedPlaces[activeTab] && groupedPlaces[activeTab].length > 0 ? (
                                            <div className="space-y-4 pr-0 lg:pr-4">
                                                {groupedPlaces[activeTab].map((place, index) => (
                                                    <div
                                                        key={place.place_id}
                                                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                                                    >
                                                        <div
                                                            className="flex flex-col p-4 cursor-pointer"
                                                            onClick={() => setOpenAccordionIndex(openAccordionIndex === index ? null : index)}
                                                        >
                                                            <div className="flex items-start space-x-3 mb-3">
                                                                <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                                                                    <img
                                                                        src={popupIcons[activeTab]}
                                                                        alt={activeTab}
                                                                        className="w-5 h-5 sm:w-6 sm:h-6"
                                                                    />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate pr-2">
                                                                        {place.name}
                                                                    </h3>
                                                                    {place.rating && (
                                                                        <div className="flex items-center mt-1">
                                                                            <div className="flex text-yellow-400">
                                                                                {Array(Math.floor(place.rating))
                                                                                    .fill()
                                                                                    .map((_, i) => (
                                                                                        <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                                                        </svg>
                                                                                    ))}
                                                                                <span className="ml-1 text-xs text-gray-600">{place.rating}</span>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                                                <div className="flex items-center space-x-4 text-gray-600 text-sm">
                                                                    <div className="flex items-center">
                                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                        </svg>
                                                                        <span>{(place.distance / 1000).toFixed(2)} km</span>
                                                                    </div>

                                                                    <div className="flex items-center">
                                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                        </svg>
                                                                        <span>{calcTravelTime(place.distance)} min drive</span>
                                                                    </div>
                                                                </div>

                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        viewPopupMapOnLocation(place);
                                                                    }}
                                                                    className="px-3 py-1 text-sm bg-primary-green text-white rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center justify-center w-full sm:w-auto"
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
                                                                <p className="text-gray-600 text-sm">{place.vicinity || 'No address available'}</p>
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
                                            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-6 sm:p-8">
                                                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p className="mt-4 text-gray-600 text-center text-sm sm:text-base">No {activeTab} found in this area.</p>
                                                <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm">
                                                    Expand Search Area
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Popup Map Section */}
                                    <div className="w-full lg:w-[40%] mt-6 lg:mt-0">
                                        <div className="lg:sticky lg:top-24">
                                            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Map View</h2>
                                            <div
                                                ref={popupMapContainerRef}
                                                className="w-full h-64 sm:h-80 lg:h-[450px] rounded-lg overflow-hidden shadow-lg border border-gray-200"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Location;
