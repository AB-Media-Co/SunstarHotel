import { useEffect, useState } from "react"
import {
  Calendar,
  MapPin,
  Users,
  Phone,
  Mail,
  Clock,
  CreditCard,
  Bed,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Building,
  ChevronDown,
  Star,
  Trash2,
  Eye,
  Filter,
  Search,
  Download,
  Share2,
} from "lucide-react"
import { useGetHotels } from "../../ApiHooks/useHotelHook2"
import { useGetMyBookings } from "../../ApiHooks/pushBookingHook"
import { useCancelBooking } from "../../ApiHooks/useUser"
import { usePricing } from "../../Context/PricingContext"
import toast from "react-hot-toast"

const StatusBadge = ({ status, bookingStatus }) => {
  if (bookingStatus === "Confirmed Reservation") {
    return (
      <span className="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
        <CheckCircle className="w-3 h-3 mr-1 md:mr-1.5" />
        Confirmed
      </span>
    )
  } else if (bookingStatus === "Unconfirmed Reservation") {
    return (
      <span className="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200">
        <AlertCircle className="w-3 h-3 mr-1 md:mr-1.5" />
        Unconfirmed
      </span>
    )
  } else if (status === "Cancelled") {
    return (
      <span className="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200">
        <XCircle className="w-3 h-3 mr-1 md:mr-1.5" />
        Cancelled
      </span>
    )
  }
  return (
    <span className="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200">
      {bookingStatus}
    </span>
  )
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount)
}

