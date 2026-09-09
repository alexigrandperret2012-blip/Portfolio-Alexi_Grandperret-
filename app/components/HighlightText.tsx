"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

export default function HighlightText({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -10% 0px" });

  return (
    <motion.strong
      ref={ref}
      className="cursor-default font-semibold text-white"
      style={{
        textDecorationLine: "underline",
        textDecorationColor: "rgba(148,163,255,0.45)",
        textDecorationThickness: "1.5px",
        textUnderlineOffset: "4px",
        backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(147,197,253,0.08) 38%, rgba(191,219,254,0.58) 50%, rgba(147,197,253,0.08) 62%, transparent 100%)",
        backgroundSize: "240% 100%",
      }}
      initial={{ opacity: 0.72, color: "rgba(226,232,240,0.86)" }}
      viewport={{ once: true, amount: 0.35 }}
      animate={{ backgroundPosition: inView ? "120% 0%" : "-20% 0%" }}
      whileInView={inView ? { opacity: 1, color: "rgba(255,255,255,1)" } : undefined}
      transition={{
        opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
        color: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
        backgroundPosition: { duration: 1.1, ease: "easeInOut", delay: delay + 0.15 },
      }}
    >
      {children}
    </motion.strong>
  );
}
