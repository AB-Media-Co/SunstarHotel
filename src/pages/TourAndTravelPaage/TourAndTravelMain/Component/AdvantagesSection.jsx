// src/components/AdvantagesSection.jsx
import React from "react";

/**
 * AdvantagesSection
 * - Accepts `data` from backend. Example shape:
 *   [
 *     {
 *       title: "Our Advantages",
 *       desc: "You can rely ...",
 *       types: [
 *         { title: "Save Time", desc: "No more switching..." },
 *         ...
 *       ]
 *     }
 *   ]
 *
 * - If data is missing, falls back to the static `featuresFallback`.
 * - Icons are assigned by index (no matching by name).
 */

const featuresFallback = [
  {
    icon: "/images/TourAndTravel/clock.svg",
    title: "Save Time",
    desc: "No More Switching For Packages Or Plans.",
  },
  {
    icon: "/images/TourAndTravel/savemoney.svg",
    title: "Save Money",
    desc: "Compare, Negotiate, And Choose The Best.",
  },
  {
    icon: "/images/TourAndTravel/network.svg",
    title: "Trusted Network",
    desc: "A Trusted Network Of Travel Agents",
  },
  {
    icon: "/images/TourAndTravel/multipleoption.svg",
    title: "Multiple Options",
    desc: "Itineraries & Travel Tips From Trusted Agents",
  },
];

// list of icon URLs — primary source for icons (index-mapped)
const iconList = [
  "/images/TourAndTravel/clock.svg",
  "/images/TourAndTravel/savemoney.svg",
  "/images/TourAndTravel/network.svg",
  "/images/TourAndTravel/multipleoption.svg",
];

const AdvantagesSection = ({ data }) => {
  // pick the first advantages section from data (if your API returns multiple sections change logic)
  // data might be an array: [ { title, desc, types: [...] } ]
  const section = Array.isArray(data) && data.length > 0 ? data[0] : null;
  console.log(section)

  // Use types from API if present, otherwise fall back to featuresFallback items
  const items = section && Array.isArray(section.types) && section.types.length > 0
    ? section.types
    : featuresFallback.map(f => ({ title: f.title, desc: f.desc }));

  const sectionTitle = section?.title ?? "Our Advantages";
  const sectionDesc = section?.desc ?? "You can rely on our experience and the quality of services we provide. Here are other reasons to book tours at Hotel Sunstar Group.";

  return (
    <section className="bg-primary-green py-16 text-center text-white">
      <div className="content mx-auto px-4">
        <h2 className="text-mobile/h3 md:text-desktop/h3 text-white mb-2">
          {sectionTitle}
        </h2>
        <p className="text-sm md:text-base text-white mb-10 max-w-xl mx-auto">
          {sectionDesc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => {
            // choose icon by index; if more items than icons, cycle the icon list
            const icon = iconList[idx % iconList.length];

            return (
              <div key={item._id ?? `${idx}-${item.title}`} className="flex flex-col items-center">
                <div
                  className="bg-white rounded-full p-6 flex items-center justify-center mb-4 shadow-md"
                  style={{ width: 120, height: 120 }}
                  aria-hidden="true"
                >
                  {/* Decorative icon */}
                  <img
                    src={icon}
                    alt=""
                    className="w-20 h-20 object-contain"
                    loading="lazy"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-md text-white max-w-[260px]">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
