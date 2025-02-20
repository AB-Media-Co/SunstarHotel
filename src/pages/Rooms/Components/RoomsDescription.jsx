
const RoomsDescription = () => {
    

    return (
        <div className="w-full bg-primary-white py-4 md:py-12 px-4 md:px-8 lg:px-16">
            <div className="content gap-5 flex md:items-center flex-col lg:flex-row justify-between">
                {/* Text Section */}
                <div className="lg:w-1/2 md:text-center lg:text-left flex flex-col gap-4">
                    <h1 className="text-mobile/h2 md:text-desktop/h2 text-reveal-animation font-bold">
                        Description
                    </h1>
                    <p className="text-mobile/body/2 md:text-desktop/body/1 animation-on-scroll leading-relaxed">
                        Nullam elementum ante a massa posuere mollis. Integer bibendum consequat
                        nulellentesque ac quam urna. Nam vel lectus libero. Sed id varius nunc. Cras
                        diam velit, commodo ut scelerisque ultricies, commodo quis sapien fermentum.
                        Nam urna nisl, luctus ac cursus lectus non, pellentesque placerat est.
                        Vivamus dapibus augue. Pellentesque pellentesque orci sed sem sagittis,
                        convallis malesuada tellus commodo. Proin egestas ut justo sed molestie.
                        Morbi vitae laoreet ante, elementum in ligula. Sed imperdiet, urna eget
                        ullamcorper pharetra, mi nulla mattis odio, blandit porttitor tellus velit eu
                        justo.
                    </p>
                </div>

                {/* Image Section */}
                <img
                    src="/images/AbouPageImages/cardImg1.png"
                    alt="Corporate Booking Banner"
                    className="w-[500px] h-[250px] rounded-xl animation-on-scroll bg-cover"
                />
            </div>
        </div>
    );
};

export default RoomsDescription;
