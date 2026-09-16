"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import FloatingBadges from "./FloatingBadges";
import { useLanguage } from "./LanguageProvider";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

interface HeroProps {
  headerLinks: Array<{ label: string; href?: string; icon: React.ReactNode }>;
  cvLink?: string;
}

export default function Hero({ headerLinks, cvLink }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { lang } = useLanguage();
  const email = "alexi.grandperret@ipsa.fr";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (hovered) {
      video.currentTime = 0;
      void video.play().catch(() => undefined);
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [hovered]);

  const heroText = {
    badge: lang === "fr" ? "Étudiant en aérospatiale / Propulsion" : "Aerospace student / Propulsion",
    titlePrefix: lang === "fr" ? "Bonjour, je suis" : "Hi, I am",
    intro:
      lang === "fr"
        ? [
            "Élève-ingénieur en dernière année à l’IPSA, spécialisé dans les systèmes de propulsion aérospatiale. Mon parcours m’a permis de développer une solide expertise en mécanique des fluides, thermodynamique, propulsion et conception de systèmes aéronautiques et spatiaux.",
            "À la recherche d’un stage de fin d’études en France ou à l’étranger.",
          ]
        : [
            "Final-year engineering student at IPSA, specializing in aerospace propulsion systems. My background has enabled me to develop strong expertise in fluid mechanics, thermodynamics, propulsion, and the design of aeronautical and space systems.",
            "Looking for a final-year internship in France or abroad.",
          ],
    viewCv: lang === "fr" ? "Voir CV" : "View CV",
    copyEmailAria: lang === "fr" ? "Copier l'email" : "Copy email",
    copiedMsg: lang === "fr" ? "Email copié dans le presse-papiers" : "Email copied to clipboard",
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Clipboard write failed", error);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 px-4 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-10 md:grid-cols-[1.3fr_0.9fr] md:gap-16 lg:px-8"
      >
      <div className="space-y-6 sm:space-y-8">
        <motion.div
          variants={item}
          className="inline-flex max-w-full items-center gap-2 rounded-full border border-accent/30 bg-[#020814]/20 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white shadow-[0_6px_18px_rgba(0,0,0,0.14)] backdrop-blur-sm sm:gap-3 sm:px-4 sm:py-2.5 sm:text-[12px] sm:tracking-[0.22em]"
        >
          {heroText.badge}
        </motion.div>
        <motion.div variants={item} className="relative">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-4 -inset-y-3 rounded-3xl bg-[linear-gradient(180deg,rgba(5,10,16,0.28),rgba(5,10,16,0.12)_58%,rgba(5,10,16,0.02))] blur-[1px]"
            animate={{ opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <h1
            className="relative font-display text-4xl font-bold leading-[1.02] tracking-tight text-metal-light sm:text-6xl lg:text-6.5xl"
            style={{ textShadow: "0 8px 28px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.5)" }}
          >
            {heroText.titlePrefix} <span className="text-accent">Alexi</span>
          </h1>
          <div
            className="relative mt-4 max-w-xl space-y-4 text-left text-[15px] leading-7 text-white sm:text-justify sm:text-lg sm:leading-8"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.78), 0 0 3px rgba(0,0,0,0.52)" }}
          >
            {heroText.intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
        <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={cvLink ?? "#contact"}
              target={cvLink ? "_blank" : undefined}
              rel={cvLink ? "noreferrer" : undefined}
              className="liquid-button group inline-flex min-h-11 items-center gap-2 rounded-full border border-accent bg-black px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:px-6 sm:text-sm sm:tracking-[0.24em]"
              style={{ "--liquid-color": "#4169e1" } as React.CSSProperties}
            >
              {heroText.viewCv}
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-accent/30 bg-bg-panel text-metal-light transition group-hover:border-accent group-hover:text-accent group-hover:bg-accent/10">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm1 7V3.5L20.5 9H15Zm-3 7H8v-2h4v2Zm5-4H8v-2h8v2Z" />
                </svg>
              </span>
            </a>
          </div>
          <div className="relative flex items-center gap-3">
            {headerLinks.map((item) =>
              item.label === "Email" ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={handleCopyEmail}
                  className="liquid-button liquid-button--circle inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-bg-panel text-metal-light"
                  style={{ "--liquid-color": "#4169e1" } as React.CSSProperties}
                  aria-label={heroText.copyEmailAria}
                >
                  {item.icon}
                </button>
              ) : item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="liquid-button liquid-button--circle inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-bg-panel text-metal-light"
                  style={{ "--liquid-color": "#4169e1" } as React.CSSProperties}
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ) : null
            )}
            <AnimatePresence>
              {copied ? (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="pointer-events-none absolute -top-12 right-0 whitespace-nowrap rounded-full border border-accent/30 bg-bg-panel/95 px-3.5 py-2 text-[12px] font-medium text-metal-light shadow-[0_10px_28px_rgba(0,0,0,0.28)] backdrop-blur"
                >
                  {heroText.copiedMsg}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <motion.div variants={item} className="relative mx-auto w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px]">
        <FloatingBadges />
        <div className="relative aspect-square w-full p-3 sm:p-6">
          <div className="relative flex h-full w-full items-center justify-center">
            <motion.div
              className="relative h-[95%] w-[95%] rounded-full border border-slate-200/30 bg-slate-300/10 p-1.5 backdrop-blur-md"
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              animate={hovered ? { boxShadow: "0 0 48px rgba(148, 163, 184, 0.35)" } : { boxShadow: "0 0 24px rgba(148, 163, 184, 0.2)" }}
              transition={{ duration: 0.25 }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full border border-white/25 shadow-[inset_0_0_18px_rgba(15,23,42,0.18)]">
                <img
                  src="/Image-profile.jpg"
                  alt={lang === "fr" ? "Portrait d'Alexi Grandperret" : "Portrait of Alexi Grandperret"}
                  className="h-full w-full object-cover"
                />
                <video
                  ref={videoRef}
                  src="/IMG_3340.mov"
                  muted
                  playsInline
                  loop
                  aria-hidden="true"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/22 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </div>
  );
}
