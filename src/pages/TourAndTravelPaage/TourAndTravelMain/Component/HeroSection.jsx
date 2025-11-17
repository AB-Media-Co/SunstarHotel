/* eslint-disable react/prop-types */
import React from "react";

const HeroSection = ({ data }) => {
  if (!data || !data.title) return null;

  // Split the title — last word highlighted
  const words = data.title.trim().split(" ");
  const lastWord = words.pop();
  const firstPart = words.join(" ");

  return (
    <div className="relative h-[100vh] w-full z-10">
      {/* Background Image */}
      <img
        src="/images/TourAndTravel/Hero.webp"
        alt="Tour and travel adventure"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      {/* Content */}
      <div className="relative z-20 flex md:pb-28 flex-col content justify-center items-start h-full text-white px-6 md:px-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-snug">
          {firstPart}{" "}
          <span className="text-yellow-400">{lastWord}</span>
        </h1>

        <p className="text-lg mb-6 max-w-xl">{data.desc}</p>

        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full transition">
          <a href="/travel-booking-form">BOOK NOW</a>
        </button>
      </div>

      {/* Decorative element */}
      <div
        className="z-10 absolute hidden md:block md:right-[3rem] bottom-0 md:bottom-[-5rem]
                   w-[300px] h-[300px] animate-spin-slow
                   bg-no-repeat bg-contain"
        style={{
          backgroundImage: `url("/images/HomepageImages/round.png")`,
        }}
        aria-hidden="true"
      />

      {/* Bottom Features */}
      <div className="absolute bottom-0 left-0 w-full z-30 flex">
        <div className="bg-black bg-opacity-40 py-6 px-8 flex gap-6 text-white text-lg font-light">
          <span className="border-r border-gray-400 pr-4">Easy Booking</span>
          <span className="border-r border-gray-400 px-4">Curated Destinations</span>
          <span className="md:pl-4">Trusted Support</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
