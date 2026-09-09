"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function DroneReportCarousel({ lang }: { lang: "fr" | "en" }) {
  const fr = lang === "fr";
  const slides = fr ? [
    ["/Drone/assets/drone-report-14.png", "Calculateur de commande", "Allocation des commandes aux quatre moteurs."],
    ["/Drone/assets/drone-report-15.png", "Architecture asservie", "Boucle de retour entre consigne, capteurs et système de commande."],
    ["/Drone/assets/drone-report-18.png", "Suivi de trajectoire", "Sélection automatique des positions cibles du parcours."],
    ["/Drone/assets/drone-report-19.png", "Trajectoire simulée", "Suivi 3D et dépassements d'altitude observés."],
  ] : [
    ["/Drone/assets/drone-report-14.png", "Control calculator", "Allocation of commands to the four motors."],
    ["/Drone/assets/drone-report-15.png", "Closed-loop architecture", "Feedback loop between target, sensors, and control system."],
    ["/Drone/assets/drone-report-18.png", "Trajectory tracking", "Automatic selection of the route target positions."],
    ["/Drone/assets/drone-report-19.png", "Simulated trajectory", "3D tracking and observed altitude overshoots."],
  ];
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = window.setInterval(() => setIndex((current) => (current + 1) % slides.length), 4800);
    return () => window.clearInterval(interval);
  }, [isPaused, slides.length]);

  const [src, label, detail] = slides[index];
  const move = (direction: 1 | -1) => setIndex((current) => (current + direction + slides.length) % slides.length);

  return (
    <figure className="relative overflow-hidden border border-border bg-[#091019] p-2 shadow-2xl">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-white">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img key={src} src={src} alt={label} initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 size-full object-contain" />
        </AnimatePresence>
      </div>
      <figcaption className="flex min-h-16 items-center justify-between gap-4 px-3 py-3 font-mono text-[10px] uppercase tracking-wide text-text-dim">
        <div><p className="text-metal-light">{label}</p><p className="mt-1 text-[9px] text-text-faint">{detail}</p></div>
        <div className="flex gap-1"><button type="button" onClick={() => move(-1)} className="inline-flex size-8 items-center justify-center border border-border transition hover:border-metal hover:text-white" aria-label={fr ? "Image précédente" : "Previous image"}><ChevronLeft className="size-4" /></button><button type="button" onClick={() => setIsPaused((paused) => !paused)} className="inline-flex size-8 items-center justify-center border border-border transition hover:border-metal hover:text-white" aria-label={isPaused ? (fr ? "Lire le carrousel" : "Play carousel") : (fr ? "Mettre le carrousel en pause" : "Pause carousel")}>{isPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}</button><button type="button" onClick={() => move(1)} className="inline-flex size-8 items-center justify-center border border-border transition hover:border-metal hover:text-white" aria-label={fr ? "Image suivante" : "Next image"}><ChevronRight className="size-4" /></button></div>
      </figcaption>
      <div className="absolute left-5 top-5 flex gap-1.5" aria-hidden="true">{slides.map(([slideSrc], slideIndex) => <span key={slideSrc} className={`h-1 w-5 ${slideIndex === index ? "bg-accent" : "bg-slate-700/50"}`} />)}</div>
    </figure>
  );
}