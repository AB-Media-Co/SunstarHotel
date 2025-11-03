/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import useUpdatePagesHook from "../ApiHooks/useUpdatePagesHook";
import Masonry from "react-masonry-css";

const ImageGallery = ({ path = "default" }) => {
  const { galleryImages } = useUpdatePagesHook();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const gridForPath =
    galleryImages?.[path] ||
    galleryImages?.default ||
    galleryImages || {};

  const images = Array.isArray(gridForPath.images) ? gridForPath.images : [];
  const content = Array.isArray(gridForPath.content) ? gridForPath.content : [];

  // Memoize shuffled items to prevent re-shuffling on every render
  const itemsToRender = useMemo(() => {
    if (!images.length && !content.length) {
      return [];
    }

    const combinedItems = [
      ...content,
      ...images.map((src, idx) => ({ type: "image", src, id: `img-${idx}` })),
    ];

    // Shuffle
    const shuffled = [...combinedItems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const rowsToShow = isMobile ? 2 : 3;
    const columns = isMobile ? 3 : 4;
    const totalItems = rowsToShow * columns;

    return shuffled.slice(0, totalItems);
  }, [images, content, isMobile]);

  if (!itemsToRender.length) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        Loading or no data available...
      </div>
    );
  }

  const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    768: 2,
    480: 2,
  };

  const renderItems = (suffix) => (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {itemsToRender.map((item, index) =>
        item.type === "image" ? (
          <div
            key={`${item.id}-${suffix}-${index}`}
            className="rounded-xl shadow-md bg-white"
          >
            <img
              src={item.src}
              alt="Gallery item"
              className="w-full h-auto rounded-xl"
              loading="lazy"
            />
          </div>
        ) : (
          <div
            key={`${item._id || index}-${suffix}`}
            className="rounded-xl shadow-md"
            style={{
              backgroundColor: item.bg || "#FFEB3B",
              minHeight: index % 2 === 0 ? "10rem" : "14rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <div className="text-start text-white font-bold text-2xl leading-snug">
              {item.content}
            </div>
          </div>
        )
      )}
    </Masonry>
  );

  return (
    <div className="relative z-10 w-full overflow-hidden">
      <div className="ps-4 sm:ps-6 py-8">
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
          className="flex"
          style={{ width: "200%" }}
        >
          {/* First set */}
          <div className="w-1/2 flex-shrink-0 ">
            {renderItems("first")}
          </div>

          {/* Duplicate for seamless loop */}
          <div className="w-1/2 flex-shrink-0 pl-">
            {renderItems("second")}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImageGallery;