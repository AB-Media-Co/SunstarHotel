/* eslint-disable react/prop-types */

import { useLocation } from "react-router-dom";
import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook";
import { useEffect } from "react";

const Card = ({ image, title, description, buttonText }) => {
    return (
        <div className="lg:max-w-[350px] w-full flex flex-col relative animation-on-scroll overflow-hidden shadow-xl border rounded-lg bg-primary-white">
            <img
                src={image}
                alt={title}
                className="h-[240px] md:h-[260px] lg:h-[240px] w-full rounded-t-lg shadow-xl object-cover"
            />

            <div className="p-4 py-6 text-left bg-custom-bg bg-cover bg-left md:flex-1 lg:flex-none">

                <h3 className="text-mobile/h5 bg-[#6BC0BE] md:text-desktop/h5/medium font-bold text-primary-white rounded-lg p-2 px-4 left-2 shadow-2xl absolute top-56 mx-auto">
                    {title}
                </h3>
                <p className="mt-2 whitespace-pre-line text-mobile/body/2 md:text-desktop/body/1 text-[#A4A4A4]">
                    {description}
                </p>

                <div className="mt-4">
                    <button className="text-primary-green font-bold hover:underline">
                        {buttonText || "Read More"}
                    </button>
                </div>

            </div>
        </div>
    );
};


const CompnayCards = ({ data }) => {
    const offerings = data || {};
    const location = useLocation();

    useEffect(() => {
        if (location.hash === "#what-we-offer") {
            document.getElementById("what-we-offer")?.scrollIntoView({ behavior: "smooth" });
        }
    }, [location]);

    return (
        <div id="what-we-offer" className="py-12 flex flex-col gap-8 content">
            <h1 className="text-mobile/h3 md:text-desktop/h3 font-bold text-reveal-animation">
                {offerings?.heading}
            </h1>

            <div className="flex justify-center lg:justify-between gap-10 hotelSelection flex-col md:flex-row  md:hidden lg:flex">
                {offerings?.offers?.map((card, index) => (
                    <Card key={index} image={card.image} title={card.title} description={card.description} buttonText={card.buttonText} />
                ))}
            </div>

            {/* Tablet-only (md to <lg) grid */}
            <div className="hidden md:grid lg:hidden grid-cols-2 gap-8 place-items-center">
                {offerings?.offers?.map((card, index) => (
                    <Card key={index} image={card.image} title={card.title} description={card.description} buttonText={card.buttonText} />
                ))}
            </div>
        </div>
    );
};

export default CompnayCards;
