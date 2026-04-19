import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const IMAGE =
  "https://api.avagyanphoto.com/storage/webp/avagyanwedding-M-K-230-1-687d4d7e4613a.webp";

// Responsive: 2 cols on mobile, 3 on md+
const COL_COUNTS = {
  mobile: 2,
  desktop: 3,
};

const GridColumns = ({
  hoveredIndex,
  setHoveredIndex,
  colRefs,
  colCount,
}: {
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
  colRefs: React.RefObject<HTMLDivElement>[];
  colCount: number;
}) => (
  <div className="grid gap-x-3 gap-y-3 px-3 py-3 sm:gap-x-4 sm:gap-y-4 sm:px-5 sm:py-4 md:gap-x-6 md:gap-y-5 md:px-8 md:py-6"
    style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
  >
    {Array.from({ length: colCount }).map((_, colIndex) => (
      <div
        key={colIndex}
        ref={colRefs[colIndex]}
        className="flex flex-col gap-y-3 sm:gap-y-4 md:gap-y-5"
      >
        {Array.from({ length: 12 }).map((_, rowIndex) => {
          const index = colIndex + rowIndex * colCount;
          const isHovered = hoveredIndex === index;
          const isOtherActive = hoveredIndex !== null && hoveredIndex !== index;

          return (
            <div key={index} style={{ willChange: "transform" }}>
              <div
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative transition-transform duration-400 ease-out ${
                  isHovered ? "scale-102 z-10" : "scale-100 z-5"
                }`}
              >
                <a
                  href="/portfolio"
                  aria-label="portfoliomariam-karen"
                  className="block group"
                >
                  <div className="relative overflow-hidden">
                    <span className="absolute inset-x-0 bottom-0 h-1/2 opacity-0 group-hover:opacity-100 transition duration-500 bg-[linear-gradient(0deg,rgba(0,0,0,0.7)_0%,transparent_100%)] z-10" />
                    <div className="overflow-hidden">
                      <div className="transform scale-105 group-hover:scale-110 transition duration-500 ease-out">
                        <img
                          src={IMAGE}
                          alt="Mariam & Karen"
                          className={`w-full h-full object-cover transition-transform duration-400 ease-out ${
                            isOtherActive ? "scale-95" : "scale-100"
                          }`}
                          draggable={false}
                        />
                      </div>
                    </div>
                    <div className="absolute bottom-4 sm:bottom-5 md:bottom-7.5 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-center w-full z-10">
                      <div className="overflow-hidden">
                        <p className="text-white text-base sm:text-xl md:text-3xl font-medium translate-y-full group-hover:translate-y-0 transition duration-500">
                          MARIAM & KAREN
                        </p>
                      </div>
                      <p className="text-white text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition duration-700 mt-1 sm:mt-2">
                        Yerevan, Armenia
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    ))}
  </div>
);

const Grid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Detect col count based on viewport — default to 3, falls back gracefully
  const getColCount = () =>
    typeof window !== "undefined" && window.innerWidth < 768
      ? COL_COUNTS.mobile
      : COL_COUNTS.desktop;

  const [colCount] = useState<number>(() => getColCount());

  // Intro refs
  const introCol0 = useRef<HTMLDivElement>(null!);
  const introCol1 = useRef<HTMLDivElement>(null!);
  const introCol2 = useRef<HTMLDivElement>(null!);
  const introColRefs = [introCol0, introCol1, introCol2].slice(0, colCount);

  // Real refs
  const realCol0 = useRef<HTMLDivElement>(null!);
  const realCol1 = useRef<HTMLDivElement>(null!);
  const realCol2 = useRef<HTMLDivElement>(null!);
  const realColRefs = [realCol0, realCol1, realCol2].slice(0, colCount);

  const trainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const train = trainRef.current;
    if (!train) return;

    const trainHeight = train.offsetHeight;

    gsap.set(train, { y: window.innerHeight });

    const staggerOffsets = [0, window.innerHeight * 0.3, window.innerHeight].slice(0, colCount);

    introColRefs.forEach((ref, i) => {
      gsap.set(ref.current, { y: staggerOffsets[i] });
    });
    realColRefs.forEach((ref, i) => {
      gsap.set(ref.current, { y: staggerOffsets[i] });
    });

    const tl = gsap.timeline();

    tl.to(train, {
      y: -(trainHeight / 2),
      duration: 6,
      ease: "power.out",
    });

    tl.to(
      [...introColRefs, ...realColRefs].map((r) => r.current),
      {
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.12,
        onComplete: () => {
          gsap.set(train, { y: 0 });
        },
      },
    );
  });

  return (
    <div ref={trainRef}>
      <div>
        <GridColumns
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
          colRefs={introColRefs}
          colCount={colCount}
        />
      </div>

      <div>
        <GridColumns
          hoveredIndex={null}
          setHoveredIndex={() => {}}
          colRefs={realColRefs}
          colCount={colCount}
        />
      </div>
    </div>
  );
};

export default Grid;