const ActionButton = ({ label, icon, secondary, danger, onClick }) => {
  let baseColor = "bg-[#5BBEBC] text-white hover:bg-[#4BA9A6]";
  if (secondary) baseColor = "bg-gray-100 text-gray-700 hover:bg-gray-200";
  if (danger) baseColor = "bg-red-100 text-red-700 hover:bg-red-200";

  return (
    <button 
      onClick={onClick} 
      className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition ${baseColor}`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}

const TabButton = ({ active, onClick, children, count }) => (
  <button
    onClick={onClick}
    className={`relative px-3 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-200 ${
      active
        ? "bg-[#5BBEBC] text-white shadow-lg"
        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
    }`}
  >
    {children}
    {count > 0 && (
      <span className={`ml-1 md:ml-2 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-bold ${
        active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
      }`}>
        {count}
      </span>
    )}
  </button>
)

const Bookings = () => {
  const [email, setEmail] = useState("")
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("upcoming")
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get hotels data
  const { data: hotelsData, isLoading: hotelsLoading, error: hotelsError } = useGetHotels()
  const cancelBooking = useCancelBooking();

  // Get bookings data
  const {
    data: bookingsData,
    isLoading: bookingsLoading,
    error: bookingsError,
    refetch: refetchBookings,
  } = useGetMyBookings({
    hotelCode: selectedHotel?.hotelCode,
    email,
    apiKey: selectedHotel?.authKey,
  })

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem("user_email")
    console.log(storedEmail)
    setEmail(storedEmail)

    // Set first hotel as default
    if (hotelsData?.hotels && hotelsData.hotels.length > 0) {
      setSelectedHotel(hotelsData.hotels[0])
    }
  }, [hotelsData])

  const handleRefresh = () => {
    refetchBookings()
  }

  const handleHotelChange = (hotel) => {
    console.log(hotel)
    setSelectedHotel(hotel)
    setIsDropdownOpen(false)
  }

  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking)
    setShowCancelModal(true)
  }

  const confirmCancelBooking = async () => {
    if (!selectedBooking || !selectedHotel) {
      toast.error("No booking selected or hotel information missing");
      return;
    }
    setIsCancelling(true);

    try {
      await cancelBooking.mutateAsync({
        hotelCode: selectedHotel.hotelCode,
        apiKey: selectedHotel.authKey,
        reservationNo: selectedBooking.ReservationNo
      });

      await refetchBookings();
      setShowCancelModal(false);
      setSelectedBooking(null);

    } catch (error) {
      console.error("Booking cancellation error:", error);
    } finally {
      setIsCancelling(false);
    }
  };

  // Filter bookings based on active tab and search term
  const getFilteredBookings = () => {
    const allBookings = bookingsData?.BookingList || [];
    const currentDate = new Date();
    
    // First filter by search term
    const searchFiltered = allBookings.filter((booking) => {
      return booking.GuestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.ReservationNo.toLowerCase().includes(searchTerm.toLowerCase())
    });

    // Then filter by tab
    switch (activeTab) {
      case "upcoming":
        return searchFiltered.filter((booking) => {
          const departureDate = new Date(booking.DepartureDate);
          return booking.Status !== "Cancelled" && 
                 booking.BookingStatus !== "Cancelled" && 
                 departureDate >= currentDate;
        });
      
      case "confirmed":
        return searchFiltered.filter((booking) => 
          booking.BookingStatus === "Confirmed Reservation" && 
          booking.Status !== "Cancelled"
        );
      
      case "cancelled":
        return searchFiltered.filter((booking) => 
          booking.Status === "Cancelled" || booking.BookingStatus === "Cancelled"
        );
      
      default:
        return searchFiltered;
    }
  };

  const filteredBookings = getFilteredBookings();

  // Get counts for each tab
  const getTabCounts = () => {
    const allBookings = bookingsData?.BookingList || [];
    const currentDate = new Date();
    
    const upcoming = allBookings.filter((booking) => {
      const departureDate = new Date(booking.DepartureDate);
      return booking.Status !== "Cancelled" && 
             booking.BookingStatus !== "Cancelled" && 
             departureDate >= currentDate;
    }).length;

    const confirmed = allBookings.filter((booking) => 
      booking.BookingStatus === "Confirmed Reservation" && 
      booking.Status !== "Cancelled"
    ).length;

    const cancelled = allBookings.filter((booking) => 
      booking.Status === "Cancelled" || booking.BookingStatus === "Cancelled"
    ).length;

    return { upcoming, confirmed, cancelled };
  };

  const tabCounts = getTabCounts();

  if (hotelsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="content mx-auto px-4 py-4 md:py-8">
          <div className="space-y-4 md:space-y-8">
            <div className="animate-pulse">
              <div className="h-8 md:h-10 w-48 md:w-64 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl mb-2 md:mb-4"></div>
              <div className="h-4 md:h-6 w-64 md:w-96 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
            </div>
            <div className="grid gap-4 md:gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-4 md:p-8">
                  <div className="animate-pulse space-y-4 md:space-y-6">
                    <div className="h-6 md:h-8 w-32 md:w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
                    <div className="h-4 md:h-6 w-24 md:w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                    <div className="space-y-2 md:space-y-4">
                      <div className="h-3 md:h-4 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                      <div className="h-3 md:h-4 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                      <div className="h-3 md:h-4 w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (hotelsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm border border-red-200 text-red-800 rounded-2xl p-6 md:p-8 flex items-start shadow-2xl max-w-md w-full">
          <AlertCircle className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3 mt-1 text-red-500 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-2">Connection Error</h3>
            <p className="text-red-700 text-sm md:text-base">Failed to load hotel information. Please check your connection and try again.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Cancel Booking Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 ">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 md:h-16 md:w-16 rounded-full bg-red-100 mb-3 md:mb-4">
                <Trash2 className="h-6 w-6 md:h-8 md:w-8 text-red-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Cancel Booking</h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                Are you sure you want to cancel the booking for <span className="font-semibold">{selectedBooking?.GuestName}</span>?
                <br />
                <span className="text-xs md:text-sm text-gray-500">Reservation #{selectedBooking?.ReservationNo}</span>
              </p>
              <div className="flex gap-2 md:gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 px-3 md:px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm md:text-base font-medium transition-colors"
                >
                  Keep Booking
                </button>
                <button
                  onClick={confirmCancelBooking}
                  className={`flex-1 px-3 md:px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-xl text-sm md:text-base font-medium transition-colors flex justify-center items-center`}
                  disabled={isCancelling}
                >
                  {isCancelling ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z"></path>
                      </svg>
                      <span className="hidden sm:inline">Cancelling...</span>
                    </span>
                  ) : (
                    "Cancel Booking"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-12">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 md:mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">My Bookings</h1>
              <p className="text-sm md:text-lg text-gray-500">Manage and review your hotel reservations</p>
            </div>
            {/* <div className="flex gap-2 md:gap-3">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-1 md:gap-2 px-3 md:px-5 py-2 md:py-3 text-white bg-[#5BBEBC] hover:bg-[#4BA9A6] rounded-xl shadow-md transition text-sm md:text-base"
              >
                <RefreshCw className="w-4 h-4 md:w-5 md:h-5" /> 
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div> */}
          </div>

          {/* Hotel Selection */}
          {hotelsData?.hotels && hotelsData.hotels.length > 0 && (
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-md mb-6 md:mb-10 border border-gray-200">
              <div className="mb-3 md:mb-4">
                <h3 className="font-semibold text-lg md:text-xl text-gray-900 mb-1 md:mb-2">Select Hotel</h3>
                <p className="text-gray-500 text-sm md:text-base">Choose your hotel to load bookings</p>
              </div>

              <div className="relative">
                <button
                  className="w-full bg-white border border-gray-300 py-3 md:py-4 px-4 md:px-6 rounded-lg text-left text-gray-900 font-medium flex justify-between items-center text-sm md:text-base"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="truncate pr-2">{selectedHotel ? selectedHotel.name : "Choose Hotel"}</span>
                  <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 transition-transform flex-shrink-0 ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute w-full mt-2 rounded-lg border border-gray-200 shadow-lg bg-white z-20 max-h-60 overflow-y-auto">
                    {hotelsData.hotels.map((hotel) => (
                      <button
                        key={hotel._id}
                        onClick={() => handleHotelChange(hotel)}
                        className="w-full text-left px-4 md:px-6 py-3 md:py-4 hover:bg-[#F9FAFB]"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 truncate text-sm md:text-base">{hotel.name}</div>
                            <div className="text-xs md:text-sm text-gray-500 truncate">{hotel.location?.hotelAddress}</div>
                          </div>
                          <span className="px-2 md:px-3 py-1 rounded-full text-xs bg-[#5BBEBC]/20 text-[#5BBEBC] ml-2 flex-shrink-0">{hotel.hotelCode}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tabs */}
          {selectedHotel && !bookingsLoading && (
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-md mb-6 md:mb-8 border border-gray-200">
              <div className="flex flex-wrap gap-2 md:gap-4">
                <TabButton
                  active={activeTab === "upcoming"}
                  onClick={() => setActiveTab("upcoming")}
                  count={tabCounts.upcoming}
                >
                  <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 inline" />
                  <span className="hidden sm:inline">Upcoming</span>
                  <span className="sm:hidden">Up</span>
                </TabButton>
                <TabButton
                  active={activeTab === "confirmed"}
                  onClick={() => setActiveTab("confirmed")}
                  count={tabCounts.confirmed}
                >
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 inline" />
                  <span className="hidden sm:inline">Confirmed</span>
                  <span className="sm:hidden">Conf</span>
                </TabButton>
                <TabButton
                  active={activeTab === "cancelled"}
                  onClick={() => setActiveTab("cancelled")}
                  count={tabCounts.cancelled}
                >
                  <XCircle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 inline" />
                  <span className="hidden sm:inline">Cancelled</span>
                  <span className="sm:hidden">Can</span>
                </TabButton>
              </div>
            </div>
          )}
        </div>

        {/* Bookings Loading State */}
        {bookingsLoading && (
          <div className="grid gap-4 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
                <div className="p-4 md:p-8 border-b border-gray-100">
                  <div className="animate-pulse flex justify-between items-start">
                    <div className="space-y-2 md:space-y-3">
                      <div className="h-6 md:h-8 w-32 md:w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
                      <div className="h-4 md:h-5 w-24 md:w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                    </div>
                    <div className="h-6 md:h-8 w-16 md:w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
                  </div>
                </div>
                <div className="p-4 md:p-8">
                  <div className="animate-pulse grid md:grid-cols-2 gap-4 md:gap-8">
                    <div className="space-y-2 md:space-y-4">
                      <div className="h-4 md:h-5 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                      <div className="h-4 md:h-5 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                      <div className="h-4 md:h-5 w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                    </div>
                    <div className="space-y-2 md:space-y-4">
                      <div className="h-4 md:h-5 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                      <div className="h-4 md:h-5 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                      <div className="h-4 md:h-5 w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bookings Error State */}
        {bookingsError && (
          <div className="bg-white/80 backdrop-blur-sm border border-red-200 text-red-800 rounded-2xl p-4 md:p-8 flex items-start shadow-2xl">
            <AlertCircle className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3 mt-1 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-base md:text-lg mb-2">Failed to Load Bookings</h3>
              <p className="text-red-700 text-sm md:text-base">Please check your connection and try again. If the problem persists, contact support.</p>
            </div>
          </div>
        )}

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-4 md:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-xl md:text-3xl font-bold text-gray-900">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Reservations
                <span className="ml-2 md:ml-3 inline-flex items-center px-2 md:px-4 py-1 md:py-2 rounded-full text-sm md:text-lg font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800">
                  {filteredBookings.length}
                </span>
              </h2>
            </div>

            <div className="grid gap-4 md:gap-6">
              {filteredBookings.map((booking) => (
                <div key={booking.ReservationNo} className="bg-white border border-gray-200 rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition-all">
                  {/* TOP SUMMARY */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 md:mb-4 gap-2">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base md:text-lg font-semibold text-gray-900 flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="truncate">{booking.GuestName.trim()}</span>
                        <StatusBadge status={booking.Status} bookingStatus={booking.BookingStatus} />
                      </h2>
                      <p className="text-xs md:text-sm text-gray-500 mt-1">Reservation #{booking.ReservationNo}</p>
                    </div>
                    <div className="text-left sm:text-right flex-shrink-0">
                      <p className="text-lg md:text-xl font-bold text-[#5BBEBC]">{formatCurrency(booking.TotalInclusiveTax)}</p>
                      <p className="text-xs text-gray-500">Total Amount</p>
                    </div>
                  </div>

                  {/* MIDDLE DETAILS */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4 text-xs md:text-sm text-gray-700">
                    {/* Left: Stay Info */}
                    <div className="space-y-1 md:space-y-2">
                      <p><span className="font-medium">Stay:</span> {formatDate(booking.ArrivalDate)} - {formatDate(booking.DepartureDate)} ({booking.NoOfNights} nights)</p>
                      <p><span className="font-medium">Room:</span> {booking.Room} #{booking.RoomNo}</p>
                      <p><span className="font-medium">Guests:</span> {booking.Adult} Adult{booking.Child > 0 ? `, ${booking.Child} Child` : ""}</p>
                    </div>

                    {/* Right: Contact & Payment */}
                    <div className="space-y-1 md:space-y-2">
                      <p className="truncate"><span className="font-medium">Email:</span> {booking.Email}</p>
                      <p><span className="font-medium">Mobile:</span> {booking.Mobile}</p>
                      <p><span className="font-medium">Payment:</span> {booking.TransactionStatus}</p>
                      {booking.DueAmount > 0 && (
                        <p className="font-semibold text-red-500">
                          Due: {formatCurrency(booking.DueAmount)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center text-xs text-gray-500 border-t pt-3 md:pt-4 gap-3">
                    <div className="flex flex-wrap gap-2 md:gap-4">
                      <span>Booked: {formatDate(booking.ReservationDate)}</span>
                      <span>Source: {booking.Source}</span>
                      <span>Folio: {booking.FolioNo}</span>
                    </div>

                    <div className="flex gap-2 md:gap-3 justify-end">
                      {booking.Status !== "Cancelled" && booking.BookingStatus !== "Cancelled" && (
                        <ActionButton 
                          label="Cancel" 
                          icon={<Trash2 className="w-3 h-3 md:w-4 md:h-4" />} 
                          danger 
                          onClick={() => handleCancelBooking(booking)} 
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          !bookingsLoading &&
          selectedHotel && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl  text-center py-8 md:py-16 px-4 md:px-8">
              <div className="flex flex-col items-center gap-4 md:gap-6">
                <div className="p-4 md:p-6 bg-gradient-to-br from-gray-100 to-slate-100 rounded-full">
                  {activeTab === "upcoming" && <Calendar className="w-8 h-8 md:w-12 md:h-12 text-gray-400" />}
                  {activeTab === "confirmed" && <CheckCircle className="w-8 h-8 md:w-12 md:h-12 text-gray-400" />}
                  {activeTab === "cancelled" && <XCircle className="w-8 h-8 md:w-12 md:h-12 text-gray-400" />}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    No {activeTab} bookings found
                  </h3>
                  <p className="text-gray-600 text-base md:text-lg max-w-md">
                    {searchTerm
                      ? `No ${activeTab} bookings match your search criteria.`
                      : `You don't have any ${activeTab} bookings for ${selectedHotel.name} yet.`
                    }
                  </p>
                </div>
                {(!searchTerm && activeTab === "upcoming") && (
                  <button className="mt-2 md:mt-4 inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-primary-green text-white rounded-xl font-semibold shadow-lg transition-all duration-200 hover:scale-105 text-sm md:text-base">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Make a Booking
                  </button>
                )}
              </div>
            </div>
          )
        )}

        {!selectedHotel && !hotelsLoading && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl text-center py-8 md:py-16 px-4 md:px-8">
            <div className="flex flex-col items-center gap-4 md:gap-6">
              <div className="p-4 md:p-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full">
                <Building className="w-8 h-8 md:w-12 md:h-12 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Select a hotel</h3>
                <p className="text-gray-600 text-base md:text-lg max-w-md">
                  Please select a hotel from the dropdown above to view your amazing bookings and reservations.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Bookings

