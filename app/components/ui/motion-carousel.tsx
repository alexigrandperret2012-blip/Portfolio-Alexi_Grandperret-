"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import type { MotionValue } from "motion/react";
import { cn } from "@/app/lib/utils";
import { useLanguage } from "@/app/components/LanguageProvider";

interface MotionCarouselProps {
  slides: string[];
  className?: string;
  imageFilter?: string | MotionValue<string>;
}

const isVideoSlide = (src: string) => /\.(mov|mp4|webm)($|\?)/i.test(src);

export function MotionCarousel({ slides, className, imageFilter }: MotionCarouselProps) {
  const { lang } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(carouselRef, { margin: "240px 0px", once: false });
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const count = slides.length;
  const currentIsVideo = isVideoSlide(slides[active]);
  const carouselStateRef = useRef({ isVisible, isPaused, currentIsVideo });
  carouselStateRef.current = { isVisible, isPaused, currentIsVideo };

  useEffect(() => {
    const timer = window.setInterval(() => {
      const { isVisible, isPaused, currentIsVideo } = carouselStateRef.current;
      if (count < 2 || !isVisible || isPaused || currentIsVideo) return;
      setActive((value) => (value + 1) % count);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  const move = (direction: number) => {
    setActive((value) => (value + direction + count) % count);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <motion.div
        ref={carouselRef}
        className="motion-carousel-frame relative mx-auto aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-lg border border-white/10 bg-[#020814]/70 shadow-[0_12px_28px_rgba(0,0,0,0.24)] sm:aspect-auto sm:h-[14.5rem] sm:rounded-2xl sm:border-white/15 sm:shadow-[0_-24px_70px_rgba(34,211,238,0.16),0_18px_45px_rgba(0,0,0,0.32)] md:h-[18.5rem]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        whileHover={{ y: -4, scale: 1.006 }}
        transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.7 }}
        style={{ transformPerspective: 1200 }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {isVideoSlide(slides[active]) ? (
            <motion.video
              key={slides[active]}
              src={slides[active]}
              className="absolute inset-0 h-full w-full object-cover contrast-[1.03] saturate-[0.96]"
              style={{ filter: imageFilter ?? "brightness(0.82) saturate(0.9)", willChange: "transform, opacity" }}
              initial={{ opacity: 0, x: 70, scale: 1.04 }}
              animate={{ opacity: 0.96, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -70, scale: 0.98 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              autoPlay={isVisible}
              muted
              preload={isVisible ? "metadata" : "none"}
              playsInline
              onEnded={() => setActive((value) => (value + 1) % count)}
            />
          ) : (
            <motion.img
              key={slides[active]}
              src={slides[active]}
              alt={lang === "fr" ? "Photo de l'expérience professionnelle" : "Professional experience photograph"}
              className="absolute inset-0 h-full w-full object-cover contrast-[1.03] saturate-[0.96]"
              style={{ filter: imageFilter ?? "brightness(0.82) saturate(0.9)" }}
              initial={{ opacity: 0, x: 70, scale: 1.04 }}
              animate={{ opacity: 0.96, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -70, scale: 0.98 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              draggable={false}
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020814]/62 via-transparent to-black/5" />
        <div
          className="motion-carousel-glow pointer-events-none absolute -inset-x-[12%] -top-10 h-40 rounded-[50%] bg-cyan-200/24 blur-3xl mix-blend-screen"
          style={{ animation: "carousel-glow-drift 8s ease-in-out infinite" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-8%,rgba(186,230,253,0.34),transparent_42%),radial-gradient(ellipse_at_50%_110%,rgba(2,8,20,0.56),transparent_62%),linear-gradient(90deg,rgba(2,8,20,0.16),transparent_28%,transparent_72%,rgba(2,8,20,0.16))]" />
        <div className="pointer-events-none absolute inset-x-[4%] top-0 h-px bg-white/30 blur-[1px]" />
        <button
          type="button"
          onClick={() => move(-1)}
          className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#020814]/65 text-lg text-white/80 backdrop-blur transition hover:border-cyan-200/60 hover:text-white sm:left-4 sm:h-9 sm:w-9"
          aria-label={lang === "fr" ? "Photo précédente" : "Previous photo"}
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#020814]/65 text-lg text-white/80 backdrop-blur transition hover:border-cyan-200/60 hover:text-white sm:right-4 sm:h-9 sm:w-9"
          aria-label={lang === "fr" ? "Photo suivante" : "Next photo"}
        >
          ›
        </button>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={slide}
              type="button"
              onClick={() => setActive(index)}
              className={cn("h-1.5 rounded-full transition-all", index === active ? "w-6 bg-cyan-200" : "w-1.5 bg-white/45 hover:bg-white/80")}
              aria-label={lang === "fr" ? `Afficher la photo ${index + 1}` : `Show photo ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
