/* eslint-disable react/prop-types */
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useState, useCallback, useEffect } from "react";
import { ExternalLink } from 'lucide-react';

const MapGoogle = ({ locationData }) => {
  const { name, address, mapCoordinates } = locationData;

  const containerStyle = {
    width: "100%",
    height: "580px",
    borderRadius: "10px",
  };

  const center = {
    lat: mapCoordinates.lat,
    lng: mapCoordinates.lng,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC0bsroG-G8rXw3cVrvjaKlA5eJNZout5U",
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [activeTab, setActiveTab] = useState("attractions");
  const [activeMarker,] = useState(null);

  const [attractions, setAttractions] = useState([]);
  const [restaurants, setRestaurants] = useState([]);


  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
    fetchPlaces(mapInstance, "tourist_attraction");
  }, []);


  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);





  const fetchPlaces = (mapInstance, type) => {
    if (!mapInstance) {
      console.error("Map is not loaded yet.");
      return;
    }

    const service = new window.google.maps.places.PlacesService(mapInstance);
    const request = {
      location: center,
      radius: 1000,
      type: type,
    };

    if (type === "restaurant") {
      request.keyword = "food";
    }

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        calculateDistances(results, type); // Pass type to distinguish between restaurants and attractions
      } else {
        console.error(`Error fetching nearby places: ${status}`);
      }
    });
  };

  const calculateDistances = (placesArray, type) => {
    const service = new window.google.maps.DistanceMatrixService();
    const destinations = placesArray.map((place) => place.geometry.location);

    service.getDistanceMatrix(
      {
        origins: [center],
        destinations,
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (response, status) => {
        if (status === window.google.maps.DistanceMatrixStatus.OK) {
          const placesWithDistance = placesArray.map((place, index) => ({
            ...place,
            distance: response.rows[0].elements[index].distance.text,
            duration: response.rows[0].elements[index].duration.text,
          }));
          setPlaces(placesWithDistance);

          if (type === "restaurant") {
            setRestaurants(placesWithDistance); // Set restaurants separately
          } else {
            setAttractions(placesWithDistance); // Set attractions separately
          }
        } else {
          console.error("Error calculating distances: ", status);
        }
      }
    );
  };




  const handleTabChange = (tab) => {
    setActiveTab(tab);

    if (map) {
      const type = tab === "restaurants" ? "restaurant" : "tourist_attraction";
      fetchPlaces(map, type); // Fetch places based on the selected tab
    }
  };



  const handleViewOnMap = (location) => {
    if (map) {
      map.panTo(location);
      map.setZoom(18);
    }
  };



  useEffect(() => {
    if (isLoaded) {
      // Set the initial zoom and center here, if needed
      if (map) {
        map.panTo(center);
        map.setZoom(18);
      }
    }
  }, [isLoaded, map, center]);





  const handleResetMap = () => {
    if (map) {
      map.panTo(center);
      map.setZoom(22);
    }
  };

  const tabPositions = {
    attractions: "translate-x-[11%] md:translate-x-[48%]",
    restaurants: "translate-x-[120%] md:translate-x-[190%]",
  };

  return (
    <div className="flex flex-col my-10 content">
      {isLoaded ? (
        <>


          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2 space-y-4 w-full">
              <div className="w-full mb-5 flex flex-col gap-1">
                <h2 className="text-desktop/h3 font-bold mb-1">
                  Location
                </h2>
                <p className="text-[#999999] text-desktop/h6/medium">{address}</p>
                <a
                  onClick={handleResetMap}
                  className="my-2 underline items-center text-[#999999] font-bold text-lg cursor-pointer flex gap-2"
                >
                  View Hotel Location <ExternalLink style={{height:"16px"}} />
                </a>

              </div>

              <div className="relative border-b-2 w-full flex justify-evenly p-2 border-2 rounded-xl">
                {[
                  {
                    label: "Attractions",
                    value: "attractions",
                    icon: "/images/Icons/Attractions.svg",
                    count: attractions.length, // Display count for attractions
                  },
                  {
                    label: "Restaurants",
                    value: "restaurants",
                    icon: "/images/Icons/Restaurent.svg",
                    count: restaurants.length, // Display count for restaurants
                  },
                ].map(({ label, value, icon, count }) => (
                  <button
                    key={value}
                    onClick={() => handleTabChange(value)}
                    className={`relative px-4 flex gap-3 pb-0 py-2 text-[14px] text-gray-700 items-end capitalize font-medium transition-all ${activeTab === value ? "" : ""}`}
                  >
                    <img src={icon} alt={label} className="w-10 h-10" />
                    <div className="text-start">
                      {label} <br />
                      {count} Nearby 
                    </div>
                  </button>
                ))}
                <div
                  className={`absolute bottom-0 left-0 w-[160px] md:w-[180px] h-0.5 bg-[#006167] transform transition-transform duration-300 ${tabPositions[activeTab]}`}
                />
              </div>


              <ul className="space-y-2 h-[340px] overflow-y-auto w-full">
                {places.map((place, index) => (
                  <li
                    key={index}
                    className="border-b-2 pb-2 px-6 flex justify-between"
                  >
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold text-lg">{place.name}</p>
                      <p className="text-sm text-gray-700 flex gap-3 font-medium">
                        <img
                          src={"/images/Icons/manwalking.png"}
                          alt="walking"
                          className="h-[16px]"
                        />
                        {place.distance} away ({place.duration})
                      </p>
                    </div>
                    <button
                      className="text-blue-500 underline mt-1"
                      onClick={() => handleViewOnMap(place.geometry.location)}
                    >
                      View on Map
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2">
              <GoogleMap
                mapContainerStyle={containerStyle}
                defaultCenter={center}
                defaultZoom={18}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                  streetViewControl: false,
                  mapTypeControl: false,
                  zoomControl: true,
                }}
              >
                <MarkerF position={center} />
                {places.map((place, index) => (
                  <MarkerF
                    key={index}
                    position={place.geometry.location}
                    animation={
                      activeMarker &&
                        activeMarker.lat() === place.geometry.location.lat() &&
                        activeMarker.lng() === place.geometry.location.lng()
                        ? window.google.maps.Animation.BOUNCE
                        : null
                    }
                  />
                ))}
              </GoogleMap>
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MapGoogle;
