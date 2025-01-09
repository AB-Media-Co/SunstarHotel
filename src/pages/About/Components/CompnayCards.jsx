/* eslint-disable react/prop-types */

const Card = ({ image, title, description }) => {
    return (

        <div className={`max-w-[280px] flex flex-col relative overflow-hidden shadow-xl  border rounded-lg bg-white`}>
            <img
                src={image}
                alt={title}
                className="h-[240px] w-full rounded-t-lg shadow-xl object-cover"
            />
            <div className={`p-4 py-6 text-left`}>
                <h3 className="text-mobile/h5 bg-[#6BC0BE] md:text-desktop/h5/medium font-bold text-white rounded-lg p-2 px-4  shadow-2xl absolute top-56 mx-auto">
                    {title}
                </h3>
                <p className="mt-2 text-mobile/body/2 md:text-desktop/body/1 text-[#A4A4A4]">
                    {description}
                </p>
            </div>

        </div>

    );
};

const CompnayCards = (cards) => {
    return (
        <div className="py-12 flex flex-col gap-8  content">
            <h1 className="text-mobile/h1 text-center md:text-left text-[#6EC4C2]">What We’re Offering </h1>
            <div className="flex justify-center md:justify-between flex-wrap gap-10 hotelSelection">
                {cards?.cards?.map((card, index) => (
                    <Card
                        key={index}
                        image={card.image}
                        title={card.title}
                        description={card.description}
                    />
                ))}
            </div>

        </div>
    );
};

export default CompnayCards;
