"use client"

import { useState } from "react"
import { usePackagesByState,usePackageById } from "../../../../ApiHooks/useTravelPackagesHook"
import { MapPin, Calendar, Users, Star } from "lucide-react"
import Loader from "../../../../Components/Loader"
import { useNavigate } from "react-router-dom"

const TourPackages = ({ stateName }) => {


  const { data, isLoading, isError, error } = usePackagesByState(stateName)
  console.log(data)

  const navigate = useNavigate();
  if (isLoading) {
    return (
    <Loader/>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
        <div className="text-white text-xl">Error loading packages: {error?.message}</div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-primary-green py-12">
      <div className="content mx-auto">
        {/* Header */}
        <div className="md:text-center mb-12">
      
          <h1 className="  text-mobile/h3 md:text-desktop/h3    text-white mb-2">{stateName.toUpperCase()} TOUR PACKAGES</h1>
          <p className="text-white/90 text-mobile/body/2 md:text-desktop/body/1 ">Explore India Tour Customize Tour Packages, Lowest</p>
          <p className="text-white/90 text-mobile/body/2 md:text-desktop/body/1 ">Rates, Guaranteed Services</p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={pkg.image || "/placeholder.svg?height=200&width=400"}
                  alt={pkg.title}
                  className="w-full h-48 object-cover"
                />
                {/* Duration badge on image */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                  <img src="/images/TourAndTravel/night.svg" alt="" className="w-4 h-4" />
                  <span>{pkg.duration?.nights || 4}N</span>
                  <img src="/images/TourAndTravel/day.svg" alt=""  className="w-4 h-4"/>
                  <span>{pkg.duration?.days || 5}D</span>
                </div>
                
                {pkg.topselling && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Top Selling
                  </div>
                )}
              </div>

              <div className="p-6">
                {/* Full package title without truncation */}
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-gray-800 leading-tight  flex items-start">
                    {pkg.title}
                  </h3>
                </div>

                {/* Highlights/Tags */}
                <div className="flex flex-wrap gap-2 mb-4 ">
                  {pkg.highlights?.slice(0, 3).map((highlight, index) => (
                    <span key={index} className="px-2 py-1 h-[26px] text-xs bg-primary-green text-white rounded-full font-medium flex items-center">
                      {highlight}
                    </span>
                  ))}
                  {pkg.highlights?.length > 3 && (
                    <span
                      onClick={() => navigate(`/package-detail/${encodeURIComponent(pkg.title)}`, {
                        state: { pkg }
                      })}
                      className="px-2 py-1 h-[26px] cursor-pointer text-xs border border-gray-300 text-gray-600 rounded-full flex items-center hover:bg-gray-50 transition-colors">
                      +{pkg.highlights.length - 3} more
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-gray-500 text-sm">From </span>
                    <span className="text-2xl font-bold text-primary-green">₹{pkg.price?.toLocaleString()}/-</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-primary-yellow hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-full transition-colors duration-200"
                    onClick={() => navigate('/travel-booking-form', {
                      state: { packageData: pkg }
                    })}
                    
                  >
                    Enquire Now
                  </button>
                  <button
                    className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-full transition-colors duration-200"
                    onClick={() => navigate(`/package-detail/${encodeURIComponent(pkg.title)}`, {
                      state: { pkg }
                    })}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!data || data.length === 0) && !isLoading && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-white/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No packages found</h3>
            <p className="text-white/80">No tour packages available for {stateName} at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TourPackages