"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion } from "motion/react";
import { useScroll, useTransform } from "motion/react";
import { cn } from "@/app/lib/utils";

export function LampContainer({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const lampRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lampRef,
    offset: ["start end", "end start"],
  });
  const beamWidth = useTransform(scrollYProgress, [0, 0.24, 0.42, 1], ["14rem", "22rem", "34rem", "22rem"]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.24, 0.4, 1], [0.28, 0.58, 1, 0.45]);
  const haloWidth = useTransform(scrollYProgress, [0, 0.24, 0.42, 1], ["16rem", "22rem", "34rem", "22rem"]);
  const haloOpacity = useTransform(scrollYProgress, [0, 0.24, 0.4, 1], [0.18, 0.36, 0.7, 0.24]);
  const lineWidth = useTransform(scrollYProgress, [0, 0.24, 0.42, 1], ["10rem", "18rem", "30rem", "18rem"]);

  return (
    <div
      ref={lampRef}
      className={cn("relative flex min-h-[16rem] w-full items-center justify-center overflow-hidden rounded-none bg-transparent", className)}
      style={{
        maskImage: "radial-gradient(ellipse 72% 70% at center, black 34%, rgba(0,0,0,0.82) 58%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 72% 70% at center, black 34%, rgba(0,0,0,0.82) 58%, transparent 100%)",
      }}
    >
      <div className="relative flex h-full min-h-[16rem] w-full items-center justify-center isolate">
        <motion.div
          style={{ width: beamWidth, opacity: beamOpacity, background: "conic-gradient(from 70deg at 100% 0%, transparent, rgba(34, 211, 238, 0.8), transparent 28%)" }}
          className="absolute right-1/2 top-[48%] h-56 -translate-y-1/2 blur-[1px]"
        />
        <motion.div
          style={{ width: beamWidth, opacity: beamOpacity, background: "conic-gradient(from 290deg at 0% 0%, transparent, rgba(34, 211, 238, 0.8), transparent 28%)" }}
          className="absolute left-1/2 top-[48%] h-56 -translate-y-1/2 blur-[1px]"
        />
        <div className="absolute top-[48%] h-40 w-full -translate-y-2 scale-x-150 bg-[#020814] blur-2xl" />
        <div className="absolute top-[48%] z-20 h-36 w-full bg-transparent opacity-20 backdrop-blur-md" />
        <motion.div style={{ width: haloWidth, opacity: haloOpacity }} className="absolute z-30 h-28 rounded-full bg-cyan-500/40 blur-3xl" />
        <motion.div
          style={{ width: haloWidth, opacity: beamOpacity }}
          className="absolute z-40 h-28 -translate-y-12 rounded-full bg-cyan-300/55 blur-2xl"
        />
        <motion.div
          style={{ width: lineWidth, opacity: beamOpacity }}
          className="absolute z-50 h-[2px] -translate-y-12 bg-white blur-[1px] shadow-[0_0_34px_12px_rgba(255,255,255,0.52)]"
        />
        <div className="absolute inset-x-0 bottom-0 z-40 h-28 bg-gradient-to-t from-[#020814] via-[#020814]/85 to-transparent" />
        {children ? <div className="relative z-50 flex -translate-y-20 flex-col items-center px-5">{children}</div> : null}
      </div>
    </div>
  );
}
