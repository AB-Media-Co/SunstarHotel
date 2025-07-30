import React from 'react';

const SunstarMediaSection = () => {
  const mediaItems = [
    {
      id: 1,
      publication: "Livemint",
      title: "Sunstar Hotel Group wins bid for Janpath Hotel in Delhi.",
      readLink: "#"
    },
    {
      id: 2,
      publication: "The Economic Times",
      title: "Sunstar Hotel Group acquires Hotel Asian International",
      readLink: "#"
    },
    {
      id: 3,
      publication: "ET Realty",
      title: "Sunstar Hotels plan to open 10 new properties in Gujarat.",
      readLink: "#"
    },
    {
      id: 4,
      publication: "BW Hotelier",
      title: "Sunstar Hotel Group to expand in Tier 2 locations.",
      readLink: "#"
    },
    {
      id: 5,
      publication: "ET Hospitality World",
      title: "Sunstar Hotel Group finally arrives in Kerala.",
      readLink: "#"
    },
    {
      id: 6,
      publication: "Elle Décor India",
      title: "Sunstar in Kochi makes for a serene, coastal getaway.",
      readLink: "#"
    }
  ];

  return (
    <div className="w-full content ">
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {mediaItems.map((item) => (
            <div key={item.id} className=" py-6 ">
              {/* Publication Name */}
              <h3 className="text-lg sm:text-xl font-bold text-primary-green mb-4">
                {item.publication}
              </h3>
              
              {/* Article Title */}
              <p className="text-primary-gray text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                {item.title}
              </p>
              
              {/* Read Link */}
              <a 
                href={item.readLink}
                className="text-gray-400 text-sm hover:text-primary-green transition-colors duration-200 inline-block"
              >
                Read
              </a>
            </div>
          ))}
        </div>
    </div>
  );
};

export default SunstarMediaSection;