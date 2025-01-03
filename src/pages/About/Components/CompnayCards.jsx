/* eslint-disable react/prop-types */
import Marquee from "react-fast-marquee";

const Card = ({ image, title, description, align }) => {
    return (

        <div className={`max-w-[300px] h-[600px] flex flex-col overflow-hidden flex-shrink-0 ${align}`}>
            <div className={`shadow-md flex flex-col border rounded-lg bg-white`}>
                <img
                    src={image}
                    alt={title}
                    className="h-[300px] w-full rounded-t-lg object-cover"
                />
                <div className={`p-4 py-6 text-left flex flex-col`}>
                    <h3 className="text-mobile/h5 md:text-desktop/h5 font-bold text-gray-800">
                        {title}
                    </h3>
                    <p className="mt-2 text-mobile/body/2 md:text-desktop/body/1 text-gray-600">
                        {description}
                    </p>
                </div>
            </div>
        </div>

    );
};

const CompnayCards = (cards) => {
    return (
        <div className="py-12 h-[700px] content">
            <Marquee
                gradient={false}
                // pauseOnHover={true}
                speed={50}
            >                <div className="flex overflow-x-auto hotelSelection w-full gap-8">
                    {cards?.cards?.map((card, index) => (
                        <Card
                            key={index}
                            image={card.image}
                            title={card.title}
                            description={card.description}
                            align={index % 2 === 0 ? "justify-end" : "justify-start"} // Dynamic alignment
                        />
                    ))}
                </div>
            </Marquee>
        </div>
    );
};

export default CompnayCards;
