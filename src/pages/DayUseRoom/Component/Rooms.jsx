import { useState, useEffect, Fragment } from "react";
import { format, addDays, isSameDay, set, getHours, addHours, min, parse } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { Popover, Transition } from '@headlessui/react';
import 'react-day-picker/dist/style.css';

import DayUseRoomCards from "./DayUseRoomCards";
import { useDayUseRoomsByDate } from "../../../ApiHooks/useDayUseRoomHook";
import LoginModal from "../../../Components/LoginModal";
import PaymentOptionModal from "./PaymentOptionModal";
import { usePricing } from "../../../Context/PricingContext";

// --- Helper Icons ---
const CalendarIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18" />
    </svg>
);
const ClockIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);


// --- Helper Functions for Time Management ---
const generateTimeSlots = (startHour, endHour, stepMinutes) => {
    const slots = [];
    let currentTime = set(new Date(), { hours: startHour, minutes: 0, seconds: 0, milliseconds: 0 });
    const endTime = set(new Date(), { hours: endHour, minutes: 0 });

    while (currentTime <= endTime) {
        slots.push(format(currentTime, "h:mm a"));
        currentTime = new Date(currentTime.getTime() + stepMinutes * 60000);
    }
    return slots;
};

const Rooms = () => {
    // --- State Management ---
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [checkInTime, setCheckInTime] = useState("10:00 AM");
    const [checkOutTime, setCheckOutTime] = useState("");
    const [isAvailable, setIsAvailable] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [dateWarning, setDateWarning] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { setDayUseRoom, dayUseRoom } = usePricing();
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [dayUseRoomData, setDayUseRoomData] = useState([]);

    // --- Date and Time Constants ---
    const today = new Date();
    const maxBookableDate = addDays(today, 13);
    const checkInSlots = generateTimeSlots(9, 18, 60); // Check-in from 9 AM to 6 PM

    const getCheckOutSlots = () => {
        if (!checkInTime) return [];

        const checkInDate = parse(checkInTime, "h:mm a", new Date());
        const maxStayTime = addHours(checkInDate, 7);
        const absoluteMaxTime = set(new Date(), { hours: 19, minutes: 0 });
        const effectiveMaxCheckout = min([maxStayTime, absoluteMaxTime]);
        const firstCheckoutTime = addHours(checkInDate, 1);
        return generateTimeSlots(getHours(firstCheckoutTime), getHours(effectiveMaxCheckout), 60);
    };

    const checkOutSlots = getCheckOutSlots();

    useEffect(() => {
        const checkAvailability = () => {
            if (isSameDay(selectedDate, new Date())) {
                const currentHour = getHours(new Date());
                if (currentHour >= 10 && currentHour < 19) {
                    setIsAvailable(true);
                    setWarningMessage("");
                } else {
                    setIsAvailable(false);
                    setWarningMessage("Bookings are currently closed. Same-day booking is only available from 10:00 AM to 7:00 PM.");
                }
            } else {
                setIsAvailable(true);
                setWarningMessage("");
            }
        };

        checkAvailability();
        const interval = setInterval(checkAvailability, 60000);
        return () => clearInterval(interval);
    }, [selectedDate]);

    // Effect to update checkout time when check-in or its options change
    useEffect(() => {
        if (checkOutSlots.length > 0 && !checkOutSlots.includes(checkOutTime)) {
            setCheckOutTime(checkOutSlots[0]); // Set to the first available checkout slot
        }
    }, [checkInTime, checkOutSlots, checkOutTime]);


    // --- Event Handlers ---
    const handleDateSelect = (date) => {
        if (!date) return;
        if (date > maxBookableDate) {
            setDateWarning("You cannot book more than 14 days in advance.");
            setTimeout(() => setDateWarning(""), 3000);
        } else {
            setSelectedDate(date);
            setDateWarning("");
        }
    };

    const handleCheckInChange = (e) => {
        setCheckInTime(e.target.value);
    };

    const handleCheckOutChange = (e) => {
        setCheckOutTime(e.target.value);
    };



    const handlePaymentContinue = (option) => {
        setShowPaymentModal(false);
        console.log("Selected payment option:", option);
        setDayUseRoom(true);
    };


    // --- Data Fetching ---
    const formattedDateForApi = format(selectedDate, 'yyyy-MM-dd');
    const { data } = useDayUseRoomsByDate(formattedDateForApi);
    const rooms = data?.data;

    // --- Render Component ---
    return (
        <div className="bg-primary-green">
            <div className="content py-10">
                <h1 className="text-mobile/h3 md:text-desktop/h3 font-bold text-white">Book A Day Use Hotel</h1>
                <p className="mt-2 text-green-200">Select a date and time for your stay (max 7 hours).</p>

                <div className="my-6  ">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Date Selector */}
                        <div className="flex flex-col">
                            <label className="mb-2 font-semibold text-white">Date</label>
                            <Popover className="relative">
                                {({ close }) => (
                                    <>
                                        <Popover.Button className="flex items-center w-full justify-between rounded-md bg-white px-4 py-2.5 text-lg font-semibold text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            <span>{format(selectedDate, "PPP")}</span>
                                            <CalendarIcon className="ml-3 h-6 w-6 text-gray-500" />
                                        </Popover.Button>
                                        <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
                                            <Popover.Panel className="absolute z-10 mt-2 bg-white rounded-md shadow-lg border">
                                                <DayPicker mode="single" required selected={selectedDate} onSelect={(date) => { handleDateSelect(date); if (date && date <= maxBookableDate) close(); }} disabled={{ before: today, after: maxBookableDate }} initialFocus className="p-2" />
                                            </Popover.Panel>
                                        </Transition>
                                    </>
                                )}
                            </Popover>
                        </div>

                        {/* Check-in Time Selector */}
                        <div className="flex flex-col">
                            <label htmlFor="check-in-time" className="mb-2 font-semibold text-white">Check-in Time</label>
                            <div className="relative">
                                <select id="check-in-time" value={checkInTime} onChange={handleCheckInChange} className="w-full appearance-none rounded-md bg-white px-4 py-2.5 text-lg font-semibold text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    {checkInSlots.map(time => <option key={time} value={time}>{time}</option>)}
                                </select>
                                <ClockIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500" />
                            </div>
                        </div>

                        {/* Check-out Time Selector */}
                        <div className="flex flex-col">
                            <label htmlFor="check-out-time" className="mb-2 font-semibold text-white">Check-out Time</label>
                            <div className="relative">
                                <select id="check-out-time" value={checkOutTime} onChange={handleCheckOutChange} className="w-full appearance-none rounded-md bg-white px-4 py-2.5 text-lg font-semibold text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" disabled={checkOutSlots.length === 0}>
                                    {checkOutSlots.map(time => <option key={time} value={time}>{time}</option>)}
                                </select>
                                <ClockIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Warnings --- */}
                {dateWarning && (
                    <div className="bg-yellow-100 border-yellow-400 text-yellow-700 px-4 py-3 rounded-md my-4" role="alert">
                        <span className="block sm:inline">{dateWarning}</span>
                    </div>
                )}

                {!isAvailable && (
                    <div className="bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded-md my-4" role="alert">
                        <strong className="font-bold">Attention! </strong>
                        <span className="block sm:inline">{warningMessage}</span>
                    </div>
                )}

                {/* --- Rooms Grid --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {rooms?.map((room, index) => (
                        <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                            <DayUseRoomCards setDayUseRoomData={setDayUseRoomData} setShowLoginModal={setShowLoginModal} setShowPaymentModal={setShowPaymentModal} key={room._id} room={room} disabled={!isAvailable} selectedDate={selectedDate} />

                        </div>
                    ))}
                </div>

                {showLoginModal && <LoginModal closeModal={() => setShowLoginModal(false)} />}

                <PaymentOptionModal
                    isOpen={showPaymentModal}
                    onClose={() => setShowPaymentModal(false)}
                    onContinue={handlePaymentContinue}
                    room={dayUseRoomData}
                    selectedDate={selectedDate}
                    checkInTime={checkInTime}
                    checkOutTime={checkOutTime}
                />

            </div>
            {/* --- Custom DayPicker Styles --- */}
            <style>{`
                .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: #dcfce7; }
                .rdp-day_selected { background-color: #166534; color: white; }
                .rdp-day_today { font-weight: bold; color: #16a34a; }
            `}</style>
        </div>
    );
}

export default Rooms;