import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const useScrollAnimations = () => {
  useEffect(() => {
    // **Header Animation: Fade In Smoothly**
    gsap.from(".home header", {
      opacity: 0,
      y: -100,
      duration: 1.5,
      ease: "power4.out",
      delay: 0.2, // Slight delay to create a smooth sequence
    });

    // **Main Section Fade-In with Stagger Effect**
    gsap.from(".home .main h1, .home .main p, .home .main .search", {
      opacity: 0,
      y: 100,
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.3, // Stagger elements for smoother sequencing
      delay: 0.5, // Delay for smoother sequencing
    });

    // **Fade-In Scroll Animation for Scroll-Triggered Elements**
    gsap.utils.toArray(".animation-on-scroll").forEach((box) => {
      gsap.fromTo(box, 
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: box,
            start: "top 80%", // Trigger when 80% of element is visible
            toggleActions: "play none none reverse", // Play animation when in view
            scrub: 1, // Tied to scroll for smoother experience
            markers: false, // Remove markers in production for clean design
          }
        }
      );
    });

    // **Card Fade-In Animation with Delay for Each Card**
    gsap.utils.toArray(".swiper-slide").forEach((slide, index) => {
      gsap.fromTo(slide, 
        {
          opacity: 0,
          y: 50,
        }, 
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.1, // Stagger effect
          ease: "power4.out",
          scrollTrigger: {
            trigger: slide,
            start: "top 80%", // Trigger when 80% of the slide is visible
            toggleActions: "play none none reverse",
            scrub: 0.5, // Tied to scroll for a smoother feel
            markers: false, // Remove markers in production
          }
        }
      );
    });

    // **Zoom-In Animation for Images (Fade and Slight Zoom-In)**
    gsap.utils.toArray(".zoom-in-on-scroll").forEach((image) => {
      gsap.fromTo(image, 
        {
          opacity: 0, 
          scale: 0.9,
        }, 
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: image,
            start: "top 80%", // Trigger when 80% of the image is visible
            toggleActions: "play none none reverse",
            scrub: 0.5,
            markers: false,
          }
        }
      );
    });

    // **Wave Card Fade-In with Stagger Effect**
    gsap.utils.toArray(".wave-card").forEach((card) => {
      gsap.fromTo(card, 
        {
          opacity: 0,
          y: 100, // Cards will fade in from the bottom
        }, 
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power4.out",
          stagger: 0.2, // Cards fade in sequentially
          scrollTrigger: {
            trigger: card,
            start: "top 99%", // Start when the container is mostly in view
            toggleActions: "play none none reverse",
            scrub: 0.5,
            markers: false,
          }
        }
      );
    });

    // **Hover Effects: Subtle Fade**
    gsap.utils.toArray(".hover-effect").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(el, { opacity: 0.8, duration: 0.3, ease: "power3.out" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { opacity: 1, duration: 0.3, ease: "power3.in" });
      });
    });

  }, []);
};

export default useScrollAnimations;
