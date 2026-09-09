"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

type HoverBorderGradientProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children: ReactNode;
  href: string;
};

export function HoverBorderGradient({ children, className, ...props }: HoverBorderGradientProps) {
  return (
    <Link
      {...props}
      scroll
      className={cn(
        "group/hover-border relative inline-flex overflow-hidden rounded-full p-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className
      )}
    >
      <span className="absolute inset-[-120%] animate-[spin_3.4s_linear_infinite] bg-[conic-gradient(from_90deg,transparent_0deg,transparent_62deg,#4169e1_118deg,#7dd3fc_164deg,transparent_210deg,transparent_360deg)] opacity-0 transition-opacity duration-300 group-hover/hover-border:opacity-100" />
      <span className="relative inline-flex items-center justify-center gap-2 rounded-full border border-border bg-bg-panel-2 px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-metal-light transition-colors duration-300 group-hover/hover-border:border-transparent group-hover/hover-border:bg-[#111c27] group-hover/hover-border:text-white">
        {children}
      </span>
    </Link>
  );
}