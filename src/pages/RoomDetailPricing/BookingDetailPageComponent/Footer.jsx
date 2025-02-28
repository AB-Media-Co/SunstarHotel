export const Footer = ({ ContactUsDetail }) => (
    <div className="flex flex-col gap-10 md:flex-row justify-between md:items-center text-gray-600 px-4">
        <div className="flex flex-col font-semibold md:gap-4">
            <p className="md:text-2xl">Facing an Issue? Call us for assistance.</p>
            <a
                href={`tel:${ContactUsDetail?.phoneNumber}`}
                className="md:text-xl underline hover:text-gray-800"
            >
                {ContactUsDetail?.phoneNumber}
            </a>
        </div>
        <div className="flex gap-4">
            <a href="#" className="md:text-lg font-semibold underline hover:text-gray-800">
                Cancellation Policy
            </a>
            <a href="#" className="md:text-lg font-semibold underline hover:text-gray-800">
                Terms & Conditions
            </a>
        </div>
    </div>
);