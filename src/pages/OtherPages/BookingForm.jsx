import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useGetHotels } from '../../ApiHooks/useHotelHook2';
import { format, differenceInDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';
import { useEnquiryForm } from '../../ApiHooks/useEnquiryFormHook';
import Loader from '../../Components/Loader';

const BookingForm = () => {
    const { data: hotels, isLoading: loading } = useGetHotels();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [numberOfNights, setNumberOfNights] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { mutate, isLoading } = useEnquiryForm();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        if (startDate && endDate) {
            const nights = differenceInDays(endDate, startDate);
            setNumberOfNights(nights);
        } else {
            setNumberOfNights(0);
        }
    }, [startDate, endDate]);

    const validationSchema = Yup.object({
        propertyName: Yup.string().required('Property name is required'),
        dates: Yup.string().required('Check-in and check-out dates are required'),
        guests: Yup.number()
            .required('Number of guests is required')
            .positive('Number of guests must be positive')
            .integer('Number of guests must be an integer'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        mobileNumber: Yup.string()
            .required('Mobile number is required')
            .matches(/^[0-9+\s-]+$/, 'Invalid mobile number'),
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
    });

    // Extract default hotel name from localStorage
    const localHotelInfo = localStorage.getItem("hotelInfo");
    let defaultHotel = "";

    try {
        if (localHotelInfo) {
            const parsed = JSON.parse(localHotelInfo);
            defaultHotel = parsed?.name || ""; // Adjust key path if needed
        }
    } catch (e) {
        console.error("Error parsing hotelInfo from localStorage:", e);
    }

    


    // Initialize formik
    const formik = useFormik({
        initialValues: {
            propertyName: defaultHotel,
            dates: '',
            guests: '',
            email: '',
            mobileNumber: '',
            firstName: '',
            lastName: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const payload = {
                page: "Bulk Booking",
                companyName: values?.propertyName,
                name: values?.firstName + " " + values?.lastName,
                email: values?.email,
                phone: values?.mobileNumber,
                decisionMaker: values?.nights + " Nights",
                enquiry: values?.dates,
                gid: [729945248],
                submittedAt: new Date().toISOString(),
            };

            // Call the mutation
            mutate(payload, {
                onSuccess: () => {
                    // Set submitted state to true
                    setIsSubmitted(true);

                    // Reset form
                    formik.resetForm();
                    // Reset date picker states
                    setStartDate(null);
                    setEndDate(null);
                    setNumberOfNights(0);
                },
                onError: (error) => {
                    toast.error("Failed to submit enquiry. Please try again.");
                    console.error("Submission error:", error);
                },
            });
        },
    });

    // Handle date selection
    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        // Update the formik dates field with the new format
        if (start && end) {
            const formattedDates = `${format(start, 'EEE, MMM d')} - ${format(end, 'EEE, MMM d')}`;
            formik.setFieldValue('dates', formattedDates);
        } else {
            formik.setFieldValue('dates', '');
        }
    };
    const SuccessScreen = () => (
        <div className="bg-primary-green min-h-screen flex items-center justify-center border-b py-28 p-4">
            <div className="text-center max-w-2xl w-full bg-white rounded-2xl shadow-lg p-12">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-32 h-32 text-primary-green mx-auto mb-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h1 className="text-4xl font-bold text-primary-green mb-4">Booking Submitted Successfully!</h1>
                <p className="text-gray-600 text-lg mb-6">
                    Thank you for your booking enquiry. Our team will contact you soon to confirm your reservation and provide further details.
                </p>
                <div className="flex justify-center space-x-4 mt-8">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-primary-green hover:bg-primary-dark-green text-white font-medium rounded-md px-6 py-3 transition duration-300 ease-in-out"
                    >
                        Back to Home
                    </button>
                    <button
                        onClick={() => navigate('/contact')}
                        className="border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white font-medium rounded-md px-6 py-3 transition duration-300 ease-in-out"
                    >
                        Contact Us
                    </button>
                </div>
            </div>
        </div>
    );

    // Loading check
    if (loading || isLoading) {
        return <Loader />;
    }



    return (
        <>
            {isSubmitted ? (
                <SuccessScreen />
            ) : (
                <div className="bg-primary-green min-h-screen flex items-center justify-center border-b py-28 p-4">
                    <div className='w-full content'>
                        <div>
                            <h1 className="text-5xl font-bold text-white mb-4">Booking Form</h1>
                            <p className="text-white mb-8">For bookings longer than 10 nights or large groups</p>
                        </div>
                        <div className="w-full bg-white rounded-2xl shadow-lg p-6 md:p-12">
                            <div className="flex flex-col lg:flex-row">
                                <div className="w-full lg:w-2/3 lg:pr-8">
                                    <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
                                        <div className="mb-4">
                                            <select
                                                name="propertyName"
                                                className={`w-full border rounded-md p-3 ${formik.touched.propertyName && formik.errors.propertyName ? 'border-red-500' : 'border-gray-300'}`}
                                                value={formik.values.propertyName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option value="">Select Property</option>
                                                {hotels?.hotels && hotels?.hotels.map((hotel, index) => (
                                                    <option key={index} value={hotel.name}>{hotel.name}</option>
                                                ))}
                                            </select>
                                            {formik.touched.propertyName && formik.errors.propertyName && (
                                                <div className="text-red-500 text-sm mt-1">{formik.errors.propertyName}</div>
                                            )}
                                        </div>

                                        <div className="mb-4 w-full sm:col-span-2">
                                            <div className="relative w-full border rounded-md">
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={handleDateChange}
                                                    startDate={startDate}
                                                    endDate={endDate}
                                                    selectsRange
                                                    minDate={new Date()}
                                                    placeholderText="Pick Dates"
                                                    className={`w-full p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#404040] rounded-md ${formik.touched.dates && formik.errors.dates ? 'border-red-500' : 'border-gray-300'}`}
                                                    onBlur={formik.handleBlur}
                                                    name="dates"
                                                    dateFormat="EEE, MMM d"
                                                    showPopperArrow={false}
                                                />
                                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>

                                            {formik.touched.dates && formik.errors.dates && (
                                                <div className="text-red-500 text-sm mt-1">{formik.errors.dates}</div>
                                            )}
                                            {numberOfNights > 0 && (
                                                <div className="text-green-600 text-sm mt-1">Stay duration: {numberOfNights} nights</div>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <input
                                                    type="number"
                                                    name="guests"
                                                    placeholder="Number of Guests"
                                                    className={`w-full border rounded-md p-3 ${formik.touched.guests && formik.errors.guests ? 'border-red-500' : 'border-gray-300'}`}
                                                    value={formik.values.guests}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.guests && formik.errors.guests && (
                                                    <div className="text-red-500 text-sm mt-1">{formik.errors.guests}</div>
                                                )}
                                            </div>

                                            <div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email ID"
                                                    className={`w-full border rounded-md p-3 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.email && formik.errors.email && (
                                                    <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                            <div>
                                                <input
                                                    type="text"
                                                    name="mobileNumber"
                                                    placeholder="Mobile Number"
                                                    className={`w-full border rounded-md p-3 ${formik.touched.mobileNumber && formik.errors.mobileNumber ? 'border-red-500' : 'border-gray-300'}`}
                                                    value={formik.values.mobileNumber}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                                                    <div className="text-red-500 text-sm mt-1">{formik.errors.mobileNumber}</div>
                                                )}
                                            </div>

                                            <div>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    placeholder="First Name"
                                                    className={`w-full border rounded-md p-3 ${formik.touched.firstName && formik.errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                                                    value={formik.values.firstName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.firstName && formik.errors.firstName && (
                                                    <div className="text-red-500 text-sm mt-1">{formik.errors.firstName}</div>
                                                )}
                                            </div>

                                            <div>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    placeholder="Last Name"
                                                    className={`w-full border rounded-md p-3 ${formik.touched.lastName && formik.errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                                                    value={formik.values.lastName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.lastName && formik.errors.lastName && (
                                                    <div className="text-red-500 text-sm mt-1">{formik.errors.lastName}</div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                className="bg-primary-green hover:bg-primary-dark-green text-white font-medium rounded-md px-6 py-3 transition duration-300 ease-in-out"
                                            >
                                                Submit Enquiry
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <div className="w-full lg:w-1/3 mt-8 lg:mt-0 bg-gray-100 p-6 rounded-lg">
                                    <h2 className="text-2xl font-medium text-gray-600 mb-6">Need Help?</h2>

                                    <div className="flex items-center mb-4">
                                        {/* <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div> */}
                                        <a href="mailto:booking@sunstarhospitality.com" className="text-primary-green font-medium">booking@sunstarhospitality.com</a>
                                    </div>

                                    <div className="flex items-center mb-6">
                                        {/* <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div> */}
                                        <a href="tel:+91114225666" className="text-primary-green font-medium">+91 11 4122 5666</a>
                                    </div>

                                    <div className="border-t border-gray-300 pt-6">
                                        <h3 className="text-lg font-medium text-gray-600 mb-2">Cancellation Policy</h3>
                                        <p className="text-gray-500 text-sm mb-2">
                                            Cancellations can be made free of charge up to 24 hours prior to check-in, which
                                            commences at 14:00 local time on the date of stay.
                                        </p>
                                        <button onClick={() => navigate('/terms-conditions&cancellation')} className="text-primary-green text-sm font-medium">Read More</button>
                                    </div>

                                    <div className="border-t border-gray-300 mt-6 pt-6">
                                        <h3 className="text-lg font-medium text-gray-600 mb-2">Terms & Conditions</h3>
                                        <p className="text-gray-500 text-sm mb-2">
                                            Subject to availability and payment, you may add any additional night(s) to any
                                            Group Booking (after the dates of the original Group Booking) at the rate for the
                                            room(s) at the time you make the amendment.
                                        </p>
                                        <button onClick={() => navigate('/terms-conditions&cancellation')} className="text-primary-green text-sm font-medium">View All Terms & Conditions</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookingForm;