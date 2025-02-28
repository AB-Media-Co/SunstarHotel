// src/components/CityPage.jsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Calendar from '../../Components/Calendar';
import GuestsDropdown from '../../Components/GuestsDropdown';
import { differenceInCalendarDays } from 'date-fns';
import Icon from "../../Components/Icons";
import HotelSelectingCards from '../../Components/CardsCommonComp/HotelSelectingCards';
import RoatinfImg from '../../Components/RoatinfImg';
import Sec3CardSlider from '../Home/Components/Sec3CrdSlider';
import ImageGallery from '../../Components/ImageGallery';
import Section5 from '../Home/Components/Section5';
import { useGetLocationById } from '../../ApiHooks/useLocationHook';
import Loader from '../../Components/Loader';

const CityPage = () => {
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [openCalender, setOpenCalender] = useState(false);

    const { state } = useLocation();
    const cityId = state?.id; // ID passed from CityPagesOptions

    const { data: singleLocationData } = useGetLocationById(cityId, { enabled: !!cityId });


    useEffect(() => {
        const storedCheckIn = localStorage.getItem("checkInDate");
        const storedCheckOut = localStorage.getItem("checkOutDate");
        if (storedCheckIn && storedCheckOut) {
            setCheckIn(storedCheckIn);
            setCheckOut(storedCheckOut);
        }
    }, []);

    const calculateNights = () => {
        if (checkIn && checkOut) {
            const nights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
            return <div>{nights} Nights</div>;
        }
        return 0;
    };

    return (
        <div className="">
            {singleLocationData ? (
                <>
                    <div
                        className="relative overflow-hidden bg-cover bg-center h-96"
                        style={{ backgroundImage: `url(${singleLocationData?.image}) ` }}
                    >
                        <div className="absolute inset-0 bg-primary-green z-0 bg-opacity-50"></div>
                        <div className="absolute inset-0 flex flex-col z-20 justify-center items-center lg:items-start lg:justify-end md:pb-20 content text-primary-white">
                            <h1 className="text-6xl font-bold">{singleLocationData?.name}</h1>
                        </div>
                    </div>

                    <div
                        className={`bg-primary-white py-8 px-4 lg:left-[8%] transition-all duration-500 ease-in-out 
        content absolute top-[46%] md:top-[45%]
        md:px-8 lg:px-12 rounded-md shadow-lg lg:mx-auto  
        z-10 flex flex-col items-center gap-6 mx-2`}
                    >
                        <div
                            className={`flex justify-center flex-col md:flex-row items-center w-full space-y-4 md:space-y-0 space-x-0 md:space-x-4`}
                        >
                            <div
                                onClick={() => setOpenCalender(true)}
                                className={`flex flex-wrap w-full justify-center items-center border rounded-full px-6 py-3 hover:shadow-lg ease-in-out transition-all cursor-pointer space-x-2 shadow-sm`}
                            >
                                <Icon name="calendar" className="h-6 w-6 text-[#006167]" />
                                <span className="text-[#006167] font-semibold text-base sm:text-lg md:text-[24px]">
                                    {checkIn ? checkIn : "Check In"}{" "}
                                    <span className="text-yellow-500">→</span>{" "}
                                    {checkOut ? checkOut : "Check Out"}
                                </span>
                                {checkIn && checkOut && (
                                    <span className="text-[#006167] text-xs sm:text-sm flex">
                                        ({calculateNights()})
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center justify-between gap-4 w-full">
                                {/* <GuestsDropdown classBg="bg-transparant" /> */}
                                <a
                                    href="#hotels"
                                    className="bg-[#006167] flex gap-2 items-center cursor-pointer text-primary-white text-sm sm:text-base lg:text-lg sm:w-auto rounded-full shadow-md px-6 py-3"
                                >
                                    <img src="/images/Logo/ViewHotels.svg" alt="" className="h-4 md:h-8 w-4 md:w-8" />
                                    <span>View Hotels</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {openCalender && (
                        <div className="fixed inset-0 flex justify-center items-center z-50">
                            <Calendar
                                setCheckInDate={setCheckIn}
                                setCheckOutDate={setCheckOut}
                                setOpenCalender={setOpenCalender}
                            />
                        </div>
                    )}

                    <div className="mt-24" id="hotels">
                        <section className="content mx-auto">
                            <h2 className="text-3xl font-bold mb-4">Hotels in {singleLocationData?.name}</h2>
                            {singleLocationData?.hotels ? <HotelSelectingCards data={singleLocationData} /> : (
                                <div className='text-lg font-medium'>
                                    Sorry  No HOtels For this Location
                                </div>
                            )}

                        </section>

                        <div
                            data-aos="fade-up"
                            className="relative content flex flex-col items-center lg:items-start my-8 lg:my-20 w-full"
                        >
                            <RoatinfImg position="md:left-0 top-[-3rem] md:top-0 left-[-6rem] z-0 lg:w-[18rem]" />
                            <div className="relative text-black px-4">
                                <h1 className="text-mobile/h2 lg:text-desktop/h2 font-bold text-reveal-animation">
                                    {singleLocationData?.aboutus?.heading}
                                </h1>
                                <p className="text-mobile/body/2 lg:text-desktop/body/large mt-4 animation-on-scroll">
                                    {singleLocationData?.aboutus?.paragraph}
                                </p>
                            </div>
                        </div>

                        <div className="relative bg-[#78C9C8] px-4 overflow-hidden">
                            <div className="md:block hidden">
                                <RoatinfImg position="right-0" src="/images/HomepageImages/section3pattern.png" />
                            </div>
                            <div className="content pt-5 md:pt-[50px] z-10 relative">
                                <Sec3CardSlider />
                            </div>
                        </div>

                        <div className="relative flex flex-col justify-between content items-center mt-10 py-10 z-0">
                            <div className="absolute top-0 left-0 z-0 w-full h-full">
                                <RoatinfImg position="md:left-0 top-[-60px] md:top-0 left-[-60px]" />
                            </div>
                            <ImageGallery />
                        </div>

                        <Section5 />
                    </div>
                </>
            ) : (
                <Loader />
            )}



        </div>
    );
};

export default CityPage;
