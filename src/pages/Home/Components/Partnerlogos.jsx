import React from 'react';
import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook";

const Partnerlogos = () => {
  const { homePartners, loading, Loader } = useUpdatePagesHook();
  console.log(homePartners);

  // Show loader while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        {Loader && <Loader />}
      </div>
    );
  }

  // Return null if no data
  if (!homePartners || !homePartners.logos || homePartners.logos.length === 0) {
    return null;
  }

  const { heading, subheading, layout, logos } = homePartners;

  // Grid Layout Component
  const GridLayout = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
      {logos.map((logo, index) => (
        <div
          key={index}
          className="flex items-center justify-center transition-shadow duration-300 "
        >
          {logo.link ? (
            <a
              href={logo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <img
                src={logo.src}
                alt={logo.alt || `Partner logo ${index + 1}`}
                className="w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            </a>
          ) : (
            <img
              src={logo.src}
              alt={logo.alt || `Partner logo ${index + 1}`}
              className="w-full  object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              loading="lazy"
            />
          )}
        </div>
      ))}
    </div>
  );

  // Carousel Layout Component
  const CarouselLayout = () => (
    <div className="relative overflow-hidden">
      <div className="flex animate-scroll gap-8 md:gap-12">
        {/* First set of logos */}
        {logos.map((logo, index) => (
          <div
            key={`first-${index}`}
            className="flex-shrink-0 flex items-center justify-center transition-shadow duration-300 "
          >
            {logo.link ? (
              <a
                href={logo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <img
                  src={logo.src}
                  alt={logo.alt || `Partner logo ${index + 1}`}
                  className="w-full  object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </a>
            ) : (
              <img
                src={logo.src}
                alt={logo.alt || `Partner logo ${index + 1}`}
                className="w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            )}
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {logos.map((logo, index) => (
          <div
            key={`second-${index}`}
            className="flex-shrink-0 flex items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 w-24 md:w-32"
          >
            {logo.link ? (
              <a
                href={logo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <img
                  src={logo.src}
                  alt={logo.alt || `Partner logo ${index + 1}`}
                  className="w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </a>
            ) : (
              <img
                src={logo.src}
                alt={logo.alt || `Partner logo ${index + 1}`}
                className="w-full  object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Add custom CSS for carousel animation */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );

  return (
    <section className="py-12  bg-gray-50">
      <div className="content mx-auto">
        {/* Header */}
       

        {/* Logos */}
        <div className=" mx-auto">
          {layout === 'carousel' ? <CarouselLayout /> : <GridLayout />}
        </div>

        
      </div>
    </section>
  );
};

export default Partnerlogos;