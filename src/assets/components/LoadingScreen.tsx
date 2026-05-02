import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Animate the screen away
        gsap.to(".loading-screen", {
          yPercent: -100,
          duration: 1,
          ease: "expo.inOut",
          onComplete: onComplete,
        });
      },
    });

    // Natural feeling progress
    const obj = { value: 0 };
    tl.to(obj, {
      value: 100,
      duration: 2.5,
      ease: "power4.inOut",
      onUpdate: () => {
        setProgress(Math.floor(obj.value));
      },
    });

    // Subtle background elements or text animations could go here
    tl.from(".loading-text", {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.out",
    }, 0);

  }, []);

  return (
    <div className="loading-screen fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black text-white">
      <div className="relative overflow-hidden px-6">
        <h1 className="loading-text text-[25vw] md:text-[15vw] font-bold leading-none select-none tracking-tighter text-center">
          {progress}%
        </h1>
      </div>
      <div className="mt-4 flex flex-col items-center space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500 opacity-80">
          Initializing Portfolio
        </p>
        <div className="w-48 h-[1px] bg-gray-800 overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
