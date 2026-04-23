import "./App.css";
import Header from "./assets/components/Header";
import { Routes, Route } from "react-router";
import Portfolio from "./pages/Portfolio";
import Grid from "./assets/components/Grid";
import { useState, useRef } from "react";
import Menu from "./assets/components/Menu";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .to("header", {
          y: -100,
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.inOut",
        })
        .to(
          menuRef.current,
          {
            duration: 0.8,
            height: "auto",
            clipPath: "inset(0 0 0% 0)",
            ease: "expo.inOut",
          },
          "-=0.3",
        )
        .from(
          ".menu-item",
          {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.5",
        );
    },
    { scope: appRef },
  );

  useGSAP(() => {
    if (!tl.current) return;
    if (menuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [menuOpen]);

  // Close menu on scroll or outside click
  useGSAP(() => {
    if (!menuOpen) return;

    const handleScroll = () => {
      setMenuOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest("header")
      ) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div ref={appRef} className=" relative bg-white">
      <Menu ref={menuRef} setMenuOpen={setMenuOpen} />
      <Header setMenuOpen={setMenuOpen} />
      <Routes>
        <Route
          path="/"
          element={<Grid />}
        />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </div>
  );
}

export default App;
