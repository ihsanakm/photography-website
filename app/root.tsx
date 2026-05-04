import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./index.css";

import Header from "./assets/components/Header";
import Menu from "./assets/components/Menu";
import LoadingScreen from "./assets/components/LoadingScreen";

gsap.registerPlugin(useGSAP);

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
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
    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

    if (menuOpen) {
      if (isMobile) {
        document.body.style.overflow = "hidden";
      } else {
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
    if (typeof window === "undefined") return;
    let lastScrollY = window.scrollY;
    const header = document.querySelector("header");
    if (!header) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (menuOpen) return;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        gsap.to(header, { y: -100, autoAlpha: 0, duration: 0.3, ease: "power2.inOut" });
      } else {
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
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <div 
        ref={appRef} 
        className="relative bg-white"
        style={{ visibility: isLoading ? "hidden" : "visible" }}
      >
        <Menu ref={menuRef} setMenuOpen={setMenuOpen} />
        <Header setMenuOpen={setMenuOpen} />
        {!isLoading && <Outlet />}
      </div>
    </>
  );
}
