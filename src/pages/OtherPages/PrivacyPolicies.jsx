import { Helmet } from 'react-helmet';

const PrivacyPolicies = () => {
    return (
        <>
            <Helmet>
                <title>Sunstar Hotel Privacy Policy</title>
                <meta name="description" content="Privacy policies for Sunstar Hotel." />
                <meta name="keywords" content="Sunstar Hotel, Privacy Policy, Data Protection, Personal Information" />
            </Helmet>
            <div className="bg-primary-green mx-auto pt-10">
                <div className="bg-primary-green w-full h-full text-white">
                    <h1 className="text-mobile/h2 md:text-desktop/h2 content mt-14 font-bold mb-6 py-10 text-start">
                        Sunstar Hotel Privacy Policy
                    </h1>
                </div>
                <div className="bg-white px-6">
                    <div className="content py-10 flex flex-col gap-8">
                        {/* Privacy Note */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Privacy Note</h2>
                            <p className="mb-4">
                                At Hotel Sunstar Group we understand that customers care about the use and storage of their personal information and data, and we value your trust in allowing us to do this in a careful and sensible manner.
                            </p>
                            <p>
                                We’ve created this privacy policy statement to demonstrate our commitment to the privacy of our customers. By using Hotel Sunstar Group, our website, our dedicated telephone reservations line, and any other Hotel Sunstar Group service, you are consenting and agreeing to the practices outlined in this statement. Hotel Sunstar Group will always handle information in compliance with the Data Protection Act (1998).
                            </p>
                        </section>

                        {/* Collection and Use of Data */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Collection of Data and Use of Your Personal Information</h2>
                            <div className="mb-4">
                                <p className="mb-2 font-semibold">Collection of Data:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>On our website when you make or manage a booking, register or alter your details, or use the ‘contact us’ email addresses.</li>
                                    <li>In our Customer Services department from your correspondence.</li>
                                    <li>By telephone when speaking to a call centre agent or directly with a hotel. In hotels when you register at reception.</li>
                                </ul>
                            </div>
                            <div>
                                <p className="mb-2 font-semibold">Use of Your Personal Information:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>
                                        To continually improve your customer experience by processing bookings and payments, communicating with you about bookings, products, services and promotional offers, updating our records, creating and maintaining your Hotel Sunstar Group account(s), and recommending products and services that might be of interest to you. We may also contact you to ask about your experience as part of our ongoing customer service improvement programme.
                                    </li>
                                    <li>
                                        To improve our website, prevent or detect fraud or abuses, and enable third parties to carry out technical, logistical, or other functions on our behalf.
                                    </li>
                                    <li>
                                        To provide you with requested information or correspondence, such as a response to an enquiry made by you.
                                    </li>
                                    <li>
                                        To send you details of your new, amended or cancelled booking or Hotel Sunstar Group account details.
                                    </li>
                                    <li>
                                        To contact you in the event of changes that affect your booking or any personal information you have provided, such as updates to our terms &amp; conditions or this privacy policy.
                                    </li>
                                    <li>
                                        With your permission, to use your contact details to supply information by telephone, email, or post about our company and to send you occasional promotional material. If you do not agree to receive this information, you may opt out at any time; see the opt-out section of this policy.
                                    </li>
                                    <li>
                                        To provide aggregate statistics about our customers, sales, traffic patterns, and related site information to reputable third parties, ensuring no personally identifying information is included.
                                    </li>
                                    <li>
                                        We might receive additional information about you from other sources and add it to your account information to ensure data quality is maintained.
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Non Disclosure */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Non Disclosure to Third Parties</h2>
                            <p className="mb-4">
                                The information and data we collect is important for Hotel Sunstar Group, and we would not want to share it with anyone else. Unless we have your express consent, we will never disclose, rent, trade, or sell your personal data to any third parties for their marketing or mailing purposes.
                            </p>
                            <p>
                                We may disclose or transfer your data or personal information to other companies, data processors, or agents employed by us to perform necessary functions on our behalf. They are bound by our privacy policy and may not use this information for their own purposes. In the event that Hotel Sunstar Group or any part of its business is sold or integrated with another business, we may disclose your personal information to the new owners (and their professional advisers) to continue providing you with the same services and marketing information. Credit or debit card data is never viewed or disclosed to anyone.
                            </p>
                        </section>

                        {/* Cookies */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
                            <p className="mb-4">
                                Our site uses cookies to keep track of your visits. A cookie is a small file stored by your browser on your computer’s hard drive. Cookies may be used to compile anonymous statistics related to service usage or browsing patterns. When used in this manner, you are not individually identified and the data is used only in aggregate.
                            </p>
                            <p>
                                You can usually change your browser’s settings so that it will not accept cookies, although this may restrict some website functionality. At Hotel Sunstar Group, we will only use cookies with your permission.
                            </p>
                        </section>

                        {/* Your Consent */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Your Consent</h2>
                            <p className="mb-4">
                                By using our website, you consent to the collection, storage, and processing of your personal information in the manner set out in this privacy policy. Should we change our privacy policy, we will post the changes on this website so that you are always aware of what information we collect, how we use it, and under what circumstances we disclose it.
                            </p>
                            <p className="mb-4">
                                We will always ask for your permission before sending you electronic marketing information, ensuring you only receive information that you have agreed to receive.
                            </p>
                            <p className="mb-2 font-semibold">Altering Your Contact Preferences:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>
                                    Send an email to <a href="mailto:help@sunstarhospitality.com" className="font-semibold">help@sunstarhospitality.com</a> with your name, address, and, if applicable, your booking confirmation number.
                                </li>
                                <li>
                                    Use the unsubscribe link provided at the bottom of our promotional emails to opt out of that service.
                                </li>
                            </ul>
                            <p className="mb-4">
                                Please note that it is not possible to opt out of receiving communications related to your bookings, as we need to contact you in case of any changes that affect your stay. We might also receive information about you from other sources, such as the Mail Preference Service, to ensure that the quality of data on your account is maintained.
                            </p>
                            <p>
                                If you wish to view, delete, or amend any of the information we hold on you, please contact us in writing. We will not charge for amending or deleting personal information, but may charge for viewing information held on you.
                            </p>
                        </section>

                        <footer className="border-t pt-4">
                            <p>
                                By using our services, you agree to the terms of this Privacy Policy.
                            </p>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicies;
