// CheckInOutInfo.jsx
export default function CheckInOutInfo({
    checkIn,
    checkOut ,
    note = "Book directly to request Early Check-in / Late Check-out, as per availability.",
    className = "",
    
  }) {
    return (
      <section
        className={
          "w-full bg-white rounded-xl pb-24 content " +
          "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 " +
          className
        }
      >
        {/* Left: text */}
        <div>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 text-black/60">
            <span className="text-2xl sm:text-3xl">Check-in</span>
            <span className="text-2xl sm:text-3xl font-bold text-black/40">
              {checkIn}
            </span>
  
            <span className="text-2xl sm:text-3xl sm:ml-6">Check-out</span>
            <span className="text-2xl sm:text-3xl font-bold text-black/40">
              {checkOut}
            </span>
          </div>
  
          <p className="mt-3 text-black/60 text-sm sm:text-base max-w-2xl">
            {note}
          </p>
        </div>
  
        {/* Right: minimal luggage illustration (inline SVG) */}
        <div className="ml-auto sm:ml-0 shrink-0">
          <svg
            className="w-48 h-24 sm:w-64 sm:h-28"
            viewBox="0 0 320 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* tiny clock */}
            <circle cx="300" cy="26" r="16" stroke="#D1D5DB" strokeWidth="3" />
            <path d="M300 18v8l6 6" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
  
            {/* pot + flower */}
            <path d="M38 132h36l-6 18H44l-6-18Z" stroke="#D1D5DB" strokeWidth="3"/>
            <circle cx="56" cy="112" r="5" fill="#F59E0B"/>
            <path d="M56 112c0-10 8-10 8-18M56 112c0-10-8-10-8-18" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round"/>
  
            {/* suitcase 1 (left) */}
            <rect x="86" y="96" width="80" height="58" rx="6" stroke="#D1D5DB" strokeWidth="3"/>
            <rect x="110" y="86" width="32" height="10" rx="3" stroke="#D1D5DB" strokeWidth="3"/>
            <circle cx="102" cy="128" r="6" stroke="#F59E0B" strokeWidth="3"/>
            <circle cx="150" cy="128" r="6" stroke="#F59E0B" strokeWidth="3"/>
            <rect x="124" y="106" width="4" height="36" fill="#F59E0B"/>
  
            {/* suitcase 2 (center, tall) */}
            <rect x="170" y="64" width="90" height="90" rx="8" stroke="#D1D5DB" strokeWidth="3"/>
            <rect x="200" y="48" width="30" height="16" rx="6" stroke="#D1D5DB" strokeWidth="3"/>
            <path d="M188 76v64M204 76v64M220 76v64" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round"/>
  
            {/* suitcase 3 (right) */}
            <rect x="264" y="92" width="44" height="62" rx="6" stroke="#D1D5DB" strokeWidth="3"/>
            <rect x="276" y="82" width="20" height="10" rx="3" stroke="#D1D5DB" strokeWidth="3"/>
            <circle cx="284" cy="120" r="5" stroke="#F59E0B" strokeWidth="3"/>
            <path d="M292 140l8 8M300 140l-8 8" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
  
            {/* subtle ground line */}
            <path d="M20 154H306" stroke="#E5E7EB" />
          </svg>
        </div>
      </section>
    );
  }
  