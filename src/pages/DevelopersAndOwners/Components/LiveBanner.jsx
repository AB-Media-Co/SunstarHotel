import CountUp from "react-countup";

const LiveBanner = () => {
    const stats = [
        {
            icon: "/images/othericons/Deals.svg",
            number: '0000',
            prefix: "Deal",
            status: "Revived",
        },
        {
            icon: "/images/othericons/rejected.svg",
            number: '0000',
            prefix: "Deal",
            status: "Rejected",
        },
        {
            icon: "/images/othericons/DealApprove.svg",
            number: '0000',
            prefix: "Deal",
            status: "Approved",
        },
    ];

    return (
        <div className="bg-[#FFC60D] w-full">
            <div className="md:max-w-screen-xl flex-wrap md:mx-auto py-4 md:py-6 px-2 md:px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                    {stats.map((item, index) => (
                        <div key={index} className="flex items-center md:justify-center gap-2 md:gap-4  rounded-lg p-3 md:p-4">
                            <img src={item.icon} alt={item.status} className="w-10 h-10 md:w-14 md:h-14" />
                            <div className="flex gap-1 md:gap-2 items-center leading-tight">
                                <span className="text-white text-2xl md:text-4xl font-bold">
                                    {/* <CountUp start={0} end={item.number} duration={2} separator="," /> */}
                                    {item.number}
                                </span>
                                <div className="flex gap-1 mdd:gap-0  md:flex-col">
                                    <span className="text-white text-lg md:text-sm font-medium">{item.prefix}</span>
                                    <span className="text-white text-lg md:text-sm font-medium">{item.status}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LiveBanner;
