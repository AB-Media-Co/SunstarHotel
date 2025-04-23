const deliveries = [
    {
        icon: "/images/othericons/speaker.svg",
        text: "Full Operational & Marketing Control ( Zero Hassle For Owners )",
    },
    {
        icon: "/images/othericons/desktop.svg",
        text: "Transparent Dashboard For Realtime Tracking",
    },
    {
        icon: "/images/othericons/lines.svg",
        text: "Strong Digital & Offline Sales Channels",
    },
    {
        icon: "/images/othericons/trust.svg",
        text: "Trusted Brand With 44 Years Of Hospitality",
    },
];

const WhatWeDeliver = () => {
    return (
        <div className="py-16 px-4 max-w-screen-xl mx-auto">
            <h2 className="text-mobile/h3 md:text-desktop/h3  text-black mb-10 text-start">
                What We Deliver For You
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {deliveries.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl bg-custom-bg shadow-lg border border-gray-100 p-6 text-start relative overflow-hidden"
                    >
                        {/* Optional decorative corner line */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-[url('/images/othericons/curve-line.svg')] bg-no-repeat bg-contain pointer-events-none"></div>

                        <img src={item.icon} alt="icon" className=" mb-4 mx-auto" />
                        <p className="text-[#666666] text-lg text-center font-medium">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhatWeDeliver;
