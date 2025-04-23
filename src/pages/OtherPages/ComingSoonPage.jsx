import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import PinterestIcon from '@mui/icons-material/Pinterest';
export default function ComingSoonPage() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);


  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  // Set launch date to 30 days from now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // In a real app, you would send this to your backend
      console.log('Email submitted:', email);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  // Custom CSS for brand colors
  const customStyles = `
    .bg-brand-teal {
      background-color: #5BBEBC;
    }
    .bg-brand-gold {
      background-color: #FDC114;
    }
    .text-brand-teal {
      color: #5BBEBC;
    }
    .text-brand-gold {
      color: #FDC114;
    }
    .border-brand-teal {
      border-color: #5BBEBC;
    }
    .border-brand-gold {
      border-color: #FDC114;
    }
    .from-brand-teal {
      --tw-gradient-from: #5BBEBC;
      --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
    }
    .to-brand-gold {
      --tw-gradient-to: #FDC114;
    }
    .hover-brand-teal:hover {
      color: #5BBEBC;
    }
    .ring-brand-teal:focus {
      --tw-ring-color: #5BBEBC;
    }
  `;

  return (
    <div className="min-h-screen bg-slate-900 flex pt-20 flex-col justify-center items-center text-white p-4">
      <style>{customStyles}</style>

      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={i % 2 === 0 ? "absolute rounded-full bg-brand-teal bg-opacity-20" : "absolute rounded-full bg-brand-gold bg-opacity-20"}
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`
            }}
          />
        ))}
      </div>

      <div className="z-10 content w-full bg-slate-800 bg-opacity-80 backdrop-blur-lg rounded-xl p-8 shadow-2xl border border-slate-700">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full border border-gradient-to-br from-brand-teal to-brand-gold flex items-center justify-center shadow-lg">
            <img src="/images/Logo/sunstarlogo.svg" alt="" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-teal to-brand-gold">
            Coming Soon
          </h1>
          <p className="text-xl text-white text-opacity-90 mb-6">
            We're working hard to bring you something amazing. Stay tuned!
          </p>

          {/* Countdown */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="bg-slate-800 rounded-lg py-4 w-24 border border-brand-teal">
              <div className="text-3xl font-bold text-brand-gold">{days}</div>
              <div className="text-sm uppercase tracking-wider text-brand-teal">Days</div>
            </div>
            <div className="bg-slate-800 rounded-lg py-4  w-24 border border-brand-gold">
              <div className="text-3xl font-bold text-brand-teal">{hours}</div>
              <div className="text-sm uppercase tracking-wider text-brand-gold">Hours</div>
            </div>
            <div className="bg-slate-800 rounded-lg py-4 w-24 border border-brand-teal">
              <div className="text-3xl font-bold text-brand-gold">{minutes}</div>
              <div className="text-sm uppercase tracking-wider text-brand-teal">Minutes</div>
            </div>
            <div className="bg-slate-800 rounded-lg py-4 w-24 border border-brand-gold">
              <div className="text-3xl font-bold text-brand-teal">{seconds}</div>
              <div className="text-sm uppercase tracking-wider text-brand-gold">Seconds</div>
            </div>
          </div>

          {/* Subscription form */}
          <div className="max-w-md mx-auto mb-10">
            <h2 className="text-xl font-semibold mb-4 flex flex-col md:flex-row items-center justify-center gap-2 text-brand-gold">
              <Mail size={20} />
              Get notified when we launch
            </h2>
            {isSubscribed ? (
              <div className="bg-brand-teal bg-opacity-20 text-brand-teal p-3 rounded-lg">
                Thanks for subscribing! We'll keep you updated.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 ring-brand-teal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-gold text-slate-900 font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Notify Me
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700 pt-6 flex flex-col items-center">
          <div className="flex gap-4 mb-4">
            <a href="https://www.instagram.com/hotel_sunstar_group?igsh=MWxscGl6NHgxdTd2bw==">
              <InstagramIcon className=' border-yellow-500 rounded-lg group-hover:bg-primary-yellow group-hover:text-primary-green transition-all duration-300 ' style={{ fontSize: "30px" }} /> {/* w-10 sets width to 2.5rem (40px) */}                            </a>
            <a href="https://www.facebook.com/HotelSunstarGroup/">
              <FacebookIcon className=' border-yellow-500 rounded-lg  group-hover:bg-primary-yellow group-hover:text-primary-green transition-all duration-300  ' style={{ fontSize: "30px" }} />
            </a>
            <a href="https://www.youtube.com/@sunstaradmin6584">
              <YouTubeIcon className=' border-yellow-500 rounded-lg  group-hover:bg-primary-yellow group-hover:text-primary-green transition-all duration-300 ' style={{ fontSize: "30px" }} />
            </a>
            <a href="https://www.linkedin.com/company/hotelsunstargroup/">
              <LinkedInIcon className=' border-yellow-500 rounded-lg  group-hover:bg-primary-yellow group-hover:text-primary-green transition-all duration-300 ' style={{ fontSize: "30px" }} />
            </a>

            <a href="https://in.pinterest.com/hotel_sunstar_group/"
              className="flex items-center gap-3 hover:text-primary-yellow transition-all duration-300 group">
              <PinterestIcon className=' border-yellow-500 rounded-lg  group-hover:bg-primary-yellow group-hover:text-primary-green transition-all duration-300' />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}