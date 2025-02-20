import React from 'react';
import { Link } from 'react-router-dom';

const CityPage = () => {
    return (
        <div className="bg-gray-100">
            {/* Banner */}
            <div className="relative overflow-hidden bg-cover bg-center h-96" style={{ backgroundImage: 'url("/images/HomepageImages/sec3CardImg.png")' }}>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="absolute inset-0 flex flex-col justify-center content  text-primary-white">
                    <h1 className="text-4xl font-bold">Ahmedabad</h1>
                    <div className="mt-4">
                        <input type="date" className="bg-primary-white text-gray-800 p-2 rounded-lg" />
                        <button className="bg-green-500 text-primary-white p-2 ml-2 rounded-lg">Check Availability</button>
                    </div>
                </div>
            </div>


            <div className='content'>
                {/* Hotels */}
                <section className="container mx-auto py-8">
                    <h2 className="text-3xl font-bold mb-4">Hotels in Ahmedabad</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Featured Hotels */}
                        <div className="bg-primary-white shadow-lg p-4 rounded-lg">
                            <img src="/images/HomepageImages/sec3CardImg.png" alt="Featured Hotel" className="w-full h-48 object-cover rounded-lg mb-4" />
                            <h3 className="text-2xl font-bold">Featured Hotel 1</h3>
                            <p className="text-gray-600">Description of the featured hotel.</p>
                            <button className="bg-green-500 text-primary-white p-2 mt-4 rounded-lg">Book Now</button>
                        </div>
                        <div className="bg-primary-white shadow-lg p-4 rounded-lg">
                            <img src="/images/HomepageImages/sec3CardImg.png" alt="Featured Hotel" className="w-full h-48 object-cover rounded-lg mb-4" />
                            <h3 className="text-2xl font-bold">Featured Hotel 2</h3>
                            <p className="text-gray-600">Description of the featured hotel.</p>
                            <button className="bg-green-500 text-primary-white p-2 mt-4 rounded-lg">Book Now</button>
                        </div>
                        {/* Other Hotels */}
                        <div className="bg-primary-white shadow-lg p-4 rounded-lg">
                            <img src="/images/HomepageImages/sec3CardImg.png" alt="Hotel" className="w-full h-48 object-cover rounded-lg mb-4" />
                            <h3 className="text-2xl font-bold">Hotel 1</h3>
                            <p className="text-gray-600">Description of the hotel.</p>
                            <button className="bg-green-500 text-primary-white p-2 mt-4 rounded-lg">Book Now</button>
                        </div>
                        <div className="bg-primary-white shadow-lg p-4 rounded-lg">
                            <img src="/images/HomepageImages/sec3CardImg.png" alt="Hotel" className="w-full h-48 object-cover rounded-lg mb-4" />
                            <h3 className="text-2xl font-bold">Hotel 2</h3>
                            <p className="text-gray-600">Description of the hotel.</p>
                            <button className="bg-green-500 text-primary-white p-2 mt-4 rounded-lg">Book Now</button>
                        </div>
                    </div>
                </section>

                {/* What Makes Us Shine */}
                <section className="container mx-auto py-8">
                    <h2 className="text-3xl font-bold mb-4">What Makes Us Shine</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-primary-white shadow-lg p-4 rounded-lg">
                            <h3 className="text-2xl font-bold">Lowest Price, Guaranteed!</h3>
                            <p className="text-gray-600">We offer the best prices for your stay.</p>
                        </div>
                        <div className="bg-primary-white shadow-lg p-4 rounded-lg">
                            <h3 className="text-2xl font-bold">Exceptional Service</h3>
                            <p className="text-gray-600">Our team is dedicated to making your stay memorable.</p>
                        </div>
                    </div>
                </section>

                {/* About City */}
                <section className="container mx-auto py-8">
                    <h2 className="text-3xl font-bold mb-4">About Ahmedabad</h2>
                    <p className="text-gray-600">Ahmedabad is a vibrant city with a rich history and a bustling modern life. It is known for its architectural marvels, vibrant markets, and cultural events.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-primary-white shadow-lg p-4 rounded-lg">
                            <h3 className="text-2xl font-bold">Monuments</h3>
                            <p className="text-gray-600">Explore the historical monuments of Ahmedabad.</p>
                        </div>
                        <div className="bg-primary-white shadow-lg p-4 rounded-lg">
                            <h3 className="text-2xl font-bold">Night Life</h3>
                            <p className="text-gray-600">Enjoy the vibrant night life with numerous bars and clubs.</p>
                        </div>
                        <div className="bg-primary-white shadow-lg p-4 rounded-lg">
                            <h3 className="text-2xl font-bold">Activities</h3>
                            <p className="text-gray-600">Engage in various activities like hiking, cycling, and more.</p>
                        </div>
                        <div className="bg-primary-white shadow-lg p-4 rounded-lg">
                            <h3 className="text-2xl font-bold">Events</h3>
                            <p className="text-gray-600">Attend cultural and sports events throughout the year.</p>
                        </div>
                    </div>
                </section>

                {/* Scroller */}
                <section className="container mx-auto py-8">
                    <h2 className="text-3xl font-bold mb-4">Popular Destinations</h2>
                    <div className="flex overflow-x-auto space-x-4">
                        <div className="bg-primary-white shadow-lg p-4 rounded-lg w-64">
                            <img src="/path/to/destination.jpg" alt="Destination" className="w-full h-32 object-cover rounded-lg mb-4" />
                            <h3 className="text-2xl font-bold">Destination 1</h3>
                        </div>
                        <div className="bg-primary-white shadow-lg p-4 rounded-lg w-64">
                            <img src="/path/to/destination.jpg" alt="Destination" className="w-full h-32 object-cover rounded-lg mb-4" />
                            <h3 className="text-2xl font-bold">Destination 2</h3>
                        </div>
                        <div className="bg-primary-white shadow-lg p-4 rounded-lg w-64">
                            <img src="/path/to/destination.jpg" alt="Destination" className="w-full h-32 object-cover rounded-lg mb-4" />
                            <h3 className="text-2xl font-bold">Destination 3</h3>
                        </div>
                    </div>
                </section>

                {/* Corporate Bookings */}
                <section className="container mx-auto py-8">
                    <h2 className="text-3xl font-bold mb-4">Corporate Bookings</h2>
                    <p className="text-gray-600">We offer special packages for corporate bookings.</p>
                    <button className="bg-green-500 text-primary-white p-2 mt-4 rounded-lg">Contact Us</button>
                </section>

                {/* Developers & Owners */}
                <section className="container mx-auto py-8">
                    <h2 className="text-3xl font-bold mb-4">Developers & Owners</h2>
                    <p className="text-gray-600">Partner with us to grow your business.</p>
                    <button className="bg-green-500 text-primary-white p-2 mt-4 rounded-lg">Join Us</button>
                </section>

                {/* Bottom Banner */}
                <div className="bg-green-500 text-primary-white py-8">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Book Your Stay?</h2>
                        <p className="text-lg">Choose from our wide selection of hotels and book directly for the best prices.</p>
                        <button className="bg-primary-white text-green-500 p-2 mt-4 rounded-lg">Book Now</button>
                    </div>
                </div>

                {/* Links to Different City Pages */}
                <footer className="bg-primary-white py-8">
                    <div className="container mx-auto text-center">
                        <p className="text-gray-600">Explore Other Cities</p>
                        <div className="flex justify-center space-x-4 mt-4">
                            <Link to="/mumbai" className="text-green-500 hover:text-green-700">Mumbai</Link>
                            <Link to="/delhi" className="text-green-500 hover:text-green-700">Delhi</Link>
                            <Link to="/bangalore" className="text-green-500 hover:text-green-700">Bangalore</Link>
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    );
};

export default CityPage;