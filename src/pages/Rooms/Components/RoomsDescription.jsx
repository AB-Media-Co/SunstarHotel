import useScrollAnimations from "../../../hooks/useScrollAnimations";
import useTextRevealAnimation from "../../../hooks/useTextRevealAnimation";

const RoomsDescription = () => {

    useTextRevealAnimation();
    useScrollAnimations();
    return (
        <div className={`w-full bg-white  py-12  px-4 md:px-8 lg:px-16`}>
            <div className={`content flex items-center section flex-col  lg:flex-row justify-between `}>
                {/* Text Section */}
                <div className="lg:w-1/2 text-center lg:text-left flex flex-col gap-4">
                    <h1 className={`md:text-[38px]  text-reveal-animation font-bold  `}>
                        Description
                    </h1>
                    <p className={` text-lg md:text-lg  animation-on-scroll leading-relaxed`}>
                        Nullam elementum ante a massa posuere mollis. Integer bibendum consequat nulellentesque ac quam urna. Nam vel lectus libero. Sed id varius nunc. Cras diam velit, commodo ut scelerisque ultricies, commodo quis sapib fermentum. Nam urna nisl, luctus ac cumsan lectus non, pellentesque placerat est. Vivamus dapugiat. Pellentesque peue orci sed sem sagittis, convallis malesuada tel us commodo. Proin egestas ut justo sed molestie. Morbi vitae laored ante ss elementd in ligula. Sed imperdiet, urna eget ullamc orper pharetra, mi nulla mattis odio, blandit porttitor tellus velit eu justo
                    </p>
                </div>

                {/* Image Section */}
                <img
                    src="/images/AbouPageImages/cardImg1.png"
                    alt="Corporate Booking Banner"
                    className="w-[500px] h-[250px] rounded-xl  animation-on-scroll  bg-cover"
                />


            </div>
        </div>
    )
}

export default RoomsDescription
