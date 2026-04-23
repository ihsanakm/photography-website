import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const HoverText = ({ children, classname }: { children: React.ReactNode, classname?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spanRef1 = useRef<HTMLSpanElement>(null);
  const spanRef2 = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseOver = () => {
      gsap.to([spanRef1.current, spanRef2.current], {
        yPercent: -100,
        duration: 0.2,
      });
    };

    const handleMouseLeave = () => {
      gsap.to([spanRef1.current, spanRef2.current], {
        yPercent: 0,
        duration: 0.2,
      });
    };

    container.addEventListener("mouseenter", handleMouseOver);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseOver);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  });

  return (
    <div
      ref={containerRef}
      className={`text-container h-[1.1em] overflow-hidden flex flex-col uppercase font-semibold ${classname || "text-white text-base"}`}
    >
      <span ref={spanRef1} className="text">
        {children}
      </span>
      <span ref={spanRef2} className="text">
        {children}
      </span>
    </div>
  );
};

export default HoverText;
