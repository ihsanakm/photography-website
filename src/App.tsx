import Header from "./assets/components/Header";
import { Routes, Route } from "react-router";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
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

  // Device-specific menu scroll behavior
  useGSAP(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (menuOpen) {
      if (isMobile) {
        // On Mobile: Disable scroll
        document.body.style.overflow = "hidden";
      } else {
        // On Desktop: Allow scroll but close menu on scroll
        const handleScroll = () => setMenuOpen(false);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  // Hide header on scroll down, show on scroll up
  useGSAP(() => {
    let lastScrollY = window.scrollY;
    const header = document.querySelector("header");
    if (!header) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (menuOpen) return;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        gsap.to(header, { y: -100, autoAlpha: 0, duration: 0.3, ease: "power2.inOut" });
      } else {
        // Scrolling up
        gsap.to(header, { y: 0, autoAlpha: 1, duration: 0.3, ease: "power2.inOut" });
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  // Close menu on outside click
  useGSAP(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest("header")
      ) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
