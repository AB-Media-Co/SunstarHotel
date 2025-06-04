
const BenefitsCard = () => {
    const featureItems = [
        { title: "Couple Friendly", icon: "/images/DayUseRoom/Couple.svg" },
        { title: "Local ID Accepted", icon: "/images/DayUseRoom/Id.svg" },
        { title: "Clean Linen", icon: "/images/DayUseRoom/CleanL.svg" },
        { title: "Friendly Staff", icon: "/images/DayUseRoom/staff.svg" },
        { title: "6 Hour Stay", icon: "/images/DayUseRoom/6hrsStay.svg" },
        { title: "Pay @ Hotel", icon: "/images/DayUseRoom/PayAtHotel.svg" },
    ];
    
    return (
        <div>
            <section className="py-12 ">
                <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold content text-start">Benifits</h2>
                <div className="mt-8 grid grid-cols-2 content sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {featureItems.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-primary-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300"
                        >
                            <div className="mb-4">
                                <img src={feature.icon} alt="" className='w-[80px] h-[80px]' />
                            </div>
                            <p className="text-lg text-center font-semibold text-[#058FA2]">{feature.title}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default BenefitsCard
