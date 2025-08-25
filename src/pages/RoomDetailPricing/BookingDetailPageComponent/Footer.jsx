/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const Footer = ({ ContactUsDetail }) => {
  const phone = ContactUsDetail?.phoneNumber || "";

  return (
    <footer className="w-full border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Layout: stack on mobile, split on md+ */}
        <div className="flex flex-col gap-6 py-6 text-gray-600   md:justify-between md:gap-10 md:py-8">
          {/* Left: Heading + Phone */}
          <div className="flex justify-between gap-2 sm:gap-3">
            <p className="text-base font-semibold tracking-tight sm:text-lg md:text-2xl">
              Facing an issue? Call us for assistance.
            </p>

            {phone ? (
              <a
                href={`tel:${phone}`}
                className="w-fit text-lg font-semibold underline underline-offset-4 transition-colors duration-200 hover:text-gray-800 sm:text-xl"
                aria-label={`Call ${phone}`}
              >
                <span className="whitespace-nowrap">{phone}</span>
              </a>
            ) : (
              <span className="text-sm text-gray-500 sm:text-base">
                Phone number unavailable
              </span>
            )}
          </div>

          {/* Right: Links */}
          <nav
            className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-8"
            aria-label="Footer navigation"
          >
            <Link
              to="/terms-conditions&cancellation"
              className="text-sm font-medium underline underline-offset-4 transition-colors duration-200 hover:text-gray-800 sm:text-base md:text-lg"
            >
              Cancellation Policy
            </Link>
            <Link
              to="/terms-conditions&cancellation"
              className="text-sm font-medium underline underline-offset-4 transition-colors duration-200 hover:text-gray-800 sm:text-base md:text-lg"
            >
              Terms &amp; Conditions
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
