import  { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(Observer, SplitText);

const Test = () => {
  const sectionsRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const animatingRef = useRef(false);

  const wrap = (index, length) => (index + length) % length;

  const gotoSection = (index, direction) => {
    if (animatingRef.current) return;

    animatingRef.current = true;
    const wrappedIndex = wrap(index, sectionsRef.current.length);
    const fromTop = direction === -1;
    const dFactor = fromTop ? -1 : 1;

    const tl = gsap.timeline({
      defaults: { duration: 1.25, ease: "power1.inOut" },
      onComplete: () => {
        animatingRef.current = false;
        setCurrentIndex(wrappedIndex);
      },
    });

    if (currentIndex >= 0) {
      const currentSection = sectionsRef.current[currentIndex];
      gsap.set(currentSection, { zIndex: 0 });
      tl.to(currentSection.querySelector(".bg"), { yPercent: -15 * dFactor })
        .set(currentSection, { autoAlpha: 0 });
    }

    const nextSection = sectionsRef.current[wrappedIndex];
    gsap.set(nextSection, { autoAlpha: 1, zIndex: 1 });

    tl.fromTo(
      [nextSection.querySelector(".outer"), nextSection.querySelector(".inner")],
      { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
      { yPercent: 0 },
      0
    )
      .fromTo(
        nextSection.querySelector(".bg"),
        { yPercent: 15 * dFactor },
        { yPercent: 0 },
        0
      )
      .fromTo(
        new SplitText(nextSection.querySelector(".section-heading"), {
          type: "chars,words,lines",
          linesClass: "clip-text",
        }).chars,
        { autoAlpha: 0, yPercent: 150 * dFactor },
        { autoAlpha: 1, yPercent: 0, duration: 1, ease: "power2", stagger: { each: 0.02, from: "random" } },
        0.2
      );

    setCurrentIndex(wrappedIndex);
  };

  useEffect(() => {
    Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => gotoSection(currentIndex - 1, -1),
      onUp: () => gotoSection(currentIndex + 1, 1),
      tolerance: 10,
      preventDefault: true,
    });

    // Initial section load
    gotoSection(0, 1);

    return () => Observer.getAll().forEach((obs) => obs.kill());
  }, [currentIndex]);

  return (
    <div>
      <header className="fixed flex items-center justify-between p-4 w-full z-50 h-16 bg-black text-white text-sm uppercase tracking-widest font-bold">
        <div>Animated Sections</div>
        <a href="https://codepen.io/BrianCross/pen/PoWapLP" target="_blank" rel="noopener noreferrer">
          Original By Brian
        </a>
      </header>

      {["Scroll down", "Animated with GSAP", "GreenSock", "Animation platform", "Keep scrolling"].map((text, index) => (
        <section
          key={index}
          ref={(el) => (sectionsRef.current[index] = el)}
          className={`absolute top-0 left-0 h-screen w-screen bg-black text-white flex items-center justify-center overflow-hidden`}
          style={{ visibility: currentIndex === index ? "visible" : "hidden" }}
        >
          <div className="outer h-full w-full overflow-hidden">
            <div className="inner h-full w-full flex items-center justify-center">
              <div className={`bg bg-cover bg-center flex items-center justify-center h-full w-full`}>
                <h2 className="section-heading text-4xl lg:text-6xl tracking-widest">{text}</h2>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Test;
