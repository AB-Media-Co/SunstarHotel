/* eslint-disable react/prop-types */
import Marquee from "react-fast-marquee";
import Masonry from "react-masonry-css";

const ImageGallery = ({breakpointColumnsObj,items}) => {
  

    return (
        <Marquee>
            <div className="w-full flex overflow-hidden">
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {items.map((item, index) => (
                        item.type === "image" ? (
                            <img
                                key={index}
                                src={item.src}
                                alt={`Item ${index}`}
                                className="w-full rounded-lg shadow-lg mb-4 object-cover"
                            />
                        ) : (
                            <div
                                key={index}
                                style={{ minWidth: '150px', height: `${item.height}px` }}
                                className={`flex items-center justify-center rounded-lg shadow-lg mb-4 ${item.bg}`}
                            >
                                <span className="text-white text-lg font-bold text-center px-4">
                                    {item.content}
                                </span>
                            </div>
                        )
                    ))}
                </Masonry>
            </div>
        </Marquee>
    );
};

export default ImageGallery;
