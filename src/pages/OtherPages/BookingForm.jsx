import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useGetHotels } from '../../ApiHooks/useHotelHook2';
import { format, differenceInDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = () => {
    const { data: hotels } = useGetHotels();
    console.log(hotels)
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [numberOfNights, setNumberOfNights] = useState(0);

    // Calculate number of nights when dates change
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

    // Initialize formik
    const formik = useFormik({
        initialValues: {
            propertyName: '',
            dates: '',
            guests: '',
            email: '',
            mobileNumber: '',
            firstName: '',
            lastName: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Add calculated nights to the submission data
            const submissionData = {
                ...values,
                checkIn: startDate ? format(startDate, 'yyyy-MM-dd') : '',
                checkOut: endDate ? format(endDate, 'yyyy-MM-dd') : '',
                nights: numberOfNights
            };
            console.log('Form submitted:', submissionData);
            alert('Booking inquiry submitted successfully!');
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

    // Custom date format for the DatePicker
    const formatWeekDay = (date) => {
        return format(date, 'EEE, MMM d');
    };

    return (
        <div className="bg-primary-green min-h-screen flex items-center justify-center border-b py-28 p-4">
            <div className='w-full content'>
                <div>
                    <h1 className="text-5xl font-bold text-white mb-4">Booking Form</h1>
                    <p className="text-white mb-8">For bookings longer than 10 nights or large groups</p>
                </div>
                <div className="w-full bg-white rounded-2xl shadow-lg p-12">
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

                                <div className="mb-4">
                                    <div className="relative">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={handleDateChange}
                                            startDate={startDate}
                                            endDate={endDate}
                                            selectsRange
                                            minDate={new Date()}
                                            placeholderText="Pick Check-in & Check-out Dates"
                                            className={`w-full border rounded-md p-3 pl-10 ${formik.touched.dates && formik.errors.dates ? 'border-red-500' : 'border-gray-300'}`}
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
                                <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <a href="mailto:booking@sunstarhospitality.com" className="text-primary-green font-medium">booking@sunstarhospitality.com</a>
                            </div>

                            <div className="flex items-center mb-6">
                                <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <a href="tel:+91114225666" className="text-primary-green font-medium">+91 11 4122 5666</a>
                            </div>

                            <div className="border-t border-gray-300 pt-6">
                                <h3 className="text-lg font-medium text-gray-600 mb-2">Cancellation Policy</h3>
                                <p className="text-gray-500 text-sm mb-2">
                                    Cancellations can be made free of charge up to 24 hours prior to check-in, which
                                    commences at 14:00 local time on the date of stay.
                                </p>
                                <button onClick={()=> navigate('/terms-conditions&cancellation')} className="text-primary-green text-sm font-medium">Read More</button>
                            </div>

                            <div className="border-t border-gray-300 mt-6 pt-6">
                                <h3 className="text-lg font-medium text-gray-600 mb-2">Terms & Conditions</h3>
                                <p className="text-gray-500 text-sm mb-2">
                                    Subject to availability and payment, you may add any additional night(s) to any
                                    Group Booking (after the dates of the original Group Booking) at the rate for the
                                    room(s) at the time you make the amendment.
                                </p>
                                <button onClick={()=> navigate('/terms-conditions&cancellation')} className="text-primary-green text-sm font-medium">View All Terms & Conditions</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;