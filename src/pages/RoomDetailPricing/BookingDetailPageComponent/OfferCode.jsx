import { useEffect, useState } from 'react';
import { useDiscountedRate, useOfferCodesForHotel } from '../../../ApiHooks/useOffersAndDealsHook';
import toast from 'react-hot-toast';
import { usePricing } from '../../../Context/PricingContext';
import Cookies from 'js-cookie';
import { useGetUserByEmail } from '../../../ApiHooks/useUser';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
export const OfferCode = ({ hotelDetail, checkIn, verified }) => {
  // Existing states
  const [inputValue, setInputValue] = useState('');
  const [appliedOffer, setAppliedOffer] = useState(null);
  const [, setOfferResult] = useState(null);
  const [offerSuccess, setOfferSuccess] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [hoveredOffer, setHoveredOffer] = useState(null);
  const primaryColor = '#058FA2';
  const { mutate: fetchOfferCodes, data } = useOfferCodesForHotel();
  const { mutateAsync: getDiscountAsync } = useDiscountedRate();
  const { finalPrice, setFinalPrice, baseFinalPrice } = usePricing();

  const email = localStorage.getItem("user_email");
  const { data: userData, isLoading: userLoading } = useGetUserByEmail(email);
  const isUserVerified = localStorage.getItem("user_email") !== null;
  // const isUserVerified = verified || isUserVerified;


  useEffect(() => {
    if (hotelDetail && hotelDetail._id && isUserVerified) {
      fetchOfferCodes(hotelDetail._id);
    }
  }, [fetchOfferCodes, hotelDetail, isUserVerified, userData]);

  if (userLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-cyan-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
            </div>
          </div>
          <p className="text-lg font-semibold text-gray-600 animate-pulse">Loading exclusive offers...</p>
        </div>
      </div>
    );
  }



  if (!( isUserVerified)) {
    return (
      <div className="relative bg-gradient-to-br from-white to-gray-50 p-10 rounded-2xl shadow-xl border border-gray-100 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 to-cyan-600"></div>
        <div className="relative ">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-full flex items-center justify-center">
            <CheckCircleOutlineOutlinedIcon className='text-primary-green' />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Exclusive Offers Await
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Unlock amazing discounts by verifying your email or mobile number
          </p>
          <a
            href='#guestDetail'
            onClick={(e) => {
              // e.preventDefault();
              toast.error("Please verify user details");
            }}
            className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Verify to Continue
          </a>

        </div>
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-200 to-cyan-300 rounded-full opacity-20"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full opacity-30"></div>
      </div>
    );
  }

  // Existing handlers with loading states
  const handleApplyCode = async () => {
    if (!inputValue.trim()) return;
    setIsApplying(true);
    try {
      const result = await getDiscountAsync({
        hotelId: hotelDetail._id,
        rate: finalPrice,
        offerCode: inputValue.trim(),
        checkInDate: checkIn
      });
      setOfferResult(result);
      if (result.discountedRate) {
        setFinalPrice(result.discountedRate);
      }
      toast.success("Discounted rate calculated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.error
          ? error?.response?.data?.error
          : "Error calculating discounted rate"
      );
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemoveOffer = () => {
    setAppliedOffer(null);
    setOfferResult(null);
    setFinalPrice(baseFinalPrice);
    setOfferSuccess(false);
  };

  const handlePredefinedOfferClick = async (offer) => {
    setAppliedOffer(offer);
    setOfferSuccess(false);
    setIsApplying(true);
    try {
      const result = await getDiscountAsync({
        hotelId: hotelDetail._id,
        rate: finalPrice,
        offerCode: offer.offerCode,
        checkInDate: checkIn
      });
      setOfferResult(result);
      if (result.discountedRate) {
        setFinalPrice(result.discountedRate);
      }
      setOfferSuccess(true);
    } catch (error) {
      toast.error(
        error?.response?.data?.error
          ? error?.response?.data?.error
          : "Error calculating discounted rate"
      );
      setAppliedOffer(null);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="flex flex-col bg-white w-full mx-auto font-sans">
      {/* Enhanced Header */}
      <div className="flex items-center mb-10 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-transparent rounded-xl opacity-50 -z-10"></div>
        <div
          className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-700 text-white mr-4 shadow-lg transform transition-transform hover:scale-105"
          style={{ backgroundColor: primaryColor }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
            <line x1="7" y1="7" x2="7.01" y2="7"></line>
          </svg>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-1">Exclusive Offers</h2>
          <p className="text-gray-500 text-sm">Save more on your booking with our special deals</p>
        </div>
      </div>

      {/* Enhanced Input Section */}
      {!appliedOffer && (
        <div className="relative mb-10">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-4">
            <div className="relative flex-grow group">
              <input
                type="text"
                id="promo"
                placeholder="Enter your promo code here..."
                className="w-full h-16 shadow-lg border-2 border-gray-200 rounded-2xl py-2 pl-14 pr-6 text-lg focus:outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-400 transition-all duration-300 group-hover:shadow-xl bg-gradient-to-r from-white to-gray-50"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleApplyCode()}
              />
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-cyan-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              {inputValue && (
                <button
                  onClick={() => setInputValue('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
            <button
              onClick={handleApplyCode}
              disabled={!inputValue.trim() || isApplying}
              className="h-16 px-8 md:w-48 rounded-2xl text-white font-bold transition-all duration-300 hover:shadow-xl flex items-center justify-center bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            >
              {isApplying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Applying...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Apply Code
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Available Offers Section */}
      {!appliedOffer && data && data.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center mb-6">
            <div className="w-1.5 h-8 rounded-full mr-4 bg-gradient-to-b from-cyan-400 to-cyan-600"></div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Available Offers</h3>
              <p className="text-gray-500 text-sm">Click on any offer to apply instantly</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((offer) => (
              <div
                key={offer.offerCode}
                onClick={() => handlePredefinedOfferClick(offer)}
                onMouseEnter={() => setHoveredOffer(offer.offerCode)}
                onMouseLeave={() => setHoveredOffer(null)}
                className="group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 border-gray-200 hover:border-cyan-400 hover:bg-gradient-to-br hover:from-cyan-50 hover:to-white transform hover:-translate-y-2 hover:shadow-2xl bg-white overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full transform translate-x-8 -translate-y-8 opacity-20 group-hover:opacity-40 transition-opacity"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <span className="font-bold text-xl text-gray-800 group-hover:text-cyan-700 transition-colors">
                        {offer.offerCode}
                      </span>
                      {offer.description && (
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{offer.description}</p>
                      )}
                    </div>
                    <div className="ml-3">
                      <span
                        className="text-lg font-bold px-4 py-2 rounded-full text-white shadow-lg bg-gradient-to-r from-cyan-500 to-cyan-600 group-hover:shadow-xl transition-shadow"
                      >
                        {offer.discountPercent}%
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Instant Discount
                    </div>
                    <div className="flex items-center text-cyan-600 font-semibold group-hover:text-cyan-700 transition-colors">
                      <span className="text-sm mr-2">
                        {hoveredOffer === offer.offerCode ? 'Click to apply' : 'Tap to use'}
                      </span>
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
                        className={`transition-transform duration-300 ${hoveredOffer === offer.offerCode ? 'translate-x-1' : ''}`}
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-600 opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Applied Offer Section */}
      {appliedOffer && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-1.5 h-8 rounded-full mr-4 bg-gradient-to-b from-cyan-400 to-cyan-600"></div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Applied Offer</h3>
                <p className="text-gray-500 text-sm">Your discount has been applied</p>
              </div>
            </div>
            <button
              onClick={handleRemoveOffer}
              className="flex items-center text-sm px-6 py-3 bg-gradient-to-r from-red-50 to-red-100 text-red-600 rounded-full hover:from-red-100 hover:to-red-200 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg border border-red-200"
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
                className="mr-2"
              >
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
              Remove & Change
            </button>
          </div>

          <div className="relative overflow-hidden p-8 bg-gradient-to-br from-cyan-50 to-white border-2 rounded-2xl shadow-xl border-cyan-200">
            {/* Success Banner */}
            <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-10 -translate-y-10">
              <div
                className="absolute transform rotate-45 text-white font-bold py-2 w-40 text-center text-sm shadow-lg bg-gradient-to-r from-cyan-500 to-cyan-600"
              >
                ✓ APPLIED
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between relative z-10">
              <div className="flex-1">
                <div className="font-bold text-3xl text-gray-800 mb-2">{appliedOffer.offerCode}</div>
                {appliedOffer.description && (
                  <div className="text-gray-600 text-lg leading-relaxed">{appliedOffer.description}</div>
                )}
              </div>
              <div className="mt-6 sm:mt-0 sm:ml-6">
                <div className="inline-flex items-center">
                  <span className="text-2xl font-bold px-6 py-3 rounded-2xl text-white shadow-lg bg-gradient-to-r from-cyan-500 to-cyan-600">
                    {appliedOffer.discountPercent}% OFF
                  </span>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="mt-8 pt-6 border-t border-cyan-200 flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center mr-3 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              {offerSuccess && (
                <p className="font-semibold text-lg text-gray-700">
                  🎉 Discount successfully applied to your booking!
                </p>
              )}
              {isApplying && (
                <p className="font-medium text-gray-600 flex items-center">
                  <div className="w-4 h-4 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Applying discount...
                </p>
              )}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-cyan-200 to-cyan-300 rounded-full opacity-20"></div>
            <div className="absolute top-1/2 -right-6 w-12 h-12 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full opacity-30"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferCode;