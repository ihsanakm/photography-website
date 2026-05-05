import type { MetaFunction } from "react-router";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/all";
import "./Portfolio.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Portfolio | AKMi's Photography" },
    { name: "description", content: "Explore the premium photography portfolio by AKMi, featuring featured works like Mariam & Karen's Vogue-featured wedding." },
  ];
};

const images = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
  "https://api.avagyanphoto.com/storage/webp/avagyanwedding-M-K-80-687d4d0e1dce4.webp",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
  "https://api.avagyanphoto.com/storage/webp/avagyanwedding-M-K-554-687d4d1b1ddb8.webp",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
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

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 769px)",
          isMobile: "(max-width: 768px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };

          if (isDesktop) {
            ScrollTrigger.defaults({ scroller: el });

            const obs = Observer.create({
              target: el,
              type: "wheel,touch",
              onChangeX: (self: any) => {
                gsap.to(el, {
                  scrollLeft: el.scrollLeft + self.deltaX * 3,
                  duration: 0.5,
                  ease: "power2.out",
                });
              },
              onChangeY: (self: any) => {
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

            return () => obs.kill();
          } else {
            // Premium Mobile Vertical Animations
            gsap.utils.toArray<HTMLElement>(".gallery-item").forEach((item) => {
              gsap.fromTo(
                item,
                { 
                  y: 100, 
                  opacity: 0,
                  scale: 0.95,
                  filter: "blur(5px)"
                },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  ease: "expo.out",
                  scrollTrigger: {
                    trigger: item,
                    start: "top 95%",
                    end: "top 70%",
                    scrub: 1,
                  },
                },
              );
            });
          }
        },
      );

      timeline.current = gsap.timeline();

      gsap.set(".img-reveal", { filter: "blur(3px)" });

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
        clipPath: "inset(0% 0% 0% 0%)",
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power2.inOut",
      });
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
            <div className="hero-bottom text-center md:text-start">
              <p className="featured-label">As featured in</p>
              <p className="vogue-text">Vogue</p>
            </div>
          </div>
          <div className="hero-image-wrap">
            <div className="loader">
              <div className="img-reveal">
                <div className="counter">
                  <span className="count-display">0% </span>
                </div>
                <img src={images[0]} alt="Mariam & Karen" />
              </div>{" "}
            </div>
          </div>
        </div>

        {/* Gallery Panel */}
        <div className="panel-gallery">
          <span className="gallery-label md:text-start text-center">Gallery</span>
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
          <p className="next-label w-full text md:text-start text-center">Next Project</p>
          <h2 className="next-title w-full text md:text-start text-center">
            Ani
            <br />& Artur
          </h2>
          <p className="next-location w-full text md:text-start text-center">Dilijan, Armenia</p>
          <button className="next-btn md:text-start text-center justify-center flex md:mx-0 mx-auto">
            View Project  
            <span className="next-btn-arrow ml-2" />
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
