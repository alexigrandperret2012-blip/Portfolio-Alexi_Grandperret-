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

export default function LavalJetCarousel({ lang }: { lang: "fr" | "en" }) {
  const fr = lang === "fr";
  const slides: Slide[] = fr
    ? [
        {
          src: "/Laval/image-1788422292198.png",
          alt: "Les quatre régimes d'expansion possibles",
          label: "1. Identifier le régime",
          detail: "Quand la pression du jet est plus faible que la pression ambiante, le jet est sur-détendu et doit se recomprimer après la sortie.",
        },
        {
          src: "/Laval/image-1788422321391.png",
          alt: "Champ de pression du jet sur-détendu",
          label: "3. Lire la recompression",
          detail: "L'alternance des zones de pression visualise les compressions et détentes successives qui ramènent progressivement le jet vers l'équilibre.",
        },
        {
          src: "/Laval/image-1788423720397.png",
          alt: "Champ de Mach convergé du jet sur-détendu",
          label: "4. Suivre le nombre de Mach",
          detail: "Les zones de Mach élevé se contractent et se répètent dans le panache : elles révèlent les accélérations et recompressions imposées par les cellules de choc.",
        },
        {
          src: "/Laval/image-1788423731810.png",
          alt: "Champ de vitesse convergé du jet sur-détendu",
          label: "5. Mesurer l'accélération",
          detail: "La vitesse reste maximale au cœur du jet, puis varie à chaque cellule lorsque l'écoulement cherche à s'ajuster à la pression ambiante.",
        },
        {
          src: "/Laval/image-1788423744828.png",
          alt: "Champ de température convergé du jet sur-détendu",
          label: "6. Observer la température",
          detail: "Les alternances de température accompagnent les phases de détente et de compression : elles confirment le caractère fortement compressible du panache.",
        },
        {
          src: "/Laval/image-1788423758085.png",
          alt: "Champ de pression convergé du jet sur-détendu",
          label: "7. Localiser les chocs",
          detail: "Les zones de surpression dessinent les recompressions successives et donnent une lecture directe de la structure des cellules de choc.",
        },
        {
          src: "/Laval/image-1788423770755.png",
          alt: "Champ de densité convergé du jet sur-détendu",
          label: "8. Relier pression et densité",
          detail: "Les variations de densité suivent les ondes de compression et de détente, ce qui complète la lecture du champ de pression.",
        },
      ]
    : [
        {
          src: "/Laval/image-1788422292198.png",
          alt: "The four possible expansion regimes",
          label: "1. Identify the regime",
          detail: "When jet pressure is lower than ambient pressure, the jet is over-expanded and must recompress downstream of the nozzle.",
        },
        {
          src: "/Laval/image-1788422321391.png",
          alt: "Pressure field of the over-expanded jet",
          label: "3. Read recompression",
          detail: "Alternating pressure zones visualize the successive compressions and expansions that progressively return the jet to equilibrium.",
        },
        {
          src: "/Laval/image-1788423720397.png",
          alt: "Converged Mach field of the over-expanded jet",
          label: "4. Track the Mach number",
          detail: "High-Mach zones contract and repeat through the plume, revealing the accelerations and recompressions imposed by shock cells.",
        },
        {
          src: "/Laval/image-1788423731810.png",
          alt: "Converged velocity field of the over-expanded jet",
          label: "5. Measure acceleration",
          detail: "Velocity remains highest in the jet core, then changes at each cell as the flow adjusts to ambient pressure.",
        },
        {
          src: "/Laval/image-1788423744828.png",
          alt: "Converged temperature field of the over-expanded jet",
          label: "6. Observe temperature",
          detail: "Temperature alternations accompany expansion and compression phases, confirming the plume's strongly compressible behavior.",
        },
        {
          src: "/Laval/image-1788423758085.png",
          alt: "Converged pressure field of the over-expanded jet",
          label: "7. Locate shocks",
          detail: "Overpressure zones draw the successive recompressions and give a direct reading of the shock-cell structure.",
        },
        {
          src: "/Laval/image-1788423770755.png",
          alt: "Converged density field of the over-expanded jet",
          label: "8. Connect pressure and density",
          detail: "Density variations follow compression and expansion waves, completing the reading of the pressure field.",
        },
      ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (isPaused) return;
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(interval);
  }, [isPaused, slides.length]);

  const move = (direction: 1 | -1) => {
    setActiveIndex((currentIndex) => (currentIndex + direction + slides.length) % slides.length);
  };

  return (
    <figure className="relative overflow-hidden border border-border bg-bg p-3" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="relative flex aspect-[17/10] items-center justify-center overflow-hidden bg-white p-2 sm:p-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={activeSlide.src}
            src={activeSlide.src}
            alt={activeSlide.alt}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 size-full object-contain"
          />
        </AnimatePresence>
      </div>
      <figcaption className="grid gap-4 border-t border-border px-2 pt-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wide text-metal-light">{activeSlide.label}</p>
          <p className="mt-2 text-sm leading-6 text-text-dim">{activeSlide.detail}</p>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => move(-1)} className="inline-flex size-9 items-center justify-center border border-border transition hover:border-metal hover:text-white" aria-label={fr ? "Image précédente" : "Previous image"}>
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => setIsPaused((paused) => !paused)} className="inline-flex size-9 items-center justify-center border border-border transition hover:border-metal hover:text-white" aria-label={isPaused ? (fr ? "Lire le carrousel" : "Play carousel") : (fr ? "Mettre le carrousel en pause" : "Pause carousel")}>
            {isPaused ? <Play className="size-3.5" aria-hidden="true" /> : <Pause className="size-3.5" aria-hidden="true" />}
          </button>
          <button type="button" onClick={() => move(1)} className="inline-flex size-9 items-center justify-center border border-border transition hover:border-metal hover:text-white" aria-label={fr ? "Image suivante" : "Next image"}>
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </figcaption>
      <div className="absolute left-5 top-5 flex gap-1.5" aria-hidden="true">
        {slides.map((slide, index) => <span key={slide.src} className={`h-1 w-6 transition-colors ${index === activeIndex ? "bg-accent" : "bg-slate-700/35"}`} />)}
      </div>
    </figure>
  );
}