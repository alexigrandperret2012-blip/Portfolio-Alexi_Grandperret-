"use client";

import { motion } from "motion/react";

export default function HoverTile({
  children,
  className = "",
  onHoverStart,
  onHoverEnd,
}: {
  children: React.ReactNode;
  className?: string;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={className}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      {children}
    </motion.div>
  );
}
