import React, { useState } from "react";
import { TrendingUp, Users, Eye, ArrowUpRight, LayoutDashboard, ClipboardList } from "lucide-react";
import Bookings from "./Bookings";
import { useFetchAllBookings } from "../../ApiHooks/pushBookingHook";
import { useGetAgentByEmail } from "../../ApiHooks/useAgentHook";

const AgentDashboard = ({ onViewAll }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const storedEmail = localStorage.getItem("user_email");

    // Fetch Agent Data (for commission rate)
    const { data: agentData } = useGetAgentByEmail(storedEmail);
    const commissionRate = agentData?.commissionRate || 0.10; // Default 10%

    // Fetch Real Bookings
    const { allBookings, isLoading } = useFetchAllBookings(storedEmail);

    // Filter Agent Bookings
    const agentBookings = allBookings.filter(b => {
        const source = (b.Source || "").toLowerCase();
        // Also include bookings with BookingSource from local DB merge if available
        return source.includes("agent") && !source.includes("corporate");
    });

    console.log("Debugging Dashboard:", {
        email: storedEmail,
        allBookingsCount: allBookings.length,
        agentBookingsCount: agentBookings.length,
        allBookings,
        agentData,
        commissionRate
    });

    // Calculate Stats
    const totalBookings = agentBookings.length;
    const confirmedBookings = agentBookings.filter(b => b.Booking_Status === "Confirmed").length; // Check API field name for status
    const pendingBookings = totalBookings - confirmedBookings;

    // Calculate Total Earnings
    const totalCommission = agentBookings.reduce((total, booking) => {
        // Ensure TotalInclusiveTax is a number
        const amount = parseFloat(booking.TotalInclusiveTax || 0);
        return total + (amount * commissionRate);
    }, 0);


    // Calculate Monthly Earnings
    const calculateCommissions = () => {
        const commissionsByMonth = {};

        agentBookings.forEach(booking => {
            const dateStr = booking.check_in_date || booking.Booking_Date; // Fallback
            if (!dateStr) return;

            const date = new Date(dateStr);
            const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            const monthKey = monthNames[date.getMonth()];

            const amount = parseFloat(booking.TotalInclusiveTax || 0);
            const commission = amount * commissionRate;

            if (!commissionsByMonth[monthKey]) {
                commissionsByMonth[monthKey] = 0;
            }
            commissionsByMonth[monthKey] += commission;
        });

        return Object.entries(commissionsByMonth).map(([month, amount]) => ({
            month,
            amount
        }));
    };

    const commissions = calculateCommissions();
    const recentBookings = [...agentBookings].reverse().slice(0, 6);


    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header Section with Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium transition-colors ${activeTab === 'dashboard'
                        ? 'border-primary-green text-primary-green'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                </button>
                <button
                    onClick={() => setActiveTab('bookings')}
                    className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium transition-colors ${activeTab === 'bookings'
                        ? 'border-primary-green text-primary-green'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <ClipboardList className="w-5 h-5" />
                    <span>Agent Bookings</span>
                </button>
            </div>

            {activeTab === 'bookings' ? (
                <div className="p-4">
                    <Bookings filterType="agent" />
                </div>
            ) : (
                <div className="p-6 space-y-12">

                    <div className="border-b border-gray-200 pb-8">
                        <h1 className="text-3xl front-medium text-gray-900 mb-2">Agent Dashboard</h1>
                        <p className="text-gray-600">Track your performance and earnings</p>
                    </div>

                    {/* Stats Section */}
                    {isLoading ? (
                        <div className="text-center py-10">Loading stats...</div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="text-2xl front-medium text-gray-900">₹{totalCommission.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                                </div>
                                <p className="text-sm text-gray-500 uppercase tracking-wide">Total Earnings</p>
                            </div>

                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="text-2xl front-medium text-gray-900">{totalBookings}</span>
                                    <TrendingUp className="w-4 h-4 text-blue-500" />
                                </div>
                                <p className="text-sm text-gray-500 uppercase tracking-wide">Total Bookings</p>
                            </div>

                            <div>
                                <span className="text-2xl front-medium text-gray-900 block mb-2">{confirmedBookings}</span>
                                <p className="text-sm text-gray-500 uppercase tracking-wide">Confirmed</p>
                            </div>

                            <div>
                                <span className="text-2xl front-medium text-gray-900 block mb-2">{pendingBookings}</span>
                                <p className="text-sm text-gray-500 uppercase tracking-wide">Pending</p>
                            </div>
                        </div>
                    )}

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-12">

                        {/* Commission Summary */}
                        <div className="lg:col-span-1">
                            <div className="mb-6">
                                <h2 className="text-xl front-medium text-gray-900 mb-1">Monthly Earnings</h2>
                                <p className="text-sm text-gray-500">Commission breakdown by month</p>
                            </div>

                            {commissions.length > 0 ? (
                                <div className="space-y-4">
                                    {commissions.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                                            <span className="text-gray-700 font-medium">{item.month}</span>
                                            <span className="text-gray-900 font-medium">₹{item.amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-400 text-sm">No earnings data available</p>
                                </div>
                            )}
                        </div>

                        {/* Recent Bookings */}
                        <div className="lg:col-span-2">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-xl front-medium text-gray-900 mb-1">Recent Bookings</h2>
                                    <p className="text-sm text-gray-500">{confirmedBookings} confirmed, {pendingBookings} pending</p>
                                </div>
                                <button
                                    onClick={() => setActiveTab('bookings')}
                                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    <span>View all</span>
                                    <Eye className="w-4 h-4" />
                                </button>
                            </div>

                            {recentBookings.length > 0 ? (
                                <div className="space-y-1">
                                    {recentBookings.map((booking, index) => {
                                        const amount = parseFloat(booking.TotalInclusiveTax || 0);
                                        const commission = amount * commissionRate;
                                        // TODO: Check if 'FirstName' or 'GuestName' exists in booking object
                                        const guestName = booking.FirstName ? `${booking.FirstName} ${booking.LastName || ''}` : "Guest";
                                        const hotelName = booking.hotelInfo?.name || booking.Hotel_Name || "Hotel";

                                        return (
                                            <div key={booking.ResNo || index} className="group hover:bg-gray-50 transition-colors rounded-lg p-4 -mx-4">
                                                <div className="grid grid-cols-12 gap-4 items-center">
                                                    <div className="col-span-1">
                                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                            <Users className="w-4 h-4 text-gray-500" />
                                                        </div>
                                                    </div>

                                                    <div className="col-span-4">
                                                        <p className="font-medium text-gray-900">{guestName}</p>
                                                        <p className="text-sm text-gray-500">{hotelName}</p>
                                                    </div>

                                                    <div className="col-span-2">
                                                        <p className="text-sm text-gray-700">{booking.selectedCity || "India"}</p>
                                                        {/* <p className="text-xs text-gray-500">{booking.nights} nights</p> */}
                                                    </div>

                                                    <div className="col-span-2">
                                                        <p className="text-sm text-gray-700">
                                                            {booking.check_in_date || booking.Booking_Date}
                                                        </p>
                                                    </div>

                                                    <div className="col-span-2 text-right">
                                                        <p className="font-medium text-gray-900">₹{amount.toLocaleString('en-IN')}</p>
                                                        <p className="text-sm text-green-600">
                                                            +₹{commission.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                                        </p>
                                                    </div>

                                                    <div className="col-span-1 text-right">
                                                        <span className={`inline-block w-2 h-2 rounded-full ${booking.Booking_Status === 'Confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                                                            }`}></span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="mb-4">
                                        <Users className="w-12 h-12 text-gray-300 mx-auto" />
                                    </div>
                                    <h3 className="text-lg front-medium text-gray-700 mb-2">No bookings yet</h3>
                                    <p className="text-gray-500 text-sm mb-6">Start making bookings to see them here</p>
                                    <button
                                        onClick={() => setActiveTab('bookings')}
                                        className="inline-flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-md text-sm transition-colors"
                                    >
                                        <span>Get Started</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgentDashboard;