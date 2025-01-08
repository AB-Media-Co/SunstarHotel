const cities = [
    { name: "Ahmedabad", image: "https://via.placeholder.com/300" },
    { name: "Amritsar", image: "https://via.placeholder.com/300" },
    { name: "Bengaluru", image: "https://via.placeholder.com/300" },
    { name: "Chennai", image: "https://via.placeholder.com/300" },
    { name: "Delhi", image: "https://via.placeholder.com/300" },
    { name: "Goa", image: "https://via.placeholder.com/300" },
    { name: "Gurugram", image: "https://via.placeholder.com/300" },
    { name: "Hyderabad", image: "https://via.placeholder.com/300" },
    { name: "Jaipur", image: "https://via.placeholder.com/300" },
    { name: "Jalandhar", image: "https://via.placeholder.com/300" },
    { name: "Jammu", image: "https://via.placeholder.com/300" },
    { name: "Katra", image: "https://via.placeholder.com/300" },
  ];
  
  export const HotelLocations = () => {
    return (
        <div className="relative pt-24 bg-white w-full max-w-7xl rounded-lg shadow-xl p-8">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
              Discover Beautiful <span className="text-yellow-400">Cities</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Explore the best destinations for your next stay and find the perfect hotels tailored for your journey.
            </p>
          </div>
  
          {/* Cities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cities.map((city) => (
              <div
                key={city.name}
                className="group relative overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
              >
                {/* City Image */}
                <div
                  className="relative h-48 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${city.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-60 transition duration-300"></div>
                </div>
                {/* City Info */}
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-xl font-bold text-white tracking-wide group-hover:text-yellow-400">
                    {city.name}
                  </h2>
                </div>
                {/* Overlay Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <button className="px-6 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600 transition">
                    Explore Hotels
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
    );
  };
  