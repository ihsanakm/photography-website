import { useState, useRef, type Dispatch } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


gsap.registerPlugin(useGSAP);

const IMAGE =
  "https://api.avagyanphoto.com/storage/webp/avagyanwedding-M-K-230-1-687d4d7e4613a.webp";

interface GridColumnsProps {
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  colRefs: React.RefObject<HTMLDivElement | null>[];
  colCount: number;
}

const GridColumns = ({
  hoveredIndex,
  setHoveredIndex,
  colRefs,
  colCount,
}: GridColumnsProps) => {
  const cols = typeof colCount === "number" ? colCount : 3;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap: "12px",
        padding: "12px",
      }}
    >
      {Array.from({ length: cols }).map((_, colIndex) => (
        <div
          key={colIndex}
          ref={colRefs[colIndex]}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          {Array.from({ length: 6 }).map((_, rowIndex) => {
            const index = colIndex + rowIndex * cols;
            const isHovered = hoveredIndex === index;
            const isOtherActive =
              hoveredIndex !== null && hoveredIndex !== index;
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  transform: isHovered
                    ? "scale(1.02)"
                    : isOtherActive
                      ? "scale(0.97)"
                      : "scale(1)",
                  transition: "transform 0.3s ease",
                  overflow: "hidden",
                }}
              >
                <a href="/portfolio">
                  <img
                    src={IMAGE}
                    alt="portfolio"
                    draggable={false}
                    style={{
                      width: "100%",
                      display: "block",
                      objectFit: "cover",
                      aspectRatio: "2/3",
                    }}
                  />
                </a>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default function Grid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [colCount, setColCount] = useState(
    typeof window !== "undefined" && window.innerWidth < 768 ? 2 : 3,
  );

  const { introColRefs, realColRefs } = useRef({
    introColRefs: [
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
    ],
    realColRefs: [
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
    ],
  }).current;

  const introContainerRef = useRef<HTMLDivElement>(null); // box 1
  const mainContainerRef = useRef<HTMLDivElement>(null); // box 2

  const STATION_Y = 30;
  const INTERNAL_GAP = -12;
  const mainStationY = STATION_Y + INTERNAL_GAP;


  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        const isMobile = context.conditions?.isMobile;
        setColCount(isMobile ? 2 : 3);

        const intro = introContainerRef.current;
        const main = mainContainerRef.current;

        // Calculate dynamic stopping point
        // The fixed line 30px from top

        // Because both grids have padding: 12px, standing them next to each other
        // creates a 24px gap. We use -12px to overlap the padding, leaving exactly
        // a 12px space between the actual image cards!


        const allCols = [
          ...introColRefs.slice(0, isMobile ? 2 : 3).map((r) => r.current),
          ...realColRefs.slice(0, isMobile ? 2 : 3).map((r) => r.current),
        ].filter(Boolean);

        gsap.set(document.body, { overflowY: "hidden" });

        const tl = gsap.timeline();

        // ── Phase 1: Arrival (The Train) ──
        tl.fromTo(
          intro,
          { yPercent: 0, y: window.innerHeight },
          { yPercent: -100, y: STATION_Y, duration: 2, ease: "power2.out" },
        )
          .fromTo(
            main,
            { y: () => window.innerHeight + (intro?.offsetHeight ?? 0) },
            {
              y: mainStationY,
              duration: 2,
              ease: "power2.out",
              height: "100vh",
            },
            "<",
          )
          .from(
            allCols,
            {
              y: (index) => {
                const cIdx = index % (isMobile ? 2 : 3);
                return cIdx === 0 ? 300 : cIdx === 1 ? 600 : 900;
              },
              duration: 5,
              ease: "power2.out",
            },
            "<",
          )

          // ── Phase 2: Engine Exit (Uncoupling) ──
          .to(intro, {
            yPercent: -200,
            y: -window.innerHeight,
            duration: 1,
            ease: "power2.in",
            onComplete: () => {
              gsap.set(main, {
                // y: 0,
                // paddingTop: mainStationY,
              });
            },
          });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <>
      {/* Intro Box — moves independently */}
      <div
        ref={introContainerRef}
        style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
      >
        <GridColumns
          hoveredIndex={null}
          setHoveredIndex={() => {}}
          colRefs={introColRefs}
          colCount={colCount}
        />
      </div>

      {/* Main Box — moves independently */}

      <div
        className="hide-scrollbar"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <div ref={mainContainerRef}>
          <div>
            <GridColumns
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              colRefs={realColRefs}
              colCount={colCount}
            />
          </div>
        </div>
      </div>
    </>
  );
}
