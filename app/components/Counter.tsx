"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";

export default function Counter({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!inView) return;
    count.set(0);
    const controls = animate(count, value, { duration: 1.4, ease: "easeOut" });
    return controls.stop;
  }, [inView, value, count]);

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-display text-4xl font-bold text-metal-light sm:text-5xl"
        style={{ textShadow: "0 2px 10px rgba(3,8,16,0.35)" }}
      >
        <motion.span>{rounded}</motion.span>
        <span className="text-accent">{suffix}</span>
      </div>
      <div
        className="mt-2 font-mono text-[11px] uppercase tracking-wide text-slate-300/80"
        style={{ textShadow: "0 1px 8px rgba(3,8,16,0.25)" }}
      >
        {label}
      </div>
    </div>
  );
}
