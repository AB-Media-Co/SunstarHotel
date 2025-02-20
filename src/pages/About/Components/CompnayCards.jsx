/* eslint-disable react/prop-types */

import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook";


const Card = ({ image, title, description }) => {
    return (

        <div className={`max-w-[280px] flex flex-col relative animation-on-scroll  overflow-hidden shadow-xl  border rounded-lg bg-primary-white`}>
            <img
                src={image}
                alt={title}
                className="h-[240px] w-full rounded-t-lg shadow-xl object-cover"
            />
            <div className={`p-4 py-6 text-left   bg-custom-bg bg-cover bg-left`}>
                <h3 className="text-mobile/h5 bg-[#6BC0BE] md:text-desktop/h5/medium font-bold text-primary-white rounded-lg p-2 px-4 left-2  shadow-2xl absolute top-56 mx-auto">
                    {title}
                </h3>
                <p className="mt-2 text-mobile/body/2 md:text-desktop/body/1 text-[#A4A4A4]">
                    {description}
                </p>
            </div>
        </div>

    );
};

const CompnayCards = () => {
    const { offeringSection } = useUpdatePagesHook();

    return (
        <div className="py-12 flex flex-col gap-8  content">
            <h1 className="text-mobile/h1 text-center md:text-left text-black text-reveal-animation">{offeringSection?.heading} </h1>
            <div className="flex justify-center md:justify-evenly  flex-wrap gap-10 hotelSelection">
                {offeringSection?.offers?.map((card, index) => (
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
