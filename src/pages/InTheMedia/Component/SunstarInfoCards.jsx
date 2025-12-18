const SunstarInfoCards = ({
  infoCards = [],
  onCardClick = () => { },
  cardClickableWhole = true,
}) => {
  // Handle both new object structure { offers: [...] } and legacy array [...]
  const cards = Array.isArray(infoCards) ? infoCards : (infoCards?.offers || []);

  if (!cards || cards.length === 0) return null;

  const handleClick = (e, card) => {
    const link = card.link || card.href;

    // Check if it's the hotel modal card
    if (card.title === 'Our Hotels' || card.buttonText === 'View Hotels' || card.title === 'Developers & Owners') {
      e.preventDefault();
      onCardClick(card);
      return;
    }

    // If no link, prevent default anchor behavior (jumping to top) and call handler
    if (!link) {
      e.preventDefault();
      onCardClick(card);
    } else {
      // If link exists, allow default navigation but still notify parent
      onCardClick(card);
    }
  };

  return (
    <div className="w-full bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="content">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => {
            const link = card.link || card.href;
            const openNewTab = !!card.openNewTab;
            const buttonText = card.buttonText || "Read More";
            const image = card.image || card.illustration;

            // If whole card clickable -> wrap in <a>.
            if (cardClickableWhole) {
              return (
                <a
                  key={card.id || index}
                  href={link || "#"}
                  target={openNewTab ? "_blank" : "_self"}
                  rel={openNewTab ? "noopener noreferrer" : undefined}
                  onClick={(e) => handleClick(e, card)}
                  className="block rounded-2xl bg-white p-6 pb-0 shadow-sm hover:shadow-md transition-shadow duration-300 h-full focus:outline-none focus:ring-2 focus:ring-primary-green group"
                  aria-label={`${card.title || 'Card'} - ${buttonText}`}
                >
                  <div className="flex flex-col h-full">
                    <h3 className="text-xl sm:text-2xl font-bold text-primary-green mb-3 sm:mb-4 group-hover:text-primary-green/80 transition-colors">
                      {card.title}
                    </h3>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-2 flex-grow whitespace-pre-line">
                      {card.description}
                    </p>
                    <div>
                      <span
                        className="inline-flex items-center justify-center text-primary-gray font-medium text-lg group-hover:text-primary-green underline transition"
                      >
                        {buttonText}
                      </span>
                    </div>

                    <div className="flex items-end justify-between mt-auto">
                      <div className="flex-1" />
                      {image && (
                        <img
                          src={image}
                          alt={card.title || "Illustration"}
                          className="h-24 sm:h-[190px] object-contain ml-4"
                          loading="lazy"
                        />
                      )}
                    </div>
                  </div>
                </a>
              );
            }

            // If only CTA clickable (fallback mode, though default is true)
            return (
              <div
                key={card.id || index}
                className="rounded-2xl bg-white p-6 pb-0 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-primary-green mb-3 sm:mb-4">
                  {card.title}
                </h3>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-2 flex-grow whitespace-pre-line">
                  {card.description}
                </p>

                <div>
                  {link ? (
                    <a
                      href={link}
                      target={openNewTab ? "_blank" : "_self"}
                      rel={openNewTab ? "noopener noreferrer" : undefined}
                      onClick={(e) => handleClick(e, card)}
                      className="inline-flex items-center justify-center text-primary-gray font-medium py-2 text-lg hover:text-primary-green underline transition cursor-pointer"
                    >
                      {buttonText}
                    </a>
                  ) : (
                    <button
                      onClick={(e) => handleClick(e, card)}
                      className="inline-flex items-center justify-center text-primary-gray font-medium py-2 text-lg hover:text-primary-green underline transition cursor-pointer"
                    >
                      {buttonText}
                    </button>
                  )}
                </div>

                <div className="flex items-end justify-between mt-auto">
                  <div className="flex-1" />
                  {image && (
                    <img
                      src={image}
                      alt={card.title || "Illustration"}
                      className="h-24 sm:h-[190px] object-contain ml-4"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SunstarInfoCards;
