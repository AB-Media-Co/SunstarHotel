import { useRef, useState } from "react";

export default function CustomCarousel() {
  const containerRef = useRef(null);
  const [cardsToShow, setCardsToShow] = useState(2.5);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const testimonials = [
    {
      image: '/images/HomepageImages/textomonialCard.png',
      text: 'Text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content placeholder text.',
      name: 'Name 1',
      designation: 'Company / Designation 1',
    },
    {
      image: '/images/HomepageImages/textomonialCard.png',
      text: 'Text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content placeholder text.',
      name: 'Name 2',
      designation: 'Company / Designation 2',
    },
    {
      image: '/images/HomepageImages/textomonialCard.png',
      text: 'Text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content placeholder text.',
      name: 'Name 3',
      designation: 'Company / Designation 3',
    },
    {
      image: '/images/HomepageImages/textomonialCard.png',
      text: 'Text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content placeholder text.',
      name: 'Name 4',
      designation: 'Company / Designation 4',
    },
    {
      image: '/images/HomepageImages/textomonialCard.png',
      text: 'Text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content placeholder text.',
      name: 'Name 5',
      designation: 'Company / Designation 5',
    },
  ];

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const distance = touchStartX - touchEndX;
    const cardWidth = containerRef.current.offsetWidth / cardsToShow;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        // Swipe left -> Show next card
        containerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
      } else {
        // Swipe right -> Show previous card
        containerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      }
    }

    setIsDragging(false);
    setTouchStartX(0); // Reset
    setTouchEndX(0);   // Reset
  };

  const scrollLeft = () => {
    const cardWidth = containerRef.current.offsetWidth / cardsToShow;
    containerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const cardWidth = containerRef.current.offsetWidth / cardsToShow;
    containerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full">
      <div className="mb-4 flex justify-center">
        <label htmlFor="cardsToShow" className="mr-4">Cards to Show:</label>
        <input 
          type="number" 
          id="cardsToShow" 
          min="1" 
          step="0.1" 
          max={testimonials.length} 
          value={cardsToShow} 
          onChange={(e) => setCardsToShow(Number(e.target.value))} 
          className="w-16 p-2 border rounded" 
        />
      </div>

      <button 
        onClick={scrollLeft} 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#FDC114] p-4 rounded-full z-10"
      >
        <img src="/images/HomepageImages/leftIcon.svg" className="h-6 w-6" />
      </button>
      
      <div 
        ref={containerRef} 
        className="flex overflow-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 p-6"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            style={{ flex: `0 0 ${100 / cardsToShow}%` }} 
            className="p-6"
          >
            <div className="py-6 w-80 text-left">
              <img 
                src={testimonial.image} 
                alt="Testimonial" 
                className="w-[127px] h-[127px] rounded-full z-10 relative" 
              />
              <div 
                className="bg-gray-100 shadow-lg rounded-lg px-6 pt-14 pb-4 w-80 text-left relative top-[-3rem] z-0"
              >
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                <p className="text-gray-500 text-sm">{testimonial.designation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={scrollRight} 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#FDC114] p-4 rounded-full z-10"
      >
        <img src="/images/HomepageImages/rightIcon.svg" className="h-6 w-6" />
      </button>
    </div>
  );
}
