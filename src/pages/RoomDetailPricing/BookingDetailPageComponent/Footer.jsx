import { Link } from "react-router-dom";

export const Footer = ({ ContactUsDetail }) => (
    <div className="flex flex-col gap-6 md:gap-10 md:flex-row justify-between md:items-center text-gray-600 px-4 py-6">
        <div className="flex flex-col gap-3 md:gap-4">
            <p className="text-lg md:text-2xl font-bold tracking-tight">Facing an Issue? Call us for assistance.</p>
            <a
                href={`tel:${ContactUsDetail?.phoneNumber}`}
                className="text-base md:text-xl font-semibold underline hover:text-gray-800 transition-colors duration-300"
            >
                {ContactUsDetail?.phoneNumber}
            </a>
        </div>
        <div className="flex gap-6 md:gap-8">
            <Link to='/terms-conditions&cancellation' className="text-base md:text-lg font-medium underline hover:text-gray-800 transition-colors duration-300">
                Cancellation Policy
            </Link>
            <Link to="/terms-conditions&cancellation" className="text-base md:text-lg font-medium underline hover:text-gray-800 transition-colors duration-300">
                Terms & Conditions
            </Link>
        </div> 
    </div>
);