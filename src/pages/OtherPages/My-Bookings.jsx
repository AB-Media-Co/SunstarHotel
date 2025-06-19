"use client"

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

const StatusBadge = ({ status, bookingStatus }) => {
  if (bookingStatus === "Confirmed Reservation") {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
        <CheckCircle className="w-3 h-3 mr-1.5" />
        Confirmed
      </span>
    )
  } else if (bookingStatus === "Unconfirmed Reservation") {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200">
        <AlertCircle className="w-3 h-3 mr-1.5" />
        Unconfirmed
      </span>
    )
  } else if (status === "Cancelled") {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200">
        <XCircle className="w-3 h-3 mr-1.5" />
        Cancelled
      </span>
    )
  }
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200">
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
    <button onClick={onClick} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${baseColor}`}>
      {icon}
      {label}
    </button>
  )
}


export default function MyBookings() {
  const [email, setEmail] = useState("")
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [isCancelling, setIsCancelling] = useState(false);

  const {setIsNavColor} =usePricing()

  useEffect(() => {
      setIsNavColor(true);
    
      return () => {
        setIsNavColor(false); // ✅ Reset when leaving the page
      };
    }, [setIsNavColor]);

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
    const storedEmail = localStorage.getItem("userEmail") || "prakash@abmediaco.com"
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
    setIsCancelling(true); // Start loader

    try {
      await cancelBooking.mutateAsync({
        hotelCode: selectedHotel.hotelCode,
        apiKey: selectedHotel.authKey,
        reservationNo: selectedBooking.ReservationNo
      });

      // Only proceed if mutation was successful
      await refetchBookings(); // Wait for refetch to complete

      // Show success message (now handled in onSuccess callback)
      setShowCancelModal(false);
      setSelectedBooking(null);

    } catch (error) {
      // Error is already handled in onError callback, but we can add additional handling here if needed
      console.error("Booking cancellation error:", error);
      // Optionally keep the modal open to let user retry
      // setShowCancelModal(true);
    } finally {
      setIsCancelling(false); // Stop loader
    }
  };


  const filteredBookings = bookingsData?.BookingList?.filter((booking) => {
    const matchesSearch = booking.GuestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.ReservationNo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" ||
      (statusFilter === "confirmed" && booking.BookingStatus === "Confirmed Reservation") ||
      (statusFilter === "unconfirmed" && booking.BookingStatus === "Unconfirmed Reservation") ||
      (statusFilter === "cancelled" && booking.Status === "Cancelled")
    return matchesSearch && matchesStatus
  }) || []

  if (hotelsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="content  mx-auto px-4 py-8">
          <div className="space-y-8">
            <div className="animate-pulse">
              <div className="h-10 w-64 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl mb-4"></div>
              <div className="h-6 w-96 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
            </div>
            <div className="grid gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                  <div className="animate-pulse space-y-6">
                    <div className="h-8 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
                    <div className="h-6 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                    <div className="space-y-4">
                      <div className="h-4 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                      <div className="h-4 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                      <div className="h-4 w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm border border-red-200 text-red-800 rounded-2xl p-8 flex items-start shadow-2xl max-w-md">
          <AlertCircle className="h-6 w-6 mr-3 mt-1 text-red-500" />
          <div>
            <h3 className="font-semibold text-lg mb-2">Connection Error</h3>
            <p className="text-red-700">Failed to load hotel information. Please check your connection and try again.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Cancel Booking Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cancel Booking</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to cancel the booking for <span className="font-semibold">{selectedBooking?.GuestName}</span>?
                <br />
                <span className="text-sm text-gray-500">Reservation #{selectedBooking?.ReservationNo}</span>
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
                >
                  Keep Booking
                </button>
                <button
                  onClick={confirmCancelBooking}
                  className={`flex-1 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-xl font-medium transition-colors flex justify-center items-center`}
                  disabled={isCancelling}
                >
                  {isCancelling ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z"></path>
                      </svg>
                      Cancelling...
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

      <div className="content pt-24 mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
              <p className="text-lg text-gray-500">Manage and review your hotel reservations</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-5 py-3 text-white bg-[#5BBEBC] hover:bg-[#4BA9A6] rounded-xl shadow-md transition"
              >
                <RefreshCw className="w-5 h-5" /> Refresh
              </button>
           
            </div>
          </div>

          {/* Hotel Selection */}
          {hotelsData?.hotels && hotelsData.hotels.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-md mb-10 border border-gray-200">
              <div className="mb-4">
                <h3 className="font-semibold text-xl text-gray-900 mb-2">Select Hotel</h3>
                <p className="text-gray-500">Choose your hotel to load bookings</p>
              </div>

              <div className="relative">
                <button
                  className="w-full bg-white border border-gray-300 py-4 px-6 rounded-lg text-left text-gray-900 font-medium flex justify-between items-center"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {selectedHotel ? selectedHotel.name : "Choose Hotel"}
                  <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute w-full mt-2 rounded-lg border border-gray-200 shadow-lg bg-white z-20">
                    {hotelsData.hotels.map((hotel) => (
                      <button
                        key={hotel._id}
                        onClick={() => handleHotelChange(hotel)}
                        className="w-full text-left px-6 py-4 hover:bg-[#F9FAFB]"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-gray-900">{hotel.name}</div>
                            <div className="text-sm text-gray-500">{hotel.location?.hotelAddress}</div>
                          </div>
                          <span className="px-3 py-1 rounded-full text-sm bg-[#5BBEBC]/20 text-[#5BBEBC]">{hotel.hotelCode}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Search and Filter */}
          {bookingsData?.BookingList && bookingsData.BookingList.length > 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by guest name or reservation number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white min-w-[140px]"
                  >
                    <option value="all">All Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="unconfirmed">Unconfirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Room Statistics */}
        {bookingsData?.RoomList && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Total Rooms */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-[#5BBEBC] rounded-xl">
                  <Bed className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Total Rooms</p>
                  <p className="text-3xl font-bold text-gray-900">{bookingsData.RoomList.TotalActiveRoomInHotel}</p>
                </div>
              </div>
            </div>

            {/* Occupied */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-[#FDC114] rounded-xl">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Occupied</p>
                  <p className="text-3xl font-bold text-gray-900">{bookingsData.RoomList.TotalOccupiedRooms}</p>
                </div>
              </div>
            </div>

            {/* Blocked */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-red-500 rounded-xl">
                  <XCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Blocked</p>
                  <p className="text-3xl font-bold text-gray-900">{bookingsData.RoomList.TotalBlockRooms}</p>
                </div>
              </div>
            </div>
          </div>

        )}

        {/* Bookings Loading State */}
        {bookingsLoading && (
          <div className="grid gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
                <div className="p-8 border-b border-gray-100">
                  <div className="animate-pulse flex justify-between items-start">
                    <div className="space-y-3">
                      <div className="h-8 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
                      <div className="h-5 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                    </div>
                    <div className="h-8 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="animate-pulse grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="h-5 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                      <div className="h-5 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                      <div className="h-5 w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-5 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                      <div className="h-5 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                      <div className="h-5 w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bookings Error State */}
        {bookingsError && (
          <div className="bg-white/80 backdrop-blur-sm border border-red-200 text-red-800 rounded-2xl p-8 flex items-start shadow-2xl">
            <AlertCircle className="h-6 w-6 mr-3 mt-1 text-red-500" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Failed to Load Bookings</h3>
              <p className="text-red-700">Please check your connection and try again. If the problem persists, contact support.</p>
            </div>
          </div>
        )}

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">
                Your Reservations
                <span className="ml-3 inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800">
                  {filteredBookings.length}
                </span>
              </h2>
            </div>

            <div className="grid gap-6">
              {filteredBookings.map((booking) => (
                <div key={booking.ReservationNo} className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition-all">

                  {/* TOP SUMMARY */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        {booking.GuestName.trim()}
                        <StatusBadge status={booking.Status} bookingStatus={booking.BookingStatus} />
                      </h2>
                      <p className="text-sm text-gray-500">Reservation #{booking.ReservationNo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-[#5BBEBC]">{formatCurrency(booking.TotalInclusiveTax)}</p>
                      <p className="text-xs text-gray-500">Total Amount</p>
                    </div>
                  </div>

                  {/* MIDDLE DETAILS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm text-gray-700">
                    {/* Left: Stay Info */}
                    <div className="space-y-2">
                      <p><span className="font-medium">Stay:</span> {formatDate(booking.ArrivalDate)} - {formatDate(booking.DepartureDate)} ({booking.NoOfNights} nights)</p>
                      <p><span className="font-medium">Room:</span> {booking.Room} #{booking.RoomNo}</p>
                      <p><span className="font-medium">Guests:</span> {booking.Adult} Adult{booking.Child > 0 ? `, ${booking.Child} Child` : ""}</p>
                    </div>

                    {/* Right: Contact & Payment */}
                    <div className="space-y-2">
                      <p><span className="font-medium">Email:</span> {booking.Email}</p>
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
                  <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 border-t pt-4">
                    <div className="flex flex-wrap gap-4 mb-3 md:mb-0">
                      <span>Booked on: {formatDate(booking.ReservationDate)}</span>
                      <span>Source: {booking.Source}</span>
                      <span>Folio: {booking.FolioNo}</span>
                    </div>

                    <div className="flex gap-3">

                      {booking.Status !== "Cancelled" && booking.BookingStatus !== "Cancelled" && (
                        <ActionButton label="Cancel" icon={<Trash2 className="w-4 h-4" />} danger onClick={() => handleCancelBooking(booking)} />
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
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl text-center py-16 px-8">
              <div className="flex flex-col items-center gap-6">
                <div className="p-6 bg-gradient-to-br from-gray-100 to-slate-100 rounded-full">
                  <Calendar className="w-12 h-12 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No bookings found</h3>
                  <p className="text-gray-600 text-lg max-w-md">
                    {searchTerm || statusFilter !== "all"
                      ? "No bookings match your current search or filter criteria."
                      : `You don't have any bookings for ${selectedHotel.name} yet. Start planning your next luxurious stay!`
                    }
                  </p>
                </div>
                {(!searchTerm && statusFilter === "all") && (
                  <button className="mt-4 inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 hover:scale-105">
                    <Calendar className="w-5 h-5 mr-2" />
                    Make a Booking
                  </button>
                )}
              </div>
            </div>
          )
        )}

        {!selectedHotel && !hotelsLoading && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl text-center py-16 px-8">
            <div className="flex flex-col items-center gap-6">
              <div className="p-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full">
                <Building className="w-12 h-12 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Select a hotel</h3>
                <p className="text-gray-600 text-lg max-w-md">
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