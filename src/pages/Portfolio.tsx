import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/dist/Observer";
import "./Portfolio.css";

const images = [
  "https://api.avagyanphoto.com/storage/webp/avagyanwedding-M-K-230-1-687d4d7e4613a.webp",
  "https://api.avagyanphoto.com/storage/webp/avagyanwedding-M-K-230-1-687d4d7e4613a.webp",
  "https://api.avagyanphoto.com/storage/webp/avagyanwedding-M-K-230-1-687d4d7e4613a.webp",
  "https://api.avagyanphoto.com/storage/webp/avagyanwedding-M-K-230-1-687d4d7e4613a.webp",
];

gsap.registerPlugin(useGSAP, ScrollTrigger, Observer);

const Portfolio = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      ScrollTrigger.defaults({ scroller: el });

      const obs = Observer.create({
        target: el,
        type: "wheel,touch",
        onChangeX: (self) => {
          gsap.to(el, {
            scrollLeft: el.scrollLeft + self.deltaX * 3,
            duration: 0.5,
            ease: "power2.out",
          });
        },
        onChangeY: (self) => {
          gsap.to(el, {
            scrollLeft: el.scrollLeft + self.deltaY * 3,
            duration: 0.5,
            ease: "power2.out",
          });
        },
        preventDefault: true,
      });

      gsap.utils.toArray<HTMLElement>(".gallery-item").forEach((item) => {
        gsap.fromTo(
          item,
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              horizontal: true,
              start: "left 90%",
              end: "left 50%",
              scrub: true,
            },
          },
        );
      });

      timeline.current = gsap.timeline();

      gsap.set(".img-reveal", { clipPath: "inset(100% 0 0 0)" });

      // 1. Animate Counter Digits [7]
      const counterObj = { val: 0 };
      timeline.current.to(counterObj, {
        val: 100,
        duration: 0.7,
        ease: "power2.inOut",
        onUpdate() {
          const el = containerRef.current?.querySelector(".count-display");
          if (el)
            el.textContent = Math.round(counterObj.val).toString() + "%  ";
        },
        onComplete() {
          const el = containerRef.current?.querySelector(".count-display");
          if (el) el.remove(); // Remove counter after animation completes
        },
      });

      // 2. Reveal the Image by sliding the dark blocks away [3]
      timeline.current.to(".img-reveal", {
        clipPath: "inset(0% 0 0 0)", // reveal from bottom to top
        duration: 1.5,
        ease: "power2.inOut",
      });

      return () => obs.kill();
    },
    { scope: containerRef },
  );

  return (
    <>
      <div className="scroll-container" ref={containerRef}>
        {/* Hero Panel */}
        <div className="panel-hero">
          <div className="hero-details">
            <div className="hero-top">
              <p className="hero-location">Yerevan, Armenia</p>
              <div className="hero-title">Mariam & Karen</div>
              <p className="hero-desc">
                Mariam & Karen's wedding in Armenia was a stunning blend of
                culture, elegance, and emotion. A celebration so beautiful and
                meaningful, it was proudly featured in Vogue.
              </p>
            </div>
            <div className="hero-bottom">
              <p className="featured-label">As featured in</p>
              <p className="vogue-text">Vogue</p>
            </div>
          </div>
          <div className="hero-image-wrap">
            <div className="loader">
              <div className="counter">
                <span className="count-display">0% </span>
              </div>
              <div className="img-reveal">
                <img src={images[0]} alt="Mariam & Karen" />
              </div>{" "}
            </div>
          </div>
        </div>

        {/* Gallery Panel */}
        <div className="panel-gallery">
          <span className="gallery-label">Gallery</span>
          <div className="gallery-images">
            {images.map((src, i) => (
              <div
                key={i}
                className="gallery-item"
                onClick={() => setLightbox(src)}
              >
                <img src={src} alt={`Wedding moment ${i + 1}`} />
                <div className="gallery-item-overlay">
                  <span>View</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Project Panel */}
        <div className="panel-next">
          <p className="next-label">Next Project</p>
          <h2 className="next-title">
            Ani
            <br />& Artur
          </h2>
          <p className="next-location">Dilijan, Armenia</p>
          <button className="next-btn">
            View Project
            <span className="next-btn-arrow" />
          </button>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="scroll-hint">
        <span className="scroll-hint-line" />
        Scroll to explore
        <span className="scroll-hint-line" />
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>
            Close
          </button>
          <img
            src={lightbox}
            alt="Preview"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default Portfolio;
