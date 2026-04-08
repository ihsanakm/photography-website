import { useState } from "react";

const Grid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="grid grid-cols-3 gap-x-6 gap-y-5 px-8 py-6 auto-rows-max">
        {Array.from({ length: 6 }).map((_, index) => {
          const isHovered = hoveredIndex === index;
          const isOtherActive = hoveredIndex !== null && hoveredIndex !== index;

          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative transform transition-transform duration-400 ease-out overflow-hidden ${isHovered ? "z-6 scale-102" : "z-5"} ${hoveredIndex === null ? "z-1" : ""}`}
            >
              <a
                href="/portfolio"
                aria-label="portfoliomariam-karen"
                className="block group"
              >
                <div className="relative overflow-hidden">
                  {/* Overlay Layers */}
                  {/* <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-black/20 z-1"></span> */}
                  <span className="absolute inset-x-0 bottom-0 h-1/2 opacity-0 group-hover:opacity-100 transition duration-500 bg-[linear-gradient(0deg,rgba(0,0,0,0.7)_0%,transparent_100%)] z-1"></span>
                  {/* Image */}
                  <div className="overflow-hidden h-full">
                    <div className="transform scale-105 group-hover:scale-110 transition duration-500 ease-out h-full">
                      <img
                        src="https://api.avagyanphoto.com/storage/webp/avagyanwedding-M-K-230-1-687d4d7e4613a.webp"
                        alt="Mariam & Karen"
                        className={`w-full h-full object-cover transform transition-transform duration-400 ease-out ${
                          isOtherActive ? "scale-95" : "scale-100"
                        }`}
                        draggable={false}
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="absolute bottom-7.5 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-center w-full z-1">
                    <div className="overflow-hidden">
                      <p className="text-white text-3xl font-medium translate-y-full group-hover:translate-y-0 transition duration-500">
                        MARIAM & KAREN
                      </p>
                    </div>

                    <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition duration-700 mt-2">
                      Yerevan, Armenia
                    </p>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
