import gsap from "gsap";
import { useCallback, useRef } from "react";

const HoverText = ({ children }: { children: React.ReactNode }) => {
  const spanRef1 = useRef<HTMLSpanElement>(null);
  const spanRef2 = useRef<HTMLSpanElement>(null);

  const handleMouseOver = useCallback(() => {
    gsap.to([spanRef1.current, spanRef2.current], {
      yPercent: -100,
      duration: 0.2,
    });
  }, []);

  const handleMouseOverLeave = useCallback(() => {
    gsap.to([spanRef1.current, spanRef2.current], {
      yPercent: 0,
      duration: 0.2,
    });
  }, []);

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseOverLeave}
      className="text-container h-4 overflow-hidden flex flex-col"
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
