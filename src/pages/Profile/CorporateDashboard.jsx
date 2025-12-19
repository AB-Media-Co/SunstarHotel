import React, { useState } from "react";
import Bookings from "./Bookings";
import { LayoutDashboard, ClipboardList } from "lucide-react";
import { useFetchAllBookings } from "../../ApiHooks/pushBookingHook";

const CorporateDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const storedEmail = localStorage.getItem("user_email");
    const { allBookings, isLoading } = useFetchAllBookings(storedEmail);

    // Filter Corporate Bookings
    const corporateBookings = allBookings.filter(b => {
        const source = (b.Source || "").toLowerCase();
        return source.includes("corporate");
    });

    // Calculate Monthly Spend
    const calculateMonthlySpend = () => {
        const spendByMonth = {};

        corporateBookings.forEach(booking => {
            const dateStr = booking.check_in_date || booking.Booking_Date;
            if (!dateStr || (booking.Status === "Cancelled" || booking.BookingStatus === "Cancelled")) return;

            const date = new Date(dateStr);
            const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            const monthKey = monthNames[date.getMonth()];
            const amount = parseFloat(booking.TotalInclusiveTax || 0);

            if (!spendByMonth[monthKey]) {
                spendByMonth[monthKey] = 0;
            }
            spendByMonth[monthKey] += amount;
        });

        return Object.entries(spendByMonth).map(([month, amount]) => ({
            month,
            amount: amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
        }));
    };

    const monthlySpends = calculateMonthlySpend();

    // Recent Bookings (Last 180 days logic implies just showing recent ones)
    const recentBookings = [...corporateBookings].reverse().slice(0, 10);

    return (
        <div className="space-y-8 p-4 md:p-6">
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
                    <span>Corporate Bookings</span>
                </button>
            </div>

            {activeTab === 'bookings' ? (
                <div>
                    <Bookings filterType="corporate" />
                </div>
            ) : (
                <>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monthly Spend</h2>
                        {monthlySpends.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {monthlySpends.map((item) => (
                                    <li key={item.month} className="flex justify-between py-2">
                                        <span className="text-gray-700">{item.month}</span>
                                        <span className="font-medium text-primary-green">{item.amount}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 text-sm">No spend data available yet.</p>
                        )}
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Recent Corporate Bookings</h2>
                        <p className="mt-2 text-gray-500">
                            {recentBookings.length} bookings shown.
                        </p>

                        {isLoading ? (
                            <div className="py-8 text-center text-gray-500">Loading bookings...</div>
                        ) : recentBookings.length > 0 ? (
                            <div className="mt-6 overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-200 text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border border-gray-200 p-3 text-left">Res No</th>
                                            <th className="border border-gray-200 p-3 text-left">Guest</th>
                                            <th className="border border-gray-200 p-3 text-left">Rooms</th>
                                            <th className="border border-gray-200 p-3 text-left">Date</th>
                                            <th className="border border-gray-200 p-3 text-left">Amount</th>
                                            <th className="border border-gray-200 p-3 text-left">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentBookings.map((b) => (
                                            <tr key={b.ReservationNo} className="hover:bg-gray-50 transition">
                                                <td className="border border-gray-200 p-3 text-xs">{b.ReservationNo}</td>
                                                <td className="border border-gray-200 p-3 font-medium">{b.GuestName || b.FirstName}</td> {/* Replaced Dept with Guest Name as Dept isn't in API */}
                                                <td className="border border-gray-200 p-3">{b.NoOfRooms || 1}</td>
                                                <td className="border border-gray-200 p-3">{b.Booking_Date || b.check_in_date}</td>
                                                <td className="border border-gray-200 p-3">₹{parseFloat(b.TotalInclusiveTax || 0).toLocaleString('en-IN')}</td>
                                                <td className={`border border-gray-200 p-3 font-medium ${b.Booking_Status === "Confirmed" ? "text-green-600" : "text-yellow-600"}`}>{b.Booking_Status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="mt-6 bg-gray-100 rounded-lg p-8 text-center">
                                <h3 className="text-xl font-semibold text-gray-700">No recent corporate bookings</h3>
                                <p className="mt-2 text-gray-500">Plan your next offsite or block rooms for your team.</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default CorporateDashboard;