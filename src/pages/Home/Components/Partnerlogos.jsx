// src/pages/Partnerlogos.jsx
import { useGetPartners } from "../../../ApiHooks/usePartnersHooks";
import { motion } from "framer-motion";

const Partnerlogos = ({ category }) => {
  const { data: partners = [], isLoading, isError } = useGetPartners();

  const filteredPartners = category
    ? partners.filter(p => p.category === category || (!p.category && category === 'Corporate'))
    : partners;

  return (
    <section className="py-12 bg-gray-50">
      <div className="content mx-auto max-w-6xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-mobile/h2 md:text-desktop/h3 font-bold md:font-bold text-black text-center md:text-left mb-8 text-reveal-animation">
          Our Partners
        </motion.h2>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-28 bg-white rounded-lg shadow-sm border border-gray-100 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="text-center text-red-600">
            Failed to load partners. Please try again later.
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && filteredPartners.length === 0 && (
          <div className="text-center text-gray-500">
            No partners added yet.
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && filteredPartners.length > 0 && (
          <ul
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            aria-label="Partner logos"
          >
            {filteredPartners.map((p) => (
              <li
                key={p._id}
                className="group bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                title={p.description || "Partner"}
              >
                {/* Logo box */}
                <div className="aspect-[4/3] w-full p-4 flex items-center justify-center">
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.description ? `${p.description} logo` : "Partner logo"}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-200"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-100 rounded-md" />
                  )}
                </div>

              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Partnerlogos;
