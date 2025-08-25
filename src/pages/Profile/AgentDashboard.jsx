import React from "react";
import { TrendingUp, Users, Eye, ArrowUpRight } from "lucide-react";

const AgentDashboard = ({ onViewAll }) => {
  // Sample bookings data with commission amounts
  const dummyBookings = [
    { 
      id: 1, 
      customer: "John Doe", 
      hotel: "SunStar Hotel", 
      date: "2025-01-15", 
      status: "Confirmed",
      bookingAmount: 25000,
      commissionRate: 0.10,
      location: "Mumbai",
      nights: 3
    },
    { 
      id: 2, 
      customer: "Jane Smith", 
      hotel: "Blue Lagoon Resort", 
      date: "2025-01-22", 
      status: "Confirmed",
      bookingAmount: 18000,
      commissionRate: 0.08,
      location: "Goa",
      nights: 2
    },
    { 
      id: 3, 
      customer: "Mike Johnson", 
      hotel: "Ocean View Hotel", 
      date: "2025-02-05", 
      status: "Confirmed",
      bookingAmount: 32000,
      commissionRate: 0.12,
      location: "Kerala",
      nights: 4
    },
    { 
      id: 4, 
      customer: "Sarah Wilson", 
      hotel: "Mountain Resort", 
      date: "2025-02-18", 
      status: "Confirmed",
      bookingAmount: 28000,
      commissionRate: 0.09,
      location: "Manali",
      nights: 5
    },
    { 
      id: 5, 
      customer: "David Brown", 
      hotel: "City Center Hotel", 
      date: "2025-03-08", 
      status: "Confirmed",
      bookingAmount: 22000,
      commissionRate: 0.11,
      location: "Delhi",
      nights: 2
    },
    { 
      id: 6, 
      customer: "Emma Davis", 
      hotel: "Seaside Resort", 
      date: "2025-03-20", 
      status: "Pending",
      bookingAmount: 35000,
      commissionRate: 0.10,
      location: "Chennai",
      nights: 6
    }
  ];

  // Calculate commissions based on bookings
  const calculateCommissions = () => {
    const commissionsByMonth = {};
    
    dummyBookings
      .filter(booking => booking.status === "Confirmed")
      .forEach(booking => {
        const date = new Date(booking.date);
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const monthKey = monthNames[date.getMonth()];
        const commission = booking.bookingAmount * booking.commissionRate;
        
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
  const recentBookings = dummyBookings.slice(-6).reverse();
  const totalCommission = dummyBookings
    .filter(booking => booking.status === "Confirmed")
    .reduce((total, booking) => total + (booking.bookingAmount * booking.commissionRate), 0);

  const totalBookings = dummyBookings.length;
  const confirmedBookings = dummyBookings.filter(b => b.status === "Confirmed").length;
  const pendingBookings = dummyBookings.filter(b => b.status === "Pending").length;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-8">
        <h1 className="text-3xl front-medium text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Track your performance and earnings</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl front-medium text-gray-900">₹{totalCommission.toLocaleString('en-IN')}</span>
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
                  <span className="text-gray-900 font-medium">₹{item.amount.toLocaleString('en-IN')}</span>
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
              onClick={onViewAll}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span>View all</span>
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {recentBookings.length > 0 ? (
            <div className="space-y-1">
              {recentBookings.map((booking, index) => {
                const commission = booking.bookingAmount * booking.commissionRate;
                return (
                  <div key={booking.id} className="group hover:bg-gray-50 transition-colors rounded-lg p-4 -mx-4">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-gray-500" />
                        </div>
                      </div>
                      
                      <div className="col-span-4">
                        <p className="font-medium text-gray-900">{booking.customer}</p>
                        <p className="text-sm text-gray-500">{booking.hotel}</p>
                      </div>
                      
                      <div className="col-span-2">
                        <p className="text-sm text-gray-700">{booking.location}</p>
                        <p className="text-xs text-gray-500">{booking.nights} nights</p>
                      </div>
                      
                      <div className="col-span-2">
                        <p className="text-sm text-gray-700">
                          {new Date(booking.date).toLocaleDateString('en-GB')}
                        </p>
                      </div>
                      
                      <div className="col-span-2 text-right">
                        <p className="font-medium text-gray-900">₹{booking.bookingAmount.toLocaleString('en-IN')}</p>
                        <p className="text-sm text-green-600">
                          {booking.status === "Confirmed" 
                            ? `+₹${commission.toLocaleString('en-IN')}`
                            : "Pending"
                          }
                        </p>
                      </div>
                      
                      <div className="col-span-1 text-right">
                        <span className={`inline-block w-2 h-2 rounded-full ${
                          booking.status === 'Confirmed' ? 'bg-green-500' : 'bg-yellow-500'
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
                onClick={onViewAll}
                className="inline-flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-md text-sm transition-colors"
              >
                <span>Get Started</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;