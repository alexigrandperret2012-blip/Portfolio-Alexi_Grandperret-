"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

export default function TimelineBullet({
  year,
  duration,
}: {
  year?: string;
  duration?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  return (
    <div ref={ref} className="relative self-start sm:sticky sm:top-24 sm:w-24 sm:text-right">
      <div className="flex flex-col items-start gap-1 sm:items-end sm:gap-2">
        <motion.div
          className="relative hidden h-14 w-14 self-end sm:block"
          animate={inView ? { y: -12, scale: 1.08, opacity: 1 } : { y: -12, scale: 0.96, opacity: 0.75 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
        >
          <div className="absolute right-0 top-0 flex h-14 w-14 items-center justify-center">
            <span className="absolute h-4 w-4 rounded-full bg-bg shadow-[0_0_0_4px_rgba(255,255,255,0.08)] sm:h-5 sm:w-5 sm:shadow-[0_0_0_5px_rgba(255,255,255,0.08)]" />
            <span className="relative h-4 w-4 rounded-full bg-accent" />
          </div>
        </motion.div>
        {year ? (
          <div className="font-mono text-[12px] uppercase tracking-[0.24em] text-accent">
            {year}
          </div>
        ) : null}
        {duration ? (
          <div className="text-[13px] font-medium tracking-wide text-text-faint">
            {duration}
          </div>
        ) : null}
      </div>
    </div>
  );
}
