"use client";

import { motion } from "motion/react";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  repeat = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  repeat?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: !repeat, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
