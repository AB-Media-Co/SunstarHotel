/* eslint-disable react/prop-types */
import Marquee from "react-fast-marquee";
import Masonry from "react-masonry-css";

const ImageGallery = ({ breakpointColumnsObj, items }) => {
    return (
        <Marquee >
            <div className="w-full flex overflow-hidden px-4">
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid gap-4"
                    columnClassName="my-masonry-grid_column"
                >
                    {items.map((item, index) => (
                        item.type === "image" ? (
                            <img
                                key={index}
                                src={item.src}
                                alt={`Item ${index}`}
                                className="rounded-lg shadow-md transition-transform transform hover:shadow-lg mb-4 object-cover"
                                style={{
                                    width: "100%",
                                    height: `${item.height || 200}px`,
                                    objectFit: "cover",
                                }}
                                loading="lazy"
                            />
                        ) : (
                            <div
                                key={index}
                                style={{
                                    height: `${item.height || 200}px`,
                                    backgroundColor: item.bg || "#ccc",
                                }}
                                className={`flex items-center justify-center rounded-lg shadow-md mb-4 text-center transition-transform transform  hover:shadow-lg ${item.bg}`}
                            >
                                <span
                                    className="text-white text-xl font-semibold px-4"
                                    style={{
                                        fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                                    }}
                                >
                                    {item.content || "Content Unavailable"}
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
