import { useState, type HTMLAttributes } from "react";
import { cn } from "@/app/lib/utils";

interface FlipCardProps extends HTMLAttributes<HTMLDivElement> {
  image: string;
  hoverImage?: string;
  title: string;
  description: string;
  subtitle?: string;
  rotate?: "x" | "y";
}

export default function FlipCard({
  image,
  hoverImage,
  title,
  description,
  subtitle,
  rotate = "y",
  className,
  ...props
}: FlipCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // `rotate` is kept for API compatibility, even though this variant uses a reveal animation.
  void rotate;

  return (
    <div
      className={cn("group/card relative h-72 w-full overflow-hidden rounded-2xl border border-border/70", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out",
            isHovered && hoverImage ? "scale-105 opacity-0" : "scale-100 opacity-100"
          )}
        />
        {hoverImage ? (
          <img
            src={hoverImage}
            alt={title}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out",
              isHovered ? "scale-105 opacity-100" : "scale-100 opacity-0"
            )}
          />
        ) : null}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_34%,rgba(7,11,19,0.86)_100%)]" />

      <div className="absolute inset-x-0 bottom-0 p-5 transition-all duration-450 ease-out group-hover/card:-translate-y-28 group-hover/card:opacity-0">
        <p className="inline-flex rounded-full border border-accent/20 bg-[#020814]/65 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-blue-200 shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-sm">{subtitle}</p>
        <h3 className="mt-2 font-display text-lg font-semibold leading-tight text-white">{title}</h3>
      </div>

      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[linear-gradient(180deg,rgba(30,58,138,0.16),rgba(20,46,112,0.68))] p-5 opacity-0 backdrop-blur-[1px] transition-all duration-500 ease-out group-hover/card:translate-y-0 group-hover/card:opacity-100">
        <p className="inline-flex rounded-full border border-blue-200/25 bg-[#020814]/70 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-blue-100 shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-sm">{subtitle}</p>
        <h3 className="mt-2 font-display text-lg font-semibold leading-tight text-white">{title}</h3>
        <p className="mt-3 border-t border-white/20 pt-3 text-[13px] leading-6 text-slate-100/95">{description}</p>
      </div>
    </div>
  );
}
