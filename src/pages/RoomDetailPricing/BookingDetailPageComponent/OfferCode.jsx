import { useEffect, useState } from 'react';
import { useDiscountedRate, useOfferCodesForHotel } from '../../../ApiHooks/useOffersAndDealsHook';
import toast from 'react-hot-toast';
import { usePricing } from '../../../Context/PricingContext';
import Cookies from 'js-cookie';
import { useGetUserByEmail } from '../../../ApiHooks/useUser';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

export const OfferCode = ({ hotelDetail, checkIn, verified }) => {
  const [inputValue, setInputValue] = useState('');
  const [, setOfferResult] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [hoveredOffer, setHoveredOffer] = useState(null);
  const primaryColor = '#058FA2';
  const { mutate: fetchOfferCodes, data } = useOfferCodesForHotel();
  const { mutateAsync: getDiscountAsync } = useDiscountedRate();
  const { finalPrice, setFinalPrice, baseFinalPrice, paymentMethod, appliedOffers, setAppliedOffers, setOfferDiscount, payNowDiscount } = usePricing();

  const email = localStorage.getItem("user_email");
  const { data: userData, isLoading: userLoading } = useGetUserByEmail(email);
  const isUserVerified = localStorage.getItem("user_email") !== null;

  useEffect(() => {
    if (hotelDetail && hotelDetail._id && isUserVerified) {
      fetchOfferCodes(hotelDetail._id);
    }
  }, [fetchOfferCodes, hotelDetail, isUserVerified, userData]);

  if (userLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-3 border-gray-200 border-t-primary-green rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-600">Loading offers...</p>
        </div>
      </div>
    );
  }

  if (!isUserVerified) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
        <div className="flex flex-col items-center text-start md:text-center space-y-4">

          <div>
            <h3 className="text-mobile/h4 md:text-desktop/h4 font-semibold text-gray-800">Unlock Exclusive Offers</h3>
            <p className="text-sm text-gray-600 mt-1">Sign in to access special discounts and deals</p>
          </div>
          <a
            href='#guestDetail'
            onClick={(e) => {
              toast.error("Please verify your details");
            }}
            className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-primary-green text-white rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Verify to Continue
          </a>
        </div>
      </div>
    );
  }

  const handleApplyCode = async () => {
    console.log("hi")
    if (!inputValue.trim()) return;

    // Check if code already applied
    if (appliedOffers.some(offer => offer.offerCode.toUpperCase() === inputValue.trim().toUpperCase())) {
      toast.error('This promo code is already applied');
      return;
    }

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
        const newOffer = {
          offerCode: inputValue.trim().toUpperCase(),
          description: result.description || `Discount applied`,
          discountPercent: result.discountPercent || 0,
          discountedRate: result.discountedRate
        };

        setAppliedOffers(prev => [...prev, newOffer]);

        // Calculate and set the offer discount amount
        const offerDiscountAmount = finalPrice - result.discountedRate;
        console.log(offerDiscountAmount);
        setOfferDiscount(offerDiscountAmount);

        setFinalPrice(result.discountedRate);
        setInputValue('');
        toast.success("Offer applied successfully");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Error applying offer"
      );
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemoveOffer = (offerCodeToRemove) => {
    const updatedOffers = appliedOffers.filter(offer => offer.offerCode !== offerCodeToRemove);
    setAppliedOffers(updatedOffers);

    if (updatedOffers.length === 0) {
      setFinalPrice(baseFinalPrice - payNowDiscount);
      setOfferDiscount(0); // Reset offer discount
    } else {
      // Recalculate price with remaining offers
      const lastOffer = updatedOffers[updatedOffers.length - 1];
      setFinalPrice(lastOffer.discountedRate);

      // Calculate and set the offer discount amount
      const offerDiscountAmount = baseFinalPrice - payNowDiscount - lastOffer.discountedRate;
      setOfferDiscount(offerDiscountAmount);
    }

    toast.success('Promo code removed');
  };

  const handlePredefinedOfferClick = async (offer) => {
    console.log("hi")
    // Check if already applied
    if (appliedOffers.some(o => o.offerCode === offer.offerCode)) {
      toast.error('This promo code is already applied');
      return;
    }

    setIsApplying(true);
    try {
      const result = await getDiscountAsync({
        hotelId: hotelDetail._id,
        rate: finalPrice,
        offerCode: offer.offerCode,
        checkInDate: checkIn
      });
      if (result.discountedRate) {
        const newAppliedOffer = {
          offerCode: offer.offerCode,
          description: offer.description,
          discountPercent: offer.discountPercent,
          discountedRate: result.discountedRate
        };

        setAppliedOffers(prev => [...prev, newAppliedOffer]);

        // Calculate and set the offer discount amount
        const offerDiscountAmount = finalPrice - result.discountedRate;
        console.log(offerDiscountAmount);
        setOfferDiscount(offerDiscountAmount);

        setFinalPrice(result.discountedRate);
        toast.success('Offer applied successfully!');
      } else {
        throw new Error('No discount rate returned');
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Error applying offer"
      );
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="bg-white w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-mobile/h4 md:text-desktop/h4 font-semibold text-gray-800">Exclusive Offers</h2>
        <p className="text-xs md:text-sm text-gray-600 mt-1">Apply a promo code to get discounts</p>
      </div>

      {/* Applied Codes Tags */}
      {appliedOffers.length > 0 && (
        <div className="mb-3 pb-3  border-gray-200">
          <div className="flex flex-wrap gap-2 items-center">
            {appliedOffers.map((offer) => (
              <div
                key={offer.offerCode}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-green-100 border border-green-300 rounded-full px-3 py-1"
              >
                <span className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" className="flex-shrink-0">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="font-semibold text-primary-green text-sm">{offer.offerCode}</span>
                  <span className="text-xs text-primary-green font-medium">({offer.discountPercent}%)</span>
                </span>
                <button
                  onClick={() => handleRemoveOffer(offer.offerCode)}
                  className="ml-1 text-primary-green hover:text-primary-green-dark transition-colors flex-shrink-0"
                  title="Remove this promo code"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Section */}
      <div className="mb-6">
        <div className="flex gap-2 md:gap-3  flex-col md:flex-row">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter promo code..."
              className="w-full h-12 md:h-14 border border-gray-300 rounded-lg px-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleApplyCode()}
            />
            {inputValue && (
              <button
                onClick={() => setInputValue('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
          <div className='flex justify-end'>
            <button
              onClick={handleApplyCode}
              disabled={!inputValue.trim() || isApplying}
              className="h-12 md:h-14 px-6 w-auto bg-primary-green text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
            >
              {isApplying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="hidden sm:inline">Applying...</span>
                </>
              ) : (
                <>
                  <span className="inline">Apply Promo Code</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Available Offers - Hidden when codes are applied */}
      {appliedOffers.length === 0 && data && data.length > 0 && (
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.map((offer) => (
              <div
                key={offer.offerCode}
                onClick={() => handlePredefinedOfferClick(offer)}
                onMouseEnter={() => setHoveredOffer(offer.offerCode)}
                onMouseLeave={() => setHoveredOffer(null)}
                className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-cyan-500 hover:bg-cyan-50 transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 text-sm">{offer.offerCode}</div>
                    {offer.description && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-1 capitalize">apply this promo code to get {offer.discountPercent}% off </p>
                    )}
                  </div>
                  <div className="flex-shrink-0 bg-cyan-100 text-cyan-700 px-3 py-1.5 rounded-lg font-semibold text-sm">
                    {offer.discountPercent}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferCode;