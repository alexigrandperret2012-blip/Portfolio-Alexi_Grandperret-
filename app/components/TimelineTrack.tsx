"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useLanguage } from "./LanguageProvider";

export default function TimelineTrack({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 40%", "end end"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const endOpacity = useTransform(scrollYProgress, [0.85, 0.98, 1], [0, 0.9, 1]);
  const endScale = useTransform(scrollYProgress, [0.85, 0.98, 1], [0.9, 0.98, 1]);
  // smooth the visual motion with a spring to avoid choppy jumps
  const springHeight = useSpring(height, { stiffness: 90, damping: 24 });

  return (
    <div ref={ref} className="relative pb-14 pl-9 sm:pb-20 sm:pl-28">
      <div className="absolute inset-y-0 left-3 z-10 w-px bg-border sm:left-16" />
      <motion.div
        className="absolute left-3 top-0 z-10 w-[2px] rounded bg-accent sm:left-16"
        style={{ height: springHeight }}
      />

      {/* head removed: visual movement is now conveyed by the filling line */}
      <motion.div
        className="pointer-events-none absolute bottom-3 left-7 z-10 flex items-center gap-2 sm:bottom-4 sm:left-24 sm:gap-3"
        style={{ opacity: endOpacity, scale: endScale }}
      >
        <div className="h-px w-6 bg-accent/60 rounded" />
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent/70">
          {lang === "fr" ? "Fin" : "End"}
        </span>
      </motion.div>
      {children}
    </div>
  );
}
