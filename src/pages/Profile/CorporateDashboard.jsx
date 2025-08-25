// src/pages/Profile/CorporateDashboard.jsx
import React from "react";

const CorporateDashboard = () => {
  const dummySpend = [
    { month: "January", amount: "₹1,20,000" },
    { month: "February", amount: "₹98,500" },
    { month: "March", amount: "₹1,45,300" },
  ];

  const dummyBookings = [
    { id: "C-101", dept: "Sales", rooms: 6, date: "2025-03-12", status: "Confirmed" },
    { id: "C-102", dept: "HR", rooms: 3, date: "2025-03-19", status: "Pending" },
  ];

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monthly Spend</h2>
        <ul className="divide-y divide-gray-200">
          {dummySpend.map((item) => (
            <li key={item.month} className="flex justify-between py-2">
              <span className="text-gray-700">{item.month}</span>
              <span className="font-medium text-primary-green">{item.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Recent Corporate Bookings</h2>
        <p className="mt-2 text-gray-500">
          {dummyBookings.length} group bookings in the last 180 days.
        </p>

        {dummyBookings.length > 0 ? (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 p-3 text-left">ID</th>
                  <th className="border border-gray-200 p-3 text-left">Department</th>
                  <th className="border border-gray-200 p-3 text-left">Rooms</th>
                  <th className="border border-gray-200 p-3 text-left">Date</th>
                  <th className="border border-gray-200 p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {dummyBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 transition">
                    <td className="border border-gray-200 p-3">{b.id}</td>
                    <td className="border border-gray-200 p-3">{b.dept}</td>
                    <td className="border border-gray-200 p-3">{b.rooms}</td>
                    <td className="border border-gray-200 p-3">{b.date}</td>
                    <td className={`border border-gray-200 p-3 font-medium ${b.status === "Confirmed" ? "text-green-600" : "text-yellow-600"}`}>{b.status}</td>
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
    </div>
  );
};

export default CorporateDashboard;
