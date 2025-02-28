import { useEffect, useState } from 'react';
import { useDiscountedRate, useOfferCodesForHotel } from '../../../ApiHooks/useOffersAndDealsHook';
import toast from 'react-hot-toast';

export const OfferCode = ({ hotelDetail }) => {
  const [inputValue, setInputValue] = useState('');
  const [appliedOffer, setAppliedOffer] = useState(null);
  const [offerResult, setOfferResult] = useState(null);
  console.log(offerResult)
  const [OfferSuccess, setOfferSuccess] = useState(false);
  const primaryColor = '#058FA2';

  const { mutate: fetchOfferCodes, data } = useOfferCodesForHotel();
  const { mutateAsync: getDiscountAsync } = useDiscountedRate();

  useEffect(() => {
    if (hotelDetail && hotelDetail._id) {
      fetchOfferCodes(hotelDetail._id);
    }
  }, [fetchOfferCodes, hotelDetail]);


  const handleApplyCode = () => {
    if (!inputValue.trim()) return;
    const baseRate = 25000;
    console.log(inputValue.trim() )

    try {
      const result = getDiscountAsync({ hotelId: hotelDetail._id, rate: baseRate, offerCode: inputValue.trim() });
      setOfferResult(result);
      toast.success("Discounted rate calculated successfully");
    } catch (error) {
      toast.error( error?.response?.data?.error?error?.response?.data?.error: "Error calculating discounted rate" );
    }


  };

  const handleRemoveOffer = () => {
    setAppliedOffer(null);
    setOfferResult(null);
  };


  const handlePredefinedOfferClick = async (offer) => {
    setAppliedOffer(offer);
    const baseRate = 25000;
    setOfferSuccess(false)
    console.log("log",offer)
    try {
      const result = await getDiscountAsync({ hotelId: hotelDetail._id, rate: baseRate, offerCode: offer.offerCode });
      setOfferResult(result);
      setOfferSuccess(true)
      // toast.success("Discounted rate calculated successfully");
    } catch (error) {
      toast.error( error?.response?.data?.error?error?.response?.data?.error: "Error calculating discounted rate" );
    }
  };

  return (
    <div className="flex flex-col bg-white w-full mx-auto">
      <div className="flex items-center mb-8">
        <div
          className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-600 text-white mr-3"
          style={{ backgroundColor: primaryColor }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
            <line x1="7" y1="7" x2="7.01" y2="7"></line>
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Exclusive Offers</h2>
      </div>

      {/* Input and Apply Button - Only shown when no offer is applied */}
      {!appliedOffer && (
        <div className="relative mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-3">
            <div className="relative flex-grow">
              <input
                type="text"
                id="promo"
                placeholder="Enter Offer Code Here"
                className="w-full h-14 shadow-md border border-gray-300 rounded-lg py-2 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:border-cyan-300 transition-all"
                style={{ '--tw-ring-color': primaryColor }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
            </div>
            <button
              onClick={handleApplyCode}
              className="h-14 px-6 md:w-40 rounded-lg text-white font-bold transition-all hover:shadow-lg flex items-center justify-center"
              style={{ backgroundColor: primaryColor }}
            >
              Apply Code
            </button>
          </div>
        </div>
      )}

      {/* Predefined Offers - Only shown when no offer is applied */}
      {!appliedOffer && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1 h-6 rounded-full mr-3" style={{ backgroundColor: primaryColor }}></div>
            <h3 className="text-lg font-semibold text-gray-700">Available Offer Codes</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data &&
              data.map((offer) => (
                <div
                  key={offer.offerCode}
                  onClick={() => handlePredefinedOfferClick(offer)}
                  className="p-4 rounded-lg border-2 cursor-pointer transition-all border-gray-200 hover:bg-cyan-50 transform hover:-translate-y-1 hover:shadow-md"
                  style={{ '--tw-hover-border-opacity': 1, '--tw-hover-border-color': primaryColor }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-gray-800">{offer.offerCode}</span>
                    <span
                      className="text-sm font-semibold px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {offer.discountPercent} %
                    </span>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <span className="text-xs font-medium flex items-center" style={{ color: primaryColor }}>
                      Click to apply
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Applied Offer */}
      {appliedOffer && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="w-1 h-6 rounded-full mr-3" style={{ backgroundColor: primaryColor }}></div>
              <h3 className="text-lg font-semibold text-gray-700">Applied Offer</h3>
            </div>
            <button
              onClick={handleRemoveOffer}
              className="flex items-center text-sm px-4 py-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
              Remove & Change
            </button>
          </div>
          <div
            className="relative overflow-hidden p-6 bg-cyan-50 border-2 rounded-lg shadow-sm"
            style={{ borderColor: primaryColor }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8">
              <div
                className="absolute transform rotate-45 text-white font-bold py-1 right-0 top-0 w-32 text-center text-xs"
                style={{ backgroundColor: primaryColor }}
              >
                APPLIED
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-bold text-2xl text-gray-800">{appliedOffer.offerCode}</div>
                <div className="text-gray-600 mt-2">{appliedOffer.description}</div>
              </div>
              <div className="mt-4 sm:mt-0">
                <span
                  className="text-lg font-semibold px-4 py-2 rounded-full text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  {appliedOffer.discountPercent} %
                </span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-cyan-200 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
                style={{ color: primaryColor }}
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              {OfferSuccess &&
                <p className="font-medium" style={{ color: primaryColor }}>
                  Offer successfully applied to your order!
                </p>

              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferCode;
