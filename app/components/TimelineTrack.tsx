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
    <div ref={ref} className="relative pl-28 pb-20">
      <div className="absolute inset-y-0 left-16 z-10 w-px bg-border" />
      <motion.div
        className="absolute left-16 top-0 z-10 w-[2px] rounded bg-accent"
        style={{ height: springHeight }}
      />

      {/* head removed: visual movement is now conveyed by the filling line */}
      <motion.div
        className="pointer-events-none absolute bottom-4 left-24 z-10 flex items-center gap-3"
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
