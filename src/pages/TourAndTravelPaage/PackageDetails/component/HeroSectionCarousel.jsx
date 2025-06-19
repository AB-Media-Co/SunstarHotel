"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"



const HeroSectionCarousel = ({packageDetails}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)
  const autoPlayDelay = 3000 
 const tourImages = packageDetails?.images ;

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveImageIndex((prevIndex) => (prevIndex === tourImages.length - 1 ? 0 : prevIndex + 1))
      }, autoPlayDelay)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, isPaused])

  const goToPrevious = () => {
    setActiveImageIndex((prevIndex) => (prevIndex === 0 ? tourImages.length - 1 : prevIndex - 1))
    // Reset autoplay timer when user manually navigates
    if (isPlaying) {
      clearInterval(intervalRef.current)
      setTimeout(() => {
        if (isPlaying && !isPaused) {
          intervalRef.current = setInterval(() => {
            setActiveImageIndex((prevIndex) => (prevIndex === tourImages.length - 1 ? 0 : prevIndex + 1))
          }, autoPlayDelay)
        }
      }, 100)
    }
  }

  const goToNext = () => {
    setActiveImageIndex((prevIndex) => (prevIndex === tourImages.length - 1 ? 0 : prevIndex + 1))
    // Reset autoplay timer when user manually navigates
    if (isPlaying) {
      clearInterval(intervalRef.current)
      setTimeout(() => {
        if (isPlaying && !isPaused) {
          intervalRef.current = setInterval(() => {
            setActiveImageIndex((prevIndex) => (prevIndex === tourImages.length - 1 ? 0 : prevIndex + 1))
          }, autoPlayDelay)
        }
      }, 100)
    }
  }

  const goToSlide = (index) => {
    setActiveImageIndex(index)
    // Reset autoplay timer when user manually navigates
    if (isPlaying) {
      clearInterval(intervalRef.current)
      setTimeout(() => {
        if (isPlaying && !isPaused) {
          intervalRef.current = setInterval(() => {
            setActiveImageIndex((prevIndex) => (prevIndex === tourImages.length - 1 ? 0 : prevIndex + 1))
          }, autoPlayDelay)
        }
      }, 100)
    }
  }



  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      goToSlide(index)
    }
  }

  return (
    <div className="content pt-24 mx-auto p-4 bg-white">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-mobile/h3 md:text-desktop/h3 font-bold text-teal-600">{packageDetails?.title}</h1>

   
        </div>

        {/* Main Image Container */}
        <div className="relative group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="relative w-full h-64 md:h-[660px] overflow-hidden rounded-lg bg-gray-100 shadow-lg">
            <img
              src={tourImages[activeImageIndex] || "/placeholder.svg"}
              alt={tourImages[activeImageIndex].alt}
              className="w-full h-full object-cover transition-opacity duration-300"
            />

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex gap-2 md:gap-8 pt-6 px-4  overflow-x-auto pb-2 scrollbar-hide">
        {tourImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => goToSlide(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`flex-shrink-0 relative w-20 h-14 md:w-36 md:h-28  overflow-hidden rounded-lg transition-all duration-200 focus:outline-none ${
              index === activeImageIndex
                ? "ring-2 ring-primary-yellow ring-offset-2 scale-105 shadow-lg"
                : "hover:scale-105 hover:ring-1 hover:ring-gray-300 hover:shadow-md focus:ring-2 focus:ring-blue-300"
            }`}
            tabIndex={0}
            role="tab"
            aria-selected={index === activeImageIndex}
            aria-label={`View ${image.alt}`}
          >
            <img src={image || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
            {index === activeImageIndex && (
              <div className="absolute inset-0 bg-blue-500/20 border-2 border-primary-yellow rounded-lg" />
            )}
          </button>
        ))}
      </div>


      <style jsx>{`
          @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
    </div>
  )
}

export default HeroSectionCarousel
