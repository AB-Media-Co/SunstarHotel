export default function SunstarValuesCard() {
  const values = [
    {
      title: "Integrity",
      description:
        "We stand by our words and actions, always doing what’s right.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
          <path
            d="M20 7l-8 8-4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Respect for All",
      description:
        "At Sunstar, we respect every individual—employees, guests, and everyone in between.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
          <path
            d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 0114 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Excellence",
      description:
        "True care reflects in our services; we serve with heart and honesty.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
          <path
            d="M12 2l2.9 6 6.6.6-5 4.3 1.5 6.5L12 16l-6 3.4 1.5-6.5-5-4.3 6.6-.6L12 2z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Accountability & Responsibility",
      description:
        "At Sunstar, accountability empowers us all to own our roles and thrive together.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
          <path
            d="M9 11l3 3L22 4M2 20h20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Leadership",
      description:
        "Leadership means taking initiative, owning responsibility, and guiding others to succeed.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
          <path
            d="M12 2v20M5 9l7-7 7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Teamwork",
      description:
        "Strong teams create strong results—everyone contributes, everyone counts.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
          <path
            d="M8 14a4 4 0 100-8 4 4 0 000 8zm8 0a4 4 0 100-8 4 4 0 000 8zM2 22a6 6 0 0112 0M10 22a6 6 0 0112 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="bg-white py-12"
      aria-labelledby="sunstar-values-heading"
    >
      <div className="content max-w-screen-xl mx-auto px-4">
        <h1
          id="sunstar-values-heading"
          className="text-mobile/h3 md:text-desktop/h3 font-bold text-black mb-4 text-start"
        >
          Do you have what it takes to shine?
        </h1>

        <p className="text-gray-600 max-w-3xl text-start mb-10">
          These are the values that drive our culture and decisions every day.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {values.map((value, index) => (
            <article
              key={value.title}
              className="group relative shadow-xl rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50/70 p-6  ring-1 ring-transparent transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-primary-green/20"
            >
              {/* Accent gradient border on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{
                     background:
                       "linear-gradient(135deg, rgba(34,197,94,0.18), rgba(20,184,166,0.18))",
                     mask:
                       "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                     WebkitMask:
                       "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                     WebkitMaskComposite: "xor",
                     maskComposite: "exclude",
                     padding: 1,
                   }}
              />

              <div className="flex items-start gap-4">
                {/* Number badge */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-green/10 text-primary-green font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </div>

             
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                {value.title}
              </h2>

              <p className="mt-2 text-gray-600 leading-relaxed">
                {value.description}
              </p>

            
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
