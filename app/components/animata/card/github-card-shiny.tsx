"use client";

import { useCallback, useRef } from "react";

import { useMousePosition } from "../../../hooks/use-mouse-position";
import { cn } from "../../../lib/utils";

type ShinyCardProps = {
  className?: string;
  tag: string;
  title: string;
  desc: string;
  tools: string[];
  children?: React.ReactNode;
  onClick?: () => void;
};

export default function GithubCardShiny({ className, tag, title, desc, tools, children, onClick }: ShinyCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const update = useCallback(({ x, y }: { x: number; y: number }) => {
    if (!overlayRef.current) {
      return;
    }

    overlayRef.current.style.setProperty("--mx", `${x}px`);
    overlayRef.current.style.setProperty("--my", `${y}px`);
  }, []);

  useMousePosition(containerRef, update);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={cn(
        "group/shiny relative overflow-hidden rounded-[1.15rem] border border-border bg-bg-panel-2/75 p-6 text-text shadow-lg backdrop-blur-sm transition-[box-shadow,border-color] hover:border-cyan-300/45 hover:shadow-[0_30px_80px_rgba(56,189,248,0.2),0_0_22px_rgba(125,211,252,0.2)]",
        className,
      )}
    >
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover/shiny:opacity-70"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(125, 211, 252, 0.38) 0%, rgba(125, 211, 252, 0.2) 30%, rgba(125, 211, 252, 0.07) 52%, transparent 74%)",
          filter: "blur(10px)",
        }}
      />

      <div className="relative z-10 font-mono text-xs uppercase tracking-[0.3em] text-accent">
        {tag}
      </div>

      <div className="relative z-10 mt-4 text-[1.15rem] font-semibold leading-tight text-metal-light">
        {title}
      </div>

      <p className="relative z-10 mt-4 text-sm leading-6 text-text-dim">{desc}</p>

      <div className="relative z-10 mt-6 flex flex-wrap gap-2 text-[11px] text-text-faint">
        {tools.map((tool) => (
          <span key={tool} className="rounded-sm border border-border px-2 py-1">
            {tool}
          </span>
        ))}
      </div>

      {children}
    </div>
  );
}
