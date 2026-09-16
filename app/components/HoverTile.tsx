"use client";

import { motion } from "motion/react";

export default function HoverTile({
  children,
  className = "",
  onHoverStart,
  onHoverEnd,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onClick?: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={className}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
