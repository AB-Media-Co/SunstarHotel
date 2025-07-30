export default function SunstarValuesCard() {
 const values = [
  {
    title: "Integrity",
    description: "We stand by our words and actions, always doing what’s right."
  },
  {
    title: "Respect for All",
    description: "At Sunstar, we respect every individual—employees, guests, and everyone in between."
  },
  {
    title: "Excellence",
    description: "True care reflects in our services; we serve with heart and honesty."
  },
  {
    title: "Accountability & Responsibility",
    description: "At Sunstar, accountability empowers us all to own our roles and thrive together."
  },
  {
    title: "Leadership",
    description: "Leadership means taking initiative, owning responsibility, and guiding others to succeed."
  },
  {
    title: "Teamwork",
    description: "Strong teams create strong results—everyone contributes, everyone counts."
  }
];

  return (
    <div className="bg-white content py-10">
      <h1 className="text-mobile/h3  md:text-desktop/h3 font-bold text-black mb-12 text-start">
        Do you have what it takes to shine?
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {values.map((value, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-2xl font-bold text-primary-green">
              {value.title}
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}