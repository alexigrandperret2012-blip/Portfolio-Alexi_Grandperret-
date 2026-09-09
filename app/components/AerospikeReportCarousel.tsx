"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function AerospikeReportCarousel({ lang }: { lang: "fr" | "en" }) {
  const fr = lang === "fr";
  const slides = fr ? [
    ["/Turbomachine/assets/aerospike-report-014.png", "Géométrie aerospike", "Le col déclenche l'éventail de détente qui guide l'écoulement le long du spike."],
    ["/Turbomachine/assets/aerospike-report-028.png", "Caractéristiques locales", "Les invariants de Riemann relient les caractéristiques descendantes et montantes à la paroi."],
    ["/Turbomachine/assets/aerospike-report-045.png", "Éventail calculé", "La discrétisation de l'éventail produit la géométrie complète et les lignes de caractéristiques."],
  ] : [
    ["/Turbomachine/assets/aerospike-report-014.png", "Aerospike geometry", "The throat triggers the expansion fan that guides flow along the spike."],
    ["/Turbomachine/assets/aerospike-report-028.png", "Local characteristics", "Riemann invariants connect falling and rising characteristics to the wall."],
    ["/Turbomachine/assets/aerospike-report-045.png", "Computed fan", "Fan discretization produces the complete geometry and characteristic lines."],
  ];
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => { if (isPaused) return; const interval = window.setInterval(() => setIndex((current) => (current + 1) % slides.length), 5200); return () => window.clearInterval(interval); }, [isPaused, slides.length]);
  const [src, label, detail] = slides[index];
  const move = (direction: 1 | -1) => setIndex((current) => (current + direction + slides.length) % slides.length);

  return <figure className="relative overflow-hidden border border-border bg-[#091019] p-2 shadow-2xl"><div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-white"><AnimatePresence mode="wait" initial={false}><motion.img key={src} src={src} alt={label} initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 size-full object-contain" /></AnimatePresence></div><figcaption className="flex min-h-16 items-center justify-between gap-4 px-3 py-3 font-mono text-[10px] uppercase tracking-wide text-text-dim"><div><p className="text-metal-light">{label}</p><p className="mt-1 text-[9px] text-text-faint">{detail}</p></div><div className="flex gap-1"><button type="button" onClick={() => move(-1)} className="inline-flex size-8 items-center justify-center border border-border transition hover:border-metal hover:text-white" aria-label={fr ? "Image précédente" : "Previous image"}><ChevronLeft className="size-4" /></button><button type="button" onClick={() => setIsPaused((paused) => !paused)} className="inline-flex size-8 items-center justify-center border border-border transition hover:border-metal hover:text-white" aria-label={isPaused ? (fr ? "Lire le carrousel" : "Play carousel") : (fr ? "Mettre le carrousel en pause" : "Pause carousel")}>{isPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}</button><button type="button" onClick={() => move(1)} className="inline-flex size-8 items-center justify-center border border-border transition hover:border-metal hover:text-white" aria-label={fr ? "Image suivante" : "Next image"}><ChevronRight className="size-4" /></button></div></figcaption><div className="flex border-t border-border"><button type="button" onClick={() => setIndex(0)} className={`flex-1 px-2 py-2 font-mono text-[9px] uppercase tracking-wide transition ${index === 0 ? "bg-accent/15 text-metal-light" : "text-text-faint hover:text-metal-light"}`}>{fr ? "Géométrie" : "Geometry"}</button><button type="button" onClick={() => setIndex(1)} className={`flex-1 border-x border-border px-2 py-2 font-mono text-[9px] uppercase tracking-wide transition ${index === 1 ? "bg-accent/15 text-metal-light" : "text-text-faint hover:text-metal-light"}`}>{fr ? "Invariants" : "Invariants"}</button><button type="button" onClick={() => setIndex(2)} className={`flex-1 px-2 py-2 font-mono text-[9px] uppercase tracking-wide transition ${index === 2 ? "bg-accent/15 text-metal-light" : "text-text-faint hover:text-metal-light"}`}>{fr ? "Réseau" : "Network"}</button></div></figure>;
}