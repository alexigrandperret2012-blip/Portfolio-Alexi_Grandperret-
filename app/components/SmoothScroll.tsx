"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.45,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.76,
      touchMultiplier: 0.9,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    const scrollToTop = () => lenis.scrollTo(0, { duration: 0.9, force: true });

    rafId = window.requestAnimationFrame(raf);
    window.addEventListener("project-page-open", scrollToTop);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("project-page-open", scrollToTop);
      lenis.destroy();
    };
  }, []);

  return null;
}
