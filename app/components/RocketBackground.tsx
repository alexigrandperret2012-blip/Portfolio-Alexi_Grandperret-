"use client";

import { useEffect, useMemo, useState } from "react";

export default function RocketBackground() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("parcours");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const raw = (windowHeight - rect.top) / (windowHeight + rect.height);
      setProgress(Math.min(Math.max(raw, 0), 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rocketSvg = useMemo(() => {
    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 920">
  <defs>
    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#0ea5e9" />
    </linearGradient>
    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="flame" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#facc15" />
      <stop offset="100%" stop-color="#f97316" />
    </linearGradient>
  </defs>
  <rect width="420" height="920" fill="transparent" />
  <g opacity="0.95">
    <path d="M210 120c-40 70-74 150-74 225 0 170 74 255 74 320 0-65 74-150 74-320 0-75-34-155-74-225z" fill="url(#g1)" />
    <path d="M180 350c0 52 24 92 30 112 4 12 18 16 24 16s20-4 24-16c6-20 30-60 30-112 0-32-14-62-30-84-16 22-30 52-30 84z" fill="#f8fafc" opacity="0.9" />
    <path d="M160 300c18 18 38 24 58 24s40-6 58-24" fill="#0f172a" opacity="0.25" />
    <path d="M180 470c-6 18-8 36 4 54 10 16 40 24 42 24s32-8 42-24c12-18 10-36 4-54-4-12-24-18-46-18s-42 6-46 18z" fill="url(#flame)" />
    <path d="M190 540c-12 28-12 58 0 86 4 10 18 22 26 22s22-12 26-22c12-28 12-58 0-86-4-10-18-12-26-12s-22 2-26 12z" fill="#fb923c" opacity="0.85" />
    <circle cx="210" cy="430" r="24" fill="#ffffff" opacity="0.6" />
    <ellipse cx="210" cy="880" rx="140" ry="28" fill="#ffffff" opacity="0.15" />
  </g>
</svg>
    `;
  }, []);

  const backgroundStyle = useMemo(() => {
    return {
      backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(rocketSvg)}")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "40%",
      backgroundPosition: `center ${70 - progress * 50}%`,
      opacity: 0.45 + progress * 0.4,
      transition: "background-position 0.25s ease-out, opacity 0.25s ease-out",
    };
  }, [progress, rocketSvg]);

  const rocketTrailStyle = {
    transform: `translate(-50%, ${38 - progress * 50}%) scale(${0.95 + progress * 0.1})`,
    opacity: 0.18 + progress * 0.6,
    transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(15,23,42,0.92),transparent_20%)]" />
      <div className="absolute inset-0" style={backgroundStyle} />
      <div className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2" style={rocketTrailStyle}>
        <div className="absolute left-1/2 top-[76%] h-[220px] w-[22px] -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-400/40 via-cyan-300/15 to-transparent blur-3xl" />
      </div>
    </div>
  );
}
