
const whyCards = [
  {
    title: "Guaranteed Earnings & Revenue Sharing",
    description:
      "Secure a guaranteed base-level income with additional performance-based bonuses. Transparent profit-sharing model ensures you get your fair share of revenue growth.",
  },
  {
    title: "Zero Headache Operations & Full Management",
    description:
      "We take full control, from daily operations to staff management and guest services. No more dealing with bookings, customer complaints, or operational issues—we handle it all.",
  },
  {
    title: "Quick Turnaround For Revenue Generation",
    description:
      "Faster go-to-market strategy with minimal downtime. Efficient rebranding and revenue optimization ensure profitable operations from Day 1.",
  },
  {
    title: "Complete Transparency With Owner Dashboard",
    description:
      "Real-time access to your property’s revenues, expenses, reviews, occupancy, maintenance status, and team availability. No hidden information—full control at your fingertips.",
  },
  {
    title: "Rebranding & Enhanced Guest Experience",
    description:
      "Your hotel will be rebranded under the trusted Hotel Sunstar Group name. Investment in guest experience, higher ratings, and better profitability.",
  },
  {
    title: "Cost Efficiency & Shared Investments",
    description:
      "Major property upgrades are owner-funded, but we cover rebranding and marketing costs. Efficient procurement and operations ensure reduced expenses and higher margins.",
  },
  {
    title: "Full-Scale Marketing & Distribution",
    description:
      "Strong OTA (Online Travel Agency) presence on platforms like Booking.com, Expedia, and MakeMyTrip. Dedicated digital and offline marketing to attract corporate clients, travel agents, and direct bookings. Access to our 44-year-old customer base & loyalty program for repeat guests.",
  },
];

const WhyPartner = () => {
  return (
    <div className="content mx-auto px-4 py-16">
      <h2 className="text-mobile/h3 md:text-desktop/h3  text-gray-800 mb-10 text-start">
        Why Partner With Hotel Sunstar Group?
      </h2>

      <div className="grid gap-10 md:grid-cols-2 ">
        {whyCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-semibold text-primary-green mb-2">
              {card.title}
            </h3>
            <p className="text-gray-600 text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyPartner;
