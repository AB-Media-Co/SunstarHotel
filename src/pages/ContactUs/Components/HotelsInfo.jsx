/* eslint-disable react/prop-types */
import { PhoneIcon, MapPin, Mail, ExternalLink } from "lucide-react";

const HotelsInfo = ({ hotels }) => {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 py-16">
      <div className="content mx-auto ">
        {/* Heading Section */}
        <div className="text-start mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600  ">
            Find us at these convenient locations. We're always ready to welcome you with exceptional service.
          </p>
        </div>

        {/* Hotel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-8">
          {hotels?.hotels?.map((hotel, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Hotel Image with Overlay */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Hotel Name Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold">{hotel.name}</h3>
                </div>
              </div>

              {/* Hotel Info */}
              <div className="p-5 space-y-4">
                {/* Contact Info Section */}
                <div className="space-y-3">
                  {/* Phone Number */}
                  <div className="flex items-center gap-4 text-gray-700">
                    <div className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center ">
                      <PhoneIcon size={18} className="text-primary-green" />
                    </div>
                    <a href={`tel:+91${hotel.phoneNumber}`} className="hover:text-primary-green transition-colors">
                      +91 {hotel.phoneNumber}
                    </a>
                  </div>

                  {/* Location */}
                  <div className="flex gap-4 items-center text-gray-700">
                    <div className="w-14 md:w-10 h-10 rounded-full bg-primary-green/10  flex items-center justify-center ">
                      <MapPin size={18} className="text-primary-green" />
                    </div>
                    <p className=" truncate">{hotel.location?.hotelAddress}</p>
                  </div>

                  {/* Email - Optional, add if available */}
                  {hotel.email && (
                    <div className="flex items-center text-gray-700">
                      <div className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center mr-3">
                        <Mail size={18} className="text-primary-green" />
                      </div>
                      <a href={`mailto:${hotel.email}`} className="hover:text-primary-green transition-colors">
                        {hotel.email}
                      </a>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex space-x-3 border-t border-gray-100">
                  <a
                    href={`tel:+91${hotel.phoneNumber}`}
                    className="flex-1 py-2 text-center rounded-lg bg-primary-green text-white font-medium hover:bg-primary-green/90 transition-colors"
                  >
                    Call Now
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.location?.hotelAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 text-center rounded-lg border border-primary-green text-primary-green font-medium hover:bg-primary-green/5 transition-colors flex items-center justify-center"
                  >
                    <span>Directions</span>
                    <ExternalLink size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelsInfo;