import useUpdatePagesHook from "../ApiHooks/useUpdatePagesHook";
import Masonry from 'react-masonry-css';

const ImageGallery = () => {
  const { galleryImages } = useUpdatePagesHook();

  if (!galleryImages || !galleryImages.images || !galleryImages.content) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        Loading or no data available...
      </div>
    );
  }

  const { images, content } = galleryImages;
  const combinedItems = [
    ...content,
    ...images.map(src => ({ type: "image", src })),
  ];

  // Fisher-Yates shuffle
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const shuffledItems = shuffleArray(combinedItems);

  const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    768: 2,
    480: 2,
  };

  const rowsToShow = 2;
  const columns = 4;
  const totalItems = rowsToShow * columns;

  const itemsToRender = shuffledItems.slice(0, totalItems);
  

  return (
    <>
      {/* CSS for infinite scroll animation */}
      <style jsx>{`
        .scroll-container {
          overflow: hidden;
          position: relative;
        }
        
        .scroll-content {
          display: flex;
          animation: infiniteScroll 5s linear infinite;
          will-change: transform;
        }
        
        .scroll-item {
          flex-shrink: 0;
          width: 100%;
        }
        
        @keyframes infiniteScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .my-masonry-grid {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          margin-left: -16px;
          width: auto;
        }
        
        .my-masonry-grid_column {
          margin-left: 16px;
          background-clip: padding-box;
        }
        
        .my-masonry-grid_column > div {
          margin-bottom: 16px;
        }
        
   
      `}</style>

      <div className="relative z-10 w-full">
        <div className="ps-4 sm:ps-6 py-8 scroll-container">
          <div className="scroll-content">
            {/* First set of items */}
            <div className="scroll-item">
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {itemsToRender.map((item, index) => {
                  if (item.type === "image") {
                    return (
                      <div
                        key={`image-${index}-first`}
                        className="rounded-2xl shadow-md bg-white"
                      >
                        <img
                          src={item.src}
                          alt="Gallery item"
                          className="w-full object-cover rounded-2xl"
                          loading="lazy"
                        />
                      </div>
                    );
                  }

                  if (item.type === "div") {
                    return (
                      <div
                        key={`${item._id}-first`}
                        className="rounded-2xl shadow-md"
                        style={{
                          backgroundColor: item.bg || "#FFEB3B",
                          minHeight: index % 2 === 0 ? '10rem' : '14rem',
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
                    );
                  }
                  return null;
                })}
              </Masonry>
            </div>

            {/* Duplicate set for seamless loop */}
            <div className="scroll-item">
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {itemsToRender.map((item, index) => {
                  if (item.type === "image") {
                    return (
                      <div
                        key={`image-${index}-second`}
                        className="rounded-2xl shadow-md bg-white"
                      >
                        <img
                          src={item.src}
                          alt="Gallery item"
                          className="w-full object-cover rounded-2xl"
                          loading="lazy"
                        />
                      </div>
                    );
                  }

                  if (item.type === "div") {
                    return (
                      <div
                        key={`${item._id}-second`}
                        className="rounded-2xl shadow-md"
                        style={{
                          backgroundColor: item.bg || "#FFEB3B",
                          minHeight: index % 2 === 0 ? '10rem' : '14rem',
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
                    );
                  }
                  return null;
                })}
              </Masonry>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageGallery;