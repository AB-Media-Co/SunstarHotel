/* eslint-disable react/prop-types */
// import Marquee from "react-fast-marquee";

// const ImageGallery = ({  items }) => {


//     return (
//         <Marquee gradient={false} >
//         <div className="px-2 sm:px-4">
//           <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
//             {items.map((item) => {
//               if (item.type === "image") {
//                 return (
//                   <img
//                     key={item.id}
//                     src={item.src}
//                     alt=""
//                     className="w-full rounded-xl shadow mb-4"
//                   />
//                 );
//               }
//               if (item.type === "div") {
//                 return (
//                   <div
//                     key={item.id}
//                     className={`mb-4 p-4 h-[230px] flex justify-center items-center text-white text-center font-bold rounded-xl shadow ${item.bg}`}
//                   >
//                     {item.content}
//                   </div>
//                 );
//               }
//               return null;
//             })}
//           </div>
//         </div>
//       </Marquee>
//     );
// };

// export default ImageGallery;



/* eslint-disable react/prop-types */
import Marquee from "react-fast-marquee";

const ImageGallery = ({ items }) => {
    return (
        <Marquee gradient={false} speed={50} >
            <div className="px-2 sm:px-4">
                <div className="columns-2 sm:columns-3 md:columns-4 gap-4">
                    {items.map((item, index) => {
                        const dynamicHeight = index % 2 === 0 ? "h-64" : "h-80"; // Alternate heights for interest

                        if (item.type === "image") {
                            return (
                                <img
                                    key={item.id}
                                    src={item.src}
                                    alt=""
                                    className="w-full rounded-xl shadow mb-4"
                                />
                            );
                        }

                        if (item.type === "div") {
                            return (
                                <div
                                    key={item.id}
                                    className={`p-4 ${dynamicHeight} flex justify-center items-center text-white my-2 text-center font-bold rounded-xl shadow-lg  transition-all duration-300 ${item.bg}`}
                                >
                                    {item.content}
                                </div>
                            );
                        }

                        return null;
                    })}
                </div>
            </div>
        </Marquee>
    );
};

export default ImageGallery;
