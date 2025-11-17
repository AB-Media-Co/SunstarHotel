export default function SunstarValuesCard({ data }) {
  // Fallback heading/description (in case API is empty)
  const sectionHeading =
    data?.heading || 'Do you have what it takes to shine?';
  const sectionDesc =
    data?.description ||
    'These are the values that drive our culture and decisions every day.';

  const ICON_LIST = [
    '/images/career/Integrity.svg',
    '/images/career/Respectforall.svg',
    '/images/career/Excellience.svg',
    '/images/career/AccountabilityResponsibility.svg',
    '/images/career/Leadership.svg',
    '/images/career/TeamWork.svg',
  ];


  // Build items from API -> [{title, description, icon}]
  const values = (data?.cards ?? []).map((c, index) => {
    const title = c.heading ?? c.title ?? '';
    const description = c.description ?? '';

    // Icon based on index
    const icon = ICON_LIST[index] || '/images/career/placeholder.svg';

    return { title, description, icon };
  });


  // If API has no cards, show your original 6 defaults
  const fallbackValues = [
    {
      title: 'Integrity',
      description:
        'We stand by our words and actions, always doing what’s right.',
      icon: '/images/career/Integrity.svg',
    },
    {
      title: 'Respect for All',
      description:
        'At Sunstar, we respect every individual—employees, guests, and everyone in between.',
      icon: '/images/career/Respectforall.svg',
    },
    {
      title: 'Excellence',
      description:
        'True care reflects in our services; we serve with heart and honesty.',
      icon: '/images/career/Excellience.svg',
    },
    {
      title: 'Accountability & Responsibility',
      description:
        'At Sunstar, accountability empowers us all to own our roles and thrive together.',
      icon: '/images/career/AccountabilityResponsibility.svg',
    },
    {
      title: 'Leadership',
      description:
        'Leadership means taking initiative, owning responsibility, and guiding others to succeed.',
      icon: '/images/career/Leadership.svg',
    },
    {
      title: 'Teamwork',
      description:
        'Strong teams create strong results—everyone contributes, everyone counts.',
      icon: '/images/career/TeamWork.svg',
    },
  ];

  const items = values.length ? values : fallbackValues;

  return (
    <section className="bg-white py-12" aria-labelledby="sunstar-values-heading">
      <div className="content max-w-screen-xl mx-auto px-4">
        <h1
          id="sunstar-values-heading"
          className="text-mobile/h3 md:text-desktop/h3 font-bold text-black mb-2 text-start"
        >
          {sectionHeading}
        </h1>

        <p className="text-gray-600 max-w-3xl text-mobile/body/2 md:text-desktop/body/1 text-start mb-10">
          {sectionDesc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((value) => (
            <article
              key={value.title}
              className="group relative shadow-xl rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50/70 p-6 ring-1 ring-transparent transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-primary-green/20"
            >
              {/* Accent gradient border on hover */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(34,197,94,0.18), rgba(20,184,166,0.18))',
                  mask:
                    'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                  WebkitMask:
                    'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  padding: 1,
                }}
              />

              <div className="flex items-start gap-4">
                <img
                  src={value.icon}
                  alt={value.title}
                  className="h-16 w-16 object-contain"
                />
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
