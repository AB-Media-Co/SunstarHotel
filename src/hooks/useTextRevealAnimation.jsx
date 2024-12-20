import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// Add styles to your existing CSS file or create a new one
const useTextRevealAnimation = () => {
    useEffect(() => {
        // Get all elements with the 'text-reveal-animation' class

        const textRevealElements = document.querySelectorAll(".text-reveal-animation");

        textRevealElements.forEach(textAnimation => {
            textAnimation.innerHTML = textAnimation.textContent
                .split(' ')
                .map(word => {
                    return `<span class="word">${word.split('')
                        .map(letter => `<span class="letter">${letter === ' ' ? '&nbsp;' : letter}</span>`)
                        .join('')
                        }</span>`;
                })
                .join(' ');

            gsap.fromTo(
                textAnimation.querySelectorAll('.letter'),
                { y: '100%', opacity: 0 },
                {
                    y: '0%',
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.05,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: textAnimation,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

    }, []);
};

export default useTextRevealAnimation;
