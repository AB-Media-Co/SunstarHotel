import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const useScrollAnimations = () => {
  useEffect(() => {
    // **Header Animation**
    gsap.from(".home header", {
      opacity: 0,
      y: -100,
      duration: 1.5,
      ease: "power4.out",
    });

    // **Main Section Animation**
    gsap.from(".home .main h1, .home .main p, .home .main .search", {
      opacity: 0,
      y: 100,
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.3, // Staggered animation for multiple elements
    });

    // **Scroll-triggered animations** for elements with 'animation-on-scroll' class
    gsap.utils.toArray(".animation-on-scroll").forEach((box) => {
      gsap.fromTo(box, 
        {
          opacity: 0,
          x: 0, 
          y: 100,
          scale: 0.9 
        },
        {
          opacity: 1,
          x: 0, 
          y: 0, 
          scale: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: box,
            start: "top 100%", // Trigger when 75% of element is in view
            toggleActions: "play none none reverse", // Play animation when scrolled into view
          }
        }
      );
    });
    gsap.utils.toArray(".animation-on-scroll-Section1").forEach((box) => {
      gsap.fromTo(box, 
        {
          opacity: 0,
          x: 0, 
          y: 100,
          scale: 0.9 
        },
        {
          opacity: 1,
          x: 0, 
          y: 0, 
          scale: 1,
          duration: 1.5,
          // ease: "power.out",
          scrollTrigger: {
            trigger: box,
            start: "top 99%", // Trigger when 75% of element is in view
            toggleActions: "play none none none", // Play animation when scrolled into view
          }
        }
      );
    });

    // **Card Slide-in Animation**
    gsap.utils.toArray(".swiper-slide").forEach((slide, index) => {
      gsap.fromTo(slide, 
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        }, 
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: index * 0.1, // Delay for staggered effect
          ease: "power4.out",
          scrollTrigger: {
            trigger: slide,
            start: "top 75%", // Animation will start when 80% of slide is in view
            toggleActions: "play none none reverse", // Play animation when scrolled into view
          }
        }
      );
    });

    gsap.utils.toArray(".zoom-in-on-scroll").forEach((image) => {
      gsap.fromTo(image, 
        {
          scale: 1, 
          opacity: 0 
        }, 
        {
          scale: 1, 
          opacity: 1, 
          duration: 1, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: image,
            start: "top 80%", // Start animation when 80% of the image is in view
            toggleActions: "play none none reverse", // Reverse the animation on scroll back
          }
        }
      );
    });

    gsap.utils.toArray(".wave-card").forEach((card) => {
      gsap.fromTo(card, 
           {
          opacity: 0,
          y: 100, // All cards will come from bottom
          rotation: 10 // Add a slight rotation for the "wave" effect
        }, 
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 2,
          ease: "power4.out",
          stagger: 0.2, // Each card will have a 0.2s stagger delay
          scrollTrigger: {
            trigger: card,
            start: "top 99%", // Animation will start when 80% of the container is in view
            toggleActions: "play none none reverse", // No reverse on scroll back
            markers: false, // Enable to debug
          }
        }

      );
    });

  }, []);
};

export default useScrollAnimations;
