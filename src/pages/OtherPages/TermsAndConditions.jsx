import { useEffect } from "react";
import { Helmet } from "react-helmet";

const TermsAndConditions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <>
            <Helmet>
                <title>Terms & Conditions and Cancellation Policy</title>
                <meta name="description" content="Terms and Conditions for Sunstar Hotel." />
                <meta name="keywords" content="Sunstar Hotel, Terms, Conditions, Booking, Stay" />
            </Helmet>
            <div className="bg-primary-green mx-auto pt-10">
                <div className="bg-primary-green w-full h-full text-white">
                    <h1 className="text-mobile/h2 md:text-desktop/h3 content mt-14 font-bold mb-6 py-10 text-start">
                    Terms & Conditions and Cancellation Policy
                    </h1>
                </div>
                <div className="bg-white md:px-6">
                    <div className="content py-10">
                        <p className="mb-6">
                            Welcome to Sunstar Hotel! These Terms and Conditions govern the use of our website, services, and hotel stays.
                            Please read them carefully.
                        </p>

                        {/* Terms & Conditions Acceptance */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-2">Terms & Conditions</h2>
                            <p className="mb-4">
                                When you make a Booking on our website, you will be asked to click “I accept” and you will not be able to complete your Booking if you do not do this. This confirms that you accept these terms.
                            </p>
                            <p className="mb-4">
                                We strongly recommend that you read the terms before accepting.
                            </p>
                        </section>

                        {/* Our Contract */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-2">Our Contract</h2>
                            <p className="mb-4">
                                If you are a consumer (i.e., not dealing as a business with us), Hotel Sunstar Group (we/us) sells all rooms and extras to you subject to these terms.
                                A contract is formed between you and Hotel Sunstar Group when we issue you with a booking reference number for your room and extras (if applicable).
                                No booking shall be binding on Hotel Sunstar Group until we issue you with a booking reference number.
                            </p>
                            <p className="mb-4">
                                Management reserves the right to cancel any booking.
                            </p>
                        </section>

                        {/* Your Booking */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-2">Your Booking</h2>
                            <ul className="list-disc list-inside space-y-1">
                                <li>
                                    You cannot transfer or resell your booking (in whole or in part). If you transfer or resell (or attempt to transfer or resell) your booking,
                                    Hotel Sunstar Group will terminate it and retain any money paid.
                                </li>
                                <li>
                                    You may make a booking on someone else's behalf. You are responsible for ensuring that any customer in your booking complies with these terms as if that customer had made the booking.
                                </li>
                                <li>
                                    You can only make a booking if you are 16 years old or over. If you arrive at the hotel and are under 16, you will not be permitted to stay alone.
                                </li>
                                <li>
                                    Ensure that the name on a booking is correct at the time of booking. (Subject to section 7, this cannot be changed after making the booking.)
                                </li>
                                <li>
                                    If you book 5 or more rooms for the same night or book for 15 or more nights of continuous stay, this will be treated as a Group Booking with special terms regarding amendments and cancellations.
                                </li>
                            </ul>
                        </section>

                        {/* Extras */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-2">Extras</h2>
                            <p className="mb-4">
                                We offer certain extras when you make your booking. The room rate excludes any extras unless expressly agreed upon as part of your booking.
                                Extras are subject to availability and cannot be transferred to any other booking.
                                If an extra paid for in advance is unavailable upon arrival, we will refund its cost.
                            </p>
                        </section>

                        {/* Rates & Payment */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-2">Rates & Payment</h2>
                            <p className="mb-4">
                                The rate for each room is as published on our website at the time of your booking, or, in the case of a telephone booking, as advised at the time of booking.
                                All payments are due in full at the time of booking unless otherwise advised by Hotel Sunstar Group.
                            </p>
                            <p className="mb-4">
                                You must be able to show photo identification (such as a passport or driver's license) or a valid credit/debit card if you are paying by cash for a walk-in booking.
                            </p>
                        </section>

                        {/* Check In & Check Out */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-2">Check In & Check Out</h2>
                            <p className="mb-4">
                                All foreign guests must provide passport identification at check-in (this is a legal requirement). All domestic guests must provide photo identification with proof of address (voter ID, Aadhaar, or driver’s license is preferred).
                            </p>
                            <p className="mb-4">
                                Check-in begins at 1:00 PM on the scheduled arrival date. If you wish to check in earlier, please discuss this in person with the Duty Manager – this service is subject to availability.
                            </p>
                            <p className="mb-4">
                                Required identification must be presented if paying by cash for a walk-in booking.
                            </p>
                        </section>

                        {/* Rooms */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-2">Rooms</h2>
                            <p className="mb-4">
                                Maximum occupancy for rooms is clearly stated online during the booking process.
                                Guests exceeding these guidelines may be required to purchase an additional room at the published daily rate.
                            </p>
                            <p className="mb-4">
                                In addition, one child under the age of 8 is permitted per room.
                                Children should not be left unattended in any rooms or public areas.
                            </p>
                            <p className="mb-4">
                                Smoking is prohibited in any of our hotels or in areas where it may interfere with our fire detection system.
                                Violation of this policy may result in immediate termination of your booking without refund and additional charges for any damages incurred.
                            </p>
                        </section>

                        {/* Booking Cancellation */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-2">Booking Cancellation</h2>
                            <p className="mb-4">
                                Cancellations can be made free of charge up to 24 hours prior to check-in, which commences at 1:00 PM local time on the date of stay.
                                All room nights cancelled less than 24 hours prior to check-in will incur a penalty equivalent to one night's charge.
                            </p>
                            <p className="mb-4">
                                In case of no-shows (i.e., failure to arrive without any prior communication), no refund will be provided.
                                For cancellations involving add-on purchases, refunds will be issued only if no costs have been incurred by Hotel Sunstar Group.
                            </p>
                        </section>

                        {/* Booking Modification */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-2">Booking Modification</h2>
                            <p className="mb-4">
                                Modifications can be made free of charge up to 24 hours prior to check-in.
                                All modifications (e.g., room upgrades) are treated as a cancellation and a new booking; hence, all clauses of the Cancellation Policy will apply.
                                For date changes, we cannot guarantee that the same rates will be available as at the time of the original booking.
                            </p>
                            <p className="mb-4">
                                Room upgrades will be provided on request where possible. In cases of room upgrades, the payable amount will be the difference between the original rate and the upgraded room rate at the time of modification.
                            </p>
                        </section>

                        {/* GST */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-2">GST</h2>
                            <p className="mb-4">
                                If you require a GST invoice, please confirm the GST number for billing at the time of check-in.
                                Once provided, the GST number cannot be changed.
                                Hotel Sunstar Group will not be liable for any loss incurred due to failure to provide the correct GST details.
                            </p>
                        </section>

                        {/* Group Booking */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-2">Group Booking</h2>
                            <p className="mb-4">
                                Bookings for 5 or more rooms for the same night or 15 or more nights of continuous stay are treated as Group Bookings.
                                If you cancel your Group Booking or reduce the number of nights/rooms within 15 days of your arrival date, no refund will be issued.
                                Subject to availability and payment, you may add additional night(s) to a Group Booking at the current room rate.
                            </p>
                        </section>

                        {/* Questions & Complaints */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-2">Questions & Complaints</h2>
                            <p className="mb-4">
                                If you have any questions or complaints regarding your booking or these terms, please visit our website and click on the 'Contact Us' link.
                                We aim to respond within 24 hours.
                            </p>
                            <p className="mb-4">
                                Alternatively, you can reach us via email at&nbsp;
                                <a href="mailto:booking@sunstarhospitality.com" className="font-semibold">
                                    booking@sunstarhospitality.com
                                </a>
                                &nbsp;or call us at&nbsp;
                                <a href="tel:+911142503285" className="font-semibold">
                                    +91 1142503285
                                </a>.
                            </p>
                        </section>

                        <p className="mt-6">
                            By using our services, you agree to these Terms and Conditions.
                            Thank you for choosing Sunstar Hotel – we look forward to making your stay exceptional.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsAndConditions;
