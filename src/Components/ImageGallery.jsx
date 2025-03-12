import Marquee from "react-fast-marquee";
import useUpdatePagesHook from "../ApiHooks/useUpdatePagesHook";

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
    ...images.map(src => ({ type: "image", src })),
    ...content
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

  return (
    <div className="relative z-10 w-full md:h-[40rem] h-[600px] overflow-hidden">
      <Marquee gradient={false} speed={50}>
        <div className="ps-2 sm:ps-4 w-full">
          {/* Responsive columns:
              - On mobile (base): 2 columns for a Pinterest-like feel
              - On small screens: still 2 columns
              - On medium screens: 3 columns
              - On large screens: 4 columns */}
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {shuffledItems.map((item, index) => {
              if (item.type === "image") {
                return (
                  <div key={`image-${index}`} className="break-inside-avoid mb-4">
                    <div className="relative group">
                      <img
                        src={item.src}
                        alt=""
                        className="w-full rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 rounded-xl" />
                    </div>
                  </div>
                );
              }

              if (item.type === "div") {
                return (
                  <div key={item._id} className="break-inside-avoid mb-4">
                    <div 
                      className={`${item.bg} p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-primary-white font-bold flex items-center justify-center`}
                      style={{ 
                        backgroundColor: item.bg,
                        minHeight: index % 2 === 0 ? '16rem' : '20rem'
                      }}
                    >
                      <div className="text-center w-full text-xl">
                        {item.content}
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </Marquee>
    </div>
  );
};

export default ImageGallery;
