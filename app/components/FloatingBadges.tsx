"use client";

import { useLanguage } from "./LanguageProvider";

const badges: {
  label: string;
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  duration: number;
}[] = [
  { label: "IPSA Toulouse", top: "4%", left: "2%", duration: 5 },
  { label: "Simulation CFD", bottom: "8%", right: "-8%", duration: 5.6 },
  { label: "Propulsion", top: "64%", left: "-7%", duration: 4.8 },
  { label: "Thermodynamiques", top: "18%", right: "-7%", duration: 6 },
];

export default function FloatingBadges() {
  const { lang } = useLanguage();
  const labels: Record<string, string> = {
    "IPSA Toulouse": "IPSA Toulouse",
    "Simulation CFD": "CFD Simulation",
    Propulsion: "Propulsion",
    Thermodynamiques: "Thermodynamics",
  };

  return (
    <>
      {badges.map((b, i) => (
        <span
          key={b.label}
          className="pointer-events-none absolute z-20 hidden select-none rounded-full border border-border bg-bg-panel/95 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-metal-light shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:block"
          style={{
            top: b.top,
            left: b.left,
            bottom: b.bottom,
            right: b.right,
            animation: `badge-float ${b.duration}s ease-in-out infinite`,
            animationDelay: `${i * 0.35}s`,
          }}
        >
          {lang === "fr" ? b.label : labels[b.label] ?? b.label}
        </span>
      ))}
    </>
  );
}
