"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

type Slide = {
  src: string;
  alt: string;
  label: string;
  detail: string;
};

const assetPath = "/Laval/assets/RENDU_Dynamique_des_fluides";

export default function LavalReportCarousel({ lang }: { lang: "fr" | "en" }) {
  const fr = lang === "fr";
  const slides: Slide[] = [
    {
      src: `${assetPath}-018.png`,
      alt: fr ? "Champs de densité, pression, température et vitesse de la tuyère" : "Nozzle density, pressure, temperature, and velocity fields",
      label: fr ? "Champs convergés" : "Converged fields",
      detail: fr ? "Densité, pression, température et vitesse" : "Density, pressure, temperature, and velocity",
    },
    {
      src: `${assetPath}-019.png`,
      alt: fr ? "Champ de nombre de Mach dans la tuyère" : "Mach number field in the nozzle",
      label: fr ? "Régime supersonique" : "Supersonic regime",
      detail: fr ? "Accélération à travers le col" : "Acceleration through the throat",
    },
    {
      src: `${assetPath}-026.png`,
      alt: fr ? "Champ de densité avec choc normal dans la tuyère sur-détendue" : "Density field with a normal shock in the over-expanded nozzle",
      label: fr ? "Choc normal interne" : "Internal normal shock",
      detail: fr ? "Saut de densité dans le divergent" : "Density jump in the divergent section",
    },
    {
      src: `${assetPath}-027.png`,
      alt: fr ? "Champ de pression avec choc normal dans la tuyère sur-détendue" : "Pressure field with a normal shock in the over-expanded nozzle",
      label: fr ? "Saut de pression" : "Pressure jump",
      detail: fr ? "Tuyère en régime sur-détendu" : "Over-expanded nozzle regime",
    },
    {
      src: `${assetPath}-021.png`,
      alt: fr ? "Comparaison théorique et numérique de la pression et de la température" : "Theoretical and numerical pressure and temperature comparison",
      label: fr ? "Validation des profils" : "Profile validation",
      detail: fr ? "Théorie et simulation en accord" : "Theory and simulation in agreement",
    },
    {
      src: `${assetPath}-017.png`,
      alt: fr ? "Résidus de convergence de la simulation" : "Simulation convergence residuals",
      label: fr ? "Convergence numérique" : "Numerical convergence",
      detail: fr ? "Résidus stabilisés du calcul" : "Stabilized calculation residuals",
    },
    {
      src: `${assetPath}-020.png`,
      alt: fr ? "Calcul théorique du débit massique dans la tuyère" : "Theoretical nozzle mass-flow calculation",
      label: fr ? "Bilan de débit massique" : "Mass-flow balance",
      detail: fr ? "Référence théorique : 0,567 kg/s" : "Theoretical reference: 0.567 kg/s",
    },
    {
      src: `${assetPath}-046.png`,
      alt: fr ? "Profil de pression le long du jet" : "Pressure profile along the jet",
      label: fr ? "Profil axial" : "Axial profile",
      detail: fr ? "Évolution de la pression statique" : "Static pressure evolution",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (isPaused) return;
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 3200);
    return () => window.clearInterval(interval);
  }, [isPaused, slides.length]);

  const move = (direction: 1 | -1) => {
    setActiveIndex((currentIndex) => (currentIndex + direction + slides.length) % slides.length);
  };

  return (
    <figure
      className="relative overflow-hidden border border-border bg-[#091019] p-2 shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative flex aspect-[2.15/1] items-center justify-center overflow-hidden bg-[#e8edf0] p-2 sm:p-3">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={activeSlide.src}
            src={activeSlide.src}
            alt={activeSlide.alt}
            initial={{ opacity: 0, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 size-full object-contain"
          />
        </AnimatePresence>
      </div>
      <figcaption className="flex min-h-16 items-center justify-between gap-4 px-3 py-3 font-mono text-[10px] uppercase tracking-wide text-text-dim">
        <div>
          <p className="text-metal-light">{activeSlide.label}</p>
          <p className="mt-1 text-[9px] text-text-faint">{activeSlide.detail}</p>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => move(-1)} className="inline-flex size-8 items-center justify-center border border-border transition hover:border-metal hover:text-white" aria-label={fr ? "Image précédente" : "Previous image"}>
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => setIsPaused((paused) => !paused)} className="inline-flex size-8 items-center justify-center border border-border transition hover:border-metal hover:text-white" aria-label={isPaused ? (fr ? "Lire le carrousel" : "Play carousel") : (fr ? "Mettre le carrousel en pause" : "Pause carousel")}>
            {isPaused ? <Play className="size-3.5" aria-hidden="true" /> : <Pause className="size-3.5" aria-hidden="true" />}
          </button>
          <button type="button" onClick={() => move(1)} className="inline-flex size-8 items-center justify-center border border-border transition hover:border-metal hover:text-white" aria-label={fr ? "Image suivante" : "Next image"}>
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </figcaption>
      <div className="absolute left-5 top-5 flex gap-1.5" aria-hidden="true">
        {slides.map((slide, index) => <span key={slide.src} className={`h-1 w-5 transition-colors ${index === activeIndex ? "bg-accent" : "bg-white/25"}`} />)}
      </div>
    </figure>
  );
}